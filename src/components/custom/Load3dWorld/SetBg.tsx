"use client";

import RenderCompleted from "@/hooks/RenderCompleted";
import style from "@/styles/loading.module.css";
import { typeRBG } from "@/types/common";
import { getAverageRGB } from "@/utils/util";
import { memo, useMemo, useState } from "react";
import WorldRenderer from "./WorldRenderer";

// function which takes the bgfile as a prop and extract the average color from the image
type setBgProps = {
  bgfile: string;
};

const SetBg = memo(({ bgfile }: setBgProps) => {
  const [bgColor, setBgColor] = useState<typeRBG>({ r: 0, g: 0, b: 0 });
  const isrendered = RenderCompleted();
  useMemo(() => {
    getAverageRGB(bgfile).then(setBgColor);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 h-full w-full p-2 lg:p-12 -z-10 "
      style={{
        backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
      }}
    >
      {isrendered && (
        <WorldRenderer
          className={`${style.threeDCanvasItself}`}
          bgfile={bgfile}
        />
      )}
    </div>
  );
});

export default SetBg;
