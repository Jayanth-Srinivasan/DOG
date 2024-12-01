import { useState, useEffect } from "react";
import {
  connectToPetraWallet,
  disconnectFromPetraWallet,
  getCurrentAccount,
} from "@/lib/wallet";

interface WalletState {
  address: string;
  publicKey?: string;
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    try {
      const account = await connectToPetraWallet();
      setWalletState(account);
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
    }
  };

  const disconnect = async () => {
    try {
      await disconnectFromPetraWallet();
      setWalletState(null);
      setIsConnected(false);
    } catch (error) {
      console.error("Failed to disconnect from wallet:", error);
    }
  };

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const account = await getCurrentAccount();
        if (account?.address) {
          setWalletState(account);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Failed to fetch current account:", error);
      }
    };

    if ("aptos" in window) {
      fetchAccount();
    }
  }, []);

  return { walletState, isConnected, connect, disconnect };
};
