import style from "@/styles/loading.module.css";
import { Suspense, memo } from "react";
import WorldRenderer from "./WorldRenderer";
import Link from "next/link";

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
    <div className="absolute top-0 left-0 h-full w-full lg:p-12 -z-5 transition-all duration-300 ease-in-out">
      <Link className="hidden" href={bgfile} />
      <Suspense>
        <WorldRenderer className={`lg:rounded-2xl`} bgfile={bgfile} />
      </Suspense>
    </div>
  );
});

export default SetBg;
