
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calculator, DollarSign, Users, Zap } from 'lucide-react';

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
    <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          Distribution Setup
        </CardTitle>
        <CardDescription className="text-slate-600 text-base">
          Choose how you want to distribute tokens to recipients
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Distribution Method Selection */}
        <div className="space-y-6">
          <Label className="text-lg font-semibold text-slate-900">Distribution Method</Label>
          <RadioGroup 
            value={distributionMethod} 
            onValueChange={onDistributionMethodChange}
            className="grid grid-cols-1 gap-4"
          >
            <div className="group relative">
              <div className="flex items-center space-x-4 p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-400 transition-all duration-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:shadow-lg cursor-pointer">
                <RadioGroupItem value="equal" id="equal" className="text-blue-600" />
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <Label htmlFor="equal" className="font-semibold text-slate-900 cursor-pointer text-lg">
                      Equal Distribution
                    </Label>
                    <p className="text-slate-500 mt-1">Same amount to every recipient</p>
                  </div>
                </div>
                <div className="text-green-600 font-medium bg-green-100 px-3 py-1 rounded-lg text-sm">
                  Recommended
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="flex items-center space-x-4 p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-400 transition-all duration-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:shadow-lg cursor-pointer">
                <RadioGroupItem value="manual" id="manual" className="text-blue-600" />
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <Label htmlFor="manual" className="font-semibold text-slate-900 cursor-pointer text-lg">
                      Manual Amounts
                    </Label>
                    <p className="text-slate-500 mt-1">Set custom amount for each recipient</p>
                  </div>
                </div>
                <div className="text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-lg text-sm">
                  Flexible
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Total Amount Input - Only show for equal split */}
        {distributionMethod === 'equal' && (
          <div className="space-y-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <Label htmlFor="totalAmount" className="text-lg font-semibold text-slate-900">
                Total Amount to Distribute
              </Label>
            </div>
            <div className="relative">
              <Input
                id="totalAmount"
                type="number"
                step="0.000001"
                placeholder="Enter total SOL amount"
                value={totalAmount || ''}
                onChange={(e) => onTotalAmountChange(Number(e.target.value))}
                className="text-xl h-14 pr-20 bg-white border-green-300 focus:border-green-500 rounded-xl shadow-sm"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-lg">
                SOL
              </div>
            </div>
            <p className="text-green-700 font-medium">
              💡 This amount will be split equally among all recipients
            </p>
          </div>
        )}

        {/* Info for manual method */}
        {distributionMethod === 'manual' && (
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <p className="text-blue-800 font-semibold text-lg">Manual Amount Configuration</p>
            </div>
            <p className="text-blue-700">
              You'll set individual amounts for each recipient in the next step
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
