
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
  Briefcase,
  TrendingUp,
  Globe,
  Sparkles
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const projectTypes = [
    {
      icon: <Coins className="h-8 w-8" />,
      title: "NFT Projects",
      description: "Launch airdrops, reward holders, and distribute royalties",
      example: "10,000+ NFT holders",
      gradient: "from-purple-500 to-pink-500",
      stats: "2.4M tokens distributed"
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Gaming Projects", 
      description: "Distribute rewards, prizes, and in-game tokens",
      example: "5,000+ active players",
      gradient: "from-blue-500 to-cyan-500",
      stats: "850K rewards sent"
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "DeFi Protocols",
      description: "Execute governance distributions and protocol incentives",
      example: "50,000+ liquidity providers",
      gradient: "from-green-500 to-emerald-500",
      stats: "12M tokens allocated"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "DAOs & Teams",
      description: "Pay contributors and manage treasury allocations",
      example: "500+ contributors",
      gradient: "from-orange-500 to-red-500",
      stats: "340K payments made"
    }
  ];

  const features = [
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Lightning Fast",
      description: "Send to 10,000+ wallets in under 30 seconds",
      stat: "12s average",
      gradient: "from-yellow-400 to-orange-500",
      highlight: "99.9% success rate"
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Ultra Low Fees",
      description: "Only 0.000005 SOL per transfer. Save 95% vs manual",
      stat: "Cheapest on Solana",
      gradient: "from-green-400 to-blue-500",
      highlight: "Save $1000s in fees"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Your Control",
      description: "Your wallet, your keys, your tokens. Zero smart contract risk",
      stat: "100% non-custodial",
      gradient: "from-purple-400 to-pink-500",
      highlight: "Enterprise grade security"
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

      {/* Project Types - Redesigned */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-32 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-semibold">Trusted by Industry Leaders</span>
            </div>
            <h3 className="text-5xl font-black text-white mb-6">Who uses MultiSender?</h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">From billion-dollar protocols to emerging startups - the choice is clear</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectTypes.map((project, index) => (
              <div key={index} className="group relative">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                
                {/* Card content */}
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
                  <div className={`w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-xl`}>
                    {project.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{project.title}</h4>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Scale</span>
                      <span className="text-white font-semibold">{project.example}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Volume</span>
                      <span className="text-green-400 font-semibold">{project.stats}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why MultiSender - Redesigned */}
      <div className="py-32 bg-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.1)_25%,rgba(0,0,0,.1)_50%,transparent_50%,transparent_75%,rgba(0,0,0,.1)_75%)] bg-[length:20px_20px]" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-black text-white rounded-full px-6 py-3 mb-8">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">The Solana Standard</span>
            </div>
            <h3 className="text-5xl font-black text-gray-900 mb-6">Why MultiSender?</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Built different. Performs different. Results that speak for themselves.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                {/* Main card */}
                <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  {/* Icon with gradient background */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl relative z-10`}>
                    {feature.icon}
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">{feature.title}</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg relative z-10">{feature.description}</p>
                  
                  {/* Stats section */}
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="font-bold text-gray-900">{feature.stat}</span>
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <span className="text-green-700 font-semibold text-sm">{feature.highlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
