
import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, Send, AlertTriangle, CheckCircle, Zap, Shield } from 'lucide-react';
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
      title: "🔄 Session Reset",
      description: "All data cleared for security",
    });
  };

  // Show welcome screen if wallet is not connected
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
      title: "✅ Address Added",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  MultiSender.so
                </h1>
                <p className="text-sm text-slate-500">Bulk token distribution made simple</p>
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
            <Card className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-0 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
              <CardContent className="p-8 relative">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm text-blue-300 font-medium">Available Balance</p>
                  </div>
                  <p className="text-5xl font-light tracking-tight">{walletBalance.toFixed(6)}</p>
                  <p className="text-xl text-slate-300 font-medium">SOL</p>
                  
                  <div className="flex items-center justify-center gap-6 pt-4">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 text-sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Connected
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 text-sm">
                      <Zap className="h-4 w-4 mr-2" />
                      Optimized
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 text-sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Secure
                    </Badge>
                  </div>
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
            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center justify-between">
                  Transaction Summary
                  {validRecipients.length > 0 && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                      {validRecipients.length} Ready
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Recipients</span>
                      <span className="font-semibold">{recipients.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Valid Addresses</span>
                      <span className="font-semibold text-green-600">{validRecipients.length}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Amount</span>
                      <span className="font-semibold">{totalCost.toFixed(6)} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Network Fees</span>
                      <span className="font-semibold">{networkFees.toFixed(6)} SOL</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Cost</span>
                  <span className="text-blue-600">{(totalCost + networkFees).toFixed(6)} SOL</span>
                </div>

                {walletBalance < (totalCost + networkFees) && totalCost > 0 && (
                  <Alert className="bg-red-50 border-red-200 rounded-xl">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800 text-sm">
                      Insufficient balance. Need {((totalCost + networkFees) - walletBalance).toFixed(6)} more SOL.
                    </AlertDescription>
                  </Alert>
                )}

                {validRecipients.length > 0 && walletBalance >= (totalCost + networkFees) && totalCost > 0 && (
                  <Alert className="bg-green-50 border-green-200 rounded-xl">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 text-sm">
                      🚀 Ready to execute! All addresses validated and balance sufficient.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Fixed Bottom Button */}
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-200/50">
            <Button 
              className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => setIsPreviewMode(true)}
              disabled={validRecipients.length === 0 || totalCost === 0 || walletBalance < (totalCost + networkFees)}
            >
              <Eye className="h-5 w-5 mr-3" />
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
              title: "🎉 Transfer Initiated!",
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
