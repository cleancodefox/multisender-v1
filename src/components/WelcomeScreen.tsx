
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Zap, 
  Shield, 
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
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Lightning Fast",
      description: "Send to 1000+ wallets instantly"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "100% Secure", 
      description: "Your keys, your control"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Save 90%",
      description: "Bulk transfers = massive savings"
    }
  ];

  const stats = [
    { value: "10M+", label: "Tokens Sent" },
    { value: "50K+", label: "Users" },
    { value: "99.9%", label: "Success Rate" },
    { value: "$0", label: "Hidden Fees" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Send className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  MultiSender.so
                </h1>
                <p className="text-xs text-gray-500">Powered by Solana</p>
              </div>
            </div>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              variant="outline"
              className="border-gray-200 hover:bg-blue-50 hover:border-blue-200"
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
      <main className="max-w-6xl mx-auto px-6">
        <div className="pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">#1 on Solana</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
              Free
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Send crypto to{' '}
            <span className="text-blue-600">
              thousands
            </span>
            <br/>
            at once
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            The fastest way to distribute tokens on Solana.
            <br/>
            <span className="font-semibold text-gray-800">Simple. Fast. Cheap.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Wallet className="h-5 w-5 mr-3" />
              {isConnecting ? 'Connecting...' : 'Start Free'}
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-14 px-8 text-lg font-medium rounded-xl border-2 border-gray-200 hover:bg-gray-50"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why MultiSender?
            </h2>
            <p className="text-xl text-gray-600">
              Built for speed, security, and savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-100 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="py-20">
          <Card className="max-w-4xl mx-auto bg-blue-600 border-0 text-white">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl md:text-3xl font-bold mb-8">
                "Saved us 40+ hours on our airdrop. 
                This tool is a game-changer!"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  JD
                </div>
                <div className="text-left">
                  <div className="font-bold">John Dao</div>
                  <div className="text-blue-200">Founder @SolanaLabs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="py-20 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to send?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of projects using MultiSender
          </p>
          <Button 
            onClick={onConnect}
            disabled={isConnecting}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 h-16 text-xl font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <Wallet className="h-6 w-6 mr-3" />
            {isConnecting ? 'Connecting...' : 'Get Started'}
            <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
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
