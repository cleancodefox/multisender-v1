
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
    <Card className="border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-black">Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup 
          value={distributionMethod} 
          onValueChange={onDistributionMethodChange}
          className="grid grid-cols-2 gap-4"
        >
          <Label htmlFor="equal" className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer has-[:checked]:border-black">
            <RadioGroupItem value="equal" id="equal" />
            <div>
              <p className="font-medium text-black">Equal Split</p>
              <p className="text-sm text-gray-500">Same amount each</p>
            </div>
          </Label>

          <Label htmlFor="manual" className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer has-[:checked]:border-black">
            <RadioGroupItem value="manual" id="manual" />
            <div>
              <p className="font-medium text-black">Manual</p>
              <p className="text-sm text-gray-500">Custom amounts</p>
            </div>
          </Label>
        </RadioGroup>

        {distributionMethod === 'equal' && (
          <div className="space-y-2">
            <Label htmlFor="totalAmount" className="text-sm font-medium text-black">
              Total Amount
            </Label>
            <div className="relative">
              <Input
                id="totalAmount"
                type="number"
                step="0.000001"
                min="0"
                placeholder="0"
                value={totalAmount || ''}
                onChange={(e) => onTotalAmountChange(Number(e.target.value))}
                className="h-11 pr-12 border-gray-200 focus:border-black"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                SOL
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
