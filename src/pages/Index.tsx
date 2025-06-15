
import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Button } from '@/components/ui/button';
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
      <header className="border-b border-white">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white flex items-center justify-center">
                <Send className="h-5 w-5 text-black" />
              </div>
              <h1 className="text-2xl font-bold">MULTISENDER.SO</h1>
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
              <div className="sticky top-8 border border-white bg-black p-8">
                <h2 className="text-2xl font-bold mb-8">SUMMARY</h2>
                
                <div className="space-y-6">
                  <div className="flex justify-between text-lg">
                    <span>RECIPIENTS</span>
                    <span className="font-bold">{recipients.length}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>VALID</span>
                    <span className="font-bold">{validRecipients.length}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>AMOUNT</span>
                    <span className="font-bold">{totalCost.toFixed(6)} SOL</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>FEES</span>
                    <span className="font-bold">{networkFees.toFixed(6)} SOL</span>
                  </div>
                  
                  <div className="border-t border-white pt-6">
                    <div className="flex justify-between text-xl">
                      <span className="font-bold">TOTAL</span>
                      <span className="font-bold">{(totalCost + networkFees).toFixed(6)} SOL</span>
                    </div>
                  </div>
                </div>

                {walletBalance < (totalCost + networkFees) && totalCost > 0 && (
                  <div className="mt-6 p-4 border border-white bg-black">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-bold">INSUFFICIENT BALANCE</span>
                    </div>
                    <p className="mt-2">Need {((totalCost + networkFees) - walletBalance).toFixed(6)} more SOL</p>
                  </div>
                )}

                {isReady && (
                  <div className="mt-6 p-4 border border-white bg-black">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-bold">READY TO SEND</span>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full h-14 bg-white hover:bg-gray-200 text-black font-bold text-lg mt-8"
                  onClick={() => setIsPreviewMode(true)}
                  disabled={!isReady}
                >
                  PREVIEW ({validRecipients.length})
                </Button>
              </div>
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
