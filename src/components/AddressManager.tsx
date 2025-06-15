import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Upload, Users, Coins, Trash2, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Recipient {
  address: string;
  amount: number;
  isValid?: boolean;
}

interface AddressManagerProps {
  recipients: Recipient[];
  onAddRecipient: (address: string, amount?: number) => void;
  onUpdateRecipient: (index: number, address: string, amount: number) => void;
  onRemoveRecipient: (index: number) => void;
  distributionMethod: 'equal' | 'manual';
}

export const AddressManager = ({
  recipients,
  onAddRecipient,
  onUpdateRecipient,
  onRemoveRecipient,
  distributionMethod
}: AddressManagerProps) => {
  const [manualAddress, setManualAddress] = useState('');
  const [manualAmount, setManualAmount] = useState<number | ''>('');
  const { toast } = useToast();

  const handleManualAdd = () => {
    if (manualAddress.trim()) {
      const amount = distributionMethod === 'manual' ? (typeof manualAmount === 'number' ? manualAmount : 0) : 0;
      onAddRecipient(manualAddress, amount);
      setManualAddress('');
      setManualAmount('');
      toast({
        title: "Alıcı Eklendi",
        description: "Adres listeye başarıyla eklendi.",
      });
    }
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Adres Kopyalandı",
    });
  };

  const validRecipients = recipients.filter(r => r.isValid);
  const invalidRecipients = recipients.filter(r => r.isValid === false);

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-black">
          <Users className="h-5 w-5 text-gray-400" />
          Alıcıları Yönet
        </CardTitle>
        <CardDescription className="text-gray-500">
          Cüzdan adreslerini manuel olarak, CSV dosyasıyla veya holder snapshot'ları ile ekleyin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="manual">Manuel</TabsTrigger>
            <TabsTrigger value="csv">CSV</TabsTrigger>
            <TabsTrigger value="nft" disabled>NFT Holder</TabsTrigger>
            <TabsTrigger value="token" disabled>Token Holder</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Cüzdan adresini girin..."
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                className="flex-1 h-11 bg-white border-gray-200 focus:border-black rounded-xl"
              />
              {distributionMethod === 'manual' && (
                <Input
                  type="number"
                  step="0.000001"
                  min="0"
                  placeholder="Tutar (SOL)"
                  value={manualAmount}
                  onChange={(e) => setManualAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="sm:w-36 h-11 bg-white border-gray-200 focus:border-black rounded-xl"
                />
              )}
              <Button onClick={handleManualAdd} className="h-11 bg-black hover:bg-gray-800 text-white rounded-xl">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Ekle</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="csv" className="mt-4">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-black transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-black font-medium mb-1">CSV dosyasını sürükleyin veya seçin</p>
              <p className="text-xs text-gray-500">Format: address,amount</p>
            </div>
          </TabsContent>
          
          {/* Tabs for NFT and Token Holders are disabled but styled */}
          <TabsContent value="nft" className="mt-4" />
          <TabsContent value="token" className="mt-4" />
        </Tabs>

        {recipients.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-500 font-medium">{recipients.length} Alıcı</span>
              <div className="flex items-center gap-4">
                {validRecipients.length > 0 && (
                  <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    {validRecipients.length} Geçerli
                  </Badge>
                )}
                {invalidRecipients.length > 0 && (
                  <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                    {invalidRecipients.length} Geçersiz
                  </Badge>
                )}
              </div>
            </div>
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="w-12 text-xs text-gray-500 font-medium">#</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Cüzdan Adresi</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium text-right">Tutar (SOL)</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium text-center w-28">Durum</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipients.map((recipient, index) => (
                    <TableRow key={index} className="hover:bg-gray-50/50">
                      <TableCell className="text-sm text-gray-400">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-sm text-black">
                            {recipient.address.slice(0, 6)}...{recipient.address.slice(-6)}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyAddress(recipient.address)}
                            className="h-7 w-7 p-0 text-gray-400 hover:text-black hover:bg-gray-100"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          step="0.000001"
                          min="0"
                          value={recipient.amount || ''}
                          onChange={(e) => onUpdateRecipient(index, recipient.address, Number(e.target.value))}
                          className="w-32 h-9 text-sm bg-white border-gray-200 focus:border-black rounded-lg ml-auto text-right"
                          disabled={distributionMethod === 'equal'}
                          placeholder="0.00"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {recipient.isValid ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Geçerli
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Geçersiz
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveRecipient(index)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
