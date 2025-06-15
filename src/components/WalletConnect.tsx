
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, Zap } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

  const handleConnect = async () => {
    setIsConnecting(true);
    // Mock connection delay
    setTimeout(() => {
      onConnect();
      setIsConnecting(false);
      toast({
        title: "🎉 Wallet Connected!",
        description: "Welcome to the most advanced multisender on Solana",
      });
    }, 1500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM');
    toast({
      title: "📋 Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const handleDisconnect = () => {
    onDisconnect();
    toast({
      title: "👋 Wallet Disconnected",
      description: "See you soon!",
    });
  };

  if (!isConnected) {
    return (
      <Button 
        onClick={handleConnect}
        disabled={isConnecting}
        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Wallet className="h-4 w-4 mr-2" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white/95 rounded-xl px-3 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-gray-700">9WzD...4Kx7</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-1 rounded">
              {balance.toFixed(2)} SOL
            </Badge>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 bg-white/95 backdrop-blur-sm border-gray-100 rounded-xl shadow-xl">
        <DropdownMenuItem onClick={handleCopyAddress} className="flex items-center gap-2 px-3 py-2 cursor-pointer">
          <Copy className="h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2">
          <ExternalLink className="h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          <div className="flex flex-col">
            <span className="text-sm">Premium Member</span>
            <span className="text-xs text-gray-500">Unlimited transfers</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDisconnect} className="flex items-center gap-2 px-3 py-2 text-red-600 cursor-pointer">
          <LogOut className="h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
