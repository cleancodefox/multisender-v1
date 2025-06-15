
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
  const [manualAmount, setManualAmount] = useState<number>(0);
  const { toast } = useToast();

  const handleManualAdd = () => {
    if (manualAddress.trim()) {
      onAddRecipient(manualAddress, distributionMethod === 'manual' ? manualAmount : 0);
      setManualAddress('');
      setManualAmount(0);
    }
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Address copied to clipboard",
    });
  };

  const validRecipients = recipients.filter(r => r.isValid);
  const invalidRecipients = recipients.filter(r => !r.isValid);

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Add Recipients</CardTitle>
        <CardDescription className="text-gray-600">
          Add wallet addresses to receive tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="manual" className="text-xs">Manual Entry</TabsTrigger>
            <TabsTrigger value="csv" className="text-xs">CSV Upload</TabsTrigger>
            <TabsTrigger value="nft" className="text-xs">NFT Holders</TabsTrigger>
            <TabsTrigger value="token" className="text-xs">Token Holders</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Enter wallet address"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                className="flex-1 h-10 bg-white border-gray-300 focus:border-gray-900"
              />
              {distributionMethod === 'manual' && (
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="Amount"
                  value={manualAmount || ''}
                  onChange={(e) => setManualAmount(Number(e.target.value))}
                  className="w-32 h-10 bg-white border-gray-300 focus:border-gray-900"
                />
              )}
              <Button onClick={handleManualAdd} className="h-10 bg-gray-900 hover:bg-gray-800">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="csv" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Drop CSV file here or click to upload</p>
              <p className="text-xs text-gray-500">Format: Address, Amount</p>
              <Button variant="outline" className="mt-3">
                Choose File
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="nft" className="space-y-4">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">NFT Holders</p>
              <p className="text-xs text-gray-500 mb-3">+0.1 SOL - Available with same amount per wallet</p>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Coming Soon</Badge>
            </div>
          </TabsContent>

          <TabsContent value="token" className="space-y-4">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <Coins className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Token Holders</p>
              <p className="text-xs text-gray-500 mb-3">+0.1 SOL - Available with same amount per wallet</p>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Coming Soon</Badge>
            </div>
          </TabsContent>
        </Tabs>

        {/* Recipients Summary */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{recipients.length} Wallets</span>
            <span className="text-red-600">{invalidRecipients.length} Invalid</span>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {validRecipients.length} Valid
          </Badge>
        </div>

        {/* Recipients Table */}
        {recipients.length > 0 && (
          <div className="border border-gray-200 rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-xs text-gray-600 font-medium">#</TableHead>
                  <TableHead className="text-xs text-gray-600 font-medium">Wallet Address</TableHead>
                  <TableHead className="text-xs text-gray-600 font-medium">Amount (SOL)</TableHead>
                  <TableHead className="text-xs text-gray-600 font-medium">Status</TableHead>
                  <TableHead className="text-xs text-gray-600 font-medium w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipients.map((recipient, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="text-sm text-gray-500">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                          {recipient.address.slice(0, 8)}...{recipient.address.slice(-4)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyAddress(recipient.address)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.000001"
                        value={recipient.amount || ''}
                        onChange={(e) => onUpdateRecipient(index, recipient.address, Number(e.target.value))}
                        className="w-24 h-8 text-sm bg-white border-gray-300 focus:border-gray-900"
                        disabled={distributionMethod === 'equal'}
                      />
                    </TableCell>
                    <TableCell>
                      {recipient.isValid ? (
                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Valid
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Invalid
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveRecipient(index)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
