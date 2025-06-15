
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send,
  ArrowRight,
  Plus,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const [previewAddresses, setPreviewAddresses] = useState([
    '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    'DRiP2Pn2K6fuMLKQmt5rZWxa91wVAUNvzURUnDvU4jjZ'
  ]);
  const [previewAmount, setPreviewAmount] = useState('0.1');

  const addPreviewAddress = () => {
    if (previewAddresses.length < 5) {
      setPreviewAddresses([...previewAddresses, '']);
    }
  };

  const updatePreviewAddress = (index: number, value: string) => {
    const newAddresses = [...previewAddresses];
    newAddresses[index] = value;
    setPreviewAddresses(newAddresses);
  };

  const validateAddress = (address: string): boolean => {
    return address.length >= 32 && address.length <= 44 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(address);
  };

  const validAddresses = previewAddresses.filter(addr => addr && validateAddress(addr));
  const totalAmount = parseFloat(previewAmount || '0') * validAddresses.length;
  const networkFees = validAddresses.length * 0.000005;
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
                <Send className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Interactive Preview</span>
              <div className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Live Calculator
              </div>
            </div>
            
            {/* Distribution Method */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Distribution Method</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-black bg-black text-white rounded-lg">
                  <div className="font-semibold mb-1">Equal Split</div>
                  <div className="text-sm opacity-75">Same amount to everyone</div>
                </div>
                <div className="p-4 border-2 border-gray-200 bg-white text-gray-500 rounded-lg">
                  <div className="font-semibold mb-1">Manual Entry</div>
                  <div className="text-sm opacity-75">Custom amounts</div>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
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
            
            {/* Recipients */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipients ({validAddresses.length} valid)
              </label>
              <div className="space-y-3">
                {previewAddresses.map((address, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Input 
                      placeholder={`Recipient ${i + 1} address`}
                      value={address}
                      onChange={(e) => updatePreviewAddress(i, e.target.value)}
                      className="flex-1 h-11 border-gray-300 focus:border-black focus:ring-black rounded-lg font-mono text-sm"
                    />
                    {address && (
                      <div className="w-6 h-6 flex items-center justify-center">
                        {validateAddress(address) ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {previewAddresses.length < 5 && (
                  <Button 
                    variant="ghost" 
                    onClick={addPreviewAddress}
                    className="w-full border border-dashed border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400 h-11 rounded-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add recipient
                  </Button>
                )}
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Transfer Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipients:</span>
                  <span className="font-medium">{validAddresses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount each:</span>
                  <span className="font-medium">{previewAmount || '0'} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total amount:</span>
                  <span className="font-medium">{totalAmount.toFixed(6)} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network fees:</span>
                  <span className="font-medium">{networkFees.toFixed(6)} SOL</span>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total cost:</span>
                  <span className="font-bold text-lg text-gray-900">{totalCost.toFixed(6)} SOL</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={onConnect}
              disabled={isConnecting || validAddresses.length === 0}
              className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold text-lg rounded-lg"
            >
              {isConnecting ? 'Connecting...' : `Try MultiSender (${validAddresses.length} recipients)`}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">~0.000005</div>
              <div className="text-sm text-gray-600">SOL per transfer</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">&lt;2s</div>
              <div className="text-sm text-gray-600">confirmation time</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">10K+</div>
              <div className="text-sm text-gray-600">recipients supported</div>
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
