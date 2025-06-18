import { useState, useEffect } from 'react';
import { Connection, PublicKey, RpcResponseAndContext, TokenAccountsFilter, Commitment } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getMint } from '@solana/spl-token';
import { Metaplex } from '@metaplex-foundation/js';
import type { Token } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Known popular tokens with high-quality metadata
const KNOWN_TOKENS: Record<string, Partial<Token>> = {
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': { // USDC
    symbol: 'USDC',
    name: 'USD Coin',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
  },
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': { // USDT
    symbol: 'USDT',
    name: 'Tether USD',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png',
  },
  'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN': { // JUP
    symbol: 'JUP',
    name: 'Jupiter',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN/logo.png',
  },
  '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R': { // RAY
    symbol: 'RAY',
    name: 'Raydium',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png',
  },
};

interface TokenAccount {
  pubkey: PublicKey;
  mint: PublicKey;
  amount: bigint;
  decimals: number;
}

export function useTokenAccounts(publicKey: PublicKey | null, connection: Connection) {
  const { toast } = useToast();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  const fetchTokenAccounts = async (forceRefresh = false) => {
    if (!publicKey || (!forceRefresh && Date.now() - lastFetchTime < 30000)) {
      return; // Don't fetch if not connected or recently fetched (30s cache)
    }

    setIsLoading(true);
    setError(null);

    try {
      // Initialize Metaplex with better error handling
      let metaplex;
      try {
        metaplex = Metaplex.make(connection);
      } catch (metaplexError) {
        console.warn('Failed to initialize Metaplex, continuing without metadata:', metaplexError);
        metaplex = null;
      }

      // Get all token accounts for the wallet with timeout
      const tokenAccountsPromise = connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: TOKEN_PROGRAM_ID },
        'confirmed'
      );

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 15000);
      });

      const tokenAccounts = await Promise.race([tokenAccountsPromise, timeoutPromise]);

      // Filter accounts with balance > 0 and get token info
      const tokenAccountsWithBalance: TokenAccount[] = tokenAccounts.value
        .map(({ pubkey, account }) => {
          const data = account.data.parsed.info;
          const amount = BigInt(data.tokenAmount.amount);

          if (amount > 0n) {
            return {
              pubkey,
              mint: new PublicKey(data.mint),
              amount,
              decimals: data.tokenAmount.decimals,
            };
          }
          return null;
        })
        .filter((account): account is TokenAccount => account !== null);

      // Fetch metadata for each token using Metaplex
      const tokenPromises = tokenAccountsWithBalance.map(async (account) => {
        const mintAddress = account.mint.toString();
        try {
          // Check if it's a known token first
          const knownToken = KNOWN_TOKENS[mintAddress];
          let metadata;
          if (metaplex) {
            try {
              // Try to fetch metadata using Metaplex with timeout
              const metaplexPromise = metaplex.nfts().findByMint({ mintAddress: account.mint });
              const metaplexTimeout = new Promise<never>((_, reject) => {
                setTimeout(() => reject(new Error('Metaplex timeout')), 5000);
              });

              const nft = await Promise.race([metaplexPromise, metaplexTimeout]);

              // If we have a URI, fetch the JSON metadata
              let imageUrl = '';
              if (nft.uri) {
                try {
                  const response = await fetch(nft.uri, { 
                    signal: AbortSignal.timeout(3000) // 3 second timeout
                  });
                  if (response.ok) {
                    const jsonMetadata = await response.json();
                    imageUrl = jsonMetadata.image || '';
                  }
                } catch (uriError) {
                  console.warn('Failed to fetch URI metadata:', uriError);
                }
              }

              metadata = {
                name: nft.name || 'Unknown Token',
                symbol: nft.symbol || 'UNK',
                logoURI: imageUrl || nft.json?.image || '',
              };
            } catch (metaplexError) {
              console.warn(`Metaplex failed for ${mintAddress}:`, metaplexError);
              // Fallback to known token data or generic data
              metadata = knownToken || {
                name: 'Unknown Token',
                symbol: 'UNK',
                logoURI: '',
              };
            }
          } else {
            // No Metaplex available, use known token data or generic
            metadata = knownToken || {
              name: 'Unknown Token',
              symbol: 'UNK',
              logoURI: '',
            };
          }

          // Calculate balance
          const balance = Number(account.amount) / Math.pow(10, account.decimals);
          return {
            mintAddress,
            name: knownToken?.name || metadata.name,
            symbol: knownToken?.symbol || metadata.symbol,
            logoURI: knownToken?.logoURI || metadata.logoURI || '',
            decimals: account.decimals,
            balance,
          } as Token;
        } catch (error) {
          console.warn(`Failed to fetch metadata for token ${mintAddress}:`, error);

          // Fallback to basic token info
          const balance = Number(account.amount) / Math.pow(10, account.decimals);
          const knownToken = KNOWN_TOKENS[mintAddress];
          return {
            mintAddress,
            name: knownToken?.name || 'Unknown Token',
            symbol: knownToken?.symbol || mintAddress.slice(0, 6),
            logoURI: knownToken?.logoURI || '',
            decimals: account.decimals,
            balance,
          } as Token;
        }
      });

      const fetchedTokens = await Promise.all(tokenPromises);

      // Sort tokens: known tokens first, then by balance
      const sortedTokens = fetchedTokens.sort((a, b) => {
        const aIsKnown = a.mintAddress in KNOWN_TOKENS;
        const bIsKnown = b.mintAddress in KNOWN_TOKENS;

        if (aIsKnown && !bIsKnown) return -1;
        if (!aIsKnown && bIsKnown) return 1;

        return (b.balance || 0) - (a.balance || 0);
      });
      setTokens(sortedTokens);
      setLastFetchTime(Date.now());
    } catch (err) {
      console.error('Failed to fetch token accounts:', err);
      setError('Failed to fetch token accounts. Please try again.');
      toast({
        title: "Error Loading Tokens",
        description: "Failed to fetch your token accounts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenAccounts();
  }, [publicKey]);

  const refetch = () => {
    fetchTokenAccounts(true);
  };

  return {
    tokens,
    isLoading,
    error,
    refetch,
  };
} 