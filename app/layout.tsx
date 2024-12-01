import { Londrina_Solid } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";


import Navbar from "@/components/navbar";

const lond = Londrina_Solid({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOG",
  description: "DAO on GO - DOG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lond.variable} bg-black antialiased`}>
        {/* <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}> */}
          <Navbar />
          {children}
        {/* </AptosWalletAdapterProvider> */}
      </body>
    </html>
  );
}
