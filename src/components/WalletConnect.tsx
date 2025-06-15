
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';
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
      <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl px-4 py-2 text-sm font-medium">
        <Wallet className="h-4 w-4 mr-2" />
        Connect
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-gray-50 border-gray-200 hover:bg-gray-100 rounded-xl px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-mono text-xs text-gray-700">9WzD...4Kx7</span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-gray-100 rounded-xl">
        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2">
          <Copy className="h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2">
          <ExternalLink className="h-4 w-4" />
          View Explorer
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-red-600">
          <LogOut className="h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
