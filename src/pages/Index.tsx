
import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, Send, AlertTriangle, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';
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
  const [distributionMethod, setDistributionMethod] = useState<'equal' | 'manual' | 'percentage'>('equal');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Send className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  SolMulti Pro
                </h1>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                  <p className="text-xs text-gray-500">Advanced multisender</p>
                </div>
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
        <div className="pb-20">
          {/* Enhanced Balance Card */}
          <div className="p-4">
            <Card className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-0 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
              <CardContent className="p-6 relative">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm text-green-300 font-medium">Live Balance</p>
                  </div>
                  <p className="text-4xl font-light tracking-tight">{walletBalance.toFixed(6)}</p>
                  <p className="text-lg text-gray-300 font-medium">SOL</p>
                  
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 px-3 py-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Gas Optimized
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="px-4 space-y-4">
            <BulkTransferForm
              totalAmount={totalAmount}
              onTotalAmountChange={setTotalAmount}
              distributionMethod={distributionMethod}
              onDistributionMethodChange={setDistributionMethod}
            />

            <AddressManager
              recipients={recipients}
              onAddRecipient={handleAddRecipient}
              onRemoveRecipient={handleRemoveRecipient}
              distributionMethod={distributionMethod}
            />

            {/* Enhanced Summary Card */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Transaction Summary
                  {validRecipients.length > 0 && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {validRecipients.length} Valid
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recipients</span>
                      <span className="font-semibold">{recipients.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valid Addresses</span>
                      <span className="font-semibold text-green-600">{validRecipients.length}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="font-semibold">{totalCost.toFixed(6)} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network Fees</span>
                      <span className="font-semibold">{networkFees.toFixed(6)} SOL</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Cost</span>
                  <span className="text-green-600">{(totalCost + networkFees).toFixed(6)} SOL</span>
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

          {/* Enhanced Fixed Bottom Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200">
            <Button 
              className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              onClick={() => setIsPreviewMode(true)}
              disabled={validRecipients.length === 0 || totalCost === 0 || walletBalance < (totalCost + networkFees)}
            >
              <Eye className="h-5 w-5 mr-2" />
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
