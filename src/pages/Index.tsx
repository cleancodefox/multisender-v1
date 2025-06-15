import { WelcomeScreen } from '@/components/WelcomeScreen';
import { BulkTransferForm } from '@/components/BulkTransferForm';
import { TransferPreview } from '@/components/TransferPreview';
import { TransferProgress } from '@/components/TransferProgress';
import { AddressManager } from '@/components/AddressManager';
import { Header } from '@/components/layout/Header';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { TransferContainer } from '@/components/transfer/TransferContainer';
import { useWallet } from '@/hooks/useWallet';
import { useRecipients } from '@/hooks/useRecipients';
import { useTransfer } from '@/hooks/useTransfer';
import { TransferStatus, AssetType } from '@/types';
import { useEffect } from 'react';

const Index = () => {
  const wallet = useWallet();
  const recipients = useRecipients();
  const transfer = useTransfer(wallet.balance);

  // Clear recipients and reset preview mode when wallet disconnects
  useEffect(() => {
    if (!wallet.isConnected) {
      recipients.clearRecipients();
      transfer.setIsPreviewMode(false);
    }
  }, [wallet.isConnected, recipients, transfer]);

  if (!wallet.isConnected) {
    return <WelcomeScreen onConnect={wallet.connect} isConnecting={wallet.isConnecting} />;
  }

  const transferSummary = transfer.calculateSummary(recipients.calculatedRecipients, recipients.calculatedRecipients.filter(r => r.isValid !== false), recipients.assetSelection);
  
  // Show transfer progress when transfer is in progress
  if (transfer.transferStatus === TransferStatus.PREPARING || 
      transfer.transferStatus === TransferStatus.SENDING) {
    const assetSymbol = recipients.assetSelection.type === AssetType.SOL 
      ? 'SOL' 
      : recipients.assetSelection.token?.symbol || 'TOKEN';
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          walletBalance={wallet.balance}
          isWalletConnected={wallet.isConnected}
          onWalletConnect={wallet.connect}
          onWalletDisconnect={async () => {
            try {
              await wallet.disconnect();
              recipients.clearRecipients();
              transfer.setIsPreviewMode(false);
            } catch (error) {
              console.error('Error during wallet disconnect:', error);
            }
          }}
          transferSummary={transferSummary}
          onPreview={() => transfer.setIsPreviewMode(true)}
        />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {transfer.transferProgress && (
            <TransferProgress 
              progress={transfer.transferProgress} 
              assetSymbol={assetSymbol}
            />
          )}
        </main>
      </div>
    );
  }

  if (transfer.isPreviewMode) {
    return (
      <TransferPreview
        recipients={recipients.calculatedRecipients}
        totalCost={transferSummary.totalCost}
        networkFees={transferSummary.networkFees}
        onBack={() => transfer.setIsPreviewMode(false)}
        onConfirm={() => {
          transfer.executeTransfer(recipients.calculatedRecipients, recipients.assetSelection);
          recipients.clearRecipients();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        walletBalance={wallet.balance}
        isWalletConnected={wallet.isConnected}
        onWalletConnect={wallet.connect}
        onWalletDisconnect={async () => {
          try {
            await wallet.disconnect();
            recipients.clearRecipients();
            transfer.setIsPreviewMode(false);
          } catch (error) {
            console.error('Error during wallet disconnect:', error);
          }
        }}
        transferSummary={transferSummary}
        onPreview={() => transfer.setIsPreviewMode(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <TransferContainer
          transferSummary={transferSummary}
          onPreview={() => transfer.setIsPreviewMode(true)}
        >
          <BulkTransferForm
            totalAmount={recipients.totalAmount}
            onTotalAmountChange={recipients.setTotalAmount}
            distributionMethod={recipients.distributionMethod}
            onDistributionMethodChange={recipients.setDistributionMethod}
            assetSelection={recipients.assetSelection}
            onAssetSelectionChange={recipients.setAssetSelection}
          />

          <AddressManager
            recipients={recipients.calculatedRecipients}
            onAddRecipient={recipients.addRecipient}
            onUpdateRecipient={recipients.updateRecipient}
            onRemoveRecipient={recipients.removeRecipient}
            distributionMethod={recipients.distributionMethod}
            assetSelection={recipients.assetSelection}
          />
        </TransferContainer>
      </main>

      <MobileActionBar
        onPreview={() => transfer.setIsPreviewMode(true)}
        isReady={transferSummary.isReady}
        validRecipientsCount={recipients.validRecipients.length}
      />
    </div>
  );
};

export default Index;
