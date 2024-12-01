"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ContributorMarketplace = () => {
  const [products] = useState([
    {
      id: 1,
      type: "NFT",
      name: "CryptoArt NFT",
      price: 1.5,
      description: "Limited edition NFT art piece.",
      image: "https://noun.pics/90.svg",
    },
    {
      id: 2,
      type: "Hardware Wallet",
      name: "Ledger Nano X",
      price: 120,
      description: "Secure hardware wallet for assets.",
      image: "https://noun.pics/90.svg",
    },
    {
      id: 3,
      type: "Merch",
      name: "DAO T-shirt",
      price: 25,
      description: "Exclusive DAO-branded T-shirt.",
      image: "https://noun.pics/90.svg",
    },
  ]);

  return (
    <main className="min-h-screen tracking-widest text-white font-lond">
      <section className="p-6 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold">Marketplace</h2>
          <p className="text-gray-400 mt-4 text-lg">
            Explore and purchase exclusive DAO products.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <li
              key={product.id}
              className="bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105"
            >
              <div className="p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
                <div className="mt-4">
                  <h4 className="text-2xl font-semibold mb-2">
                    {product.name}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    {product.description}
                  </p>
                  <p className="text-gray-300 font-bold mb-2">
                    Type:{" "}
                    <span className="text-emerald-500">{product.type}</span>
                  </p>
                  <p className="text-lg font-bold text-white mb-4">
                    ${product.price}
                  </p>
                  <Button className="bg-emerald-500 text-white w-full py-2 rounded-lg hover:bg-emerald-600">
                    Buy Now
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ContributorMarketplace;
