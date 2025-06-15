
import { useState, useMemo } from 'react';
import { TransferStatus, TransferSummaryData, Recipient } from '@/types';
import { calculateNetworkFees, calculateTotalCost, calculateTotalWithFees } from '@/utils/calculations';
import { useToast } from '@/hooks/use-toast';

export const useTransfer = (walletBalance: number) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [transferStatus, setTransferStatus] = useState<TransferStatus>(TransferStatus.IDLE);
  const { toast } = useToast();

  const calculateSummary = (recipients: Recipient[], validRecipients: Recipient[]): TransferSummaryData => {
    const totalCost = calculateTotalCost(recipients);
    const networkFees = calculateNetworkFees(recipients.length);
    const isReady = validRecipients.length > 0 && totalCost > 0 && walletBalance >= calculateTotalWithFees(totalCost, networkFees);

    return {
      recipients,
      validRecipients,
      totalCost,
      networkFees,
      walletBalance,
      isReady,
    };
  };

  const executeTransfer = async (recipients: Recipient[]) => {
    setTransferStatus(TransferStatus.PREPARING);
    
    toast({
      title: "🚀 Transfer Initiated!",
      description: "Your bulk transfer is being sent to the Solana network...",
    });

    // Simulate transfer process
    setTimeout(() => {
      setTransferStatus(TransferStatus.COMPLETED);
      setIsPreviewMode(false);
      
      toast({
        title: "✅ Transfer Complete!",
        description: "Successfully sent to all recipients.",
      });
    }, 3000);
  };

  return {
    isPreviewMode,
    transferStatus,
    setIsPreviewMode,
    setTransferStatus,
    calculateSummary,
    executeTransfer,
  };
};
