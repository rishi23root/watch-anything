"use client";
import AmimateText from "@/components/custom/AmimateText";
import { motion } from "framer-motion";
import style from "@/styles/loading.module.css";

export default function ActionBtns({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{
        scale: 1.01,
        y: -20,
      }}
      whileTap={{
        scale: 1.1,
      }}
      className={`${style.itemCard} itemCard gap-2 lg:gap-4 text-white w-full lg:w-1/3 h-fit lg:h-full  p-4`}
    >
      <motion.div
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{
          delay: 3.5,
          duration: 0.5,
        }}
        className="text-2xl lg:text-4xl lg:pt-4 "
      >
        <AmimateText text={title} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{
          delay: 4,
          duration: 0.5,
        }}
        className={`text-slate-200/80 text-center text-md lg:text-2xl`}
      >
        {description}
      </motion.div>
    </motion.div>
  );
}
