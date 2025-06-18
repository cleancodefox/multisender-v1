
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Users, Trash2, CheckCircle, XCircle, Upload, FileText, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Recipient, DistributionMethod, AssetSelection, AssetType } from '@/types';
import { PublicKey } from '@solana/web3.js';

interface AddressManagerProps {
  recipients: Recipient[];
  onAddRecipient: (address: string, amount?: number) => void;
  onUpdateRecipient: (index: number, address: string, amount: number) => void;
  onRemoveRecipient: (index: number) => void;
  distributionMethod: DistributionMethod;
  assetSelection: AssetSelection;
}

export const AddressManager = ({
  recipients,
  onAddRecipient,
  onUpdateRecipient,
  onRemoveRecipient,
  distributionMethod,
  assetSelection
}: AddressManagerProps) => {
  const [manualAddress, setManualAddress] = useState('');
  const [manualAmount, setManualAmount] = useState<number | ''>('');
  const [isUploadingCSV, setIsUploadingCSV] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleManualAdd = () => {
    if (manualAddress.trim()) {
      const amount = distributionMethod === DistributionMethod.MANUAL ? (typeof manualAmount === 'number' ? manualAmount : 0) : 0;
      onAddRecipient(manualAddress, amount);
      setManualAddress('');
      setManualAmount('');
    }
  };

  const validateSolanaAddress = (address: string): boolean => {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  };

  const parseCSVContent = (content: string): { address: string; amount?: number }[] => {
    const lines = content.trim().split('\n');
    const results: { address: string; amount?: number }[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Skip header row if it contains common header terms
      if (i === 0 && /address|wallet|recipient|amount/i.test(line)) {
        continue;
      }

      const parts = line.split(',').map(part => part.trim().replace(/"/g, ''));
      
      if (parts.length >= 1) {
        const address = parts[0];
        const amount = parts.length > 1 ? parseFloat(parts[1]) : undefined;
        
        if (validateSolanaAddress(address)) {
          results.push({ 
            address, 
            amount: (distributionMethod === DistributionMethod.MANUAL && amount && !isNaN(amount)) ? amount : undefined 
          });
        }
      }
    }

    return results;
  };

  const handleCSVUpload = async (file: File) => {
    if (!file) return;

    setIsUploadingCSV(true);
    
    try {
      const content = await file.text();
      const parsedData = parseCSVContent(content);

      if (parsedData.length === 0) {
        toast({
          title: "No Valid Addresses Found",
          description: "The CSV file doesn't contain any valid Solana addresses.",
          variant: "destructive",
        });
        return;
      }

      // Add parsed recipients
      let addedCount = 0;
      parsedData.forEach(({ address, amount }) => {
        try {
          onAddRecipient(address, amount);
          addedCount++;
        } catch (error) {
          console.warn(`Failed to add address ${address}:`, error);
        }
      });

      toast({
        title: "CSV Uploaded Successfully",
        description: `${addedCount} recipients added from CSV file.`,
      });

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('CSV parsing error:', error);
      toast({
        title: "CSV Upload Failed",
        description: "Failed to parse CSV file. Please check the format and try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingCSV(false);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        toast({
          title: "Invalid File Type",
          description: "Please select a CSV file.",
          variant: "destructive",
        });
        return;
      }
      handleCSVUpload(file);
    }
  };

  const validRecipients = recipients.filter(r => r.isValid);
  const invalidRecipients = recipients.filter(r => r.isValid === false);
  
  const getCurrentUnit = () => {
    return assetSelection.type === AssetType.SOL 
      ? 'SOL' 
      : assetSelection.token?.symbol || 'TOKEN';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Users className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Manage Recipients</h2>
      </div>
      
      <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
        Add wallet addresses manually or upload a CSV file with multiple addresses.
      </p>

      {/* CSV Upload Section */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <Upload className="h-4 w-4 text-blue-600" />
          <h3 className="font-semibold text-blue-900 text-sm">CSV Upload</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingCSV}
              className="flex-1 h-10 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400"
            >
              {isUploadingCSV ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Choose CSV File
                </>
              )}
            </Button>
          </div>

          <div className="bg-blue-100 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">CSV Format:</p>
                <p className="mb-1">• First column: Wallet addresses</p>
                <p className="mb-1">• Second column: Amount (optional for manual mode)</p>
                <p>• Header row will be automatically detected and skipped</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Input Section */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Plus className="h-4 w-4 text-gray-600" />
          <h3 className="font-semibold text-gray-900 text-sm">Manual Entry</h3>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Input
            placeholder="Enter Solana wallet address..."
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            className="h-12 border-gray-300 focus:border-black focus:ring-black rounded-xl"
          />
          
          {distributionMethod === DistributionMethod.MANUAL && (
            <div className="flex gap-3">
              <Input
                type="number"
                step="0.000001"
                min="0"
                placeholder={`Amount (${getCurrentUnit()})`}
                value={manualAmount}
                onChange={(e) => setManualAmount(e.target.value === '' ? '' : Number(e.target.value))}
                className="flex-1 h-12 border-gray-300 focus:border-black focus:ring-black rounded-xl"
              />
              <Button 
                onClick={handleManualAdd} 
                className="h-12 bg-black hover:bg-gray-800 text-white font-medium px-6 rounded-xl"
              >
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>
          )}
          
          {distributionMethod === DistributionMethod.EQUAL && (
            <Button 
              onClick={handleManualAdd} 
              className="w-full sm:w-auto h-12 bg-black hover:bg-gray-800 text-white font-medium px-6 rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Recipient
            </Button>
          )}
        </div>
      </div>

      {recipients.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900">{recipients.length} Recipients</span>
              {validRecipients.length > 0 && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">{validRecipients.length} Valid</span>
                </div>
              )}
              {invalidRecipients.length > 0 && (
                <div className="flex items-center gap-1 text-red-600">
                  <XCircle className="h-4 w-4" />
                  <span className="text-sm">{invalidRecipients.length} Invalid</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Cards */}
          <div className="block sm:hidden space-y-3">
            {recipients.map((recipient, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 bg-white border rounded-md w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </span>
                    {recipient.isValid ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveRecipient(index)}
                    className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <p className="font-mono text-sm text-gray-900 break-all">
                    {recipient.address}
                  </p>
                  <Input
                    type="number"
                    step="0.000001"
                    min="0"
                    value={recipient.amount || ''}
                    onChange={(e) => onUpdateRecipient(index, recipient.address, Number(e.target.value))}
                    className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black rounded-lg"
                    disabled={distributionMethod === DistributionMethod.EQUAL}
                    placeholder="0.00"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-1">#</div>
                <div className="col-span-6">Wallet Address</div>
                <div className="col-span-3 text-right">Amount ({getCurrentUnit()})</div>
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-1"></div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {recipients.map((recipient, index) => (
                <div key={index} className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 text-sm text-gray-500">{index + 1}</div>
                    <div className="col-span-6">
                      <code className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {recipient.address.slice(0, 12)}...{recipient.address.slice(-8)}
                      </code>
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        step="0.000001"
                        min="0"
                        value={recipient.amount || ''}
                        onChange={(e) => onUpdateRecipient(index, recipient.address, Number(e.target.value))}
                        className="w-full h-9 text-sm text-right border-gray-300 focus:border-black focus:ring-black rounded-lg"
                        disabled={distributionMethod === DistributionMethod.EQUAL}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      {recipient.isValid ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                      )}
                    </div>
                    <div className="col-span-1 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveRecipient(index)}
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
