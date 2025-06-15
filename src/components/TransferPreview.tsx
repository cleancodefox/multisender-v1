
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Send, CheckCircle, AlertTriangle, ExternalLink, Zap, Shield } from 'lucide-react';

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
  const validRecipients = recipients.filter(r => r.isValid);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 pb-20">
      {/* Enhanced Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="rounded-xl p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Final Review</h2>
            <p className="text-sm text-gray-500">Double-check before execution</p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
            <Shield className="h-3 w-3 mr-1" />
            Secure
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Enhanced Summary Card */}
        <Card className="border-0 bg-gradient-to-r from-white to-green-50 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Transaction Overview
            </CardTitle>
            <CardDescription>
              You're about to send tokens to {validRecipients.length} recipients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipients</span>
                  <span className="font-bold text-lg">{validRecipients.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Token</span>
                  <Badge variant="secondary" className="bg-gray-100">SOL</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-bold text-lg">{totalCost.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network Fees</span>
                  <span className="font-semibold">{networkFees.toFixed(6)}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Final Cost</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {(totalCost + networkFees).toFixed(6)} SOL
                </div>
                <div className="text-xs text-gray-500">
                  ~${((totalCost + networkFees) * 180).toFixed(2)} USD
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Status Alert */}
        <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 rounded-xl shadow-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800 font-medium">
            🎯 All systems ready! Your transfer will be processed in the next block.
          </AlertDescription>
        </Alert>

        {/* Enhanced Recipients List */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recipients Preview</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 rounded-lg">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {validRecipients.length} Valid
                </Badge>
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 rounded-lg">
                  <Zap className="h-3 w-3 mr-1" />
                  Gas Optimized
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-80 overflow-y-auto space-y-3">
              {validRecipients.slice(0, 5).map((recipient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm text-gray-900 truncate">
                      {recipient.address}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="rounded-lg">
                        #{index + 1}
                      </Badge>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs text-green-600 hover:text-green-700">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-green-600">
                      {recipient.amount.toFixed(6)}
                    </p>
                    <p className="text-xs text-gray-500">SOL</p>
                  </div>
                </div>
              ))}
              
              {validRecipients.length > 5 && (
                <div className="p-4 text-center border-2 border-dashed border-gray-200 rounded-xl">
                  <p className="text-gray-600 font-medium">
                    + {validRecipients.length - 5} more recipients
                  </p>
                  <p className="text-xs text-gray-500">
                    All addresses have been validated
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Warning */}
        <Card className="border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-bold text-lg">⚠️ Final Warning</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  This action is irreversible. Once executed, tokens will be immediately sent to all recipients. 
                  Please verify all addresses and amounts are correct.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">Live on Solana Mainnet</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <Button 
          className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1"
          onClick={onConfirm}
        >
          <Send className="h-5 w-5 mr-2" />
          Execute Transfer Now
          <Badge variant="secondary" className="ml-3 bg-white/20 text-white border-white/30">
            {validRecipients.length} recipients
          </Badge>
        </Button>
      </div>
    </div>
  );
};
