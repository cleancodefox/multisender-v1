
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp,
  Star,
  Sparkles,
  Crown,
  ArrowRight
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Send to 1000+ wallets in seconds"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      title: "100% Secure", 
      description: "Non-custodial, your keys your crypto"
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      title: "Save 90% Time",
      description: "Bulk transfers vs manual sending"
    }
  ];

  const stats = [
    { label: "Active Beta Users", value: "2.1K+", trend: "+89%" },
    { label: "Tokens Distributed", value: "$450K+", trend: "+156%" },
    { label: "Success Rate", value: "99.8%", trend: "Perfect" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
        <div className="relative px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            MVP Launch - Limited Beta Access
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              multisender.so
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto leading-relaxed">
            The most advanced bulk transfer tool on Solana
          </p>
          
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Save time, reduce fees, and scale your token distribution like never before
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 min-w-[200px]"
            >
              <Wallet className="h-5 w-5 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect & Start'}
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <span>2,100+ beta users</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose multisender.so?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built by DeFi experts, trusted by the Solana community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Options */}
      <div className="px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600">
              Flexible options for every use case
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pay Per Use */}
            <Card className="border-2 border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pay Per Use</h3>
                  <p className="text-gray-600 text-sm">Perfect for occasional transfers</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">0.01 SOL</span>
                    <span className="text-gray-600 ml-1">per transfer</span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Up to 100 recipients per batch
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Standard processing speed
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Basic support
                  </li>
                </ul>
                <Button className="w-full rounded-xl" variant="outline">
                  Start Now
                </Button>
              </CardContent>
            </Card>

            {/* NFT Pass - Less prominent */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium mb-2">
                    <Crown className="h-3 w-3" />
                    Limited Edition
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">NFT Pass</h3>
                  <p className="text-gray-600 text-sm">Unlimited transfers forever</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-purple-600">2.5 SOL</span>
                    <span className="text-gray-600 ml-1">one-time</span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    Unlimited recipients & batches
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    Priority processing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    VIP support + Discord access
                  </li>
                </ul>
                <Button className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Buy NFT Pass
                </Button>
              </CardContent>
            </Card>

            {/* Free Trial */}
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mb-2">
                    <Sparkles className="h-3 w-3" />
                    Beta Launch
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Free Trial</h3>
                  <p className="text-gray-600 text-sm">Try before you decide</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-green-600">FREE</span>
                    <span className="text-gray-600 ml-1">for 7 days</span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Up to 50 recipients per batch
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    5 transfers total
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Community support
                  </li>
                </ul>
                <Button className="w-full rounded-xl bg-green-500 hover:bg-green-600 text-white">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="px-4 py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-white font-semibold">4.9/5 Beta Rating</span>
          </div>
          
          <blockquote className="text-2xl text-white font-light mb-8 leading-relaxed">
            "This is exactly what Solana needed. Clean interface, lightning fast execution, and the team is incredibly responsive to feedback."
          </blockquote>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
              AS
            </div>
            <div className="text-left">
              <div className="text-white font-semibold">Alex S.</div>
              <div className="text-gray-400 text-sm">DeFi Protocol Founder</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="px-4 py-16 bg-gradient-to-br from-purple-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Scale Your Token Distribution?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust multisender.so for their bulk transfers
          </p>
          
          <Button 
            onClick={onConnect}
            disabled={isConnecting}
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            {isConnecting ? 'Connecting...' : 'Get Started Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};
