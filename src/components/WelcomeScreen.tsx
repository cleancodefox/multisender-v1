
import { Button } from '@/components/ui/button';
import { 
  Send,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  Coins,
  Target
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const scenarios = [
    {
      icon: <Coins className="h-5 w-5" />,
      title: "Airdrop to NFT Holders",
      description: "Send tokens to thousands of NFT holders instantly",
      recipients: "5,000+ recipients"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Reward Distribution", 
      description: "Distribute rewards to your community members",
      recipients: "1,000+ recipients"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Team Payouts",
      description: "Pay your team and contributors efficiently",
      recipients: "50+ recipients"
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

      {/* Use Cases */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Built for every use case</h3>
            <p className="text-lg text-gray-600">Choose your scenario and get started in 30 seconds</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6 text-gray-700">
                  {scenario.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{scenario.title}</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">{scenario.description}</p>
                <div className="text-sm font-semibold text-gray-900">{scenario.recipients}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why MultiSender wins</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h4>
              <p className="text-gray-600">Send to 10,000 wallets in under 15 seconds. No queues, no delays.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Ultra Secure</h4>
              <p className="text-gray-600">Bank-grade security. Your wallet, your keys, your control.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Minimal Fees</h4>
              <p className="text-gray-600">Only 0.000005 SOL per transfer. Save 95% vs traditional methods.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Trusted by leading Solana projects</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Magic Eden', 'Tensor', 'Jupiter', 'Phantom'].map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <div className="text-gray-400 font-semibold">{project}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to scale your distributions?</h3>
          <p className="text-xl text-gray-400 mb-10">Join 459 projects already using MultiSender</p>
          
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
