interface Aptos {
  connect(): Promise<{ address: string; publicKey: string }>;
  disconnect(): Promise<void>;
  account(): Promise<{ address: string }>;
  on(event: string, callback: (data: unknown) => void): void;
}

interface Window {
  aptos?: Aptos;
}
