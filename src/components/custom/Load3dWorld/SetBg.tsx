import style from "@/styles/loading.module.css";
import { Suspense, memo } from "react";
import WorldRenderer from "./WorldRenderer";

// function which takes the bgfile as a prop and extract the average color from the image
type setBgProps = {
  bgfile: string;
};

const SetBg = memo(({ bgfile }: setBgProps) => {
  // for the site standard color we will globalise it and use it in the whole site
  // useMemo(() => {
  //   getAverageRGB(bgfile).then(setBgColor);
  // }, []);

  return (
    <div className="absolute top-0 left-0 h-full w-full p-2 lg:p-12 z-1 transition-all duration-300 ease-in-out">
      <Suspense>
        <WorldRenderer
          className={`${style.threeDCanvasItself}`}
          bgfile={bgfile}
        />
      </Suspense>
    </div>
  );
});

export default SetBg;
