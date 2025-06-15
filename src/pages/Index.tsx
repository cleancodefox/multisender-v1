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
    // Basic validation, can be improved with a library like @solana/web3.js
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
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Send className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-black">MultiSender.so</h1>
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
        <main className="max-w-7xl mx-auto px-6 py-8">
           <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2 space-y-8">
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

              <div className="lg:col-span-1 space-y-8 mt-8 lg:mt-0">
                <Card className="sticky top-28 bg-white border border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between text-black">
                      Transaction Summary
                      {validRecipients.length > 0 && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                          {validRecipients.length} Ready
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Total Recipients</span>
                        <span className="font-medium text-black">{recipients.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Valid Addresses</span>
                        <span className="font-medium text-green-600">{validRecipients.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Amount to Send</span>
                        <span className="font-medium text-black">{totalCost.toFixed(6)} SOL</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Network Fee (Est.)</span>
                        <span className="font-medium text-black">{networkFees.toFixed(6)} SOL</span>
                      </div>
                    </div>
                    
                    <Separator className="bg-gray-100" />
                    
                    <div className="flex justify-between text-base font-semibold">
                      <span className="text-gray-700">Total Cost</span>
                      <span className="text-black">{(totalCost + networkFees).toFixed(6)} SOL</span>
                    </div>

                    {walletBalance < (totalCost + networkFees) && totalCost > 0 && (
                      <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Insufficient balance. Need {((totalCost + networkFees) - walletBalance).toFixed(6)} more SOL.
                        </AlertDescription>
                      </Alert>
                    )}

                    {isReady && (
                       <Alert className="bg-green-50 border-green-200 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Ready to send! All addresses are valid and balance is sufficient.
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      className="w-full h-11 bg-black hover:bg-gray-800 text-white font-medium rounded-xl"
                      onClick={() => setIsPreviewMode(true)}
                      disabled={!isReady}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Transfer ({validRecipients.length} recipients)
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
            // After transfer, maybe reset state
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
