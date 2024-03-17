"use client";
import SetBg from "@/components/custom/Load3dWorld/SetBg";
import NoSSR from "@/hooks/NoSSR";
import { motion } from "framer-motion";
import { Suspense } from "react";

const bgs = ["bg/cyber.webp"];
const bgfile = bgs[Math.floor(Math.random() * bgs.length)];

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      exit={{ y: -20, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
