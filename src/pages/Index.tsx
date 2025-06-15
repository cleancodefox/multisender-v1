
import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Button } from '@/components/ui/button';
import { Send, AlertTriangle, CheckCircle, Menu } from 'lucide-react';
import { WalletConnect } from '@/components/WalletConnect';
import { BulkTransferForm } from '@/components/BulkTransferForm';
import { TransferPreview } from '@/components/TransferPreview';
import { AddressManager } from '@/components/AddressManager';
import { TransferSummary } from '@/components/TransferSummary';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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

  if (isPreviewMode) {
    return (
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-xl flex items-center justify-center">
                <Send className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">MULTISENDER.SO</h1>
            </div>
            
            {/* Mobile Summary Sheet Trigger */}
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-xl">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
                    <TransferSummary
                      recipients={recipients}
                      validRecipients={validRecipients}
                      totalCost={totalCost}
                      networkFees={networkFees}
                      walletBalance={walletBalance}
                      isReady={isReady}
                      onPreview={() => setIsPreviewMode(true)}
                    />
                  </SheetContent>
                </Sheet>
              </div>
              
              <WalletConnect 
                balance={walletBalance} 
                isConnected={isWalletConnected}
                onConnect={handleWalletConnect}
                onDisconnect={handleWalletDisconnect}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content - Mobile: Full width, Desktop: 2/3 */}
          <div className="lg:col-span-2 space-y-6">
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

          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <TransferSummary
                recipients={recipients}
                validRecipients={validRecipients}
                totalCost={totalCost}
                networkFees={networkFees}
                walletBalance={walletBalance}
                isReady={isReady}
                onPreview={() => setIsPreviewMode(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Button 
            className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold text-sm rounded-xl"
            onClick={() => setIsPreviewMode(true)}
            disabled={!isReady}
          >
            Preview Transfer ({validRecipients.length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
