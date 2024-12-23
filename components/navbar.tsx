import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NAVBAR_NAVIGATION } from "@/constants/navigation";
// import Image from "next/image";
import { Button } from "./ui/button";
// import {  DynamicWidget } from '@dynamic-labs/sdk-react-core';

function Navbar() {
  return (
    <nav className=" font-lond px-4 md:p-0 sticky top-0 z-50 flex items-center h-[5rem] bg-app-grey-dark justify-between md:px-16  lg:mx-auto">
      <Link href={"/"}>
        <h1 className="text-2xl font-semibold">
          {/* <Image
            // src={"/assets/delance-yellow.png"}
            width={1080}
            height={1920}
            alt="image"
            className="w-20 p-2"
          /> */}
          tet
        </h1>
      </Link>
      <div className="font-normal">
        <ul className="items-center hidden text-center lg:flex lg:gap-4 text-2xl">
          {NAVBAR_NAVIGATION.map((link) => (
            <li key={`nav-mobile-link-${link.link}`} className="p-2">
              <Button
                asChild
                className="h-12 transition-colors duration-300 ease-in-out rounded bg-transparent "
              >
                <Link href={link.link} target={link.target}>
                  {link.title}
                </Link>
              </Button>
            </li>
          ))}
          {/* <li><DynamicWidget /></li> */}
        </ul>
      </div>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="py-4 lg:hidden">
            <Menu strokeWidth={1.5} size={24} />
          </SheetTrigger>
          <SheetContent className="bg-app-grey-dark">
            <SheetHeader>
              <SheetTitle className="text-2xl font-semibold text-white">
                DOG
              </SheetTitle>
              <SheetDescription>
                <nav className="font-semibold contents ">
                  <ul className="flex flex-col items-center mx-auto ">
                    {NAVBAR_NAVIGATION.map((link) => (
                      <li key={`nav-mobile-link-${link.link}`} className="p-2">
                        <Button
                          asChild
                          className="h-12 transition-colors duration-300 ease-in-out border-none rounded "
                        >
                          <Link href={link.link} target={link.target}>
                            {link.title}
                          </Link>
                        </Button>
                      </li>
                    ))}
                    {/* <li><DynamicWidget /></li> */}
                  </ul>
                </nav>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default Navbar;
