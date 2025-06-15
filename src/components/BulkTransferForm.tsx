
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DistributionMethod } from '@/types';

interface BulkTransferFormProps {
  totalAmount: number;
  onTotalAmountChange: (amount: number) => void;
  distributionMethod: DistributionMethod;
  onDistributionMethodChange: (method: DistributionMethod) => void;
}

export const BulkTransferForm = ({
  totalAmount,
  onTotalAmountChange,
  distributionMethod,
  onDistributionMethodChange
}: BulkTransferFormProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Distribution Method</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => onDistributionMethodChange(DistributionMethod.EQUAL)}
          className={`p-4 border-2 rounded-xl text-left transition-all ${
            distributionMethod === DistributionMethod.EQUAL
              ? 'border-black bg-black text-white' 
              : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
          }`}
        >
          <div className="font-semibold mb-1">Equal Split</div>
          <div className="text-sm opacity-75">Same amount to everyone</div>
        </button>

        <button
          onClick={() => onDistributionMethodChange(DistributionMethod.MANUAL)}
          className={`p-4 border-2 rounded-xl text-left transition-all ${
            distributionMethod === DistributionMethod.MANUAL
              ? 'border-black bg-black text-white' 
              : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
          }`}
        >
          <div className="font-semibold mb-1">Manual Entry</div>
          <div className="text-sm opacity-75">Custom amounts</div>
        </button>
      </div>

      {distributionMethod === DistributionMethod.EQUAL && (
        <div className="space-y-4">
          <Label htmlFor="totalAmount" className="text-sm font-semibold text-gray-900">
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
              className="h-12 text-base border-gray-300 focus:border-black focus:ring-black pr-16 rounded-xl"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              SOL
            </div>
          </div>
          <p className="text-sm text-gray-600">
            This amount will be split equally among all recipients
          </p>
        </div>
      )}

      {distributionMethod === DistributionMethod.MANUAL && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <p className="font-semibold text-gray-900 mb-1">Manual Entry Mode</p>
          <p className="text-sm text-gray-600">
            You can enter custom amounts for each recipient in the list below
          </p>
        </div>
      )}
    </div>
  );
};
