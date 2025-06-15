
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Upload, Trash2, AlertTriangle, CheckCircle, Users, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Recipient {
  address: string;
  amount: number;
  isValid?: boolean;
}

interface AddressManagerProps {
  recipients: Recipient[];
  onAddRecipient: (address: string, amount?: number) => void;
  onRemoveRecipient: (index: number) => void;
  distributionMethod: 'equal' | 'manual' | 'percentage';
}

export const AddressManager = ({ 
  recipients, 
  onAddRecipient, 
  onRemoveRecipient, 
  distributionMethod 
}: AddressManagerProps) => {
  const [newAddress, setNewAddress] = useState('');
  const [newAmount, setNewAmount] = useState<number>(0);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleAddRecipient = () => {
    if (newAddress.trim()) {
      onAddRecipient(newAddress.trim(), distributionMethod === 'manual' ? newAmount : 1);
      setNewAddress('');
      setNewAmount(0);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      const mockAddresses = [
        '7KvpRXpZ7hxjosYHd3j1sSw6wfU1E7xQF5cyQq7WC9Wf',
        'oPnvCUD3LhMUygUT1gbrdSb9ztNenWd9fhQeDvxhFDW',
        'FSCYWVmQxBv3GvP6XePyKuyVAvTpQr9q45hqqDW2KbRb'
      ];
      const amounts = [1, 2, 1.5];
      mockAddresses.forEach((addr, index) => onAddRecipient(addr, amounts[index]));
    }
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const validRecipients = recipients.filter(r => r.isValid);
  const invalidRecipients = recipients.filter(r => !r.isValid);

  return (
    <Card className="border-0 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-green-600" />
          Recipients Management
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Add wallet addresses and amounts for bulk transfer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
            <TabsTrigger value="manual" className="rounded-lg">Manual Entry</TabsTrigger>
            <TabsTrigger value="csv" className="rounded-lg">CSV Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">Wallet Address</Label>
                <Input
                  id="address"
                  placeholder="7KvpRXpZ7hxjosYHd3j1sSw6wfU1E7xQF5cyQq7WC9Wf"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="font-mono text-sm bg-gray-50 border-gray-200 rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                  Amount {distributionMethod === 'equal' ? '(Auto)' : '(SOL)'}
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.000001"
                  placeholder={distributionMethod === 'equal' ? 'Auto calculated' : '1.5'}
                  value={distributionMethod === 'equal' ? '' : newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                  disabled={distributionMethod === 'equal'}
                  className="bg-gray-50 border-gray-200 rounded-xl"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleAddRecipient}
              disabled={!newAddress.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl h-11"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to List
            </Button>
          </TabsContent>
          
          <TabsContent value="csv" className="space-y-4 mt-4">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Upload CSV File</h3>
                <p className="text-sm text-gray-500">Format: address,amount</p>
                <p className="text-xs text-gray-400 mt-1">
                  Example: 7KvpRXpZ7hxjosYHd3j1sSw6wfU1E7xQF5cyQq7WC9Wf,1.5
                </p>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button asChild className="cursor-pointer bg-gray-900 hover:bg-gray-800 rounded-xl">
                  <span>Choose File</span>
                </Button>
              </label>
              {csvFile && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ {csvFile.name} uploaded successfully
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Validation Alerts */}
        {invalidRecipients.length > 0 && (
          <Alert className="mt-4 bg-red-50 border-red-200 rounded-xl">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {invalidRecipients.length} invalid address(es) detected. Please check and correct them.
            </AlertDescription>
          </Alert>
        )}

        {validRecipients.length > 0 && (
          <Alert className="mt-4 bg-green-50 border-green-200 rounded-xl">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {validRecipients.length} valid addresses ready for transfer
            </AlertDescription>
          </Alert>
        )}

        {/* Recipients Table */}
        {recipients.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-lg">Transfer List</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 rounded-lg">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {validRecipients.length} Valid
                </Badge>
                {invalidRecipients.length > 0 && (
                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {invalidRecipients.length} Invalid
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">#</TableHead>
                    <TableHead className="font-semibold text-gray-900">Wallet Address</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-right">Amount (SOL)</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-center">Status</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipients.map((recipient, index) => (
                    <TableRow key={index} className={recipient.isValid ? 'hover:bg-green-50' : 'hover:bg-red-50'}>
                      <TableCell className="font-medium text-gray-600">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                            {recipient.address.length > 20 
                              ? `${recipient.address.slice(0, 8)}...${recipient.address.slice(-8)}`
                              : recipient.address
                            }
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyAddress(recipient.address)}
                            className="h-6 w-6 p-0 hover:bg-gray-200"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        {recipient.amount.toFixed(6)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant="outline" 
                          className={recipient.isValid 
                            ? "text-green-600 border-green-200 bg-green-50" 
                            : "text-red-600 border-red-200 bg-red-50"
                          }
                        >
                          {recipient.isValid ? 'Valid' : 'Invalid'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveRecipient(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary Row */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Recipients: {recipients.length}</span>
                <span className="font-semibold text-gray-900">
                  Total Amount: {recipients.reduce((sum, r) => sum + r.amount, 0).toFixed(6)} SOL
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
