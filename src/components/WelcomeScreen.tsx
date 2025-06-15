
import { Button } from '@/components/ui/button';
import { 
  Send,
  ArrowRight,
  Upload,
  CheckCircle,
  Users,
  Coins,
  Zap,
  Star,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

interface Scenario {
  title: string;
  description: string;
  icon: React.ReactNode;
  recipients: number;
  amount: string;
  totalCost: string;
  useCase: string;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const scenarios: Scenario[] = [
    {
      title: "NFT Airdrop",
      description: "Reward your NFT community",
      icon: <Star className="h-5 w-5" />,
      recipients: 2500,
      amount: "0.05",
      totalCost: "125.013",
      useCase: "Send rewards to all NFT holders automatically"
    },
    {
      title: "Token Distribution",
      description: "Launch your token to early supporters",
      icon: <Coins className="h-5 w-5" />,
      recipients: 5000,
      amount: "0.1",
      totalCost: "500.025",
      useCase: "Distribute tokens to whitelist addresses"
    },
    {
      title: "Community Rewards",
      description: "Thank your active community members",
      icon: <Users className="h-5 w-5" />,
      recipients: 1000,
      amount: "0.025",
      totalCost: "25.005",
      useCase: "Reward top contributors and active users"
    }
  ];

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

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 mb-12 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>500+ Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-blue-500" />
              <span>2M+ Transfers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>99.9% Success Rate</span>
            </div>
          </div>
        </div>

        {/* Sample Scenarios */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Sample Use Cases</span>
              <div className="ml-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Choose Your Scenario
              </div>
            </div>
            
            {/* Scenario Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {scenarios.map((scenario, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedScenario === scenario 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {scenario.icon}
                    </div>
                    <div className="font-semibold text-gray-900">{scenario.title}</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{scenario.description}</div>
                  <div className="text-xs text-gray-500">{scenario.useCase}</div>
                </div>
              ))}
            </div>

            {/* Selected Scenario Details */}
            {selectedScenario && (
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  {selectedScenario.title} Preview
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedScenario.recipients.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Recipients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedScenario.amount}
                    </div>
                    <div className="text-gray-600">SOL each</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {(parseFloat(selectedScenario.amount) * selectedScenario.recipients).toFixed(2)}
                    </div>
                    <div className="text-gray-600">Total amount</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedScenario.totalCost}
                    </div>
                    <div className="text-gray-600">Total cost</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Network fees: {(selectedScenario.recipients * 0.000005).toFixed(6)} SOL</span>
                    <span>≈ ${(parseFloat(selectedScenario.totalCost) * 160).toFixed(2)} USD</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onConnect}
                disabled={isConnecting}
                className="flex-1 h-12 bg-black hover:bg-gray-800 text-white font-semibold text-base rounded-lg"
              >
                {isConnecting ? 'Connecting...' : 'Start Your First Bulk Transfer'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              {selectedScenario && (
                <Button 
                  variant="outline"
                  className="h-12 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-base rounded-lg"
                  onClick={onConnect}
                  disabled={isConnecting}
                >
                  Try This Scenario
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-2">1. Import Addresses</div>
              <div className="text-sm text-gray-600">Upload CSV, fetch NFT holders, or add manually</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-2">2. Set Amounts</div>
              <div className="text-sm text-gray-600">Equal distribution or custom amounts per recipient</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-2">3. Send Instantly</div>
              <div className="text-sm text-gray-600">One click to send to thousands of wallets</div>
            </div>
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
