
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectProps {
  balance: number;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletConnect = ({ balance, isConnected, onConnect, onDisconnect }: WalletConnectProps) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const walletAddress = '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM';

  const handleConnect = async () => {
    setIsConnecting(true);
    // Mock connection delay
    setTimeout(() => {
      onConnect();
      setIsConnecting(false);
    }, 1500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "📋 Address Copied",
    });
  };

  const handleDisconnect = () => {
    onDisconnect();
  };

  if (!isConnected) {
    return (
      <Button 
        onClick={handleConnect}
        disabled={isConnecting}
        className="bg-black text-white hover:bg-gray-800 rounded-xl px-4 text-sm font-medium h-10"
      >
        <Wallet className="h-4 w-4 mr-2" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white border-gray-200 hover:bg-gray-50 rounded-xl px-3 h-10 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-mono text-sm text-black">{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
            <Badge variant="secondary" className="bg-gray-100 text-black text-xs px-2 py-1 rounded-md">
              {balance.toFixed(2)} SOL
            </Badge>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 bg-white/80 backdrop-blur-sm border-gray-100 rounded-xl shadow-xl mt-2">
        <div className="px-3 py-2">
            <p className="text-xs text-gray-500">Wallet Address</p>
            <p className="text-sm font-mono text-black">{walletAddress.slice(0, 12)}...{walletAddress.slice(-8)}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyAddress} className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm">
          <Copy className="h-4 w-4 text-gray-500" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm">
          <a href={`https://solscan.io/account/${walletAddress}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 text-gray-500" />
            View on Solscan
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="flex items-center gap-2 px-3 py-2 text-red-600 hover:!text-red-600 hover:!bg-red-50 cursor-pointer text-sm font-medium">
          <LogOut className="h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
