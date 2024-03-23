"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

type WorldRendererProps = {
  bgfile: string;
  className?: HTMLDivElement["className"];
};

const WorldRenderer = ({ bgfile, className }: WorldRendererProps) => {
  const textureImage = useLoader(TextureLoader, bgfile);

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
    >
      <Canvas
        onLoad={() => console.log("loaded")}
        className={cn(
          className,
          "shadow shadow-[#0000004d] dark:shadow-[#c0c0c005] ",
          "border-2 border-[#000] lg:dark:border-[#00000085]"
        )}
      >
        {/* <pointLight intensity={5} position={[0, 0, 0]} /> */}
        <ambientLight intensity={0.6} position={[0, 0, 0]} />
        <mesh scale={[-1, 1, 1]} position={[0, 0, 0]}>
          <sphereGeometry args={[300, 60, 40]} />
          <meshStandardMaterial map={textureImage} side={THREE.BackSide} />
        </mesh>
        <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} />
      </Canvas>
    </motion.div>
  );
};

export default WorldRenderer;

// https://codesandbox.io/s/0z8i2c?file=/src/App.js
// https://codesandbox.io/s/rusfd
