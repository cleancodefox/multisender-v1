
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
  DollarSign,
  Clock,
  TrendingUp,
  Copy
} from 'lucide-react';

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({ onConnect, isConnecting }: WelcomeScreenProps) => {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-black" />,
      title: "Toplu Gönderim",
      description: "Tek seferde 1000+ adrese token gönderin"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-black" />,
      title: "Düşük Komisyon", 
      description: "Solana'nın düşük ücretlerinden yararlanın"
    },
    {
      icon: <Zap className="h-6 w-6 text-black" />,
      title: "Hızlı İşlem",
      description: "Saniyeler içinde binlerce transfer"
    }
  ];

  const useCases = [
    "💰 Airdrop dağıtımları",
    "💸 Çalışan maaş ödemeleri", 
    "🎁 NFT holder ödülleri",
    "📊 Yatırımcı kar paylaşımları"
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
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
                  Bağlanıyor...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Cüzdan Bağla
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
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-black">Solana Mainnet</span>
            <Badge variant="secondary" className="bg-gray-100 text-black text-xs">
              Aktif
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Binlerce adrese{' '}
            <span className="text-gray-600">
              tek tıkla
            </span>
            <br/>
            token gönderin
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Solana blockchain'inde toplu token transferi yapmanın en kolay yolu.
            <br/>
            <span className="font-medium text-black">Airdrop, maaş, ödül dağıtımları için ideal.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 h-12 text-base font-medium rounded-xl shadow-sm group"
            >
              <Send className="h-4 w-4 mr-2" />
              {isConnecting ? 'Bağlanıyor...' : 'Hemen Başla'}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">~0.000005</div>
              <div className="text-sm text-gray-500">SOL per transfer</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">&lt;5s</div>
              <div className="text-sm text-gray-500">Ortalama süre</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">1000+</div>
              <div className="text-sm text-gray-500">Max adres</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">99.9%</div>
              <div className="text-sm text-gray-500">Başarı oranı</div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-3">
              Kimler Kullanıyor?
            </h2>
            <p className="text-lg text-gray-600">
              MultiSender ile neler yapabilirsiniz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                <span className="text-base">{useCase}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="py-16">
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

        {/* How it works */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-3">
              Nasıl Çalışır?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Cüzdan Bağla</h3>
              <p className="text-gray-600 text-sm">Solana cüzdanınızı güvenli şekilde bağlayın</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Adresleri Ekle</h3>
              <p className="text-gray-600 text-sm">CSV dosyası veya manuel olarak adresleri ekleyin</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Gönder</h3>
              <p className="text-gray-600 text-sm">Tek tıkla tüm transferleri gerçekleştirin</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 text-center">
          <div className="bg-black rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Toplu Transfer Yapmaya Hazır Mısınız?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Binlerce Solana projesi MultiSender kullanarak zaman ve para tasarrufu yapıyor
            </p>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-white hover:bg-gray-100 text-black px-10 h-14 text-lg font-medium rounded-xl shadow-sm group"
            >
              <Wallet className="h-5 w-5 mr-2" />
              {isConnecting ? 'Bağlanıyor...' : 'Ücretsiz Başla'}
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
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
              &copy; {new Date().getFullYear()} MultiSender.so - Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
