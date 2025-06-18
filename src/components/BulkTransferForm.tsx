import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DistributionMethod, AssetType, Token, AssetSelection } from '@/types';
import { Coins, Wallet, Loader2, RefreshCw } from 'lucide-react';
import { useTokenAccounts } from '@/hooks/useTokenAccounts';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';

interface BulkTransferFormProps {
  totalAmount: number;
  onTotalAmountChange: (amount: number) => void;
  distributionMethod: DistributionMethod;
  onDistributionMethodChange: (method: DistributionMethod) => void;
  assetSelection: AssetSelection;
  onAssetSelectionChange: (selection: AssetSelection) => void;
}



export const BulkTransferForm = ({
  totalAmount,
  onTotalAmountChange,
  distributionMethod,
  onDistributionMethodChange,
  assetSelection,
  onAssetSelectionChange
}: BulkTransferFormProps) => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { tokens, isLoading, error, refetch } = useTokenAccounts(publicKey, connection);
  const handleAssetTypeChange = (type: AssetType) => {
    if (type === AssetType.SOL) {
      onAssetSelectionChange({ type: AssetType.SOL });
    } else {
      // Default to first available token when switching to tokens
      const firstToken = tokens[0];
      if (firstToken) {
        onAssetSelectionChange({
          type: AssetType.TOKEN,
          token: firstToken
        });
      } else {
        // If no tokens available, stay on SOL
        onAssetSelectionChange({ type: AssetType.SOL });
      }
    }
  };

  const handleTokenChange = (tokenSymbol: string) => {
    const token = tokens.find(t => t.symbol === tokenSymbol);
    if (token) {
      onAssetSelectionChange({
        type: AssetType.TOKEN,
        token
      });
    }
  };

  const getCurrentUnit = () => {
    return assetSelection.type === AssetType.SOL
      ? 'SOL'
      : assetSelection.token?.symbol || 'TOKEN';
  };

  const formatBalance = (balance: number | undefined) => {
    if (!balance) return '0';
    if (balance < 0.001) {
      return balance.toExponential(2);
    }
    return balance.toFixed(6);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Asset Selection Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Transfer Settings</h2>

        {/* Asset Type Selector */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Asset Type</Label>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleAssetTypeChange(AssetType.SOL)}
              className={`flex-1 flex items-center gap-3 p-3 sm:p-4 border-2 rounded-xl transition-all ${assetSelection.type === AssetType.SOL
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              <div className={`p-1.5 sm:p-2 rounded-lg ${assetSelection.type === AssetType.SOL
                ? 'bg-blue-100'
                : 'bg-gray-100'
                }`}>
                <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm sm:text-base">SOL</div>
                <div className="text-xs sm:text-sm opacity-75">Native Solana</div>
              </div>
            </button>

            <button
              onClick={() => handleAssetTypeChange(AssetType.TOKEN)}
              className={`flex-1 flex items-center gap-3 p-3 sm:p-4 border-2 rounded-xl transition-all ${assetSelection.type === AssetType.TOKEN
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              disabled={tokens.length === 0 && !isLoading}
            >
              <div className={`p-1.5 sm:p-2 rounded-lg ${assetSelection.type === AssetType.TOKEN
                ? 'bg-blue-100'
                : 'bg-gray-100'
                }`}>
                <Coins className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm sm:text-base">Token</div>
                <div className="text-xs sm:text-sm opacity-75">
                  {isLoading ? 'Loading...' : `${tokens.length} available`}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Token Selector - Only show when TOKEN is selected */}
        {assetSelection.type === AssetType.TOKEN && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-gray-700">Select Token</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={refetch}
                disabled={isLoading}
                className="h-8 px-2 text-gray-500 hover:text-gray-700"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center p-8 border border-gray-200 rounded-xl">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-500">Loading your tokens...</span>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 mb-2">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refetch}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Try Again
                </Button>
              </div>
            ) : tokens.length === 0 ? (
              <div className="p-6 text-center border border-gray-200 rounded-xl bg-gray-50">
                <Coins className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">No tokens found</p>
                <p className="text-xs text-gray-500">You don't have any SPL tokens in your wallet</p>
              </div>
            ) : (
              <Select value={assetSelection.token?.symbol} onValueChange={handleTokenChange}>
                <SelectTrigger className="h-16 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white">
                  <div className="flex items-center gap-3 w-full">
                    {assetSelection.token ? (
                      <>
                        {assetSelection.token.logoURI && (
                          <img
                            src={assetSelection.token.logoURI}
                            alt={assetSelection.token.symbol}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900">{assetSelection.token.symbol}</div>
                          <div className="text-sm text-gray-500 truncate">{assetSelection.token.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {formatBalance(assetSelection.token.balance)}
                          </div>
                          <div className="text-xs text-gray-400">balance</div>
                        </div>
                      </>
                    ) : (
                      <SelectValue placeholder="Choose a token" />
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {tokens.map((token) => (
                    <SelectItem key={token.mintAddress} value={token.symbol} className="p-0">
                      <div className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          {token.logoURI ? (
                            <img
                              src={token.logoURI}
                              alt={token.symbol}
                              className="w-10 h-10 rounded-full border border-gray-200"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${token.symbol}&size=40&background=f3f4f6&color=6b7280&format=svg`;
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs font-semibold text-gray-600">
                                {token.symbol.slice(0, 2)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-gray-900 truncate">{token.symbol}</div>
                              <div className="text-sm text-gray-500 truncate">{token.name}</div>
                            </div>
                            <div className="text-right ml-3 flex-shrink-0">
                              <div className="text-sm font-medium text-gray-900">
                                {formatBalance(token.balance)}
                              </div>
                              <div className="text-xs text-gray-400">balance</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}


          </div>
        )}
      </div>

      {/* Distribution Method */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200">
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Distribution Method</Label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onDistributionMethodChange(DistributionMethod.EQUAL)}
            className={`p-3 sm:p-4 border-2 rounded-xl text-left transition-all ${distributionMethod === DistributionMethod.EQUAL
              ? 'border-black bg-black text-white'
              : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50'
              }`}
          >
            <div className="font-semibold mb-1 text-sm sm:text-base">Equal Split</div>
            <div className="text-xs sm:text-sm opacity-75">Same amount to everyone</div>
          </button>

          <button
            onClick={() => onDistributionMethodChange(DistributionMethod.MANUAL)}
            className={`p-3 sm:p-4 border-2 rounded-xl text-left transition-all ${distributionMethod === DistributionMethod.MANUAL
              ? 'border-black bg-black text-white'
              : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50'
              }`}
          >
            <div className="font-semibold mb-1 text-sm sm:text-base">Manual Entry</div>
            <div className="text-xs sm:text-sm opacity-75">Custom amounts</div>
          </button>
        </div>
      </div>

      {/* Amount Input Section */}
      <div className="px-4 sm:px-6 py-4 sm:py-5">
        {distributionMethod === DistributionMethod.EQUAL && (
          <div className="space-y-4">
            <Label htmlFor="totalAmount" className="text-sm font-semibold text-gray-700">
              Total Amount
            </Label>
            <div className="relative">
              <Input
                id="totalAmount"
                type="number"
                step="0.000001"
                min="0"
                max={assetSelection.token?.balance}
                placeholder={`Enter total amount (e.g., 1000 ${getCurrentUnit()})`}
                value={totalAmount || ''}
                onChange={(e) => onTotalAmountChange(Number(e.target.value))}
                className="h-12 sm:h-14 text-base sm:text-lg border-gray-300 focus:border-black focus:ring-black pr-16 sm:pr-20 rounded-xl font-semibold"
              />
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                <Badge variant="outline" className="bg-gray-50 border-gray-300 text-gray-700 font-semibold text-xs sm:text-sm">
                  {getCurrentUnit()}
                </Badge>
              </div>
            </div>

            {/* Balance Warning */}
            {assetSelection.token && totalAmount > (assetSelection.token.balance || 0) && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">
                  ⚠️ Amount exceeds available balance ({formatBalance(assetSelection.token.balance)})
                </p>
              </div>
            )}

            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
              💡 This amount will be split equally among all recipients
            </p>
          </div>
        )}

        {distributionMethod === DistributionMethod.MANUAL && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl gap-2 sm:gap-0">
              <div>
                <div className="font-semibold text-amber-900 mb-1 text-sm sm:text-base">Manual Entry Mode</div>
                <div className="text-xs sm:text-sm text-amber-700">
                  Enter custom amounts for each recipient below
                </div>
              </div>
              <Badge variant="outline" className="bg-amber-100 border-amber-300 text-amber-800 text-xs sm:text-sm self-start sm:self-auto">
                {getCurrentUnit()}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
