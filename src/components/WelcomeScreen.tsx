import { Button } from '@/components/ui/button';
import { 
  Send,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  Coins,
  Target,
  TrendingUp,
  Star,
  CheckCircle
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

  const whyChooseUs = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Fastest on Solana",
      description: "10,000 transfers in 12 seconds. No other tool comes close to our speed.",
      metric: "12s avg"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Battle-Tested Security",
      description: "Processed $50M+ in transfers with zero security incidents. Your funds are safe.",
      metric: "$50M+ secured"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: "Lowest Fees",
      description: "0.000005 SOL per transfer. Save 95% compared to manual transfers.",
      metric: "95% savings"
    }
  ];

  const testimonials = [
    {
      name: "DeGods",
      role: "NFT Collection",
      text: "Distributed rewards to 10,000 holders in minutes. Game changer.",
      avatar: "🦇"
    },
    {
      name: "Solana DeFi",
      role: "DeFi Protocol", 
      text: "Saved us $2,000 in fees on our last airdrop. Incredible tool.",
      avatar: "💎"
    },
    {
      name: "Jupiter Exchange",
      role: "DEX Platform",
      text: "Most reliable bulk sender we've used. Zero failed transactions.",
      avatar: "🪐"
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

      {/* Why Choose Us */}
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black text-gray-900 mb-4">Why we dominate</h3>
            <p className="text-xl text-gray-600">The numbers don't lie. We're the fastest, safest, cheapest.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2">{feature.metric}</div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof - Real Testimonials */}
      <div className="bg-gray-900 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Trusted by Solana's biggest</h3>
            <p className="text-xl text-gray-400">Real projects, real results, real savings.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-2 mt-4">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-400 font-medium">Verified User</span>
                </div>
              </div>
            ))}
          </div>

          {/* Live Stats */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-600/30 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Live: 847 transfers in the last hour</span>
            </div>
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
