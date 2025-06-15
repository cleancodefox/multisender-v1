
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calculator, DollarSign, Users } from 'lucide-react';

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
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-gray-700" />
          Distribution Setup
        </CardTitle>
        <CardDescription className="text-gray-600">
          Choose how to distribute tokens to recipients
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Distribution Method Selection */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-900">Distribution Method</Label>
          <RadioGroup 
            value={distributionMethod} 
            onValueChange={onDistributionMethodChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors has-[:checked]:border-gray-900 has-[:checked]:bg-gray-50">
              <RadioGroupItem value="equal" id="equal" />
              <div className="flex items-center gap-3 flex-1">
                <Users className="h-4 w-4 text-gray-600" />
                <div>
                  <Label htmlFor="equal" className="font-medium text-gray-900 cursor-pointer">
                    Equal Distribution
                  </Label>
                  <p className="text-sm text-gray-500">Same amount to every recipient</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors has-[:checked]:border-gray-900 has-[:checked]:bg-gray-50">
              <RadioGroupItem value="manual" id="manual" />
              <div className="flex items-center gap-3 flex-1">
                <DollarSign className="h-4 w-4 text-gray-600" />
                <div>
                  <Label htmlFor="manual" className="font-medium text-gray-900 cursor-pointer">
                    Manual Amounts
                  </Label>
                  <p className="text-sm text-gray-500">Set custom amount for each recipient</p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Total Amount Input - Only show for equal split */}
        {distributionMethod === 'equal' && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <Label htmlFor="totalAmount" className="text-sm font-medium text-gray-900">
              Total Amount to Distribute
            </Label>
            <div className="relative">
              <Input
                id="totalAmount"
                type="number"
                step="0.000001"
                placeholder="Enter total SOL amount"
                value={totalAmount || ''}
                onChange={(e) => onTotalAmountChange(Number(e.target.value))}
                className="h-10 pr-12 bg-white border-gray-300 focus:border-gray-900"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                SOL
              </div>
            </div>
            <p className="text-sm text-gray-600">
              This amount will be split equally among all recipients
            </p>
          </div>
        )}

        {/* Info for manual method */}
        {distributionMethod === 'manual' && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 font-medium text-sm">Manual Amount Configuration</p>
            <p className="text-blue-700 text-sm mt-1">
              You'll set individual amounts for each recipient below
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
