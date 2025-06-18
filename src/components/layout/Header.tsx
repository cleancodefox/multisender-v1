
import { Button } from '@/components/ui/button';
import { Send, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { TransferSummary } from '@/components/transfer/TransferSummary';
import { TransferSummaryData } from '@/types';

interface HeaderProps {
  walletBalance: number;
  isWalletConnected: boolean;
  onWalletConnect: () => void;
  onWalletDisconnect: () => void;
  transferSummary: TransferSummaryData;
  onPreview: () => void;
}

export const Header = ({
  walletBalance,
  isWalletConnected,
  onWalletConnect,
  onWalletDisconnect,
  transferSummary,
  onPreview
}: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-xl flex items-center justify-center">
              <Send className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">MultiSent.SO</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-xl">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
                  <TransferSummary {...transferSummary} onPreview={onPreview} />
                </SheetContent>
              </Sheet>
            </div>
            
            <WalletConnect 
              balance={walletBalance} 
              isConnected={isWalletConnected}
              onConnect={onWalletConnect}
              onDisconnect={onWalletDisconnect}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
