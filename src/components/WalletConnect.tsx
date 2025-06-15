
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WalletConnectProps {
  balance: number;
}

export const WalletConnect = ({ balance }: WalletConnectProps) => {
  const isConnected = true; // Mock connection state

  if (!isConnected) {
    return (
      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white/80 border-purple-200 hover:bg-purple-50">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-mono text-sm">9WzD...4Kx7</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Balance</div>
              <div className="font-semibold">{balance.toFixed(3)} SOL</div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm">
        <DropdownMenuItem>Copy Address</DropdownMenuItem>
        <DropdownMenuItem>View on Explorer</DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
