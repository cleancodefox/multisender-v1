
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Upload, Trash2, AlertTriangle, CheckCircle, Users, Copy, Image, Coins, Edit, Check, X } from 'lucide-react';
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
  const [newAddress, setNewAddress] = useState('');
  const [newAmount, setNewAmount] = useState<number>(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editAddress, setEditAddress] = useState('');
  const [editAmount, setEditAmount] = useState<number>(0);
  const { toast } = useToast();

  console.log('AddressManager rendered with recipients:', recipients);

  const handleAddRecipient = () => {
    console.log('Adding recipient:', newAddress, newAmount);
    if (newAddress.trim()) {
      const amount = distributionMethod === 'equal' ? 0 : newAmount;
      onAddRecipient(newAddress.trim(), amount);
      setNewAddress('');
      setNewAmount(0);
      
      toast({
        title: "✅ Recipient Added",
        description: `Address added successfully`,
      });
    }
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditAddress(recipients[index].address);
    setEditAmount(recipients[index].amount);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      onUpdateRecipient(editingIndex, editAddress, editAmount);
      setEditingIndex(null);
      toast({
        title: "✅ Updated",
        description: "Recipient updated successfully",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      // Mock CSV processing
      const mockAddresses = [
        { address: '7KvpRXpZ7hxjosYHd3j1sSw6wfU1E7xQF5cyQq7WC9Wf', amount: 1 },
        { address: 'oPnvCUD3LhMUygUT1gbrdSb9ztNenWd9fhQeDvxhFDW', amount: 2 },
        { address: 'FSCYWVmQxBv3GvP6XePyKuyVAvTpQr9q45hqqDW2KbRb', amount: 1.5 }
      ];
      mockAddresses.forEach(({ address, amount }) => onAddRecipient(address, amount));
      
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

  const validateSolanaAddress = (address: string): boolean => {
    return address.length >= 32 && address.length <= 44 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(address);
  };

  const validRecipients = recipients.filter(r => r.isValid);
  const invalidRecipients = recipients.filter(r => !r.isValid);

  return (
    <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          Add Recipients
        </CardTitle>
        <CardDescription className="text-slate-600 text-base">
          Choose how you want to add wallet addresses for your bulk transfer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 rounded-2xl p-1 mb-8 h-14">
            <TabsTrigger value="manual" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md text-sm font-medium">
              Manual Entry
            </TabsTrigger>
            <TabsTrigger value="csv" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md text-sm font-medium">
              CSV Upload
            </TabsTrigger>
            <TabsTrigger value="nft" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md text-sm font-medium">
              NFT Holders
            </TabsTrigger>
            <TabsTrigger value="token" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md text-sm font-medium">
              Token Holders
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-6 mt-0">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="address" className="text-lg font-semibold text-slate-900">
                  Wallet Address
                </Label>
                <Input
                  id="address"
                  placeholder="7KvpRXpZ7hxjosYHd3j1sSw6wfU1E7xQF5cyQq7WC9Wf"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="font-mono text-sm h-14 bg-slate-50 border-slate-300 focus:border-blue-500 rounded-xl"
                />
              </div>
              
              {distributionMethod === 'manual' && (
                <div className="space-y-3">
                  <Label htmlFor="amount" className="text-lg font-semibold text-slate-900">
                    Amount (SOL)
                  </Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      step="0.000001"
                      placeholder="1.5"
                      value={newAmount || ''}
                      onChange={(e) => setNewAmount(Number(e.target.value))}
                      className="h-14 bg-slate-50 border-slate-300 focus:border-blue-500 pr-16 rounded-xl text-lg"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                      SOL
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleAddRecipient}
              disabled={!newAddress.trim() || (distributionMethod === 'manual' && !newAmount)}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-3" />
              Add Recipient
            </Button>
          </TabsContent>
          
          <TabsContent value="csv" className="space-y-6 mt-0">
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center space-y-6 bg-slate-50/50">
              <div className="w-20 h-20 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto">
                <Upload className="h-10 w-10 text-slate-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-xl mb-2">Upload CSV File</h3>
                <p className="text-slate-600 text-lg">
                  Format: address, amount
                </p>
                <p className="text-sm text-slate-500 mt-3 font-mono bg-white px-4 py-2 rounded-lg inline-block">
                  7KvpRXpZ...WC9Wf, 1.5
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
                <Button asChild className="cursor-pointer h-14 px-8 bg-slate-800 hover:bg-slate-900 rounded-xl text-lg">
                  <span>Choose CSV File</span>
                </Button>
              </label>
            </div>
          </TabsContent>

          <TabsContent value="nft" className="space-y-6 mt-0">
            <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Image className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-2">NFT Holders</h3>
              <p className="text-slate-600 mb-4">Available with same amount per wallet</p>
              <Badge className="mb-4 bg-purple-100 text-purple-800 px-4 py-2 text-sm">+0.1 SOL</Badge>
              <p className="text-sm text-slate-500">Coming Soon - Select NFT collection to auto-fetch all holders</p>
            </div>
          </TabsContent>

          <TabsContent value="token" className="space-y-6 mt-0">
            <div className="p-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Coins className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-2">Token Holders</h3>
              <p className="text-slate-600 mb-4">Available with same amount per wallet</p>
              <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2 text-sm">+0.1 SOL</Badge>
              <p className="text-sm text-slate-500">Coming Soon - Select token to auto-fetch all holders</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Status Alerts */}
        {invalidRecipients.length > 0 && (
          <Alert className="mt-8 bg-red-50 border-red-200 rounded-2xl">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800 font-medium text-base">
              {invalidRecipients.length} invalid address(es) detected. Please review and correct them.
            </AlertDescription>
          </Alert>
        )}

        {validRecipients.length > 0 && (
          <Alert className="mt-8 bg-green-50 border-green-200 rounded-2xl">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800 font-medium text-base">
              {validRecipients.length} addresses ready for transfer
            </AlertDescription>
          </Alert>
        )}

        {/* Recipients Table */}
        {recipients.length > 0 && (
          <div className="mt-10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-2xl">Recipients List</h3>
              <div className="flex gap-4">
                <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50 px-4 py-2 rounded-xl text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {validRecipients.length} Valid
                </Badge>
                {invalidRecipients.length > 0 && (
                  <Badge variant="outline" className="text-red-700 border-red-300 bg-red-50 px-4 py-2 rounded-xl text-sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    {invalidRecipients.length} Invalid
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                    <TableHead className="font-bold text-slate-900 py-6 text-base">#</TableHead>
                    <TableHead className="font-bold text-slate-900 text-base">Wallet Address</TableHead>
                    <TableHead className="font-bold text-slate-900 text-right text-base">Amount (SOL)</TableHead>
                    <TableHead className="font-bold text-slate-900 text-center text-base">Status</TableHead>
                    <TableHead className="font-bold text-slate-900 text-center text-base">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipients.map((recipient, index) => (
                    <TableRow 
                      key={index} 
                      className={`hover:bg-slate-50 border-b border-slate-100 ${recipient.isValid === false ? 'bg-red-50/50' : ''}`}
                    >
                      <TableCell className="font-bold text-slate-700 py-6 text-lg">
                        {index + 1}
                      </TableCell>
                      <TableCell className="py-6">
                        {editingIndex === index ? (
                          <Input
                            value={editAddress}
                            onChange={(e) => setEditAddress(e.target.value)}
                            className="font-mono text-sm border-blue-300 focus:border-blue-500"
                          />
                        ) : (
                          <div className="flex items-center gap-3">
                            <code className="font-mono text-sm bg-slate-100 px-4 py-3 rounded-xl border font-medium">
                              {recipient.address.length > 20 
                                ? `${recipient.address.slice(0, 8)}...${recipient.address.slice(-8)}`
                                : recipient.address
                              }
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyAddress(recipient.address)}
                              className="h-9 w-9 p-0 hover:bg-slate-200 rounded-xl"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right py-6">
                        {editingIndex === index && distributionMethod === 'manual' ? (
                          <div className="flex justify-end">
                            <Input
                              type="number"
                              step="0.000001"
                              value={editAmount}
                              onChange={(e) => setEditAmount(Number(e.target.value))}
                              className="w-32 text-right border-blue-300 focus:border-blue-500"
                            />
                          </div>
                        ) : (
                          <span className="font-mono font-bold text-lg">
                            {distributionMethod === 'equal' ? 'Auto' : recipient.amount.toFixed(6)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-center py-6">
                        <Badge 
                          variant="outline" 
                          className={recipient.isValid 
                            ? "text-green-700 border-green-300 bg-green-50 px-4 py-2 rounded-xl" 
                            : "text-red-700 border-red-300 bg-red-50 px-4 py-2 rounded-xl"
                          }
                        >
                          {recipient.isValid ? 'Valid' : 'Invalid'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center py-6">
                        <div className="flex items-center justify-center gap-2">
                          {editingIndex === index ? (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleSaveEdit}
                                className="text-green-600 hover:text-green-700 hover:bg-green-100 rounded-xl h-10 w-10 p-0"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCancelEdit}
                                className="text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded-xl h-10 w-10 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStartEdit(index)}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-xl h-10 w-10 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRemoveRecipient(index)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-100 rounded-xl h-10 w-10 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{recipients.length}</div>
                  <div className="text-sm text-slate-600 font-medium">Total Recipients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">{validRecipients.length}</div>
                  <div className="text-sm text-slate-600 font-medium">Valid Addresses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {recipients.length > 0 && invalidRecipients.length === 0 ? recipients.length : '0'}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Wallets</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {(recipients.length * 0.000005).toFixed(6)}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Est. Fees (SOL)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
