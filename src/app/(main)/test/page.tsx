import SetBg from "@/components/custom/Load3dWorld/SetBg";
import NoSSR from "@/hooks/NoSSR";
import { auth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export default async function Test() {
  return (
    <>
      <div className="w-full flex justify-center align-middle h-full text-3xl">
        this is the way
      </div>
    </>
  );
}
