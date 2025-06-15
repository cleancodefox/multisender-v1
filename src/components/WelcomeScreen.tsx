
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Send,
  ArrowRight,
  CheckCircle,
  Users,
  Zap,
  Shield
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const features = [
    {
      icon: <Send className="h-5 w-5 text-gray-600" />,
      title: "Bulk Token Transfers",
      description: "Send tokens to thousands of addresses in a single transaction"
    },
    {
      icon: <Zap className="h-5 w-5 text-gray-600" />,
      title: "Lightning Fast",
      description: "Complete transfers in seconds using Solana's high-speed network"
    },
    {
      icon: <Shield className="h-5 w-5 text-gray-600" />,
      title: "Secure & Reliable",
      description: "Non-custodial solution with 99.9% success rate"
    }
  ];

  const useCases = [
    "Airdrop distributions",
    "Employee salary payments", 
    "NFT holder rewards",
    "Investor profit sharing",
    "Community rewards",
    "Token vesting releases"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Send className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-black">MultiSender</h1>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                Solana
              </Badge>
            </div>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              className="bg-black text-white hover:bg-gray-800 px-6 h-10 text-sm font-medium"
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
        <div className="pt-20 pb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Send tokens to{' '}
            <span className="text-gray-500">
              thousands
            </span>
            <br/>
            in one click
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            The simplest way to distribute tokens on Solana.<br/>
            Perfect for airdrops, payments, and rewards.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 h-12 text-base font-medium group"
            >
              <Send className="h-4 w-4 mr-2" />
              {isConnecting ? 'Connecting...' : 'Start Sending'}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">~0.000005</div>
              <div className="text-sm text-gray-500">SOL per transfer</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">&lt;5s</div>
              <div className="text-sm text-gray-500">Average time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">1000+</div>
              <div className="text-sm text-gray-500">Recipients per batch</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">99.9%</div>
              <div className="text-sm text-gray-500">Success rate</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Why Choose MultiSender?
            </h2>
            <p className="text-lg text-gray-600">
              Built for scale, designed for simplicity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200 bg-white p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Perfect For
            </h2>
            <p className="text-lg text-gray-600">
              Common use cases for bulk token distribution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{useCase}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to bulk token distribution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-3">Connect Wallet</h3>
              <p className="text-gray-600 text-sm">Securely connect your Solana wallet</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-3">Add Recipients</h3>
              <p className="text-gray-600 text-sm">Upload CSV or add addresses manually</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-3">Send Tokens</h3>
              <p className="text-gray-600 text-sm">Execute all transfers with one click</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 text-center">
          <div className="bg-gray-900 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Bulk Sending?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Join thousands of projects using MultiSender for efficient token distribution
            </p>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-white hover:bg-gray-100 text-black px-10 h-14 text-lg font-medium group"
            >
              <Wallet className="h-5 w-5 mr-2" />
              {isConnecting ? 'Connecting...' : 'Get Started Free'}
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
                <Send className="h-3 w-3 text-white" />
              </div>
              <span className="font-medium text-black">MultiSender</span>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} MultiSender - All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
