import { useAtom } from "jotai";
import { Image, Layer } from "react-konva";

import { backgroundImageAtom, canvasDimensionsAtom } from "@/store/store";

export const BackgroundLayer = () => {
  const [backgroundImage] = useAtom(backgroundImageAtom);
  const [canvasDim] = useAtom(canvasDimensionsAtom);

  if (!backgroundImage) return null;

  return (
    <Layer listening={false}>
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
