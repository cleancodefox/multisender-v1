
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send,
  ArrowRight,
  Plus,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const [demoAddresses, setDemoAddresses] = useState([
    '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'
  ]);
  const [demoAmount, setDemoAmount] = useState('0.1');
  const [isDemoValidated, setIsDemoValidated] = useState(false);

  const addDemoAddress = () => {
    if (demoAddresses.length < 5) {
      setDemoAddresses([...demoAddresses, '']);
    }
  };

  const removeDemoAddress = (index: number) => {
    if (demoAddresses.length > 1) {
      setDemoAddresses(demoAddresses.filter((_, i) => i !== index));
    }
  };

  const updateDemoAddress = (index: number, value: string) => {
    const newAddresses = [...demoAddresses];
    newAddresses[index] = value;
    setDemoAddresses(newAddresses);
  };

  const validateDemo = () => {
    setIsDemoValidated(true);
    setTimeout(() => setIsDemoValidated(false), 2000);
  };

  const validAddresses = demoAddresses.filter(addr => 
    addr.length >= 32 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(addr)
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            Send to 10K wallets.
          </h1>
          <h2 className="text-2xl md:text-3xl font-normal text-gray-400 mb-8">
            One click. Done.
          </h2>
          <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
            Bulk token distribution on Solana. ~0.000005 SOL per transfer.
          </p>
        </div>

        {/* Working Demo */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <Send className="h-3 w-3 text-black" />
              </div>
              <span className="font-mono text-xs text-gray-400 uppercase tracking-wide">Try it now</span>
              {isDemoValidated && (
                <CheckCircle className="h-4 w-4 text-green-400" />
              )}
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <Input 
                  placeholder="0.1"
                  value={demoAmount}
                  onChange={(e) => setDemoAmount(e.target.value)}
                  className="w-24 bg-black border-gray-700 text-white font-mono text-sm"
                />
                <span className="text-gray-400 text-sm self-center font-mono">SOL each</span>
              </div>
              
              {demoAddresses.map((address, i) => (
                <div key={i} className="flex gap-2">
                  <Input 
                    placeholder={`Recipient ${i + 1} address`}
                    value={address}
                    onChange={(e) => updateDemoAddress(i, e.target.value)}
                    className="flex-1 bg-black border-gray-700 text-white font-mono text-xs"
                  />
                  {demoAddresses.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeDemoAddress(i)}
                      className="h-10 w-10 text-gray-500 hover:text-red-400"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
              
              {demoAddresses.length < 5 && (
                <Button 
                  variant="ghost" 
                  onClick={addDemoAddress}
                  className="w-full border border-dashed border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 text-sm"
                >
                  <Plus className="h-3 w-3 mr-2" />
                  Add recipient
                </Button>
              )}
            </div>
            
            <div className="flex justify-between items-center text-xs font-mono text-gray-400 mb-4">
              <span>Valid: {validAddresses.length}/{demoAddresses.length}</span>
              <span>Total: {(parseFloat(demoAmount || '0') * validAddresses.length).toFixed(6)} SOL</span>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={validateDemo}
                disabled={validAddresses.length === 0 || !demoAmount}
                className="w-full h-10 bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700"
              >
                Validate Recipients
              </Button>
              
              <Button 
                onClick={onConnect}
                disabled={isConnecting}
                className="w-full h-12 bg-white hover:bg-gray-100 text-black font-semibold"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet & Send'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center">
          <div className="inline-flex items-center gap-8 text-xs font-mono text-gray-600">
            <span>~0.000005 SOL fee</span>
            <span>&lt;2s confirmation</span>
            <span>10K+ recipients</span>
          </div>
        </div>
      </div>
    </div>
  );
};
