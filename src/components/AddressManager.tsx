
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Upload, Trash2, AlertTriangle, CheckCircle, Users } from 'lucide-react';

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

  return (
    <Card className="border-0 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-green-600" />
          Recipients
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Add wallet addresses manually or via CSV
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
            <TabsTrigger value="manual" className="rounded-lg">Manual</TabsTrigger>
            <TabsTrigger value="csv" className="rounded-lg">CSV Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">Wallet Address</Label>
                <Input
                  id="address"
                  placeholder="Enter Solana address..."
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="font-mono text-sm bg-gray-50 border-gray-200 rounded-xl"
                />
              </div>
              
              {distributionMethod === 'manual' && (
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm font-medium text-gray-700">Amount (SOL)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.0"
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    className="bg-gray-50 border-gray-200 rounded-xl"
                  />
                </div>
              )}
              
              <Button 
                onClick={handleAddRecipient}
                disabled={!newAddress.trim()}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl h-11"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="csv" className="space-y-4 mt-4">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Upload CSV File</h3>
                <p className="text-sm text-gray-500">Format: address,amount</p>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button asChild className="cursor-pointer bg-gray-900 hover:bg-gray-800 rounded-xl">
                  <span>Choose File</span>
                </Button>
              </label>
              {csvFile && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ {csvFile.name} uploaded
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Validation Alerts */}
        {invalidRecipients.length > 0 && (
          <Alert className="mt-4 bg-red-50 border-red-200 rounded-xl">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {invalidRecipients.length} invalid address(es) detected
            </AlertDescription>
          </Alert>
        )}

        {/* Recipients List */}
        {recipients.length > 0 && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Added ({recipients.length})</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 rounded-lg">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {validRecipients.length}
                </Badge>
                {invalidRecipients.length > 0 && (
                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {invalidRecipients.length}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="max-h-48 overflow-y-auto space-y-2">
              {recipients.map((recipient, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    recipient.isValid 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm truncate text-gray-900">
                      {recipient.address}
                    </p>
                    {distributionMethod !== 'equal' && (
                      <p className="text-xs font-medium text-gray-600">
                        {recipient.amount.toFixed(6)} SOL
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveRecipient(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg h-8 w-8 p-0"
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
