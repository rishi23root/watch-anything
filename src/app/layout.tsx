import NoSSR from "@/hooks/NoSSR";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { clsx } from "clsx";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import type { Viewport } from "next";
const BubbleUnderlay = dynamic(
  () => import("@/components/custom/BubbelUnderLay")
);

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata: Metadata = {
  title: "Watch Anything, Anywhere Anytime",
  description:
    "A Platform to watch anything, anywhere, anytime. Watch your favorite movies, TV shows, and web series on the go, with no ads, Enjoy the best streaming experience. Free to use.",
  keywords: [
    "watch",
    "movies",
    "tv shows",
    "web series",
    "stream",
    "watch online",
    "watch free",
    "watch anywhere",
  ],
  authors: [
    { name: "rishi23root" },
    {
      name: "Rishabh Jain",
      url: "https://github.com/rishi23root",
    },
  ],
  icons: {
    icon: ["/favicon.ico?v=1"],
    apple: ["/logo.png?v=1"],
    shortcut: ["/logo.png?v=1"],
  },
  metadataBase: new URL("https://watchAnyting.online/"),
  openGraph: {
    type: "website",
    title: "Watch Anyting",
    description:
      "Watch your favorite movies, TV shows, and web series on the go, with no ads, Enjoy the best streaming experience.",
    url: "https://watchAnyting.online/",
    siteName: "Watch Anyting",
    images: [
      {
        url: "https://watchAnyting.online/opengraph-image.jpg",
        alt: "Watch Anyting",
        width: 500,
        height: 160,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className="dark">
        <body
          suppressHydrationWarning={true}
          className={clsx(
            poppins.className,
            "min-h-screen",
            "min-w-full",
            "relative ",
            "fc -z-10",
            "bg-background bg-grid-white/20"
          )}
        >
          <div
            className={cn(
              "w-full h-full absolute ",
              "-z-5",
              // add lienar gradient to background
              "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background from-50% to-transparent/20 to-100%"
            )}
          >
            <NextTopLoader height={3} color="#3b82f6" />
            {/* <TwScreenInfo /> */}
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
