
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Upload, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

interface Recipient {
  address: string;
  amount: number;
  isValid?: boolean;
}

interface AddressManagerProps {
  recipients: Recipient[];
  onAddRecipient: (address: string, amount?: number) => void;
  onRemoveRecipient: (index: number) => void;
  distributionMethod: 'equal' | 'manual' | 'percentage';
}

export const AddressManager = ({ 
  recipients, 
  onAddRecipient, 
  onRemoveRecipient, 
  distributionMethod 
}: AddressManagerProps) => {
  const [newAddress, setNewAddress] = useState('');
  const [newAmount, setNewAmount] = useState<number>(0);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleAddRecipient = () => {
    if (newAddress.trim()) {
      onAddRecipient(newAddress.trim(), distributionMethod === 'manual' ? newAmount : 0);
      setNewAddress('');
      setNewAmount(0);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      // Mock CSV processing - in real app, parse CSV here
      const mockAddresses = [
        '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        '4v1vFRZdPsH5K5Jg8MZ5qQz6nV8mK2Xm7Y9tR3wE4uF6',
        '7PmQw3vBdHnS2KjF4Nx8cGzRtM5pL6qE9YmT1sA3bV4u'
      ];
      mockAddresses.forEach(addr => onAddRecipient(addr, 0.1));
    }
  };

  const validRecipients = recipients.filter(r => r.isValid);
  const invalidRecipients = recipients.filter(r => !r.isValid);
  const duplicates = recipients.filter((r, i) => 
    recipients.findIndex(item => item.address === r.address) !== i
  );

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-green-600" />
          Recipient Management
        </CardTitle>
        <CardDescription>
          Add recipient addresses manually or via CSV upload
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="csv">CSV Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="address">Recipient Address</Label>
                <Input
                  id="address"
                  placeholder="Enter Solana wallet address..."
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
              
              {distributionMethod === 'manual' && (
                <div>
                  <Label htmlFor="amount">Amount (SOL)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.0"
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                  />
                </div>
              )}
              
              <Button 
                onClick={handleAddRecipient}
                disabled={!newAddress.trim()}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Recipient
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="csv" className="space-y-4">
            <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center space-y-4">
              <Upload className="h-12 w-12 text-purple-400 mx-auto" />
              <div>
                <h3 className="font-semibold text-gray-900">Upload CSV File</h3>
                <p className="text-sm text-gray-600">
                  Format: address,amount (one per line)
                </p>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button asChild className="cursor-pointer">
                  <span>Choose CSV File</span>
                </Button>
              </label>
              {csvFile && (
                <p className="text-sm text-green-600">
                  ✓ {csvFile.name} uploaded successfully
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Validation Alerts */}
        {invalidRecipients.length > 0 && (
          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {invalidRecipients.length} invalid address(es) detected. Please review and correct.
            </AlertDescription>
          </Alert>
        )}

        {duplicates.length > 0 && (
          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {duplicates.length} duplicate address(es) found. Each address should be unique.
            </AlertDescription>
          </Alert>
        )}

        {/* Recipients List */}
        {recipients.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Recipients ({recipients.length})</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-green-600 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {validRecipients.length} Valid
                </Badge>
                {invalidRecipients.length > 0 && (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {invalidRecipients.length} Invalid
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto space-y-2">
              {recipients.map((recipient, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    recipient.isValid 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm truncate">
                      {recipient.address}
                    </p>
                    {distributionMethod !== 'equal' && (
                      <p className="text-sm font-semibold">
                        {recipient.amount.toFixed(6)} SOL
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveRecipient(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
