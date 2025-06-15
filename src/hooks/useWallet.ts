import { useEffect, useState } from 'react';
import { useWallet as useSolanaWallet, useConnection } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletState } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useWallet = () => {
  const { publicKey, connected, connecting, disconnect: solanaDisconnect } = useSolanaWallet();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();
  const { toast } = useToast();

  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: '',
    balance: 0,
    publicKey: null,
  });

  const [isConnecting, setIsConnecting] = useState(false);

  // Fetch balance when wallet is connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey && connected) {
        try {
          const balance = await connection.getBalance(publicKey);
          setWalletState({
            isConnected: true,
            address: publicKey.toString(),
            balance: balance / LAMPORTS_PER_SOL,
            publicKey: publicKey.toString(),
          });
        } catch (error) {
          console.error('Error fetching balance:', error);
          setWalletState({
            isConnected: true,
            address: publicKey.toString(),
            balance: 0,
            publicKey: publicKey.toString(),
          });
        }
      } else {
        setWalletState({
          isConnected: false,
          address: '',
          balance: 0,
          publicKey: null,
        });
      }
    };

    fetchBalance();
  }, [publicKey, connected, connection]);

  // Update connecting state
  useEffect(() => {
    setIsConnecting(connecting);
  }, [connecting]);

  // Show success toast when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      toast({
        title: "Wallet Connected!",
        description: `Connected to ${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`,
      });
    }
  }, [connected, publicKey, toast]);

  const connect = async () => {
    try {
      setVisible(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const disconnect = async () => {
    try {
      await solanaDisconnect();
      setWalletState({
        isConnected: false,
        address: '',
        balance: 0,
        publicKey: null,
      });
      
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected safely.",
      });
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet properly.",
        variant: "destructive",
      });
    }
  };

  return {
    ...walletState,
    isConnecting,
    connect,
    disconnect,
  };
};
