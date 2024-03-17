"use client";
import AmimateText from "@/components/custom/AmimateText";
import { Genjiro, heroMisake } from "@/fonts";
import RenderCompleted from "@/hooks/RenderCompleted";
import style from "@/styles/loading.module.css";
import { breathe, topToPossition } from "@/utils/motionPresets";
import { motion, stagger, useAnimate } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ActionBtns from "./ActionBtns";

export default function HomePageLayout() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const inputTextRef = useRef<HTMLDivElement>(null);
  const isMounted = RenderCompleted();

  // animation
  const [scope, animate] = useAnimate();
  const staggerMenuItems = stagger(0.1, { startDelay: 1.5 });

  useEffect(() => {
    if (heroTextRef.current && inputTextRef.current) {
      const textWidth = heroTextRef.current.clientWidth;
      if (window.innerWidth > 768) {
        inputTextRef.current.style.width = `${textWidth + 250}px`;
      }
    }
  }, []);

  useEffect(() => {
    animate(
      ".itemCard",
      isMounted
        ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, y: 100, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isMounted ? staggerMenuItems : 0,
      }
    );
  }, [animate, isMounted, staggerMenuItems]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.3 }}
      className="p-2 lg:p-12 w-full h-screen "
    >
      {/* landing page content */}
      <div
        className={`p-2 py-12 h-full w-full flex flex-1 flex-col justify-between items-center border border-white/30`}
        ref={scope}
      >
        {/* heading */}
        <motion.div
          {...topToPossition}
          className={`${style.heroText} text-6xl text-center lg:text-9xl shadow-sm ${Genjiro.className} border-gray-200 border-y-4 border-b-8 z-10`}
          ref={heroTextRef}
        >
          Watch Anything
        </motion.div>

        {/* search bar */}
        <motion.div {...breathe}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.5,
              duration: 0.5,
            }}
          >
            <div
              ref={inputTextRef}
              className="w-full h-full flex flex-col items-start justify-center p-4 relative"
            >
              <Image
                priority
                src={"/InputCointainer.svg"}
                width={10}
                height={10}
                alt="input cointainer svg"
                className="absolute w-full h-full top-0 left-0 z-5"
              />
              <motion.input
                whileFocus={{
                  scale: 1.2,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className={`${style.inputTextField} text-md lg:text-3xl rounded-md w-full p-3 cursor-pointer z-10`}
                type="text"
                placeholder="Search for a movie by name or magnet url here..."
              />
              <div className="flex p-1 text-white opacity-50 center w-full justify-center">
                Enter Your Thoughts
                <Image
                  priority
                  src={"/upArrow.svg"}
                  alt="up arrow"
                  width={10}
                  height={10}
                  className="ml-2 w-auto h-auto"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* action elements */}
        <div
          className={`flex lg:flex-row flex-col w-full items-center justify-asround  lg:gap-16 gap-10 lg:h-1/4 font-sans lg:px-12`}
        >
          <ActionBtns
            title={"Explore Movies"}
            description={
              "Unlimited movie options at your fingertips - watch anything you want!"
            }
          />
          <ActionBtns
            title={"Browse Torrent"}
            description={
              "Unlimited Torrent at your fingertips - watch, stream or download anything you want! of your choice"
            }
          />
          <ActionBtns
            title={"Upload Torrent"}
            description={
              "Unlimited upload Torrent options at your fingertips - upload and share anything you want! of your choice"
            }
          />
        </div>
      </div>
    </motion.div>
  );
}
