import { PassType } from '@/types';

export const PASS_PRICES = {
  [PassType.FREE]: 0,
  [PassType.THREE_DAY]: 8.5,
  [PassType.LIFETIME]: 20,
} as const;

export const PASS_FEATURES = {
  [PassType.FREE]: [
    'Pay as you send',
    'No upfront cost', 
    'Perfect for testing',
    'Full functionality'
  ],
  [PassType.THREE_DAY]: [
    'Unlimited transfers for 3 days',
    'No per-recipient fees',
    'Priority support',
    'Campaign analytics'
  ],
  [PassType.LIFETIME]: [
    'Unlimited transfers forever',
    'Zero per-recipient fees',
    'Premium support',
    'Advanced analytics',
    'Beta feature access'
  ]
} as const;

export const PASS_SYMBOLS = {
  [PassType.FREE]: 'FREE',
  [PassType.THREE_DAY]: '3DAY', 
  [PassType.LIFETIME]: 'LIFE'
} as const;

export const getPassDisplayName = (passType: PassType): string => {
  return passType.replace('_', ' ').toUpperCase();
};

export const getPassDuration = (passType: PassType): string => {
  switch (passType) {
    case PassType.FREE:
      return 'Pay per use';
    case PassType.THREE_DAY:
      return '3 Days';
    case PassType.LIFETIME:
      return 'Lifetime';
    default:
      return 'Unknown';
  }
};

export const isPassExpired = (expiryDate?: Date): boolean => {
  if (!expiryDate) return false; // Lifetime passes never expire
  return expiryDate < new Date();
};

export const getDaysUntilExpiry = (expiryDate?: Date): number | null => {
  if (!expiryDate) return null; // Lifetime passes
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}; 