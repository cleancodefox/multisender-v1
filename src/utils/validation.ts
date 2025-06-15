
import { SOLANA_ADDRESS_REGEX, VALIDATION_RULES } from './constants';

export const validateSolanaAddress = (address: string): boolean => {
  if (!address || typeof address !== 'string') {
    return false;
  }
  
  return (
    address.length >= VALIDATION_RULES.MIN_ADDRESS_LENGTH &&
    address.length <= VALIDATION_RULES.MAX_ADDRESS_LENGTH &&
    SOLANA_ADDRESS_REGEX.test(address)
  );
};

export const validateAmount = (amount: number): boolean => {
  return typeof amount === 'number' && amount >= VALIDATION_RULES.MIN_AMOUNT;
};

export const validateRecipient = (address: string, amount: number): boolean => {
  return validateSolanaAddress(address) && validateAmount(amount);
};
