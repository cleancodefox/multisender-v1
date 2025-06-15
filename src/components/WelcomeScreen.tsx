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
  Sparkles,
  TrendingUp,
  CheckCircle
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
      description: "Launch airdrops, reward holders, and distribute royalties to your community",
      example: "10,000+ NFT holders",
      gradient: "from-purple-500 to-pink-500",
      stats: "2.4M",
      metric: "tokens distributed"
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Gaming Projects", 
      description: "Distribute in-game tokens, rewards, and tournament prizes to players",
      example: "5,000+ active players",
      gradient: "from-blue-500 to-cyan-500",
      stats: "850K",
      metric: "rewards sent"
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "DeFi Protocols",
      description: "Execute governance distributions, yield farming rewards, and protocol incentives",
      example: "50,000+ liquidity providers",
      gradient: "from-green-500 to-emerald-500",
      stats: "1.2M",
      metric: "yield payments"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "DAOs & Teams",
      description: "Pay contributors, distribute grants, and manage treasury allocations",
      example: "500+ contributors",
      gradient: "from-orange-500 to-red-500",
      stats: "340K",
      metric: "payouts processed"
    }
  ];

  const whyFeatures = [
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Lightning Fast",
      description: "Send to 10,000+ wallets in under 30 seconds. No queues, no waiting, no delays.",
      detail: "Average: 12 seconds",
      step: "01",
      color: "text-yellow-400"
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Ultra Low Fees",
      description: "Only 0.000005 SOL per transfer. Save 95% compared to manual sending.",
      detail: "Cheapest on Solana",
      step: "02",
      color: "text-green-400"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Your Control",
      description: "Your wallet, your keys, your tokens. Zero smart contract risk.",
      detail: "100% non-custodial",
      step: "03",
      color: "text-blue-400"
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

      {/* Modern Bento Grid - Who uses MultiSender */}
      <div className="relative py-32 bg-gradient-to-br from-slate-50 via-white to-purple-50 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-slate-100 bg-[size:60px_60px] opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-lg rounded-full border border-white/20 mb-6">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">Trusted by Industry Leaders</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
              Who uses MultiSender?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">From NFT drops to DAO payouts - powering the next generation of Web3 projects</p>
          </div>
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[280px]">
            {/* Large Card - NFT Projects */}
            <div className="md:col-span-2 lg:col-span-3 md:row-span-2 group relative overflow-hidden rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className={`absolute inset-0 bg-gradient-to-br ${projectTypes[0].gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative h-full p-8 flex flex-col">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${projectTypes[0].gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {projectTypes[0].icon}
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{projectTypes[0].title}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed flex-1">{projectTypes[0].description}</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-gray-900">{projectTypes[0].stats}</span>
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-sm text-gray-500">{projectTypes[0].metric}</div>
                  <div className="text-sm font-semibold text-purple-600">{projectTypes[0].example}</div>
                </div>
              </div>
            </div>

            {/* Medium Cards */}
            {projectTypes.slice(1, 3).map((project, index) => (
              <div key={index + 1} className="md:col-span-2 lg:col-span-3 group relative overflow-hidden rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative h-full p-6 flex flex-col">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {project.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-1">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-gray-900">{project.stats}</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-xs text-gray-500">{project.metric}</div>
                    <div className="text-xs font-semibold text-blue-600">{project.example}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Small Card - DAO & Teams */}
            <div className="md:col-span-4 lg:col-span-6 group relative overflow-hidden rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className={`absolute inset-0 bg-gradient-to-r ${projectTypes[3].gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative h-full p-6 flex items-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${projectTypes[3].gradient} flex items-center justify-center text-white mr-6 group-hover:scale-110 transition-transform duration-300`}>
                  {projectTypes[3].icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{projectTypes[3].title}</h4>
                  <p className="text-gray-600 mb-3 leading-relaxed">{projectTypes[3].description}</p>
                  <div className="text-sm font-semibold text-orange-600">{projectTypes[3].example}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-gray-900 mb-1">{projectTypes[3].stats}</div>
                  <div className="text-sm text-gray-500">{projectTypes[3].metric}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Timeline - Why MultiSender */}
      <div className="relative py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:60px_60px]"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-20"></div>
        
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-6">
              <Target className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-semibold text-white/80">Why Choose Us</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-black text-white mb-6">
              Why MultiSender?
            </h3>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Three pillars of excellence that make us the #1 choice for token distribution</p>
          </div>

          <div className="space-y-32">
            {whyFeatures.map((feature, index) => (
              <div key={index} className="relative">
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 lg:translate-y-0 lg:top-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-lg">{feature.step}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Icon Side */}
                  <div className="flex-1 flex justify-center lg:justify-end">
                    <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center ${feature.color} hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1">
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <h4 className="text-3xl font-bold text-white mb-4">{feature.title}</h4>
                      <p className="text-white/80 mb-6 leading-relaxed text-lg">{feature.description}</p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-white font-semibold text-sm">{feature.detail}</span>
                      </div>
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
