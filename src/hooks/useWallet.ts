
import { useState } from 'react';
import { WalletState } from '@/types';
import { useToast } from '@/hooks/use-toast';

const MOCK_WALLET_ADDRESS = '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM';
const MOCK_BALANCE = 5.234;

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: '',
    balance: 0,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const connect = async () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setWalletState({
        isConnected: true,
        address: MOCK_WALLET_ADDRESS,
        balance: MOCK_BALANCE,
      });
      setIsConnecting(false);
      
      toast({
        title: "Wallet Connected!",
        description: "Welcome to MultiSender.so.",
      });
    }, 1500);
  };

  const disconnect = () => {
    setWalletState({
      isConnected: false,
      address: '',
      balance: 0,
    });
    
    toast({
      title: "Session Reset",
      description: "All data has been cleared for security.",
    });
  };

  return {
    ...walletState,
    isConnecting,
    connect,
    disconnect,
  };
};
