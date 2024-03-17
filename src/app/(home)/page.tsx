import SetBg from "@/components/custom/Load3dWorld/SetBg";
import Footer from "@/components/Footer";
import NoSSR from "@/hooks/NoSSR";
import { auth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Line = dynamic(() => import("@/components/Line"));

const HeroSection = dynamic(
  () => import("@/components/pageSpecific/home/HeroLayout")
);

const bgs = ["bg/cyber.jpg", "bg/alean.jpg"];
// const bgs = ["bg/cyber.jpg", "bg/alean.jpg", "bg/horror.jpg", "bg/nuclear.jpg"];

export default async function Home() {
  const editorLink = "/dashboard";
  const user = auth();

  const bgfile = bgs[Math.floor(Math.random() * bgs.length)];
  return (
    // make whole page with 10/12 width and center it on above medium screens
    <>
      {/* bg animations */}
      <Suspense>
        <NoSSR>
          <SetBg bgfile={bgfile} />
        </NoSSR>
      </Suspense>
      <HeroSection />
      <Footer/>
      {/* <main className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] flex flex-col lg:gap-20 gap-8">
      </main> */}
      {/* paint each section */}
      {/* <Nav isSignedIn={user?.sessionId ? true : false} pathname="/" /> */}
    </>
  );
}
