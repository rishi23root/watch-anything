"use client";
import AmimateText from "@/components/custom/AmimateText";
import Footer from "@/components/Footer";
import { Genjiro, heroMisake } from "@/fonts";
import RenderCompleted from "@/hooks/RenderCompleted";
import style from "@/styles/loading.module.css";
import { breathe, topToPossition } from "@/utils/motionPresets";
import { motion, stagger, useAnimate } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

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
      const inputWidth = inputTextRef.current.clientWidth;
      // set the text witht the input width
      inputTextRef.current.style.width = `${textWidth + 50}px`;
    }
  }, []);

  useEffect(() => {
    animate(
      ".itemCard",
      isMounted
        ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, y: 100, filter: "blur(10px)" },
      {
        duration: 0.2,
        delay: isMounted ? staggerMenuItems : 0,
      }
    );
  }, [animate, isMounted, staggerMenuItems]);

  return (
    <div className="h-auto ">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.3 }}
      className=" p-2 lg:p-0 w-full h-screen top-0 text-black flex items-center justify-center"
    >
      {/* landing page content */}
      <div
        className={`flex flex-col lg:items-center justify-between h-full w-full ${heroMisake.className} p-8`}
        ref={scope}
      >
        {/* heading */}
        <motion.div
          {...topToPossition}
          className={`${style.heroText} lg:text-9xl text-2xl text-left shadow-sm ${Genjiro.className} border-gray-200 border-y-4 border-b-8 
          `}
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
              className="w-screen h-full flex flex-col items-start text-xl justify-center p-4 relative"
            >
              <Image
                priority
                src={"/InputCointainer.svg"}
                width={10}
                height={10}
                alt="input cointainer svg"
                className="absolute w-auto h-full top-0 left-0 -z-10"
              />
              <motion.input
                whileFocus={{
                  scale: 1.2,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className={`${style.inputTextField} rounded-md p-2 w-full text-white lg:h-12 h-4 text-xl }`}
                type="text"
                placeholder="Search for a movie by name or magnet url here..."
                
              />
              <div className="flex p-1 text-white center w-full justify-center">
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
        <div className="">
        <div
          className={`flex lg:flex-row flex-col w-full self-end justify-around lg:h-1/6 h-48 lg:gap-20 gap-40 items-center cursor-pointer  
          font-sans `}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{
              scale: 1.05,
              y: -20,
            }}
            whileTap={{
              scale: 1.5,
            }}
            className={`${style.itemCard} itemCard text-black lg:text-4xl text-xl`}
          >
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{
                delay: 3.5,
                duration: 0.5,
              }}
            >
              <AmimateText text={"Explore Movies"} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{
                delay: 4,
                duration: 0.5,
              }}
              className={`${style.itemCardData} lg:w-auto w-40`}
            >
              {
                "Unlimited movie options at your fingertips - watch anything you want!"
              }
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{
              scale: 1.05,
              y: -20,
            }}
            className={`${style.itemCard} itemCard text-black lg:text-4xl text-xl`}
          >
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{
                delay: 3.5,
                duration: 0.5,
              }}
            >
              <AmimateText text={"Browse Torrent"} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{
                delay: 4,
                duration: 0.5,
              }}
              className={`${style.itemCardData}`}
            >
              {
                "Unlimited Torrent at your fingertips - watch, stream or download anything you want! of your choice"
              }
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{
              scale: 1.05,
              y: -20,
            }}
            className={`${style.itemCard} itemCard text-black lg:text-4xl text-xl`}
          >
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{
                delay: 3.5,
                duration: 0.5,
              }}
            >
              <AmimateText text={"Upload Torrent"} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{
                delay: 4,
                duration: 0.5,
              }}
              className={`${style.itemCardData}`}
            >
              {
                "Unlimited upload Torrent options at your fingertips - upload and share anything you want! of your choice"
              }
            </motion.div>
          </motion.div>
        </div>
        </div>
      </div>
    </motion.div>
   </div>
  );
}
