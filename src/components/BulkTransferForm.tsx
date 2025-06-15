
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
    <div className="border border-white bg-black p-8">
      <h2 className="text-2xl font-bold mb-8">DISTRIBUTION METHOD</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => onDistributionMethodChange('equal')}
          className={`p-6 border border-white text-left font-bold text-lg transition-colors ${
            distributionMethod === 'equal' 
              ? 'bg-white text-black' 
              : 'bg-black text-white hover:bg-white hover:text-black'
          }`}
        >
          <div className="text-xl font-bold mb-2">EQUAL SPLIT</div>
          <div className="text-sm opacity-70">Same amount to everyone</div>
        </button>

        <button
          onClick={() => onDistributionMethodChange('manual')}
          className={`p-6 border border-white text-left font-bold text-lg transition-colors ${
            distributionMethod === 'manual' 
              ? 'bg-white text-black' 
              : 'bg-black text-white hover:bg-white hover:text-black'
          }`}
        >
          <div className="text-xl font-bold mb-2">MANUAL</div>
          <div className="text-sm opacity-70">Custom amounts</div>
        </button>
      </div>

      {distributionMethod === 'equal' && (
        <div className="space-y-4">
          <Label htmlFor="totalAmount" className="text-xl font-bold">
            TOTAL AMOUNT
          </Label>
          <div className="relative">
            <Input
              id="totalAmount"
              type="number"
              step="0.000001"
              min="0"
              placeholder="1000"
              value={totalAmount || ''}
              onChange={(e) => onTotalAmountChange(Number(e.target.value))}
              className="h-16 text-xl font-bold border border-white bg-black text-white focus:border-white pr-16"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-lg">
              SOL
            </div>
          </div>
          <p className="text-sm opacity-70">
            Will be split equally among all recipients
          </p>
        </div>
      )}

      {distributionMethod === 'manual' && (
        <div className="p-6 border border-white bg-black">
          <p className="font-bold text-xl">MANUAL ENTRY</p>
          <p className="text-sm opacity-70 mt-2">
            Enter custom amounts for each recipient below
          </p>
        </div>
      )}
    </div>
  );
};
