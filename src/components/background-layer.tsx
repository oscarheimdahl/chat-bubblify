import { useEffect } from "react";

import { useAtom } from "jotai";
import { Image, Layer } from "react-konva";

import { backgroundImageAtom, canvasDimensionsAtom } from "@/store/store";

export const BackgroundLayer = () => {
  const [backgroundImage] = useAtom(backgroundImageAtom);
  const [canvasDim, setCanvasDim] = useAtom(canvasDimensionsAtom);

  // const [backgroundImage] = useImage(backgroundImageSrc ?? "", "anonymous");

  useEffect(() => {
    if (!backgroundImage) return;

    const bgWidth = backgroundImage.width;
    const bgHeight = backgroundImage.height;
    const ratio = bgWidth / bgHeight;
    let newWidth = Math.min(window.innerWidth - 400, bgWidth);
    let newHeight = Math.min(window.innerHeight - 400, bgHeight);

    if (newWidth / newHeight > ratio) newWidth = newHeight * ratio;
    else newHeight = newWidth / ratio;

    setCanvasDim({ w: newWidth, h: newHeight });
  }, [backgroundImage, setCanvasDim]);

  if (!backgroundImage) return null;

  return (
    <Layer>
      <Image
        image={backgroundImage}
        x={0}
        y={0}
        width={canvasDim.w}
        height={canvasDim.h}
      />
    </Layer>
  );
};
