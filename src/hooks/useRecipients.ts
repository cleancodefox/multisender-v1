
import { useState, useCallback, useMemo } from 'react';
import { Recipient, DistributionMethod } from '@/types';
import { validateSolanaAddress } from '@/utils/validation';
import { calculateEqualDistribution } from '@/utils/calculations';
import { useToast } from '@/hooks/use-toast';

export const useRecipients = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [distributionMethod, setDistributionMethod] = useState<DistributionMethod>(DistributionMethod.EQUAL);
  const { toast } = useToast();

  const validRecipients = useMemo(() => 
    recipients.filter(r => r.isValid !== false), 
    [recipients]
  );

  const calculatedRecipients = useMemo(() => {
    if (distributionMethod === DistributionMethod.EQUAL && recipients.length > 0) {
      const amountPerRecipient = calculateEqualDistribution(totalAmount, recipients.length);
      return recipients.map(r => ({ ...r, amount: amountPerRecipient }));
    }
    return recipients;
  }, [recipients, totalAmount, distributionMethod]);

  const addRecipient = useCallback((address: string, amount?: number) => {
    const newRecipient: Recipient = {
      address,
      amount: amount || 0,
      isValid: validateSolanaAddress(address)
    };
    
    setRecipients(prev => [...prev, newRecipient]);
    
    toast({
      title: "Recipient Added",
      description: "The address was successfully added to the list.",
    });
  }, [toast]);

  const updateRecipient = useCallback((index: number, address: string, amount: number) => {
    setRecipients(prev => prev.map((recipient, i) => 
      i === index 
        ? { ...recipient, address, amount, isValid: validateSolanaAddress(address) } 
        : recipient
    ));
  }, []);

  const removeRecipient = useCallback((index: number) => {
    setRecipients(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Recipient Removed",
      variant: "destructive",
    });
  }, [toast]);

  const clearRecipients = useCallback(() => {
    setRecipients([]);
    setTotalAmount(0);
  }, []);

  return {
    recipients,
    validRecipients,
    calculatedRecipients,
    totalAmount,
    distributionMethod,
    addRecipient,
    updateRecipient,
    removeRecipient,
    clearRecipients,
    setTotalAmount,
    setDistributionMethod,
  };
};
