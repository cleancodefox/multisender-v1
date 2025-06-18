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
  Clock,
  Building2,
  Gamepad2,
  Briefcase
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const projectTypes = [
    {
      icon: <Coins className="h-6 w-6" />,
      title: "NFT Projects",
      description: "Launch airdrops, reward holders, and distribute royalties to your community",
      example: "10,000+ NFT holders"
    },
    {
      icon: <Gamepad2 className="h-6 w-6" />,
      title: "Gaming Projects", 
      description: "Distribute in-game tokens, rewards, and tournament prizes to players",
      example: "5,000+ active players"
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "DeFi Protocols",
      description: "Execute governance distributions, yield farming rewards, and protocol incentives",
      example: "50,000+ liquidity providers"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "DAOs & Teams",
      description: "Pay contributors, distribute grants, and manage treasury allocations",
      example: "500+ contributors"
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
            <h1 className="text-3xl font-bold text-gray-900">MultiSent</h1>
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

      {/* Project Types */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Who uses MultiSent?</h3>
            <p className="text-lg text-gray-600">From NFT drops to DAO payouts - trusted by every type of project</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectTypes.map((project, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 hover:border-gray-200">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 text-gray-700">
                  {project.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="text-sm font-semibold text-gray-500">{project.example}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why MultiSent */}
      <div className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why MultiSent?</h3>
            <p className="text-lg text-gray-600">Simple. Fast. Reliable. Everything you need, nothing you don't.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h4>
              <p className="text-gray-600 mb-4">Send to 10,000+ wallets in under 30 seconds. No queues, no waiting, no delays.</p>
              <div className="text-sm font-semibold text-gray-900">Average: 12 seconds</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Ultra Low Fees</h4>
              <p className="text-gray-600 mb-4">Only 0.000005 SOL per transfer. Save 95% compared to manual sending.</p>
              <div className="text-sm font-semibold text-gray-900">Cheapest on Solana</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Your Control</h4>
              <p className="text-gray-600 mb-4">Your wallet, your keys, your tokens. Zero smart contract risk.</p>
              <div className="text-sm font-semibold text-gray-900">100% non-custodial</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to scale your distributions?</h3>
          <p className="text-xl text-gray-400 mb-10">Join hundreds of projects already using MultiSent</p>
          
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
