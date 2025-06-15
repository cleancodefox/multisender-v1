import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Send, CheckCircle, AlertTriangle, ExternalLink, Shield } from 'lucide-react';

interface Recipient {
  address: string;
  amount: number;
  isValid?: boolean;
}

interface TransferPreviewProps {
  recipients: Recipient[];
  totalCost: number;
  networkFees: number;
  onBack: () => void;
  onConfirm: () => void;
}

export const TransferPreview = ({
  recipients,
  totalCost,
  networkFees,
  onBack,
  onConfirm
}: TransferPreviewProps) => {
  const validRecipients = recipients.filter(r => r.isValid !== false);
  const solPrice = 160; // Mock price

  return (
    <div className="min-h-screen bg-gray-50/50">
       <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={onBack} className="rounded-full h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Transferi Onayla</h2>
              <p className="text-sm text-gray-500">Bu işlem geri alınamaz, lütfen detayları kontrol edin.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6 pb-32">
        {/* Summary Card */}
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-black">İşlem Detayları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Gönderilecek Toplam Tutar</span>
              <div className="text-right">
                <span className="font-bold text-black">{totalCost.toFixed(6)} SOL</span>
                <p className="text-xs text-gray-500">${(totalCost * solPrice).toFixed(2)}</p>
              </div>
            </div>
             <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Tahmini Ağ Ücreti</span>
              <span className="font-medium text-black">{networkFees.toFixed(6)} SOL</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-black">TOPLAM MALİYET</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-black">
                  {(totalCost + networkFees).toFixed(6)} SOL
                </div>
                <div className="text-sm text-gray-500">
                  ~${((totalCost + networkFees) * solPrice).toFixed(2)} USD
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipients List */}
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
             <CardTitle className="text-black">Alıcılar ({validRecipients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-80 overflow-y-auto space-y-2 pr-2 -mr-2">
              {validRecipients.map((recipient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <div className="flex items-center gap-3 min-w-0">
                     <div className="text-xs text-gray-400 font-mono bg-white border rounded-md w-8 h-8 flex items-center justify-center">{index + 1}</div>
                     <div>
                        <p className="font-mono text-sm text-black truncate">
                          {recipient.address}
                        </p>
                         <Badge variant="secondary" className="bg-white border text-gray-600 mt-1">
                          {recipient.amount.toFixed(6)} SOL
                        </Badge>
                     </div>
                  </div>
                   <Button variant="ghost" size="sm" asChild className="h-auto p-0 text-xs text-gray-500 hover:text-black">
                      <a href={`https://solscan.io/account/${recipient.address}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Final Warning */}
        <Alert variant="destructive" className="bg-red-500 border-none text-white shadow-lg">
          <AlertTriangle className="h-5 w-5 text-white" />
          <AlertTitle className="font-bold text-lg">DİKKAT: Bu işlem geri alınamaz!</AlertTitle>
          <AlertDescription className="opacity-90">
            Onayladığınızda, tokenlar cüzdanınızdan çıkacak ve belirtilen adreslere gönderilecektir. 
            Lütfen tüm bilgilerin doğruluğundan emin olun.
          </AlertDescription>
        </Alert>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Button 
            className="w-full h-14 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-lg"
            onClick={onConfirm}
          >
            <Shield className="h-5 w-5 mr-2" />
            Onayla ve {validRecipients.length} Adrese Gönder
          </Button>
        </div>
      </div>
    </div>
  );
};
