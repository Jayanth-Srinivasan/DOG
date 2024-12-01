"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { useRouter } from "next/navigation";

const JoinDaoPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    daoCode: "",
    userWallet: "",
  });

  const handleValuesChange =
    (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => {
        return { ...prev, [key]: e.target.value };
      });
    };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
    alert("DAO Join data has been logged.");
    router.push("/dao-dashboard");
  };

  return (
    <>
      <Head>
        <title>Join DAO | Volt Armour</title>
      </Head>
      <main className="min-h-screen bg-[url('/assets/hero-bg.png')] w-full font-lond text-stone-200">
        <section className="p-4 md:px-16 lg:max-w-4xl lg:mx-auto py-[50px] md:py-[80px]">
          <div className="mx-auto flex flex-col gap-4 text-center pb-[50px] md:pb-[80px]">
            <h2 className="text-3xl lg:text-5xl font-bold">Join DAO</h2>
            <p className="text-slate-200 md:text-lg">
              Be part of decentralized governance. Enter your DAO code to join.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full p-6 bg-[#161616] flex flex-col gap-6 rounded-lg border border-white/10"
          >
            <h1 className="font-bold text-xl md:text-2xl">Join DAO</h1>

            {/* DAO Code Input */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="daoCode" className="text-sm font-semibold">
                DAO Code
              </Label>
              <Input
                id="daoCode"
                onChange={handleValuesChange("daoCode")}
                required
                type="text"
                className="h-12"
                placeholder="Enter DAO Invitation Code"
              />
            </div>

            {/* User Wallet Address Input */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="userWallet" className="text-sm font-semibold">
                Wallet Address
              </Label>
              <Input
                id="userWallet"
                onChange={handleValuesChange("userWallet")}
                required
                type="text"
                className="h-12"
                placeholder="Enter your Wallet Address"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-6 h-12 bg-blue-500 text-white font-semibold py-3 px-16 rounded-md transition-transform duration-300 hover:scale-105"
            >
              Join DAO
            </Button>
          </form>
        </section>
      </main>
    </>
  );
};

export default JoinDaoPage;
