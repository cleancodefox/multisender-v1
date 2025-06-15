
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator } from 'lucide-react';

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
    <Card className="border-0 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-green-600" />
          Configuration
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Set up your transfer preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="token" className="text-sm font-medium text-gray-700">Token</Label>
            <Select defaultValue="SOL">
              <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-100 rounded-xl">
                <SelectItem value="SOL">SOL</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="method" className="text-sm font-medium text-gray-700">Distribution</Label>
            <Select value={distributionMethod} onValueChange={onDistributionMethodChange}>
              <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-100 rounded-xl">
                <SelectItem value="equal">Equal Split</SelectItem>
                <SelectItem value="manual">Manual Amounts</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {distributionMethod === 'equal' && (
          <div className="space-y-2">
            <Label htmlFor="totalAmount" className="text-sm font-medium text-gray-700">Total Amount</Label>
            <Input
              id="totalAmount"
              type="number"
              placeholder="0.0"
              value={totalAmount}
              onChange={(e) => onTotalAmountChange(Number(e.target.value))}
              className="bg-gray-50 border-gray-200 rounded-xl text-lg h-12"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
