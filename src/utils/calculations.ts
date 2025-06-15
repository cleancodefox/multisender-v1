
import { Recipient } from '@/types';
import { NETWORK_FEE_PER_TRANSFER, SOL_PRICE_USD } from './constants';

export const calculateNetworkFees = (recipientCount: number): number => {
  return recipientCount * NETWORK_FEE_PER_TRANSFER;
};

export const calculateTotalCost = (recipients: Recipient[]): number => {
  return recipients.reduce((sum, recipient) => sum + (recipient.amount || 0), 0);
};

export const calculateEqualDistribution = (
  totalAmount: number, 
  recipientCount: number
): number => {
  if (recipientCount === 0 || totalAmount <= 0) return 0;
  return totalAmount / recipientCount;
};

export const formatSolAmount = (amount: number, decimals: number = 6): string => {
  return amount.toFixed(decimals);
};

export const formatUsdAmount = (solAmount: number): string => {
  return (solAmount * SOL_PRICE_USD).toFixed(2);
};

export const calculateTotalWithFees = (totalCost: number, networkFees: number): number => {
  return totalCost + networkFees;
};
