
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
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      title: "Lightning Fast",
      description: "Send to 1000+ wallets in seconds. No more waiting around.",
      highlight: "1000+ wallets"
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-500" />,
      title: "100% Secure", 
      description: "Your keys, your coins. Fully decentralized and trustless.",
      highlight: "Your control"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
      title: "Save Big",
      description: "Cut costs by 90%. Bulk transfers = massive savings.",
      highlight: "90% cheaper"
    }
  ];

  const stats = [
    { value: "10M+", label: "Tokens Sent" },
    { value: "50K+", label: "Users" },
    { value: "99.9%", label: "Success Rate" },
    { value: "$0", label: "Hidden Fees" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-200/60 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Send className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MultiSender.so
                </h1>
                <p className="text-xs text-gray-500 font-medium">Powered by Solana</p>
              </div>
            </div>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              variant="outline"
              className="border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-sm"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mr-2"></div>
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
            <span className="text-sm font-semibold text-blue-700">#1 on Solana</span>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5">
              Free
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight animate-fade-in">
            Send crypto to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              thousands
            </span>
            <br/>
            at once
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-200">
            The fastest way to distribute tokens on Solana. 
            <br className="hidden md:block"/>
            <span className="font-semibold text-gray-800">Simple. Fast. Cheap.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in delay-300">
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 h-14 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Wallet className="h-5 w-5 mr-3" />
              {isConnecting ? 'Connecting...' : 'Start Free'}
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-14 px-8 text-lg font-medium rounded-2xl border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 animate-fade-in delay-500">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-200">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why MultiSender?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for speed, security, and savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden bg-white/90 backdrop-blur-sm border border-gray-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/50"></div>
                <CardContent className="relative p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300 border border-gray-200/50">
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
          <Card className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-purple-700 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-12 text-center text-white relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-3xl md:text-4xl font-bold mb-8 leading-relaxed">
                  "Saved us 40+ hours on our airdrop. 
                  <br className="hidden md:block"/>
                  This tool is a game-changer!"
                </blockquote>
                <div className="flex items-center justify-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
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
              Ready to send?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of projects using MultiSender
            </p>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 h-16 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <Wallet className="h-6 w-6 mr-3" />
              {isConnecting ? 'Connecting...' : 'Get Started'}
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
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
