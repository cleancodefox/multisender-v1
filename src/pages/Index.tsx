
import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, AlertTriangle, CheckCircle } from 'lucide-react';
import { WalletConnect } from '@/components/WalletConnect';
import { BulkTransferForm } from '@/components/BulkTransferForm';
import { TransferPreview } from '@/components/TransferPreview';
import { AddressManager } from '@/components/AddressManager';
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <Send className="h-4 w-4 text-black" />
              </div>
              <h1 className="text-xl font-bold text-white">MultiSender.so</h1>
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
        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
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

            <div className="lg:col-span-1">
              <Card className="sticky top-8 bg-gray-900 border-gray-800">
                <CardHeader className="border-b border-gray-800 pb-4">
                  <CardTitle className="text-xl font-bold text-white">
                    Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-400">Recipients</span>
                      <span className="font-bold text-white">{recipients.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-400">Valid</span>
                      <span className="font-bold text-green-400">{validRecipients.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-400">Amount</span>
                      <span className="font-bold text-white">{totalCost.toFixed(6)} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-400">Fees</span>
                      <span className="font-bold text-white">{networkFees.toFixed(6)} SOL</span>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-4">
                      <div className="flex justify-between text-lg">
                        <span className="font-bold text-white">Total</span>
                        <span className="font-bold text-white">{(totalCost + networkFees).toFixed(6)} SOL</span>
                      </div>
                    </div>
                  </div>

                  {walletBalance < (totalCost + networkFees) && totalCost > 0 && (
                    <Alert className="bg-red-900/50 border-red-500 text-red-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="font-medium">
                        Insufficient balance. Need {((totalCost + networkFees) - walletBalance).toFixed(6)} more SOL.
                      </AlertDescription>
                    </Alert>
                  )}

                  {isReady && (
                    <Alert className="bg-green-900/50 border-green-500 text-green-200">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="font-medium">
                        Ready to send!
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    className="w-full h-12 bg-white hover:bg-gray-100 text-black font-bold border-2 border-white"
                    onClick={() => setIsPreviewMode(true)}
                    disabled={!isReady}
                  >
                    PREVIEW ({validRecipients.length})
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
