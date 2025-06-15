
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="border-b border-gray-800 pb-4">
        <CardTitle className="text-xl font-bold text-white">
          Distribution Method
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        <RadioGroup 
          value={distributionMethod} 
          onValueChange={onDistributionMethodChange}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <Label htmlFor="equal" className="flex items-center p-6 bg-gray-800 border border-gray-700 hover:bg-gray-700 cursor-pointer has-[:checked]:bg-white has-[:checked]:text-black font-medium text-white">
            <RadioGroupItem value="equal" id="equal" className="mr-4" />
            <div>
              <p className="font-bold text-lg">Equal Split</p>
              <p className="text-sm opacity-80">Same amount to everyone</p>
            </div>
          </Label>

          <Label htmlFor="manual" className="flex items-center p-6 bg-gray-800 border border-gray-700 hover:bg-gray-700 cursor-pointer has-[:checked]:bg-white has-[:checked]:text-black font-medium text-white">
            <RadioGroupItem value="manual" id="manual" className="mr-4" />
            <div>
              <p className="font-bold text-lg">Manual</p>
              <p className="text-sm opacity-80">Custom amounts</p>
            </div>
          </Label>
        </RadioGroup>

        {distributionMethod === 'equal' && (
          <div className="space-y-3">
            <Label htmlFor="totalAmount" className="text-lg font-bold text-white">
              Total Amount
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
                className="h-14 text-lg font-medium bg-gray-800 border-gray-700 text-white focus:border-gray-600 pr-16"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white font-bold">
                SOL
              </div>
            </div>
            <p className="text-sm font-medium text-gray-400">
              Will be split equally among all recipients
            </p>
          </div>
        )}

        {distributionMethod === 'manual' && (
          <div className="p-6 bg-gray-800 border border-gray-700">
            <p className="font-bold text-lg text-white">Manual Entry</p>
            <p className="text-sm font-medium text-gray-400 mt-1">
              Enter custom amounts for each recipient below
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
