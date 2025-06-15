
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Send,
  ArrowRight,
  Zap,
  Shield,
  Network
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Send className="h-5 w-5 text-black" />
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight">MultiSender</h1>
                <Badge variant="outline" className="border-cyan-400 text-cyan-400 bg-transparent text-xs font-mono">
                  SOLANA
                </Badge>
              </div>
            </div>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-6 h-11 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/25"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-black rounded-full animate-spin mr-2"></div>
                  <span className="font-mono">CONNECTING...</span>
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  <span className="font-mono">CONNECT</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="pt-24 pb-20 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-full px-4 py-2 text-sm text-gray-300 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-mono">ENTERPRISE-GRADE DISTRIBUTION</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
            Send tokens to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              thousands
            </span>
            <br/>
            <span className="text-4xl md:text-6xl text-gray-400 font-normal">in one click</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            The simplest way to distribute tokens on Solana.<br/>
            Perfect for airdrops, payments, and rewards.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold px-12 h-16 text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/25 group"
            >
              <Network className="h-5 w-5 mr-3" />
              {isConnecting ? 'INITIALIZING...' : 'START DISTRIBUTION'}
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-bold text-cyan-400 mb-2">
                ~0.000005
              </div>
              <div className="text-sm text-gray-500 font-mono uppercase tracking-wide">SOL per transfer</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-bold text-green-400 mb-2">
                &lt;2s
              </div>
              <div className="text-sm text-gray-500 font-mono uppercase tracking-wide">Network time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-bold text-purple-400 mb-2">
                10K+
              </div>
              <div className="text-sm text-gray-500 font-mono uppercase tracking-wide">Max recipients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-bold text-blue-400 mb-2">
                99.99%
              </div>
              <div className="text-sm text-gray-500 font-mono uppercase tracking-wide">Success rate</div>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="py-20 border-t border-gray-800">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Engineering-Grade Distribution
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Built for scale. Designed for simplicity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Lightning Speed
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Leverage Solana's 65,000 TPS for instant bulk distributions
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center hover:border-green-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Military-Grade Security
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Non-custodial architecture. Your keys, your tokens, your control
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center hover:border-purple-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Network className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Mass Scale
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Distribute to 10,000+ wallets in a single atomic transaction
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-3xl p-12 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready for Launch?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
                Join the future of token distribution. Scale to millions.
              </p>
              <Button 
                onClick={onConnect}
                disabled={isConnecting}
                size="lg"
                className="bg-white hover:bg-gray-100 text-black font-bold px-12 h-16 text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-white/25 group"
              >
                <Wallet className="h-6 w-6 mr-3" />
                {isConnecting ? 'INITIALIZING SYSTEMS...' : 'LAUNCH DISTRIBUTION'}
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md flex items-center justify-center">
                <Send className="h-3 w-3 text-black" />
              </div>
              <span className="font-bold text-white">MultiSender</span>
            </div>
            <p className="text-sm text-gray-500 font-mono">
              {new Date().getFullYear()} • SOLANA NETWORK
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
