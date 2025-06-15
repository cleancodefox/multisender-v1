
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send,
  ArrowRight,
  Upload,
  CheckCircle,
  Users,
  FileText,
  Zap
} from 'lucide-react';
import { useState } from 'react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const [previewAmount, setPreviewAmount] = useState('0.1');
  const [recipientCount, setRecipientCount] = useState(1000);

  const totalAmount = parseFloat(previewAmount || '0') * recipientCount;
  const networkFees = recipientCount * 0.000005;
  const totalCost = totalAmount + networkFees;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <Send className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">MULTISENDER.SO</h1>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-gray-900">
            Send to 10K wallets.
          </h2>
          <h3 className="text-2xl md:text-4xl font-normal text-gray-600 mb-8">
            One click. Done.
          </h3>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Bulk token distribution on Solana. Ultra-low fees, lightning-fast transfers.
          </p>
        </div>

        {/* Interactive Preview */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Bulk Transfer Calculator</span>
              <div className="ml-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Live Preview
              </div>
            </div>
            
            {/* Distribution Method */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">How It Works</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Upload className="h-6 w-6 text-gray-600 mb-2" />
                  <div className="font-semibold text-gray-900 mb-1">Upload CSV</div>
                  <div className="text-sm text-gray-600">Import thousands of addresses at once</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Users className="h-6 w-6 text-gray-600 mb-2" />
                  <div className="font-semibold text-gray-900 mb-1">NFT/Token Holders</div>
                  <div className="text-sm text-gray-600">Auto-fetch holder addresses</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <FileText className="h-6 w-6 text-gray-600 mb-2" />
                  <div className="font-semibold text-gray-900 mb-1">Manual Entry</div>
                  <div className="text-sm text-gray-600">Add addresses one by one</div>
                </div>
              </div>
            </div>

            {/* Calculator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount per recipient
                </label>
                <div className="relative">
                  <Input 
                    placeholder="Enter amount (e.g., 0.1)"
                    value={previewAmount}
                    onChange={(e) => setPreviewAmount(e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-black focus:ring-black pr-16 rounded-lg"
                    type="number"
                    step="0.000001"
                    min="0"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                    SOL
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of recipients
                </label>
                <div className="relative">
                  <Input 
                    placeholder="Enter number of recipients"
                    value={recipientCount}
                    onChange={(e) => setRecipientCount(Number(e.target.value) || 0)}
                    className="h-12 text-base border-gray-300 focus:border-black focus:ring-black rounded-lg"
                    type="number"
                    min="1"
                    max="10000"
                  />
                </div>
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Transfer Preview</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{recipientCount.toLocaleString()}</div>
                  <div className="text-gray-600">Recipients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{previewAmount || '0'}</div>
                  <div className="text-gray-600">SOL each</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{totalAmount.toFixed(2)}</div>
                  <div className="text-gray-600">Total amount</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{totalCost.toFixed(6)}</div>
                  <div className="text-gray-600">Total cost</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Network fees: {networkFees.toFixed(6)} SOL</span>
                  <span>≈ ${(totalCost * 160).toFixed(2)} USD</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={onConnect}
              disabled={isConnecting || recipientCount === 0}
              className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold text-lg rounded-lg"
            >
              {isConnecting ? 'Connecting...' : `Try MultiSender → Send to ${recipientCount.toLocaleString()} wallets`}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Why MultiSender?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-2">Ultra Low Fees</div>
              <div className="text-sm text-gray-600">Only ~0.000005 SOL per transfer</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</div>
              <div className="text-sm text-gray-600">Bulk transfers in under 2 seconds</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-2">Massive Scale</div>
              <div className="text-sm text-gray-600">Send to 10,000+ recipients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <Send className="h-3 w-3 text-white" />
              </div>
              <span className="font-semibold text-gray-900">MultiSender</span>
            </div>
            <span className="text-sm text-gray-500">
              Built for Solana • {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
