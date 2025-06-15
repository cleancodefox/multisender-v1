
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Recipient {
  address: string;
  amount: number;
  isValid?: boolean;
}

interface TransferSummaryProps {
  recipients: Recipient[];
  validRecipients: Recipient[];
  totalCost: number;
  networkFees: number;
  walletBalance: number;
  isReady: boolean;
  onPreview: () => void;
}

export const TransferSummary = ({
  recipients,
  validRecipients,
  totalCost,
  networkFees,
  walletBalance,
  isReady,
  onPreview
}: TransferSummaryProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Transfer Summary</h2>
      
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
          <span className="font-semibold text-gray-900">{totalCost.toFixed(6)} SOL</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Network fees</span>
          <span className="font-semibold text-gray-900">{networkFees.toFixed(6)} SOL</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">Total cost</span>
            <span className="font-bold text-lg text-gray-900">{(totalCost + networkFees).toFixed(6)} SOL</span>
          </div>
        </div>
      </div>

      {walletBalance < (totalCost + networkFees) && totalCost > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-2 text-red-700 mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-semibold text-sm">Insufficient Balance</span>
          </div>
          <p className="text-sm text-red-600">
            Need {((totalCost + networkFees) - walletBalance).toFixed(6)} more SOL
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
        className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold text-sm mt-6 rounded-xl"
        onClick={onPreview}
        disabled={!isReady}
      >
        Preview Transfer ({validRecipients.length})
      </Button>
    </div>
  );
};
