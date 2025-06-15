
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Zap, 
  Shield, 
  Send,
  ArrowRight,
  CheckCircle,
  Users,
  DollarSign
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const features = [
    {
      icon: <Zap className="h-5 w-5 text-gray-600" />,
      title: "Lightning Fast",
      description: "Send to 1000+ wallets instantly"
    },
    {
      icon: <Shield className="h-5 w-5 text-gray-600" />,
      title: "100% Secure", 
      description: "Your keys, your control"
    },
    {
      icon: <DollarSign className="h-5 w-5 text-gray-600" />,
      title: "Save 90%",
      description: "Bulk transfers = massive savings"
    }
  ];

  const stats = [
    { value: "10M+", label: "Tokens Sent" },
    { value: "50K+", label: "Users" },
    { value: "99.9%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header - Ana panel ile aynı stil */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Send className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-black">MultiSender.so</h1>
            </div>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              className="bg-black text-white hover:bg-gray-800 rounded-xl px-4 text-sm font-medium h-10"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin mr-2"></div>
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
        <div className="pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-black">#1 on Solana</span>
            <Badge variant="secondary" className="bg-gray-100 text-black text-xs">
              Free
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Send crypto to{' '}
            <span className="text-gray-600">
              thousands
            </span>
            <br/>
            at once
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
            The fastest way to distribute tokens on Solana.
            <br/>
            <span className="font-medium text-black">Simple. Fast. Cheap.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 h-12 text-base font-medium rounded-xl shadow-sm group"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isConnecting ? 'Connecting...' : 'Start Free'}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-12 px-8 text-base font-medium rounded-xl border border-gray-200 hover:bg-gray-50"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-black mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-3">
              Why MultiSender?
            </h2>
            <p className="text-lg text-gray-600">
              Built for speed, security, and savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="py-16">
          <Card className="max-w-3xl mx-auto bg-black border-0 text-white">
            <CardContent className="p-8 text-center">
              <blockquote className="text-xl md:text-2xl font-semibold mb-6">
                "Saved us 40+ hours on our airdrop. 
                This tool is a game-changer!"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-semibold text-sm">
                  JD
                </div>
                <div className="text-left">
                  <div className="font-medium">John Dao</div>
                  <div className="text-gray-400 text-sm">Founder @SolanaLabs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="py-16 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to send?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of projects using MultiSender
          </p>
          <Button 
            onClick={onConnect}
            disabled={isConnecting}
            size="lg"
            className="bg-black hover:bg-gray-800 text-white px-10 h-14 text-lg font-medium rounded-xl shadow-sm group"
          >
            <Wallet className="h-5 w-5 mr-2" />
            {isConnecting ? 'Connecting...' : 'Get Started'}
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
                <Send className="h-3 w-3 text-white" />
              </div>
              <span className="font-medium text-black">MultiSender.so</span>
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
