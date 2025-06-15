
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send,
  ArrowRight,
  Plus
} from 'lucide-react';
import { useState } from 'react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const [demoAddresses, setDemoAddresses] = useState(['7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM']);
  const [demoAmount, setDemoAmount] = useState('0.1');

  const addDemoAddress = () => {
    if (demoAddresses.length < 5) {
      setDemoAddresses([...demoAddresses, '']);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Single Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tight">
            Send to 10K wallets.
          </h1>
          <h2 className="text-3xl md:text-5xl font-normal text-gray-400 mb-12">
            One click. Done.
          </h2>
          <p className="text-xl text-gray-500 mb-16 max-w-2xl mx-auto">
            Bulk token distribution on Solana. ~0.000005 SOL per transfer.
          </p>
        </div>

        {/* Working Demo */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <Send className="h-4 w-4 text-black" />
              </div>
              <span className="font-mono text-sm text-gray-400">LIVE DEMO</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input 
                    placeholder="Amount per recipient"
                    value={demoAmount}
                    onChange={(e) => setDemoAmount(e.target.value)}
                    className="bg-black border-gray-700 text-white font-mono"
                  />
                </div>
                <span className="text-gray-400 text-sm self-center font-mono">SOL</span>
              </div>
              
              {demoAddresses.map((address, i) => (
                <Input 
                  key={i}
                  placeholder={`Recipient ${i + 1} address`}
                  value={address}
                  onChange={(e) => {
                    const newAddresses = [...demoAddresses];
                    newAddresses[i] = e.target.value;
                    setDemoAddresses(newAddresses);
                  }}
                  className="bg-black border-gray-700 text-white font-mono text-sm"
                />
              ))}
              
              {demoAddresses.length < 5 && (
                <Button 
                  variant="ghost" 
                  onClick={addDemoAddress}
                  className="w-full border border-dashed border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add recipient
                </Button>
              )}
            </div>
            
            <div className="text-right text-sm font-mono text-gray-400 mb-6">
              Total: {(parseFloat(demoAmount || '0') * demoAddresses.length).toFixed(6)} SOL
            </div>
            
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              className="w-full h-12 bg-white hover:bg-gray-100 text-black font-semibold text-lg"
            >
              {isConnecting ? 'Connecting...' : 'Connect & Send'}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Single Stats Line */}
        <div className="text-center">
          <div className="inline-flex items-center gap-12 text-sm font-mono text-gray-500">
            <span>~0.000005 SOL fee</span>
            <span>&lt;2s confirmation</span>
            <span>10K+ recipients</span>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <Send className="h-3 w-3 text-black" />
              </div>
              <span className="font-semibold">MultiSender</span>
            </div>
            <span className="text-sm text-gray-500 font-mono">
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
