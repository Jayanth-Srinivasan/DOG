import React from "react";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { connectToPetraWallet } from "@/lib/wallet";

const WalletConnectButton: React.FC = () => {
  const { walletState, isConnected, disconnect } = useWallet();

  const router = useRouter();

  const handleConnect = async () => {
    try {
      const account = await connectToPetraWallet();
      console.log("Connected to account:", account);

      // Redirect to dashboard after successful connection
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected: {walletState?.address}</p>
          <Button
            onClick={disconnect}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleConnect}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connect to Petra Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnectButton;
