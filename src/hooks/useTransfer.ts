import { useState, useMemo } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { 
  createTransferInstruction, 
  getAssociatedTokenAddress, 
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { TransferStatus, TransferSummaryData, Recipient, AssetSelection, AssetType } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Constants for transaction optimization
const MAX_INSTRUCTIONS_PER_TX = 8; // Reduced to account for commission instructions
const SOL_TRANSFER_FEE = 0.000005; // 5000 lamports per signature
const TOKEN_TRANSFER_FEE = 0.000005; // Same base fee for token transfers
const ATA_CREATION_FEE = 0.00203928; // Rent for creating Associated Token Account
const COMMISSION_PER_RECIPIENT = 0.0001; // Commission fee per recipient in SOL
const COMMISSION_WALLET = "BGuTS2LvaN3RQcsfffx5rMTPynNrN9bPK5Sjks6imipE"; // Commission wallet address

interface TransferProgress {
  current: number;
  total: number;
  completed: string[];
  failed: string[];
  currentBatch: number;
  totalBatches: number;
}

export const useTransfer = (walletBalance: number) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [transferStatus, setTransferStatus] = useState<TransferStatus>(TransferStatus.IDLE);
  const [transferProgress, setTransferProgress] = useState<TransferProgress | null>(null);
  const { toast } = useToast();
  const { publicKey, signAllTransactions } = useWallet();
  const { connection } = useConnection();

  const calculateNetworkFees = (recipientCount: number, assetSelection: AssetSelection): number => {
    const commissionFees = recipientCount * COMMISSION_PER_RECIPIENT;
    // Add potential commission wallet funding (worst case: 0.001 SOL + rent-exempt amount ~0.00089 SOL)
    const commissionWalletFunding = 0.002; // Conservative estimate for commission wallet funding
    
    if (assetSelection.type === AssetType.SOL) {
      // SOL transfers: base fee per transaction + commission + potential wallet funding
      const transactionCount = Math.ceil(recipientCount / MAX_INSTRUCTIONS_PER_TX);
      return transactionCount * SOL_TRANSFER_FEE + commissionFees + commissionWalletFunding;
    } else {
      // Token transfers: base fee + potential ATA creation fees + commission + potential wallet funding
      const transactionCount = Math.ceil(recipientCount / MAX_INSTRUCTIONS_PER_TX);
      const baseFees = transactionCount * TOKEN_TRANSFER_FEE;
      // Estimate ATA creation fees (assume 20% of recipients need new ATAs)
      const estimatedATACreations = Math.ceil(recipientCount * 0.2);
      return baseFees + (estimatedATACreations * ATA_CREATION_FEE) + commissionFees + commissionWalletFunding;
    }
  };

  const calculateTotalCost = (recipients: Recipient[]): number => {
    return recipients.reduce((total, recipient) => total + (recipient.amount || 0), 0);
  };

  const calculateSummary = (
    recipients: Recipient[], 
    validRecipients: Recipient[], 
    assetSelection: AssetSelection
  ): TransferSummaryData => {
    const totalCost = calculateTotalCost(validRecipients);
    const networkFees = calculateNetworkFees(validRecipients.length, assetSelection);
    
    // For SOL transfers, check if wallet has enough SOL including fees
    // For token transfers, check if wallet has enough tokens (fees paid in SOL separately)
    let isReady = false;
    if (assetSelection.type === AssetType.SOL) {
      isReady = validRecipients.length > 0 && totalCost > 0 && walletBalance >= (totalCost + networkFees);
    } else {
      const tokenBalance = assetSelection.token?.balance || 0;
      isReady = validRecipients.length > 0 && totalCost > 0 && 
                tokenBalance >= totalCost && walletBalance >= networkFees;
    }

    return {
      recipients,
      validRecipients,
      totalCost,
      networkFees,
      walletBalance,
      isReady,
      assetSelection,
    };
  };

  const createSOLTransferInstructions = async (recipients: Recipient[], fromPubkey: PublicKey) => {
    const instructions = [];
    const commissionWallet = new PublicKey(COMMISSION_WALLET);
    
    // Check if commission wallet needs rent-exempt funding
    try {
      const commissionAccountInfo = await connection.getAccountInfo(commissionWallet);
      const minRentExempt = await connection.getMinimumBalanceForRentExemption(0);
      
      if (!commissionAccountInfo || commissionAccountInfo.lamports < minRentExempt) {
        // Fund commission wallet with minimum rent-exempt amount
        const fundingAmount = minRentExempt + 1000000; // Add 0.001 SOL buffer
        const fundingInstruction = SystemProgram.transfer({
          fromPubkey,
          toPubkey: commissionWallet,
          lamports: fundingAmount,
        });
        instructions.push(fundingInstruction);
      }
    } catch (error) {
      console.warn('Failed to check commission wallet balance:', error);
      // Add funding instruction as fallback
      const minRentExempt = await connection.getMinimumBalanceForRentExemption(0);
      const fundingAmount = minRentExempt + 1000000;
      const fundingInstruction = SystemProgram.transfer({
        fromPubkey,
        toPubkey: commissionWallet,
        lamports: fundingAmount,
      });
      instructions.push(fundingInstruction);
    }
    
    recipients.forEach(recipient => {
      // Main transfer to recipient
      const toPubkey = new PublicKey(recipient.address);
      const lamports = Math.floor((recipient.amount || 0) * LAMPORTS_PER_SOL);
      
      const transferInstruction = SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports,
      });
      instructions.push(transferInstruction);
      
      // Commission transfer
      const commissionLamports = Math.floor(COMMISSION_PER_RECIPIENT * LAMPORTS_PER_SOL);
      console.log('commissionLamports', commissionLamports);
      const commissionInstruction = SystemProgram.transfer({
        fromPubkey,
        toPubkey: commissionWallet,
        lamports: commissionLamports,
      });
      instructions.push(commissionInstruction);
    });
    
    return instructions;
  };

  const createTokenTransferInstructions = async (
    recipients: Recipient[], 
    fromPubkey: PublicKey, 
    mintAddress: string,
    decimals: number
  ) => {
    const mint = new PublicKey(mintAddress);
    const fromTokenAccount = await getAssociatedTokenAddress(mint, fromPubkey);
    const commissionWallet = new PublicKey(COMMISSION_WALLET);
    const instructions = [];

    // Check if commission wallet needs rent-exempt funding
    try {
      const commissionAccountInfo = await connection.getAccountInfo(commissionWallet);
      const minRentExempt = await connection.getMinimumBalanceForRentExemption(0);
      
      if (!commissionAccountInfo || commissionAccountInfo.lamports < minRentExempt) {
        // Fund commission wallet with minimum rent-exempt amount
        const fundingAmount = minRentExempt + 1000000; // Add 0.001 SOL buffer
        const fundingInstruction = SystemProgram.transfer({
          fromPubkey,
          toPubkey: commissionWallet,
          lamports: fundingAmount,
        });
        instructions.push(fundingInstruction);
      }
    } catch (error) {
      console.warn('Failed to check commission wallet balance:', error);
      // Add funding instruction as fallback
      const minRentExempt = await connection.getMinimumBalanceForRentExemption(0);
      const fundingAmount = minRentExempt + 1000000;
      const fundingInstruction = SystemProgram.transfer({
        fromPubkey,
        toPubkey: commissionWallet,
        lamports: fundingAmount,
      });
      instructions.push(fundingInstruction);
    }

    for (const recipient of recipients) {
      const toPubkey = new PublicKey(recipient.address);
      const toTokenAccount = await getAssociatedTokenAddress(mint, toPubkey);
      
      // Check if recipient's ATA exists
      try {
        const accountInfo = await connection.getAccountInfo(toTokenAccount);
        if (!accountInfo) {
          // Create ATA instruction
          const createATAInstruction = createAssociatedTokenAccountInstruction(
            fromPubkey, // payer
            toTokenAccount, // ata
            toPubkey, // owner
            mint // mint
          );
          instructions.push(createATAInstruction);
        }
      } catch (error) {
        console.warn(`Failed to check ATA for ${recipient.address}:`, error);
        // Add ATA creation instruction as fallback
        const createATAInstruction = createAssociatedTokenAccountInstruction(
          fromPubkey,
          toTokenAccount,
          toPubkey,
          mint
        );
        instructions.push(createATAInstruction);
      }

      // Create token transfer instruction
      const amount = Math.floor((recipient.amount || 0) * Math.pow(10, decimals));
      const transferInstruction = createTransferInstruction(
        fromTokenAccount,
        toTokenAccount,
        fromPubkey,
        amount
      );
      instructions.push(transferInstruction);
      
      // Add commission transfer (in SOL)
      const commissionLamports = Math.floor(COMMISSION_PER_RECIPIENT * LAMPORTS_PER_SOL);
      console.log('commissionLamports', commissionLamports);
      const commissionInstruction = SystemProgram.transfer({
        fromPubkey,
        toPubkey: commissionWallet,
        lamports: commissionLamports,
      });
      instructions.push(commissionInstruction);
    }

    return instructions;
  };

  const createTransactionBatches = (instructions: any[], maxInstructionsPerTx: number) => {
    const batches = [];
    for (let i = 0; i < instructions.length; i += maxInstructionsPerTx) {
      batches.push(instructions.slice(i, i + maxInstructionsPerTx));
    }
    return batches;
  };

  const executeTransfer = async (recipients: Recipient[], assetSelection: AssetSelection) => {
    if (!publicKey || !signAllTransactions) {
      toast({
        title: "❌ Wallet Not Connected",
        description: "Please connect your wallet to proceed with the transfer.",
        variant: "destructive",
      });
      return;
    }

    const validRecipients = recipients.filter(r => r.isValid && r.amount && r.amount > 0);
    if (validRecipients.length === 0) {
      toast({
        title: "❌ No Valid Recipients",
        description: "Please add valid recipients with amounts greater than 0.",
        variant: "destructive",
      });
      return;
    }

    setTransferStatus(TransferStatus.PREPARING);
    setTransferProgress({
      current: 0,
      total: validRecipients.length,
      completed: [],
      failed: [],
      currentBatch: 0,
      totalBatches: 0
    });

    try {
      toast({
        title: "🚀 Preparing Transfer",
        description: "Creating transaction instructions...",
      });

      let instructions;
      if (assetSelection.type === AssetType.SOL) {
        instructions = await createSOLTransferInstructions(validRecipients, publicKey);
      } else {
        if (!assetSelection.token) {
          throw new Error("No token selected for transfer");
        }
        instructions = await createTokenTransferInstructions(
          validRecipients,
          publicKey,
          assetSelection.token.mintAddress,
          assetSelection.token.decimals
        );
      }

      // Create transaction batches
      const batches = createTransactionBatches(instructions, MAX_INSTRUCTIONS_PER_TX);
      
      setTransferProgress(prev => prev ? {
        ...prev,
        totalBatches: batches.length
      } : null);

      toast({
        title: "📝 Signing Transactions",
        description: `Preparing ${batches.length} transaction${batches.length > 1 ? 's' : ''} for signing...`,
      });

      // Create transactions
      const transactions: Transaction[] = [];
      for (const batch of batches) {
        const transaction = new Transaction();
        batch.forEach(instruction => transaction.add(instruction));
        
        // Get recent blockhash
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey;
        
        transactions.push(transaction);
      }

      setTransferStatus(TransferStatus.SENDING);

      // Sign all transactions
      const signedTransactions = await signAllTransactions(transactions);

      toast({
        title: "📡 Sending to Blockchain",
        description: "Broadcasting transactions to Solana network...",
      });

      // Send transactions sequentially with progress updates
      const completed: string[] = [];
      const failed: string[] = [];
      
      for (let i = 0; i < signedTransactions.length; i++) {
        const transaction = signedTransactions[i];
        
        setTransferProgress(prev => prev ? {
          ...prev,
          currentBatch: i + 1
        } : null);

        try {
          const signature = await connection.sendRawTransaction(transaction.serialize(), {
            skipPreflight: false,
            preflightCommitment: 'confirmed',
          });

          // Wait for confirmation
          const confirmation = await connection.confirmTransaction(signature, 'confirmed');
          
          if (confirmation.value.err) {
            throw new Error(`Transaction failed: ${confirmation.value.err}`);
          }

          // Calculate which recipients were in this batch
          const batchStart = i * MAX_INSTRUCTIONS_PER_TX;
          const batchEnd = Math.min(batchStart + MAX_INSTRUCTIONS_PER_TX, validRecipients.length);
          const batchRecipients = validRecipients.slice(batchStart, batchEnd);
          
          batchRecipients.forEach(recipient => completed.push(recipient.address));
          
          setTransferProgress(prev => prev ? {
            ...prev,
            current: completed.length,
            completed: [...completed]
          } : null);

          toast({
            title: `✅ Batch ${i + 1}/${batches.length} Complete`,
            description: `Transaction confirmed: ${signature.slice(0, 8)}...`,
          });

        } catch (error) {
          console.error(`Batch ${i + 1} failed:`, error);
          
          // Mark recipients in this batch as failed
          const batchStart = i * MAX_INSTRUCTIONS_PER_TX;
          const batchEnd = Math.min(batchStart + MAX_INSTRUCTIONS_PER_TX, validRecipients.length);
          const batchRecipients = validRecipients.slice(batchStart, batchEnd);
          
          batchRecipients.forEach(recipient => failed.push(recipient.address));
          
          setTransferProgress(prev => prev ? {
            ...prev,
            failed: [...failed]
          } : null);

          toast({
            title: `❌ Batch ${i + 1} Failed`,
            description: error instanceof Error ? error.message : "Transaction failed",
            variant: "destructive",
          });
        }
      }

      // Final status
      if (failed.length === 0) {
        setTransferStatus(TransferStatus.COMPLETED);
        toast({
          title: "🎉 All Transfers Complete!",
          description: `Successfully sent ${assetSelection.type === AssetType.SOL ? 'SOL' : assetSelection.token?.symbol} to ${completed.length} recipients.`,
        });
      } else {
        setTransferStatus(TransferStatus.FAILED);
        toast({
          title: "⚠️ Transfer Partially Complete",
          description: `${completed.length} succeeded, ${failed.length} failed. Check transaction details.`,
          variant: "destructive",
        });
      }

      setIsPreviewMode(false);

    } catch (error) {
      console.error('Transfer failed:', error);
      setTransferStatus(TransferStatus.FAILED);
      
      toast({
        title: "❌ Transfer Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return {
    isPreviewMode,
    transferStatus,
    transferProgress,
    setIsPreviewMode,
    setTransferStatus,
    calculateSummary,
    executeTransfer,
    calculateNetworkFees,
  };
};
