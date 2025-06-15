
import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, Send, AlertTriangle, CheckCircle, Wallet } from 'lucide-react';
import { WalletConnect } from '@/components/WalletConnect';
import { BulkTransferForm } from '@/components/BulkTransferForm';
import { TransferPreview } from '@/components/TransferPreview';
import { AddressManager } from '@/components/AddressManager';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Recipient {
  address: string;
  amount: number;
  isValid?: boolean;
}

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [distributionMethod, setDistributionMethod] = useState<'equal' | 'manual'>('equal');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [walletBalance] = useState(5.234);
  const { toast } = useToast();

  const handleWalletConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsWalletConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false);
    setRecipients([]);
    setTotalAmount(0);
    setIsPreviewMode(false);
    toast({
      title: "Session Reset",
      description: "All data cleared for security",
    });
  };

  if (!isWalletConnected) {
    return <WelcomeScreen onConnect={handleWalletConnect} isConnecting={isConnecting} />;
  }

  const handleAddRecipient = (address: string, amount?: number) => {
    const newRecipient: Recipient = {
      address,
      amount: amount || 0,
      isValid: validateSolanaAddress(address)
    };
    setRecipients([...recipients, newRecipient]);
    
    toast({
      title: "Address Added",
      description: `Recipient ${recipients.length + 1} added successfully`,
    });
  };

  const handleUpdateRecipient = (index: number, address: string, amount: number) => {
    setRecipients(recipients.map((recipient, i) => 
      i === index ? { ...recipient, address, amount, isValid: validateSolanaAddress(address) } : recipient
    ));
  };

  const handleRemoveRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const validateSolanaAddress = (address: string): boolean => {
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
  const networkFees = recipients.length * 0.000005;
  const validRecipients = recipients.filter(r => r.isValid);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Send className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">MultiSender.so</h1>
                <p className="text-xs text-gray-500">Bulk token distribution</p>
              </div>
            </div>
            <WalletConnect 
              balance={walletBalance} 
              isConnected={isWalletConnected}
              onConnect={handleWalletConnect}
              onDisconnect={handleWalletDisconnect}
            />
          </div>
        </div>
      </header>

      {!isPreviewMode ? (
        <div className="pb-24">
          {/* Balance Card */}
          <div className="p-6">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Wallet className="h-4 w-4 text-gray-600" />
                    <p className="text-sm text-gray-600">Available Balance</p>
                  </div>
                  <p className="text-3xl font-semibold text-gray-900">{walletBalance.toFixed(6)}</p>
                  <p className="text-sm text-gray-500">SOL</p>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="px-6 space-y-6">
            <BulkTransferForm
              totalAmount={totalAmount}
              onTotalAmountChange={setTotalAmount}
              distributionMethod={distributionMethod}
              onDistributionMethodChange={setDistributionMethod}
            />

            <AddressManager
              recipients={recipients}
              onAddRecipient={handleAddRecipient}
              onUpdateRecipient={handleUpdateRecipient}
              onRemoveRecipient={handleRemoveRecipient}
              distributionMethod={distributionMethod}
            />

            {/* Summary Card */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  Summary
                  {validRecipients.length > 0 && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {validRecipients.length} Ready
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recipients</span>
                      <span className="font-medium">{recipients.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valid</span>
                      <span className="font-medium text-green-600">{validRecipients.length}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium">{totalCost.toFixed(6)} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fees</span>
                      <span className="font-medium">{networkFees.toFixed(6)} SOL</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-base font-semibold">
                  <span>Total Cost</span>
                  <span className="text-gray-900">{(totalCost + networkFees).toFixed(6)} SOL</span>
                </div>

                {walletBalance < (totalCost + networkFees) && totalCost > 0 && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800 text-sm">
                      Insufficient balance. Need {((totalCost + networkFees) - walletBalance).toFixed(6)} more SOL.
                    </AlertDescription>
                  </Alert>
                )}

                {validRecipients.length > 0 && walletBalance >= (totalCost + networkFees) && totalCost > 0 && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 text-sm">
                      Ready to execute! All addresses validated and balance sufficient.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Fixed Bottom Button */}
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
            <Button 
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg"
              onClick={() => setIsPreviewMode(true)}
              disabled={validRecipients.length === 0 || totalCost === 0 || walletBalance < (totalCost + networkFees)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Transfer ({validRecipients.length} recipients)
            </Button>
          </div>
        </div>
      ) : (
        <TransferPreview
          recipients={calculateAmounts()}
          totalCost={totalCost}
          networkFees={networkFees}
          onBack={() => setIsPreviewMode(false)}
          onConfirm={() => {
            toast({
              title: "Transfer Initiated!",
              description: "Your bulk transfer is being processed...",
            });
            console.log('Executing transfer...');
          }}
        />
      )}
    </div>
  );
};

export default Index;
