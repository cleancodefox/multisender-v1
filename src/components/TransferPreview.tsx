
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Send, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Edit
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Transfer Preview</h2>
          <p className="text-gray-600">Review your bulk transfer before execution</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recipients ({validRecipients.length})</span>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  All Valid
                </Badge>
              </CardTitle>
              <CardDescription>
                List of all recipients and amounts to be transferred
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {validRecipients.map((recipient, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm text-gray-900 truncate">
                        {recipient.address}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">#{index + 1}</Badge>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View on Explorer
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{recipient.amount.toFixed(6)}</p>
                      <p className="text-sm text-gray-500">SOL</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipients</span>
                  <span className="font-semibold">{validRecipients.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold">{totalCost.toFixed(6)} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network Fees</span>
                  <span className="font-semibold">{networkFees.toFixed(6)} SOL</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Cost</span>
                  <span className="text-purple-600">{(totalCost + networkFees).toFixed(6)} SOL</span>
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  All addresses have been validated and are ready for transfer.
                </AlertDescription>
              </Alert>

              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                onClick={onConfirm}
                size="lg"
              >
                <Send className="h-4 w-4 mr-2" />
                Execute Transfer
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Important Notice</h3>
                  <p className="text-sm opacity-90">
                    This action cannot be undone. Please double-check all recipient addresses and amounts before proceeding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
