export interface Recipient {
  address: string;
  amount: number;
  isValid?: boolean;
}

export interface WalletState {
  isConnected: boolean;
  address: string;
  balance: number;
  publicKey: string | null;
}

export interface TransferState {
  recipients: Recipient[];
  totalAmount: number;
  distributionMethod: DistributionMethod;
  isPreviewMode: boolean;
}

export enum DistributionMethod {
  EQUAL = 'equal',
  MANUAL = 'manual'
}

export enum AssetType {
  SOL = 'sol',
  TOKEN = 'token'
}

export interface Token {
  symbol: string;
  name: string;
  mintAddress: string;
  decimals: number;
  logoURI?: string;
  balance?: number;
}

export interface AssetSelection {
  type: AssetType;
  token?: Token;
}

export enum TransferStatus {
  IDLE = 'idle',
  PREPARING = 'preparing',
  SENDING = 'sending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface TransferSummaryData {
  recipients: Recipient[];
  validRecipients: Recipient[];
  totalCost: number;
  networkFees: number;
  walletBalance: number;
  isReady: boolean;
  assetSelection: AssetSelection;
}

// Platform Pass System Types
export enum PassType {
  FREE = 'free',
  THREE_DAY = 'three_day',
  LIFETIME = 'lifetime'
}

export interface PlatformPass {
  id: string;
  type: PassType;
  walletAddress: string;
  mintAddress: string;
  purchaseDate: Date;
  expiryDate?: Date; // null for lifetime passes
  isActive: boolean;
  transactionSignature: string;
}

export interface PassMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  properties: {
    category: string;
    files: Array<{
      uri: string;
      type: string;
    }>;
  };
}

export interface SubscriptionStatus {
  hasActivePass: boolean;
  passType: PassType | null;
  expiryDate?: Date;
  mintAddress?: string;
  isLoading: boolean;
}

export interface PassPurchaseResult {
  success: boolean;
  mintAddress?: string;
  transactionSignature?: string;
  error?: string;
}
