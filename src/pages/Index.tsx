
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, Upload, Plus, Trash2, Eye, Send, Calculator, AlertTriangle, CheckCircle } from 'lucide-react';
import { WalletConnect } from '@/components/WalletConnect';
import { BulkTransferForm } from '@/components/BulkTransferForm';
import { TransferPreview } from '@/components/TransferPreview';
import { AddressManager } from '@/components/AddressManager';

interface Recipient {
  address: string;
  amount: number;
  isValid?: boolean;
}

const Index = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [distributionMethod, setDistributionMethod] = useState<'equal' | 'manual' | 'percentage'>('equal');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [walletBalance] = useState(5.234); // Mock wallet balance

  const handleAddRecipient = (address: string, amount?: number) => {
    const newRecipient: Recipient = {
      address,
      amount: amount || 0,
      isValid: validateSolanaAddress(address)
    };
    setRecipients([...recipients, newRecipient]);
  };

  const handleRemoveRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const validateSolanaAddress = (address: string): boolean => {
    // Basic Solana address validation (44 characters, base58)
    return address.length >= 32 && address.length <= 44 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(address);
  };

  const calculateAmounts = () => {
    if (distributionMethod === 'equal' && recipients.length > 0) {
      const amountPerRecipient = totalAmount / recipients.length;
      return recipients.map(r => ({ ...r, amount: amountPerRecipient }));
    }
    return recipients;
  };

  const totalCost = calculateAmounts().reduce((sum, r) => sum + r.amount, 0);
  const networkFees = recipients.length * 0.000005; // Estimated network fees

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Send className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Solana Multisender
                </h1>
                <p className="text-sm text-gray-600">Bulk token transfers made simple</p>
              </div>
            </div>
            <WalletConnect balance={walletBalance} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {!isPreviewMode ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
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
                        <Select value={distributionMethod} onValueChange={(value: any) => setDistributionMethod(value)}>
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
                          onChange={(e) => setTotalAmount(Number(e.target.value))}
                          className="text-lg"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <AddressManager
                  recipients={recipients}
                  onAddRecipient={handleAddRecipient}
                  onRemoveRecipient={handleRemoveRecipient}
                  distributionMethod={distributionMethod}
                />
              </div>

              {/* Summary Sidebar */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-blue-600" />
                      Transfer Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recipients</span>
                        <Badge variant="secondary">{recipients.length}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="font-semibold">{totalCost.toFixed(6)} SOL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Network Fees</span>
                        <span className="font-semibold">{networkFees.toFixed(6)} SOL</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Cost</span>
                        <span className="text-purple-600">{(totalCost + networkFees).toFixed(6)} SOL</span>
                      </div>
                    </div>

                    {walletBalance < (totalCost + networkFees) && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Insufficient balance. You need {((totalCost + networkFees) - walletBalance).toFixed(6)} more SOL.
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => setIsPreviewMode(true)}
                      disabled={recipients.length === 0 || totalCost === 0 || walletBalance < (totalCost + networkFees)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Transfer
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="text-center space-y-2">
                      <h3 className="font-semibold">Wallet Balance</h3>
                      <p className="text-2xl font-bold">{walletBalance.toFixed(6)} SOL</p>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <TransferPreview
              recipients={calculateAmounts()}
              totalCost={totalCost}
              networkFees={networkFees}
              onBack={() => setIsPreviewMode(false)}
              onConfirm={() => {
                // Mock transfer execution
                console.log('Executing transfer...');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
