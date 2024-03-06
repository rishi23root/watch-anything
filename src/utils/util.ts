import { typeRBG } from "@/types/common";
import path from "path";

export function getAverageRGB(bgfile: string): Promise<typeRBG> {
  return new Promise((resolve, reject) => {
    const imgElement = new Image();
    imgElement.src = bgfile
    // imgElement.src = path.join("/", bgfile);

    var blockSize = 5, // only visit every 5 pixels
      defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
      canvas = document.createElement("canvas"),
      context = canvas.getContext && canvas.getContext("2d"),
      data: ImageData | undefined,
      width,
      height,
      i = -4,
      length: number | undefined,
      rgb = { r: 0, g: 0, b: 0 },
      count = 0;

    if (!context) {
      console.log("no context");
      reject(defaultRGB);
    }
    imgElement.onload = () => {
      height = canvas.height =
        imgElement.naturalHeight ||
        imgElement.offsetHeight ||
        imgElement.height;
      width = canvas.width =
        imgElement.naturalWidth || imgElement.offsetWidth || imgElement.width;

      context?.drawImage(imgElement, 0, 0);

      try {
        data = context?.getImageData(0, 0, width, height);
      } catch (e) {
        console.log("no ", e);
        reject(defaultRGB);
      }

      length = data?.data.length;

      if (length) {
        while ((i += blockSize * 4) < length) {
          ++count;
          if (data) {
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
          }
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);
        resolve(rgb);
      } else {
        reject(defaultRGB);
      }
    };
  });
}