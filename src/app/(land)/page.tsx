import SetBg from "@/components/custom/Load3dWorld/SetBg";
import NoSSR from "@/hooks/NoSSR";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { HomeNav } from "../../components/pageSpecific/home/HomeNav";

const bgs = ["bg/cyber.webp"];
const bgfile = bgs[Math.floor(Math.random() * bgs.length)];

const HeroSection = dynamic(
  () => import("@/components/pageSpecific/home/HeroLayout")
);

const Footer = dynamic(() => import("@/components/Footer"));

export default async function Home() {
  return (
    <>
      <div className="relative h-screen">
        <div className="absolute top-0 left-0 w-full fr lg:z-20 p-3 lg:px-12">
          <div className={"flex-1"}></div>
          <HomeNav />
        </div>
        <Suspense>
          <NoSSR>
            <SetBg bgfile={bgfile} />
          </NoSSR>
        </Suspense>
        <HeroSection />
      </div>
      <div className={"my-24 text-center"}>one bento grid here</div>
      <div className="px-2 lg:px-12">
        <Footer />
      </div>
    </>
  );
}
