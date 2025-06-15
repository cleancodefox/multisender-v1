
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Upload, Users, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Recipient {
  address: string;
  amount: number;
  isValid?: boolean;
}

interface AddressManagerProps {
  recipients: Recipient[];
  onAddRecipient: (address: string, amount?: number) => void;
  onUpdateRecipient: (index: number, address: string, amount: number) => void;
  onRemoveRecipient: (index: number) => void;
  distributionMethod: 'equal' | 'manual';
}

export const AddressManager = ({
  recipients,
  onAddRecipient,
  onUpdateRecipient,
  onRemoveRecipient,
  distributionMethod
}: AddressManagerProps) => {
  const [manualAddress, setManualAddress] = useState('');
  const [manualAmount, setManualAmount] = useState<number | ''>('');
  const [activeTab, setActiveTab] = useState('manual');
  const { toast } = useToast();

  const handleManualAdd = () => {
    if (manualAddress.trim()) {
      const amount = distributionMethod === 'manual' ? (typeof manualAmount === 'number' ? manualAmount : 0) : 0;
      onAddRecipient(manualAddress, amount);
      setManualAddress('');
      setManualAmount('');
      toast({
        title: "Recipient Added",
        description: "The address was successfully added to the list.",
      });
    }
  };

  const validRecipients = recipients.filter(r => r.isValid);
  const invalidRecipients = recipients.filter(r => r.isValid === false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-bold text-gray-900">Manage Recipients</h2>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">
        Add wallet addresses manually or via CSV file upload.
      </p>

      {/* Tab Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {[
          { id: 'manual', label: 'Manual Entry' },
          { id: 'csv', label: 'CSV Upload' },
          { id: 'nft', label: 'NFT Holders', disabled: true },
          { id: 'token', label: 'Token Holders', disabled: true }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            disabled={tab.disabled}
            className={`p-3 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-black text-white'
                : tab.disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'manual' && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Input
            placeholder="Enter Solana wallet address..."
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            className="flex-1 h-11 border-gray-300 focus:border-black focus:ring-black rounded-lg"
          />
          {distributionMethod === 'manual' && (
            <Input
              type="number"
              step="0.000001"
              min="0"
              placeholder="Amount (SOL)"
              value={manualAmount}
              onChange={(e) => setManualAmount(e.target.value === '' ? '' : Number(e.target.value))}
              className="sm:w-36 h-11 border-gray-300 focus:border-black focus:ring-black rounded-lg"
            />
          )}
          <Button 
            onClick={handleManualAdd} 
            className="h-11 bg-black hover:bg-gray-800 text-white font-medium px-6 rounded-lg"
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      )}

      {activeTab === 'csv' && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer mb-6">
          <Upload className="h-8 w-8 mx-auto mb-3 text-gray-400" />
          <p className="font-medium text-gray-700 mb-1">Drop CSV file here or click to browse</p>
          <p className="text-sm text-gray-500">Format: address,amount (one per line)</p>
        </div>
      )}

      {/* Recipients List */}
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
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-1">#</div>
                <div className="col-span-6">Wallet Address</div>
                <div className="col-span-3 text-right">Amount (SOL)</div>
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
                        className="w-full h-9 text-sm text-right border-gray-300 focus:border-black focus:ring-black rounded"
                        disabled={distributionMethod === 'equal'}
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
