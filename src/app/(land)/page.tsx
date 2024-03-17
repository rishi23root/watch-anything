import dynamic from "next/dynamic";
import SetBg from "@/components/custom/Load3dWorld/SetBg";
import NoSSR from "@/hooks/NoSSR";
import { Suspense } from "react";

const bgs = ["bg/cyber.webp"];
const bgfile = bgs[Math.floor(Math.random() * bgs.length)];

const HeroSection = dynamic(
  () => import("@/components/pageSpecific/home/HeroLayout")
);

export default async function Home() {
  return (
    <>
      <div className="relative">
        <Suspense>
          <NoSSR>
            <SetBg bgfile={bgfile} />
          </NoSSR>
        </Suspense>
        <HeroSection />
      </div>
      <div>this is the way</div>
      <div>this is the way</div>
      <div>this is the way</div>
      <div>this is the way</div>
      <div>this is the way</div>
      <div>this is the way</div>
      <div>this is the way</div>
    </>
  );
}
