
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Upload, Users, Trash2 } from 'lucide-react';
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
    <div className="border border-white bg-black p-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="h-6 w-6" />
        <h2 className="text-2xl font-bold">MANAGE RECIPIENTS</h2>
      </div>
      
      <p className="text-sm opacity-70 mb-8">
        Add wallet addresses manually, via CSV file, or with holder snapshots.
      </p>

      {/* Tab Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {[
          { id: 'manual', label: 'MANUAL' },
          { id: 'csv', label: 'CSV' },
          { id: 'nft', label: 'NFT HOLDER', disabled: true },
          { id: 'token', label: 'TOKEN HOLDER', disabled: true }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            disabled={tab.disabled}
            className={`p-3 border border-white font-bold text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-black'
                : tab.disabled
                ? 'bg-black text-gray-500 border-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-white hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'manual' && (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            placeholder="Enter wallet address..."
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            className="flex-1 h-12 border border-white bg-black text-white focus:border-white"
          />
          {distributionMethod === 'manual' && (
            <Input
              type="number"
              step="0.000001"
              min="0"
              placeholder="Amount (SOL)"
              value={manualAmount}
              onChange={(e) => setManualAmount(e.target.value === '' ? '' : Number(e.target.value))}
              className="sm:w-36 h-12 border border-white bg-black text-white focus:border-white"
            />
          )}
          <Button 
            onClick={handleManualAdd} 
            className="h-12 bg-white hover:bg-gray-200 text-black font-bold"
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">ADD</span>
          </Button>
        </div>
      )}

      {activeTab === 'csv' && (
        <div className="border border-white p-8 text-center hover:bg-white hover:text-black transition-colors cursor-pointer mb-8">
          <Upload className="h-8 w-8 mx-auto mb-4" />
          <p className="font-bold mb-2">DRAG AND DROP OR SELECT A CSV FILE</p>
          <p className="text-sm opacity-70">Format: address,amount</p>
        </div>
      )}

      {/* Recipients List */}
      {recipients.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-bold">{recipients.length} RECIPIENTS</span>
            <div className="flex items-center gap-6 text-sm">
              {validRecipients.length > 0 && (
                <span>{validRecipients.length} VALID</span>
              )}
              {invalidRecipients.length > 0 && (
                <span>{invalidRecipients.length} INVALID</span>
              )}
            </div>
          </div>
          
          <div className="border border-white">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white font-bold text-sm">
              <div className="col-span-1">#</div>
              <div className="col-span-6">WALLET ADDRESS</div>
              <div className="col-span-3 text-right">AMOUNT (SOL)</div>
              <div className="col-span-1 text-center">STATUS</div>
              <div className="col-span-1"></div>
            </div>
            
            {recipients.map((recipient, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b border-white last:border-b-0 hover:bg-white hover:text-black transition-colors">
                <div className="col-span-1 text-sm opacity-70">{index + 1}</div>
                <div className="col-span-6">
                  <code className="text-sm font-mono">
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
                    className="w-full h-10 text-sm border border-white bg-transparent text-right"
                    disabled={distributionMethod === 'equal'}
                    placeholder="0.00"
                  />
                </div>
                <div className="col-span-1 text-center text-sm">
                  {recipient.isValid ? 'VALID' : 'INVALID'}
                </div>
                <div className="col-span-1 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveRecipient(index)}
                    className="h-8 w-8 p-0 hover:bg-white hover:text-black"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
