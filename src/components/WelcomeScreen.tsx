
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Zap, 
  Shield, 
  Users,
  Send,
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const features = [
    {
      icon: <Zap className="h-5 w-5 text-black" />,
      title: "Instant Distribution",
      description: "Send tokens to thousands of wallets in a single, optimized transaction."
    },
    {
      icon: <Shield className="h-5 w-5 text-black" />,
      title: "Secure & Decentralized", 
      description: "Your assets remain in your control. We never touch your private keys."
    },
    {
      icon: <Users className="h-5 w-5 text-black" />,
      title: "Effortless Management",
      description: "Easily manage recipient lists with our intuitive interface and CSV import."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="py-24 sm:py-32 text-center">
          <Badge variant="outline" className="mb-6 border-gray-200 text-gray-600 font-medium py-1.5 px-4 rounded-full">
            #1 Bulk Transfer Platform on Solana
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight tracking-tighter">
            Send tokens to thousands <br/> of wallets at once.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-3xl mx-auto">
            The most advanced and secure bulk transfer tool on Solana. Save time, reduce transaction fees, and scale your distribution operations with ease.
          </p>

          <Button 
            onClick={onConnect}
            disabled={isConnecting}
            size="lg"
            className="bg-black hover:bg-gray-800 text-white px-8 h-12 text-base font-medium rounded-xl group"
          >
            <Wallet className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            {isConnecting ? 'Connecting...' : 'Get Started for Free'}
          </Button>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tighter">Built for scale, designed for simplicity.</h2>
            <p className="text-lg text-gray-500 mt-3 max-w-2xl mx-auto">Focus on your community, we'll handle the complex distribution logic.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-transparent rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-5 border border-gray-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="py-24">
          <div className="max-w-4xl mx-auto text-center">
            <img src="/placeholder.svg" alt="Company Logo" className="h-8 mx-auto mb-8 opacity-30" />
            <blockquote className="text-2xl md:text-3xl font-medium text-black mb-8 leading-snug">
              "MultiSender.so saved us over 40 hours on our last airdrop. The interface is incredibly clean, and the transaction speed is insane. A must-have tool for any Solana project."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black font-semibold border border-gray-200">
                JD
              </div>
              <div className="text-left">
                <div className="text-black font-semibold">John Dao</div>
                <div className="text-gray-500">Founder @SolanaLabs</div>
              </div>
            </div>
          </div>
        </div>
      </main>

       {/* Footer */}
       <footer className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MultiSender.so - All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
