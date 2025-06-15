
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BulkTransferFormProps {
  totalAmount: number;
  onTotalAmountChange: (amount: number) => void;
  distributionMethod: 'equal' | 'manual';
  onDistributionMethodChange: (method: 'equal' | 'manual') => void;
}

export const BulkTransferForm = ({
  totalAmount,
  onTotalAmountChange,
  distributionMethod,
  onDistributionMethodChange
}: BulkTransferFormProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Distribution Method</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => onDistributionMethodChange('equal')}
          className={`p-4 border-2 rounded-lg text-left transition-all ${
            distributionMethod === 'equal' 
              ? 'border-black bg-black text-white' 
              : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
          }`}
        >
          <div className="font-semibold mb-1">Equal Split</div>
          <div className="text-sm opacity-75">Same amount to everyone</div>
        </button>

        <button
          onClick={() => onDistributionMethodChange('manual')}
          className={`p-4 border-2 rounded-lg text-left transition-all ${
            distributionMethod === 'manual' 
              ? 'border-black bg-black text-white' 
              : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
          }`}
        >
          <div className="font-semibold mb-1">Manual Entry</div>
          <div className="text-sm opacity-75">Custom amounts</div>
        </button>
      </div>

      {distributionMethod === 'equal' && (
        <div className="space-y-3">
          <Label htmlFor="totalAmount" className="text-sm font-medium text-gray-700">
            Total Amount
          </Label>
          <div className="relative">
            <Input
              id="totalAmount"
              type="number"
              step="0.000001"
              min="0"
              placeholder="Enter total amount (e.g., 1000)"
              value={totalAmount || ''}
              onChange={(e) => onTotalAmountChange(Number(e.target.value))}
              className="h-12 text-base border-gray-300 focus:border-black focus:ring-black pr-16 rounded-lg"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
              SOL
            </div>
          </div>
          <p className="text-sm text-gray-500">
            This amount will be split equally among all recipients
          </p>
        </div>
      )}

      {distributionMethod === 'manual' && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="font-medium text-gray-900">Manual Entry Mode</p>
          <p className="text-sm text-gray-600 mt-1">
            You can enter custom amounts for each recipient in the list below
          </p>
        </div>
      )}
    </div>
  );
};
