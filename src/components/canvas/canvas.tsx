import { useRef } from "react";

import { useAtom } from "jotai";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as KonvaStage } from "konva/lib/Stage";
import { motion } from "motion/react";
import { Stage } from "react-konva";

import { BackgroundLayer } from "@/components/canvas/background-layer";
import { BubbleLayer } from "@/components/canvas/bubble-layer";
import {
  backgroundImageAtom,
  canvasDimensionsAtom,
  canvasFocusAtom,
  canvasStageRefAtom,
} from "@/store/store";

import { ExportButton } from "../download-button";
import { UploadBackgroundButton } from "../upload-button";
import { TextLayer } from "./text-layer";

export const Canvas = () => {
  const [, setCanvasFocus] = useAtom(canvasFocusAtom);
  const [backgroundImage] = useAtom(backgroundImageAtom);
  const [canvasDim] = useAtom(canvasDimensionsAtom);
  const [canvasStageRef, setCanvasStageRefAtom] = useAtom(canvasStageRefAtom);
  const ref = useRef<KonvaStage>(null);

  const handleCanvasClick = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target !== e.target.getStage()) return;

    setCanvasFocus(null);
  };

  if (!canvasStageRef) setCanvasStageRefAtom(ref);

  return (
    <div className="relative">
      <UploadBackgroundButton />
      <ExportButton />
      <motion.div
        className="overflow-hidden rounded-md shadow-sm ring-2 ring-slate-200"
        style={{ display: canvasDim.w > 0 && canvasDim.h > 0 ? "" : "none" }}
        animate={{
          opacity: backgroundImage ? 1 : 0,
          scale: backgroundImage ? 1 : 0.8,
          transition: { duration: 0.5, type: "spring", delay: 1.2 },
        }}
      >
        <Stage
          id="stage"
          onTap={handleCanvasClick}
          onClick={handleCanvasClick}
          ref={ref}
          width={canvasDim.w}
          height={canvasDim.h}
        >
          <BackgroundLayer />
          <BubbleLayer />
          <TextLayer />
        </Stage>
      </motion.div>
    </div>
  );
};
