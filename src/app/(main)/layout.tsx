import Nav from "@/components/Nav/index";
import ShowErrorIfany from "@/components/elements/errorRender";
import { Toaster as Sonar } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { newUserLoginHandler } from "@/utils/pageLoad";
import { Suspense } from "react";
import TRPCProvider from "../../serverTRPC/Provider";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await newUserLoginHandler(); // effective for only first login
  // console.log(data.userDBid)

  // trpc context provider or wrapper the main pages only
  return (
    <TRPCProvider>
      {/* addeding toast component */}
      <Toaster />
      <Sonar />
      {/* main layout for all pages  */}
      <main className="app xl:px-[11%] md:px-[5%] px-[2%] gap-8 fc flex-1 flex-col min-h-screen">
        <Nav pathname="/" />
        {/* <Nav isSignedIn={data ? true : false} pathname="/dashboard" /> */}
        <div className="lg:gap-10 gap-4 fr flex-1 flex-col">
          <Suspense>{children}</Suspense>
        </div>
        <Footer />
      </main>
      <ShowErrorIfany />
      {/* <TwScreenInfo /> */}
    </TRPCProvider>
  );
}
