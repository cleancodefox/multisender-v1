
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="rounded-xl p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Review Transfer</h2>
            <p className="text-sm text-gray-500">Confirm before sending</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Card */}
        <Card className="border-0 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Transaction Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Recipients</span>
              <span className="font-medium">{validRecipients.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-medium">{totalCost.toFixed(6)} SOL</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Network Fees</span>
              <span className="font-medium">{networkFees.toFixed(6)} SOL</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-semibold">
              <span>Total Cost</span>
              <span className="text-green-600">{(totalCost + networkFees).toFixed(6)} SOL</span>
            </div>
          </CardContent>
        </Card>

        {/* Status Alert */}
        <Alert className="bg-green-50 border-green-200 rounded-xl">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            All addresses validated and ready for transfer
          </AlertDescription>
        </Alert>

        {/* Recipients List */}
        <Card className="border-0 bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recipients ({validRecipients.length})</CardTitle>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 rounded-lg">
                <CheckCircle className="h-3 w-3 mr-1" />
                All Valid
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto space-y-3">
              {validRecipients.map((recipient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm text-gray-900 truncate">
                      {recipient.address}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="rounded-lg">#{index + 1}</Badge>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs text-green-600">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Explorer
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{recipient.amount.toFixed(6)}</p>
                    <p className="text-xs text-gray-500">SOL</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="border-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="font-medium">Important Notice</h3>
                <p className="text-sm opacity-90">
                  This action cannot be undone. Double-check all addresses and amounts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <Button 
          className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-xl"
          onClick={onConfirm}
        >
          <Send className="h-4 w-4 mr-2" />
          Execute Transfer
        </Button>
      </div>
    </div>
  );
};
