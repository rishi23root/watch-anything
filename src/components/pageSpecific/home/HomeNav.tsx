"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function HomeNav() {
  return (
    <motion.div
      className={"flex gap-6"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
    >
      <Link
        className="hover:underline decoration-pink-600 underline-offset-4 text-white cursor-pointer transition-all animation-underline ease-in-out "
        href={"/privacyPolicy"}
      >
        <motion.div
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
        >
          Privacy Policy
        </motion.div>
      </Link>
      <Link
        className="hover:underline decoration-pink-600 underline-offset-4 text-white cursor-pointer transition-all animation-underline ease-in-out "
        href={"/termAndCondition"}
      >
        <motion.div
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
        >
          Term and conditions
        </motion.div>
      </Link>
    </motion.div>
  );
}
