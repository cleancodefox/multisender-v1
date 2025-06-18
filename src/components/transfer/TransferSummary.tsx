import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { TransferSummaryData, AssetType } from '@/types';

interface TransferSummaryProps extends TransferSummaryData {
  onPreview: () => void;
}

export const TransferSummary = ({
  recipients,
  validRecipients,
  totalCost,
  networkFees,
  walletBalance,
  isReady,
  assetSelection,
  onPreview
}: TransferSummaryProps) => {
  const getAssetSymbol = () => {
    return assetSelection.type === AssetType.SOL 
      ? 'SOL' 
      : assetSelection.token?.symbol || 'TOKEN';
  };

  const getTokenBalance = () => {
    return assetSelection.type === AssetType.SOL 
      ? walletBalance 
      : assetSelection.token?.balance || 0;
  };

  const getInsufficientBalanceMessage = () => {
    if (assetSelection.type === AssetType.SOL) {
      const needed = (totalCost + networkFees) - walletBalance;
      return `Need ${needed.toFixed(6)} more SOL`;
    } else {
      const tokenBalance = assetSelection.token?.balance || 0;
      const tokenNeeded = totalCost - tokenBalance;
      const solNeeded = networkFees - walletBalance;
      
      if (tokenNeeded > 0 && solNeeded > 0) {
        return `Need ${tokenNeeded.toFixed(6)} more ${getAssetSymbol()} and ${solNeeded.toFixed(6)} more SOL for fees`;
      } else if (tokenNeeded > 0) {
        return `Need ${tokenNeeded.toFixed(6)} more ${getAssetSymbol()}`;
      } else if (solNeeded > 0) {
        return `Need ${solNeeded.toFixed(6)} more SOL for fees`;
      }
      return '';
    }
  };

  const hasInsufficientBalance = () => {
    if (assetSelection.type === AssetType.SOL) {
      return walletBalance < (totalCost + networkFees) && totalCost > 0;
    } else {
      const tokenBalance = assetSelection.token?.balance || 0;
      return (tokenBalance < totalCost || walletBalance < networkFees) && totalCost > 0;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Transfer Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Recipients</span>
          <span className="font-semibold text-gray-900">{recipients.length}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Valid addresses</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{validRecipients.length}</span>
            {validRecipients.length > 0 && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Total amount</span>
          <span className="font-semibold text-gray-900">{totalCost.toFixed(6)} {getAssetSymbol()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Network fees</span>
          <span className="font-semibold text-gray-900">{networkFees.toFixed(6)} SOL</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">Total cost</span>
            {assetSelection.type === AssetType.SOL ? (
              <span className="font-bold text-lg text-gray-900">{(totalCost + networkFees).toFixed(6)} SOL</span>
            ) : (
              <div className="text-right">
                <div className="font-bold text-lg text-gray-900">{totalCost.toFixed(6)} {getAssetSymbol()}</div>
                <div className="text-sm text-gray-600">+ {networkFees.toFixed(6)} SOL fees</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {hasInsufficientBalance() && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-2 text-red-700 mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-semibold text-sm">Insufficient Balance</span>
          </div>
          <p className="text-sm text-red-600">
            {getInsufficientBalanceMessage()}
          </p>
        </div>
      )}

      {isReady && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-4 w-4" />
            <span className="font-semibold text-sm">Ready to Send</span>
          </div>
        </div>
      )}

      <Button 
        className="w-full h-10 sm:h-12 bg-black hover:bg-gray-800 text-white font-semibold text-xs sm:text-sm mt-4 sm:mt-6 rounded-xl"
        onClick={onPreview}
        disabled={!isReady}
      >
        Preview Transfer ({validRecipients.length})
      </Button>
    </div>
  );
};
