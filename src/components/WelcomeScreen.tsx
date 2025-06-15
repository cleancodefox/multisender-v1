
import { Button } from '@/components/ui/button';
import { 
  Send,
  ArrowRight,
  Zap,
  Shield,
  DollarSign,
  Users,
  Coins,
  Target,
  Clock
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const scenarios = [
    {
      icon: <Coins className="h-6 w-6" />,
      title: "Airdrop to NFT Holders",
      description: "Distribute tokens to thousands of NFT holders instantly with zero hassle",
      recipients: "10,000+ recipients",
      time: "< 30 seconds"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Community Rewards", 
      description: "Reward your most active community members and contributors",
      recipients: "5,000+ recipients",
      time: "< 15 seconds"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team & Contributor Payouts",
      description: "Pay your team, advisors, and contributors efficiently in one go",
      recipients: "100+ recipients",
      time: "< 5 seconds"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center">
              <Send className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">MultiSender</h1>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-gray-900 leading-none">
            Send to 10,000<br />wallets in seconds
          </h2>
          
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
            The fastest way to distribute tokens on Solana. Ultra-low fees, instant transfers, enterprise-grade reliability.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-black text-gray-900 mb-2">2.4M+</div>
              <div className="text-sm text-gray-600">Tokens sent this week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-gray-900 mb-2">459</div>
              <div className="text-sm text-gray-600">Projects trust us</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-gray-900 mb-2">12s</div>
              <div className="text-sm text-gray-600">Average transfer time</div>
            </div>
          </div>

          <Button 
            onClick={onConnect}
            disabled={isConnecting}
            className="h-16 px-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isConnecting ? 'Connecting...' : 'Start Sending'}
            <ArrowRight className="h-5 w-5 ml-3" />
          </Button>
        </div>
      </div>

      {/* Use Cases - Enhanced */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Built for every use case</h3>
            <p className="text-lg text-gray-600">From airdrops to payouts - we've got you covered</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 hover:border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-6 text-gray-700">
                  {scenario.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{scenario.title}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">{scenario.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="font-semibold text-gray-900">{scenario.recipients}</div>
                  <div className="font-medium text-green-600">{scenario.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why MultiSender Wins - Redesigned */}
      <div className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">The only tool you'll ever need</h3>
            <p className="text-lg text-gray-600">Built by developers, for developers who demand the best</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Blazing Fast</h4>
              <p className="text-gray-600 mb-4">Send to 10,000+ wallets in under 30 seconds. No queues, no waiting.</p>
              <div className="text-sm font-semibold text-blue-600">99.9% success rate</div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Ultra Cheap</h4>
              <p className="text-gray-600 mb-4">Only 0.000005 SOL per transfer. Save 95% compared to manual sending.</p>
              <div className="text-sm font-semibold text-green-600">Lowest fees on Solana</div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Battle Tested</h4>
              <p className="text-gray-600 mb-4">Your wallet, your keys, your control. Zero smart contract risk.</p>
              <div className="text-sm font-semibold text-purple-600">100% secure</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to scale your distributions?</h3>
          <p className="text-xl text-gray-400 mb-10">Join hundreds of projects already using MultiSender</p>
          
          <Button 
            onClick={onConnect}
            disabled={isConnecting}
            className="h-16 px-12 bg-white hover:bg-gray-100 text-black font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isConnecting ? 'Connecting...' : 'Start Your First Transfer'}
            <ArrowRight className="h-5 w-5 ml-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
