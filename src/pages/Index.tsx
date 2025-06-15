
import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, Send, AlertTriangle, CheckCircle } from 'lucide-react';
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
      toast({
        title: "Wallet Connected!",
        description: "Welcome to MultiSender.so.",
      });
    }, 1500);
  };

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false);
    setRecipients([]);
    setTotalAmount(0);
    setIsPreviewMode(false);
    toast({
      title: "Session Reset",
      description: "All data has been cleared for security.",
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
  };

  const handleUpdateRecipient = (index: number, address: string, amount: number) => {
    setRecipients(recipients.map((recipient, i) => 
      i === index ? { ...recipient, address, amount, isValid: validateSolanaAddress(address) } : recipient
    ));
  };

  const handleRemoveRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
    toast({
      title: "Recipient Removed",
      variant: "destructive",
    });
  };

  const validateSolanaAddress = (address: string): boolean => {
    return address.length >= 32 && address.length <= 44 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(address);
  };

  const calculateAmounts = () => {
    if (distributionMethod === 'equal' && recipients.length > 0) {
      const amountPerRecipient = totalAmount > 0 ? totalAmount / recipients.length : 0;
      return recipients.map(r => ({ ...r, amount: amountPerRecipient }));
    }
    return recipients;
  };

  const finalRecipients = calculateAmounts();
  const totalCost = finalRecipients.reduce((sum, r) => sum + r.amount, 0);
  const networkFees = recipients.length * 0.000005;
  const validRecipients = recipients.filter(r => r.isValid);
  const isReady = validRecipients.length > 0 && totalCost > 0 && walletBalance >= (totalCost + networkFees);

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <Send className="h-3 w-3 text-white" />
              </div>
              <span className="font-semibold text-black">MultiSender</span>
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
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form - Simplified */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-black mb-2">Bulk Transfer</h1>
                <p className="text-gray-600">Send SOL to multiple wallets at once.</p>
              </div>

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
            </div>

            {/* Summary - Simplified */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 border border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-black">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recipients</span>
                      <span className="font-medium">{recipients.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valid</span>
                      <span className="font-medium text-green-600">{validRecipients.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium">{totalCost.toFixed(6)} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network Fee</span>
                      <span className="font-medium">{networkFees.toFixed(6)} SOL</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{(totalCost + networkFees).toFixed(6)} SOL</span>
                  </div>

                  {walletBalance < (totalCost + networkFees) && totalCost > 0 && (
                    <Alert variant="destructive" className="text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Insufficient balance
                      </AlertDescription>
                    </Alert>
                  )}

                  {isReady && (
                    <Alert className="bg-green-50 border-green-200 text-green-800 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Ready to send
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    className="w-full h-11 bg-black hover:bg-gray-800 text-white"
                    onClick={() => setIsPreviewMode(true)}
                    disabled={!isReady}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview ({validRecipients.length})
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      ) : (
        <TransferPreview
          recipients={finalRecipients}
          totalCost={totalCost}
          networkFees={networkFees}
          onBack={() => setIsPreviewMode(false)}
          onConfirm={() => {
            toast({
              title: "🚀 Transfer Initiated!",
              description: "Your bulk transfer is being sent to the Solana network...",
            });
            console.log('Executing transfer...');
            setTimeout(() => {
              setIsPreviewMode(false);
              setRecipients([]);
              setTotalAmount(0);
              toast({
                title: "✅ Transfer Complete!",
                description: "Successfully sent to all recipients.",
              });
            }, 3000);
          }}
        />
      )}
    </div>
  );
};

export default Index;
