
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
  Send
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast",
      description: "Send to 1000+ wallets instantly"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Secure", 
      description: "Non-custodial & trustless"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Save Time",
      description: "Bulk transfers in one click"
    }
  ];

  const stats = [
    { label: "Total Transfers", value: "2.4M+" },
    { label: "Volume", value: "$890M+" },
    { label: "Users", value: "45K+" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Send className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-black">MultiSender.so</h1>
              <p className="text-xs text-gray-500">Bulk token distribution on Solana</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="mb-8">
          <Badge variant="outline" className="mb-6 border-gray-200 text-gray-700">
            #1 Solana Multisender
          </Badge>
          
          <h1 className="text-5xl font-bold text-black mb-6 leading-tight">
            Send tokens to<br />
            <span className="text-gray-600">thousands at once</span>
          </h1>
          
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
            The most advanced bulk transfer tool on Solana. Save time, reduce fees, and scale your distribution.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 mb-16">
          <Button 
            onClick={onConnect}
            disabled={isConnecting}
            size="lg"
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-base font-medium h-auto"
          >
            <Wallet className="h-4 w-4 mr-2" />
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex -space-x-1">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-6 h-6 bg-gray-100 border border-white rounded-full flex items-center justify-center text-gray-600 text-xs">
                  {i}
                </div>
              ))}
            </div>
            <span>Trusted by 45K+ users</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100 hover:border-gray-200 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4 text-gray-700">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-20">
          <div className="flex justify-center mb-4">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
          
          <blockquote className="text-xl text-gray-700 mb-6 font-medium">
            "Saved us 40+ hours during our airdrop. Clean interface, incredible speed."
          </blockquote>
          
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              JD
            </div>
            <div className="text-left">
              <div className="text-black font-medium">John Dao</div>
              <div className="text-gray-500 text-sm">Founder @SolanaLabs</div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to scale your distribution?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Join thousands who chose us for their token launches
          </p>
          
          <Button 
            onClick={onConnect}
            disabled={isConnecting}
            size="lg"
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-base font-medium h-auto"
          >
            <Wallet className="h-4 w-4 mr-2" />
            {isConnecting ? 'Connecting...' : 'Get Started'}
          </Button>
        </div>
      </div>
    </div>
  );
};
