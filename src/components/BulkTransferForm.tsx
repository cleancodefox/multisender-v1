
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-black">
          <Calculator className="h-5 w-5 text-gray-400" />
          Dağıtım Ayarları
        </CardTitle>
        <CardDescription className="text-gray-500">
          Tokenların alıcılara nasıl dağıtılacağını seçin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-black">Dağıtım Yöntemi</Label>
          <RadioGroup 
            value={distributionMethod} 
            onValueChange={onDistributionMethodChange}
            className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <Label htmlFor="equal" className="flex flex-col items-start space-x-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors has-[:checked]:border-black has-[:checked]:ring-2 has-[:checked]:ring-black has-[:checked]:ring-offset-2 cursor-pointer">
              <div className="flex items-center gap-3 w-full">
                <RadioGroupItem value="equal" id="equal" />
                <div className="flex items-center gap-3 flex-1">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-black">
                      Eşit Dağıtım
                    </p>
                    <p className="text-sm text-gray-500">Tüm alıcılara eşit tutar</p>
                  </div>
                </div>
              </div>
            </Label>

            <Label htmlFor="manual" className="flex flex-col items-start space-x-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors has-[:checked]:border-black has-[:checked]:ring-2 has-[:checked]:ring-black has-[:checked]:ring-offset-2 cursor-pointer">
              <div className="flex items-center gap-3 w-full">
                <RadioGroupItem value="manual" id="manual" />
                <div className="flex items-center gap-3 flex-1">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-black">
                      Manuel Tutar
                    </p>
                    <p className="text-sm text-gray-500">Her alıcı için özel tutar</p>
                  </div>
                </div>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {distributionMethod === 'equal' && (
          <div className="space-y-2 !mt-4">
            <Label htmlFor="totalAmount" className="text-sm font-medium text-black">
              Dağıtılacak Toplam Tutar
            </Label>
            <div className="relative">
              <Input
                id="totalAmount"
                type="number"
                step="0.000001"
                min="0"
                placeholder="Örn: 1000"
                value={totalAmount || ''}
                onChange={(e) => onTotalAmountChange(Number(e.target.value))}
                className="h-11 pr-12 bg-white border-gray-200 focus:border-black rounded-xl"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                SOL
              </div>
            </div>
            <p className="text-xs text-gray-500 pt-1">
              Bu tutar tüm alıcılar arasında eşit olarak paylaştırılacaktır.
            </p>
          </div>
        )}

        {distributionMethod === 'manual' && (
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 !mt-4">
            <p className="text-black font-medium text-sm">Manuel Tutar Girişi</p>
            <p className="text-gray-600 text-sm mt-1">
              Her alıcı için özel tutarları aşağıdaki listeden gireceksiniz.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
