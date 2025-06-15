
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
  Star
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const features = [
    {
      icon: <Zap className="h-5 w-5 text-black" />,
      title: "Işık Hızında",
      description: "Tek seferde 1000'den fazla cüzdana anında gönderim yapın."
    },
    {
      icon: <Shield className="h-5 w-5 text-black" />,
      title: "%100 Güvenli", 
      description: "Varlıklarınız sizin kontrolünüzde, tamamen merkeziyetsiz."
    },
    {
      icon: <Clock className="h-5 w-5 text-black" />,
      title: "Zaman Kazanın",
      description: "Toplu transferleri tek bir tıkla saniyeler içinde halledin."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-100">
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
              className="border-gray-200 hover:bg-gray-50"
            >
              {isConnecting ? 'Bağlanıyor...' : 'Cüzdan Bağla'}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="py-24 sm:py-32 text-center">
          <Badge variant="outline" className="mb-6 border-gray-200 text-gray-600 font-medium py-1 px-3">
            #1 Toplu Gönderim Platformu
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Tokenlarınızı binlerce adrese <br/> aynı anda gönderin
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Solana üzerindeki en gelişmiş toplu transfer aracı. Zamandan tasarruf edin, işlem ücretlerini azaltın ve dağıtım operasyonlarınızı ölçeklendirin.
          </p>

          <Button 
            onClick={onConnect}
            disabled={isConnecting}
            size="lg"
            className="bg-black hover:bg-gray-800 text-white px-8 h-12 text-base font-medium rounded-xl"
          >
            <Wallet className="h-4 w-4 mr-2" />
            {isConnecting ? 'Bağlanıyor...' : 'Hemen Başla'}
          </Button>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 border border-gray-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl font-medium text-black mb-6">
              "Airdrop sürecimizde bize 40 saatten fazla kazandırdı. İnanılmaz temiz arayüz, akıl almaz bir hız."
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
