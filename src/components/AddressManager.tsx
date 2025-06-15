
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Upload, Trash2, AlertTriangle, CheckCircle, Users, Copy, Percent } from 'lucide-react';
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
  const { toast } = useToast();

  const handleAddRecipient = () => {
    if (newAddress.trim()) {
      const amount = distributionMethod === 'equal' ? 1 : newAmount;
      onAddRecipient(newAddress.trim(), amount);
      setNewAddress('');
      setNewAmount(0);
      
      toast({
        title: "✅ Recipient Added",
        description: `Address added successfully`,
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      // Mock CSV processing
      const mockAddresses = [
        '7KvpRXpZ7hxjosYHd3j1sSw6wfU1E7xQF5cyQq7WC9Wf',
        'oPnvCUD3LhMUygUT1gbrdSb9ztNenWd9fhQeDvxhFDW',
        'FSCYWVmQxBv3GvP6XePyKuyVAvTpQr9q45hqqDW2KbRb'
      ];
      const amounts = [1, 2, 1.5];
      mockAddresses.forEach((addr, index) => onAddRecipient(addr, amounts[index]));
      
      toast({
        title: "📋 CSV Imported",
        description: `${mockAddresses.length} addresses imported successfully`,
      });
    }
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "📋 Copied",
      description: "Address copied to clipboard",
    });
  };

  const validRecipients = recipients.filter(r => r.isValid);
  const invalidRecipients = recipients.filter(r => !r.isValid);

  const getAmountLabel = () => {
    switch (distributionMethod) {
      case 'equal': return 'Will be calculated';
      case 'percentage': return 'Percentage (%)';
      default: return 'Amount (SOL)';
    }
  };

  const getAmountPlaceholder = () => {
    switch (distributionMethod) {
      case 'equal': return 'Auto-calculated';
      case 'percentage': return '25';
      default: return '1.5';
    }
  };

  return (
    <Card className="border-0 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="h-6 w-6 text-green-600" />
          Add Recipients
        </CardTitle>
        <CardDescription className="text-gray-600">
          Add wallet addresses for your bulk transfer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1 mb-6">
            <TabsTrigger value="manual" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Manual Entry
            </TabsTrigger>
            <TabsTrigger value="csv" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              CSV Upload
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4 mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-base font-semibold text-gray-900">
                  Wallet Address
                </Label>
                <Input
                  id="address"
                  placeholder="7KvpRXpZ7hxjosYHd3j1sSw6wfU1E7xQF5cyQq7WC9Wf"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="font-mono text-sm h-12 bg-gray-50 border-gray-300 focus:border-blue-500"
                />
              </div>
              
              {distributionMethod !== 'equal' && (
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    {distributionMethod === 'percentage' && <Percent className="h-4 w-4" />}
                    {getAmountLabel()}
                  </Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      step={distributionMethod === 'percentage' ? '1' : '0.000001'}
                      placeholder={getAmountPlaceholder()}
                      value={newAmount || ''}
                      onChange={(e) => setNewAmount(Number(e.target.value))}
                      className="h-12 bg-gray-50 border-gray-300 focus:border-blue-500 pr-12"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      {distributionMethod === 'percentage' ? '%' : 'SOL'}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleAddRecipient}
              disabled={!newAddress.trim() || (distributionMethod !== 'equal' && !newAmount)}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl text-white font-semibold"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Recipient
            </Button>
          </TabsContent>
          
          <TabsContent value="csv" className="space-y-4 mt-0">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center space-y-4 bg-gray-50">
              <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center mx-auto">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Upload CSV File</h3>
                <p className="text-gray-600 mt-1">
                  Format: address,{distributionMethod === 'percentage' ? 'percentage' : 'amount'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Example: 7KvpRXpZ...WC9Wf,{distributionMethod === 'percentage' ? '25' : '1.5'}
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
                <Button asChild className="cursor-pointer h-12 px-8 bg-gray-800 hover:bg-gray-900 rounded-xl">
                  <span>Choose CSV File</span>
                </Button>
              </label>
            </div>
          </TabsContent>
        </Tabs>

        {/* Status Alerts */}
        {invalidRecipients.length > 0 && (
          <Alert className="mt-6 bg-red-50 border-red-200 rounded-xl">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              {invalidRecipients.length} invalid address(es) detected. Please review and correct them.
            </AlertDescription>
          </Alert>
        )}

        {validRecipients.length > 0 && (
          <Alert className="mt-6 bg-green-50 border-green-200 rounded-xl">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800 font-medium">
              {validRecipients.length} addresses ready for transfer
            </AlertDescription>
          </Alert>
        )}

        {/* Recipients Table */}
        {recipients.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-xl">Recipients List</h3>
              <div className="flex gap-3">
                <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50 px-3 py-1 rounded-lg">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {validRecipients.length} Valid
                </Badge>
                {invalidRecipients.length > 0 && (
                  <Badge variant="outline" className="text-red-700 border-red-300 bg-red-50 px-3 py-1 rounded-lg">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {invalidRecipients.length} Invalid
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-bold text-gray-900 py-4">#</TableHead>
                    <TableHead className="font-bold text-gray-900">Wallet Address</TableHead>
                    <TableHead className="font-bold text-gray-900 text-right">
                      {distributionMethod === 'percentage' ? 'Percentage' : 'Amount (SOL)'}
                    </TableHead>
                    <TableHead className="font-bold text-gray-900 text-center">Status</TableHead>
                    <TableHead className="font-bold text-gray-900 text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipients.map((recipient, index) => (
                    <TableRow 
                      key={index} 
                      className={`hover:bg-gray-50 ${recipient.isValid === false ? 'bg-red-50' : ''}`}
                    >
                      <TableCell className="font-semibold text-gray-700 py-4">
                        {index + 1}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <code className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg border">
                            {recipient.address.length > 20 
                              ? `${recipient.address.slice(0, 8)}...${recipient.address.slice(-8)}`
                              : recipient.address
                            }
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyAddress(recipient.address)}
                            className="h-8 w-8 p-0 hover:bg-gray-200 rounded-lg"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-lg py-4">
                        {distributionMethod === 'equal' ? 'Auto' : 
                         distributionMethod === 'percentage' ? `${recipient.amount}%` :
                         recipient.amount.toFixed(6)}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <Badge 
                          variant="outline" 
                          className={recipient.isValid 
                            ? "text-green-700 border-green-300 bg-green-50 px-3 py-1 rounded-lg" 
                            : "text-red-700 border-red-300 bg-red-50 px-3 py-1 rounded-lg"
                          }
                        >
                          {recipient.isValid ? 'Valid' : 'Invalid'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveRecipient(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg h-9 w-9 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Enhanced Summary */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{recipients.length}</div>
                  <div className="text-sm text-gray-600">Total Recipients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{validRecipients.length}</div>
                  <div className="text-sm text-gray-600">Valid Addresses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {distributionMethod === 'equal' ? 'Auto' : recipients.reduce((sum, r) => sum + r.amount, 0).toFixed(6)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {distributionMethod === 'percentage' ? 'Total %' : 'Total Amount'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {(recipients.length * 0.000005).toFixed(6)}
                  </div>
                  <div className="text-sm text-gray-600">Est. Fees (SOL)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
