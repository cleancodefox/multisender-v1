
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
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-purple-600" />
          Amount Configuration
        </CardTitle>
        <CardDescription>
          Configure how you want to distribute your tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="token">Token Type</Label>
            <Select defaultValue="SOL">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOL">SOL</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="method">Distribution Method</Label>
            <Select value={distributionMethod} onValueChange={onDistributionMethodChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equal">Equal Split</SelectItem>
                <SelectItem value="manual">Manual Amounts</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {distributionMethod === 'equal' && (
          <div>
            <Label htmlFor="totalAmount">Total Amount to Distribute</Label>
            <Input
              id="totalAmount"
              type="number"
              placeholder="0.0"
              value={totalAmount}
              onChange={(e) => onTotalAmountChange(Number(e.target.value))}
              className="text-lg"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
