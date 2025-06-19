import { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PassType, PlatformPass, SubscriptionStatus, PassPurchaseResult, PassMetadata } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { PlatformPassService } from '@/services/platformPassDB';

const PASS_PRICES = {
  [PassType.FREE]: 0,
  [PassType.THREE_DAY]: 0.001,
  [PassType.LIFETIME]: 0.001,
};

// Database service with fallback to localStorage for offline/development
const passStorage = {
  // Test if database is available
  async isDatabaseAvailable(): Promise<boolean> {
    try {
      return await PlatformPassService.testConnection();
    } catch (error) {
      console.warn('Database not available, falling back to localStorage:', error);
      return false;
    }
  },

  // Fallback localStorage methods
  async saveToLocalStorage(pass: PlatformPass): Promise<void> {
    const stored = localStorage.getItem('platformPasses');
    const passes = stored ? JSON.parse(stored) : [];
    passes.push(pass);
    localStorage.setItem('platformPasses', JSON.stringify(passes));
  },

  async loadFromLocalStorage(): Promise<PlatformPass[]> {
    const stored = localStorage.getItem('platformPasses');
    if (!stored) return [];
    
    return JSON.parse(stored).map((pass: PlatformPass & { 
      purchaseDate: string; 
      expiryDate?: string; 
    }) => ({
      ...pass,
      purchaseDate: new Date(pass.purchaseDate),
      expiryDate: pass.expiryDate ? new Date(pass.expiryDate) : undefined,
    }));
  },

  async getActivePassFromLocalStorage(walletAddress: string): Promise<PlatformPass | null> {
    const passes = await this.loadFromLocalStorage();
    const now = new Date();
    
    return passes.find(pass => 
      pass.walletAddress === walletAddress && 
      pass.isActive && 
      (!pass.expiryDate || pass.expiryDate > now)
    ) || null;
  },

  // Main methods that choose between database and localStorage
  async savePlatformPass(pass: PlatformPass): Promise<void> {
    if (await this.isDatabaseAvailable()) {
      await PlatformPassService.savePlatformPass(pass);
    } else {
      console.log('🔄 Database unavailable, saving to localStorage');
      await this.saveToLocalStorage(pass);
    }
  },
  
  async loadPlatformPasses(): Promise<PlatformPass[]> {
    if (await this.isDatabaseAvailable()) {
      return await PlatformPassService.loadPlatformPasses();
    } else {
      console.log('🔄 Database unavailable, loading from localStorage');
      return await this.loadFromLocalStorage();
    }
  },
  
  async getActivePassForWallet(walletAddress: string): Promise<PlatformPass | null> {
    if (await this.isDatabaseAvailable()) {
      return await PlatformPassService.getActivePassForWallet(walletAddress);
    } else {
      console.log('🔄 Database unavailable, checking localStorage');
      return await this.getActivePassFromLocalStorage(walletAddress);
    }
  }
};

export const usePlatformPass = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { publicKey, signTransaction } = wallet;
  const { toast } = useToast();
  
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>({
    hasActivePass: false,
    passType: null,
    isLoading: false,
  });
  
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Check subscription status when wallet connects
  const checkSubscriptionStatus = useCallback(async () => {
    if (!publicKey) {
      setSubscriptionStatus({
        hasActivePass: false,
        passType: null,
        isLoading: false,
      });
      return;
    }

    setSubscriptionStatus(prev => ({ ...prev, isLoading: true }));

    try {
      const activePass = await passStorage.getActivePassForWallet(publicKey.toString());
      
      if (activePass) {
        setSubscriptionStatus({
          hasActivePass: true,
          passType: activePass.type,
          expiryDate: activePass.expiryDate ? new Date(activePass.expiryDate) : undefined,
          mintAddress: activePass.mintAddress,
          isLoading: false,
        });
      } else {
        setSubscriptionStatus({
          hasActivePass: false,
          passType: PassType.FREE,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
      setSubscriptionStatus({
        hasActivePass: false,
        passType: PassType.FREE,
        isLoading: false,
      });
    }
  }, [publicKey]);

  // Check subscription when wallet connects
  useEffect(() => {
    checkSubscriptionStatus();
  }, [checkSubscriptionStatus]);

  const createPassMetadata = (passType: PassType): PassMetadata => {
    const passInfo = {
      [PassType.FREE]: {
        name: 'Multisender Free Pass',
        description: 'Pay-per-use access to Multisender platform',
        image: 'https://placeholder.svg/300x300?text=Free+Pass',
        duration: 'Pay per use',
      },
      [PassType.THREE_DAY]: {
        name: 'Multisender 3-Day Pass',
        description: 'Unlimited transfers for 3 days on Multisender platform',
        image: 'https://placeholder.svg/300x300?text=3-Day+Pass',
        duration: '3 Days',
      },
      [PassType.LIFETIME]: {
        name: 'Multisender Lifetime Pass',
        description: 'Unlimited transfers forever on Multisender platform',
        image: 'https://placeholder.svg/300x300?text=Lifetime+Pass',
        duration: 'Lifetime',
      },
    };

    const info = passInfo[passType];
    
    return {
      name: info.name,
      description: info.description,
      image: info.image,
      attributes: [
        {
          trait_type: 'Pass Type',
          value: passType.replace('_', ' ').toUpperCase(),
        },
        {
          trait_type: 'Duration',
          value: info.duration,
        },
        {
          trait_type: 'Platform',
          value: 'Multisender',
        },
        {
          trait_type: 'Issue Date',
          value: new Date().toISOString().split('T')[0],
        },
      ],
      properties: {
        category: 'Platform Pass',
        files: [
          {
            uri: info.image,
            type: 'image/svg+xml',
          },
        ],
      },
    };
  };

  const purchasePass = async (passType: PassType): Promise<PassPurchaseResult> => {
    console.log('🚀 purchasePass called with passType:', passType);
    
    if (!publicKey || !signTransaction) {
      console.log('❌ Wallet not connected - publicKey:', publicKey, 'signTransaction:', !!signTransaction);
      return {
        success: false,
        error: 'Wallet not connected',
      };
    }

    console.log('✅ Wallet connected - publicKey:', publicKey.toString());

    if (passType === PassType.FREE) {
      console.log('📝 Free pass selected, updating status only');
      // Free pass doesn't need minting, just update status
      setSubscriptionStatus({
        hasActivePass: false,
        passType: PassType.FREE,
        isLoading: false,
      });
      return {
        success: true,
      };
    }

    console.log('💰 Starting pass purchase for:', passType);
    setIsPurchasing(true);

    try {
      // Check if user has enough SOL
      console.log('💸 Checking wallet balance...');
      const balance = await connection.getBalance(publicKey);
      const requiredSol = PASS_PRICES[passType];
      const balanceInSol = balance / LAMPORTS_PER_SOL;
      
      console.log('💳 Balance check:', {
        balanceInSol,
        requiredSol,
        hasEnough: balanceInSol >= requiredSol
      });
      
      if (balanceInSol < requiredSol) {
        throw new Error(`Insufficient SOL balance. Required: ${requiredSol} SOL, Have: ${balanceInSol} SOL`);
      }

      // Create a keypair for the NFT mint
      console.log('🔐 Generating mint keypair...');
      const mintKeypair = Keypair.generate();
      console.log('🔑 Mint address will be:', mintKeypair.publicKey.toString());
      
      // Initialize Metaplex
      console.log('🏗️ Initializing Metaplex...');
      const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet));
      console.log('✅ Metaplex initialized with wallet adapter');

      // Create metadata
      console.log('📊 Creating metadata...');
      const metadata = createPassMetadata(passType);
      console.log('📋 Metadata created:', metadata);
      
      // Upload metadata
      console.log('📤 Uploading metadata to storage...');
      const uploadPayload = {
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        attributes: metadata.attributes.map(attr => ({
          trait_type: attr.trait_type,
          value: attr.value.toString(),
        })),
        properties: metadata.properties,
      };
      console.log('📤 Upload payload:', uploadPayload);
      
      const { uri: metadataUri } = await metaplex.nfts().uploadMetadata(uploadPayload);
      console.log('✅ Metadata uploaded to URI:', metadataUri);

      // Create NFT
      console.log('🎨 Creating NFT...');
      const nftCreatePayload = {
        uri: metadataUri,
        name: metadata.name,
        symbol: passType === PassType.THREE_DAY ? '3DAY' : 'LIFE',
        sellerFeeBasisPoints: 0,
        creators: [
          {
            address: publicKey,
            share: 100,
          },
        ],
        mint: mintKeypair, // Use the generated mint keypair
      };
      console.log('🎨 NFT create payload:', nftCreatePayload);
      
      const { nft, response } = await metaplex.nfts().create(nftCreatePayload);
      console.log('🎉 NFT created successfully!');
      console.log('🏷️ NFT Details:', {
        address: nft.address.toString(),
        name: nft.name,
        symbol: nft.symbol,
        uri: nft.uri
      });
      console.log('📝 Transaction response:', {
        signature: response.signature
      });

      // Calculate expiry date for 3-day pass
      const expiryDate = passType === PassType.THREE_DAY 
        ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        : undefined;
      
      console.log('📅 Pass expiry date:', expiryDate);

      // Save pass to storage
      console.log('💾 Saving pass to storage...');
      const platformPass: PlatformPass = {
        id: crypto.randomUUID(),
        type: passType,
        walletAddress: publicKey.toString(),
        mintAddress: nft.address.toString(),
        purchaseDate: new Date(),
        expiryDate,
        isActive: true,
        transactionSignature: response.signature,
      };
      console.log('💾 Platform pass data:', platformPass);

      await passStorage.savePlatformPass(platformPass);
      console.log('✅ Pass saved to storage');

      // Update subscription status
      console.log('🔄 Updating subscription status...');
      setSubscriptionStatus({
        hasActivePass: true,
        passType,
        expiryDate,
        mintAddress: nft.address.toString(),
        isLoading: false,
      });
      console.log('✅ Subscription status updated');

      toast({
        title: "Pass Purchased Successfully!",
        description: `Your ${passType.replace('_', ' ')} pass NFT has been minted.`,
      });

      console.log('🎊 Purchase completed successfully!');
      return {
        success: true,
        mintAddress: nft.address.toString(),
        transactionSignature: response.signature,
      };
    } catch (error) {
      console.error('💥 Error purchasing pass:', error);
      console.error('🔍 Error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      toast({
        title: "Purchase Failed",
        description: errorMessage,
        variant: "destructive",
      });

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      console.log('🏁 Purchase process finished, setting isPurchasing to false');
      setIsPurchasing(false);
    }
  };

  const hasValidSubscription = useCallback((requiredPass?: PassType): boolean => {
    if (!subscriptionStatus.hasActivePass) {
      return subscriptionStatus.passType === PassType.FREE;
    }

    if (requiredPass && subscriptionStatus.passType !== requiredPass) {
      return false;
    }

    // Check expiry for timed passes
    if (subscriptionStatus.expiryDate && subscriptionStatus.expiryDate < new Date()) {
      return false;
    }

    return true;
  }, [subscriptionStatus]);

  return {
    subscriptionStatus,
    isPurchasing,
    purchasePass,
    checkSubscriptionStatus,
    hasValidSubscription,
  };
}; 