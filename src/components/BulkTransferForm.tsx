
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calculator, DollarSign, Percent, Users } from 'lucide-react';

interface BulkTransferFormProps {
  totalAmount: number;
  onTotalAmountChange: (amount: number) => void;
  distributionMethod: 'equal' | 'manual' | 'percentage';
  onDistributionMethodChange: (method: 'equal' | 'manual' | 'percentage') => void;
}

export const BulkTransferForm = ({
  totalAmount,
  onTotalAmountChange,
  distributionMethod,
  onDistributionMethodChange
}: BulkTransferFormProps) => {
  return (
    <Card className="border-0 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calculator className="h-6 w-6 text-blue-600" />
          Transfer Setup
        </CardTitle>
        <CardDescription className="text-gray-600">
          Choose how you want to distribute tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Distribution Method Selection */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-gray-900">Distribution Method</Label>
          <RadioGroup 
            value={distributionMethod} 
            onValueChange={onDistributionMethodChange}
            className="grid grid-cols-1 gap-3"
          >
            <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
              <RadioGroupItem value="equal" id="equal" />
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <Label htmlFor="equal" className="font-semibold text-gray-900 cursor-pointer">
                    Equal Split
                  </Label>
                  <p className="text-sm text-gray-500">Same amount to everyone</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
              <RadioGroupItem value="manual" id="manual" />
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <Label htmlFor="manual" className="font-semibold text-gray-900 cursor-pointer">
                    Manual Amounts
                  </Label>
                  <p className="text-sm text-gray-500">Set custom amount for each recipient</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
              <RadioGroupItem value="percentage" id="percentage" />
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Percent className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <Label htmlFor="percentage" className="font-semibold text-gray-900 cursor-pointer">
                    Percentage Based
                  </Label>
                  <p className="text-sm text-gray-500">Distribute by percentage shares</p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Total Amount Input - Only show for equal split */}
        {distributionMethod === 'equal' && (
          <div className="space-y-3 p-4 bg-green-50 rounded-xl border border-green-200">
            <Label htmlFor="totalAmount" className="text-base font-semibold text-gray-900">
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
                className="text-lg h-12 pr-16 bg-white border-green-300 focus:border-green-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                SOL
              </div>
            </div>
            <p className="text-sm text-green-700">
              This amount will be split equally among all recipients
            </p>
          </div>
        )}

        {/* Info for other methods */}
        {distributionMethod === 'manual' && (
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-blue-800 font-medium">
              💡 You'll set individual amounts when adding recipients
            </p>
          </div>
        )}

        {distributionMethod === 'percentage' && (
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <p className="text-purple-800 font-medium">
              💡 You'll set percentage shares when adding recipients
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
