
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
    <Card className="border-2 border-black bg-white">
      <CardHeader className="border-b border-black pb-4">
        <CardTitle className="text-xl font-bold text-black">
          Distribution Method
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        <RadioGroup 
          value={distributionMethod} 
          onValueChange={onDistributionMethodChange}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <Label htmlFor="equal" className="flex items-center p-6 border-2 border-black bg-white hover:bg-gray-50 cursor-pointer has-[:checked]:bg-black has-[:checked]:text-white font-medium">
            <RadioGroupItem value="equal" id="equal" className="mr-4" />
            <div>
              <p className="font-bold text-lg">Equal Split</p>
              <p className="text-sm opacity-80">Same amount to everyone</p>
            </div>
          </Label>

          <Label htmlFor="manual" className="flex items-center p-6 border-2 border-black bg-white hover:bg-gray-50 cursor-pointer has-[:checked]:bg-black has-[:checked]:text-white font-medium">
            <RadioGroupItem value="manual" id="manual" className="mr-4" />
            <div>
              <p className="font-bold text-lg">Manual</p>
              <p className="text-sm opacity-80">Custom amounts</p>
            </div>
          </Label>
        </RadioGroup>

        {distributionMethod === 'equal' && (
          <div className="space-y-3">
            <Label htmlFor="totalAmount" className="text-lg font-bold text-black">
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
                className="h-14 text-lg font-medium border-2 border-black bg-white focus:border-black pr-16"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-black font-bold">
                SOL
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">
              Will be split equally among all recipients
            </p>
          </div>
        )}

        {distributionMethod === 'manual' && (
          <div className="p-6 border-2 border-black bg-gray-50">
            <p className="font-bold text-lg text-black">Manual Entry</p>
            <p className="text-sm font-medium text-gray-600 mt-1">
              Enter custom amounts for each recipient below
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
