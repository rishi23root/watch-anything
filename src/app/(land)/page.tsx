import dynamic from "next/dynamic";
import SetBg from "@/components/custom/Load3dWorld/SetBg";
import NoSSR from "@/hooks/NoSSR";
import { Suspense } from "react";
import Nav from "@/components/Nav";
import Link from "next/link";
import Footer from "@/components/Footer";
import PrivacyPolicy from "../(t&c)/privacyPolicy/page";

const bgs = ["bg/cyber.webp"];
const bgfile = bgs[Math.floor(Math.random() * bgs.length)];

const HeroSection = dynamic(
  () => import("@/components/pageSpecific/home/HeroLayout")
);

export default async function Home() {
  return (
    <>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full fr lg:z-20 p-3 lg:px-12">
          <div className={"flex-1"}></div>
          <div className={"flex gap-6"}>
            <Link
              className="hover:underline decoration-pink-600 underline-offset-4 text-white hover:opacity-90 opacity-60  cursor-pointer transition-all animation-underline ease-in-out "
              href={"/privacyPolicy"}
            >
              Privacy Policy
            </Link>
            <Link
              className="hover:underline decoration-pink-600 underline-offset-4 text-white hover:opacity-90 opacity-60  cursor-pointer transition-all animation-underline ease-in-out "
              href={"/termAndCondition"}
            >
              Term and conditions
            </Link>
          </div>
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
