"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import style from "@/styles/loading.module.css";

type WorldRendererProps = {
  bgfile: string;
  className?: HTMLDivElement["className"];
};

const WorldRenderer = ({ bgfile, className }: WorldRendererProps) => {
  const textureImage = useLoader(TextureLoader, bgfile);

  return (
    <Canvas className={`${style.threeDCanvasItself}`}>
      {/* <pointLight intensity={5} position={[0, 0, 0]} /> */}
      <ambientLight intensity={0.6} position={[0, 0, 0]} />
      <mesh scale={[-1, 1, 1]} position={[0, 0, 0]}>
        <sphereGeometry args={[300, 60, 40]} />
        <meshStandardMaterial map={textureImage} side={THREE.BackSide} />
      </mesh>
      <OrbitControls autoRotate autoRotateSpeed={1} />
    </Canvas>
  );
};

export default WorldRenderer;

// https://codesandbox.io/s/0z8i2c?file=/src/App.js
// https://codesandbox.io/s/rusfd
