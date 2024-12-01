import "petra-wallet-types";

// Get the Petra wallet from the `window` object
export const getPetraWallet = () => {
  if (typeof window !== "undefined" && "aptos" in window) {
    return window.aptos;
  } else {
    // Redirect to Petra Wallet installation page
    if (typeof window !== "undefined") {
      window.open("https://petra.app/", "_blank");
    }
    throw new Error(
      "Petra Wallet is not installed. Redirecting to installation page."
    );
  }
};

// Connect to the wallet
export const connectToPetraWallet = async () => {
  const wallet = getPetraWallet();
  if (!wallet) {
    throw new Error("Petra Wallet is not available.");
  }
  try {
    const account = await wallet.connect();
    return account; // { address: string, publicKey: string }
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    throw error;
  }
};

// Disconnect from the wallet
export const disconnectFromPetraWallet = async () => {
  const wallet = getPetraWallet();
  try {
    if (wallet) {
      await wallet.disconnect();
    } else {
      throw new Error("Petra Wallet is not available.");
    }
    console.log("Disconnected from Petra Wallet");
  } catch (error) {
    console.error("Error disconnecting from wallet:", error);
    throw error;
  }
};

// Get the current account
export const getCurrentAccount = async () => {
  const wallet = getPetraWallet();
  try {
    if (!wallet) {
      throw new Error("Petra Wallet is not available.");
    }
    const account = await wallet.account();
    return account; // { address: string }
  } catch (error) {
    console.error("Error fetching current account:", error);
    throw error;
  }
};
