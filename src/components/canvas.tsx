import { useRef } from "react";

import { useAtom } from "jotai";
import { Stage as KonvaStage } from "konva/lib/Stage";
import { Stage } from "react-konva";

import { BackgroundLayer } from "@/components/background-layer";
import { BubbleLayer } from "@/components/bubble-layer";
import { canvasDimensionsAtom, canvasStageRefAtom } from "@/store/store";

export const Canvas = () => {
  const [canvasDim] = useAtom(canvasDimensionsAtom);

  const [canvasStageRef, setCanvasStageRefAtom] = useAtom(canvasStageRefAtom);
  const ref = useRef<KonvaStage>(null);

  if (!canvasStageRef) setCanvasStageRefAtom(ref);

  return (
    <Stage
      className="overflow-hidden rounded-md shadow-lg"
      style={{ display: canvasDim.w > 0 && canvasDim.h > 0 ? "" : "none" }}
      ref={ref}
      width={canvasDim.w}
      height={canvasDim.h}
    >
      <BackgroundLayer />
      <BubbleLayer />
    </Stage>
  );
};
