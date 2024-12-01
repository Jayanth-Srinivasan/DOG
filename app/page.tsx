"use client";
import Particles from "@/components/Particles";
import React, { useEffect } from "react";
// import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import WalletConnectButton from "@/components/WalletConnectButton";
import { useRouter } from "next/navigation";

export default function Home() {
  // const { user } = useDynamicContext();
  const user = true;
  const isAuthenticated = user !== null;
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    } else {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  return (
    <section className=" text-white font-lond">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={200}
      />
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[calc(100vh-80px)] lg:items-center lg:justify-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl text-mont">
            Revolutionizing your DAO&apos;s Community
            <span className="sm:block"> Experience with AI </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-pop text-slate-300">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="group relative inline-flex items-center overflow-hidden rounded-full bg-slate-900/80 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500">
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="h-5 w-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              <span
                onClick={() => router.push("/dashboard")}
                className="text-pop text-transparent  bg-clip-text bg-gradient-to-r from-emerald-400  to-cyan-400 text-md lg:text-lg font-bold transition-all group-hover:me-4"
              >
                Get Started
              </span>
            </div>
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </section>
  );
}
