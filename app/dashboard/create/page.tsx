"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CreateDaoPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    daoName: "",
    daoDescription: "",
    daoIcon: "",
  });
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleValuesChange =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
    };

  // Handle image generation
  const handleImageGeneration = () => {
    const randomImageUrl = `https://noun-api.com/beta/pfp`;
    setPreviewIcon(randomImageUrl);
    setValues((prev) => ({ ...prev, daoIcon: randomImageUrl }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewIcon(reader.result as string);
        setFileUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
    alert("DAO Registration data has been logged.");
    router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>Register DAO | DOG</title>
      </Head>
      <main className="min-h-screen bg-[url('/assets/hero-bg.png')] w-full font-lond text-stone-200">
        <section className="p-4 md:px-16 lg:max-w-4xl lg:mx-auto py-[40px] ">
          <div className="mx-auto flex flex-col gap-4 text-center pb-[40px] ">
            <h2 className="text-3xl lg:text-5xl font-bold">Register DAO</h2>
            <p className="text-slate-200 md:text-lg">
              Take control with decentralized governance. Register your DAO now.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full p-6 bg-[#161616] flex flex-col gap-6 rounded-lg border border-white/10"
          >
            <h1 className="font-bold text-xl md:text-2xl">DAO Details</h1>

            {/* DAO Name Input */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="daoName" className="text-sm font-semibold">
                DAO Name
              </Label>
              <Input
                id="daoName"
                onChange={handleValuesChange("daoName")}
                required
                type="text"
                className="h-12"
                placeholder="Enter DAO Name"
              />
            </div>

            {/* DAO Description Input */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="daoDescription" className="text-sm font-semibold">
                DAO Description
              </Label>
              <Input
                id="daoDescription"
                onChange={handleValuesChange("daoDescription")}
                required
                type="text"
                className="h-12"
                placeholder="Enter DAO Description"
              />
            </div>

            {/* File Upload or Image Generation */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="daoIcon" className="text-sm font-semibold">
                DAO Icon
              </Label>
              <div className="flex gap-4 items-center">
                <Input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={fileUploaded}
                />
                <Button
                  type="button"
                  onClick={handleImageGeneration}
                  disabled={fileUploaded}
                >
                  Generate Random Image
                </Button>
              </div>
            </div>

            {/* Preview */}
            {previewIcon && (
              <div className="mt-4">
                <h3 className="font-semibold">Preview:</h3>
                <Image
                  unoptimized
                  src={previewIcon}
                  alt="Generated DAO Icon"
                  width={100}
                  height={100}
                  className="mt-2 w-32 h-32"
                />
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition-transform duration-300 hover:scale-105"
            >
              Register DAO
            </Button>
          </form>
        </section>
      </main>
    </>
  );
};

export default CreateDaoPage;
