
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Zap, 
  Shield, 
  Clock, 
  Users,
  Send,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles
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
      description: "Send to over 1000 wallets instantly in a single transaction with unprecedented speed.",
      highlight: "1000+ wallets"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      title: "100% Secure", 
      description: "Your assets remain under your complete control with fully decentralized architecture.",
      highlight: "Decentralized"
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      title: "Save Time",
      description: "Transform hours of manual work into seconds with intelligent bulk transfer automation.",
      highlight: "Save 95% time"
    }
  ];

  const stats = [
    { value: "10M+", label: "Tokens Transferred" },
    { value: "50K+", label: "Happy Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "$0", label: "Platform Fees" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-100/40 to-blue-100/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-100/80 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                <Send className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  MultiSender.so
                </h1>
                <p className="text-xs text-gray-500 font-medium">Powered by Solana</p>
              </div>
            </div>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-semibold text-blue-700">#1 Bulk Transfer Platform on Solana</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
              New
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight animate-fade-in">
            Send tokens to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              thousands
            </span>
            <br/>
            of addresses at once
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-200">
            The most advanced bulk transfer tool on Solana. Save time, reduce transaction costs, 
            and scale your distribution operations with enterprise-grade reliability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in delay-300">
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-8 h-14 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Wallet className="h-5 w-5 mr-3" />
              {isConnecting ? 'Connecting...' : 'Get Started Free'}
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-14 px-8 text-lg font-medium rounded-2xl border-2 hover:bg-gray-50 transition-all duration-200"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 animate-fade-in delay-500">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose MultiSender?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for the next generation of crypto operations with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50"></div>
                <CardContent className="relative p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <Badge variant="outline" className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700 font-semibold">
                    {feature.highlight}
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="py-24">
          <Card className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-12 text-center text-white relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-3xl md:text-4xl font-bold mb-8 leading-relaxed">
                  "Saved us over 40 hours on our airdrop process. The interface is incredibly intuitive, 
                  and the speed is just unmatched."
                </blockquote>
                <div className="flex items-center justify-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    JD
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-white">John Dao</div>
                    <div className="text-blue-200 font-medium">Founder @SolanaLabs</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to scale your operations?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of projects already using MultiSender to distribute tokens efficiently
            </p>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-12 h-16 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <Wallet className="h-6 w-6 mr-3" />
              {isConnecting ? 'Connecting...' : 'Start Building Today'}
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center">
                <Send className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">MultiSender.so</span>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} MultiSender.so - All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
