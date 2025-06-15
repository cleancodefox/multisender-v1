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
