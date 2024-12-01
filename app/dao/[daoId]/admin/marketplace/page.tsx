"use client"; // Client-side component

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AdminMarketplacePage = () => {
  const router = useRouter();

  // Products list with images
  const [products, setProducts] = useState([
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
      description: "Secure hardware wallet for your crypto assets.",
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

  const [newProduct, setNewProduct] = useState({
    type: "",
    name: "",
    price: "",
    description: "",
    image: "", // New field for product image
  });

  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: newProduct.type,
        name: newProduct.name,
        price: Number(newProduct.price),
        description: newProduct.description,
        image: newProduct.image,
      },
    ]);
    setNewProduct({
      type: "",
      name: "",
      price: "",
      description: "",
      image: "",
    }); // Reset form
  };

  const handleEditProduct = (productId: number) => {
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setNewProduct({ ...productToEdit, price: String(productToEdit.price) });
      setEditingProductId(productId);
    }
  };

  const handleSaveEdit = () => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingProductId
          ? { ...newProduct, id: product.id, price: Number(newProduct.price) }
          : product
      )
    );
    setNewProduct({
      type: "",
      name: "",
      price: "",
      description: "",
      image: "",
    });
    setEditingProductId(null);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white font-mont">
      <section className="p-4 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="flex justify-between items-center pb-8">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Marketplace Management
          </h2>
          <Button
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600"
            onClick={() => router.push("/dao/[daoId]/admin")}
          >
            Back to Admin Dashboard
          </Button>
        </div>

        {/* Existing Products */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Existing Products</h3>
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="p-4 bg-gray-800 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-xl font-bold">{product.name}</h4>
                      <p className="text-gray-400">{product.description}</p>
                      <p className="text-lg font-semibold">
                        Type: {product.type}
                      </p>
                      <p className="text-lg font-semibold">
                        Price: ${product.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add or Edit Product Form */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">
            {editingProductId ? "Edit Product" : "Create New Product"}
          </h3>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="type">Product Type</Label>
              <Input
                id="type"
                name="type"
                value={newProduct.type}
                onChange={handleInputChange}
                placeholder="Enter product type (e.g., NFT, Hardware Wallet, Merch)"
                className="h-12"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="h-12"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                className="h-12"
                type="number"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="description">Product Description</Label>
              <Input
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                className="h-12"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="image">Product Image URL</Label>
              <Input
                id="image"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                className="h-12"
              />
            </div>
            {editingProductId ? (
              <Button
                onClick={handleSaveEdit}
                className="mt-4 bg-amber-400 text-black hover:bg-amber-500"
              >
                Save Changes
              </Button>
            ) : (
              <Button
                onClick={handleAddProduct}
                className="mt-4 bg-amber-400 text-black hover:bg-amber-500"
              >
                Add Product
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminMarketplacePage;
