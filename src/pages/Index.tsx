
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { BulkTransferForm } from '@/components/BulkTransferForm';
import { TransferPreview } from '@/components/TransferPreview';
import { AddressManager } from '@/components/AddressManager';
import { Header } from '@/components/layout/Header';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { TransferContainer } from '@/components/transfer/TransferContainer';
import { useWallet } from '@/hooks/useWallet';
import { useRecipients } from '@/hooks/useRecipients';
import { useTransfer } from '@/hooks/useTransfer';

const Index = () => {
  const wallet = useWallet();
  const recipients = useRecipients();
  const transfer = useTransfer(wallet.balance);

  if (!wallet.isConnected) {
    return <WelcomeScreen onConnect={wallet.connect} isConnecting={wallet.isConnecting} />;
  }

  const transferSummary = transfer.calculateSummary(recipients.calculatedRecipients, recipients.validRecipients);

  if (transfer.isPreviewMode) {
    return (
      <TransferPreview
        recipients={recipients.calculatedRecipients}
        totalCost={transferSummary.totalCost}
        networkFees={transferSummary.networkFees}
        onBack={() => transfer.setIsPreviewMode(false)}
        onConfirm={() => {
          transfer.executeTransfer(recipients.calculatedRecipients);
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
        onWalletDisconnect={() => {
          wallet.disconnect();
          recipients.clearRecipients();
          transfer.setIsPreviewMode(false);
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
          />

          <AddressManager
            recipients={recipients.recipients}
            onAddRecipient={recipients.addRecipient}
            onUpdateRecipient={recipients.updateRecipient}
            onRemoveRecipient={recipients.removeRecipient}
            distributionMethod={recipients.distributionMethod}
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
