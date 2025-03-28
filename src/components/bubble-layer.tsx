import { useEffect, useState } from "react";

import { useAtom } from "jotai";
import { KonvaEventObject } from "konva/lib/Node";
import { Image, Layer } from "react-konva";
import useImage from "use-image";

import {
  bubbleDimensionsAtom,
  bubbleImageAtom,
  bubblePositionAtom,
  canvasDimensionsAtom,
} from "@/store/store";

const pad = 20;
export const BubbleLayer = () => {
  const [cd] = useAtom(canvasDimensionsAtom);
  const [bd] = useAtom(bubbleDimensionsAtom);
  const [bp, setBp] = useAtom(bubblePositionAtom);
  const [mouseDown, setMouseDown] = useState(false);
  const [bubbleImageSrc] = useAtom(bubbleImageAtom);

  const [bubbleImage] = useImage(bubbleImageSrc ?? "", "anonymous");

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [bd.h, bd.w, cd.h, cd.w, mouseDown, setBp]);

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!mouseDown) return;

    setBp((prev) => ({
      x: clamp(0 - bd.w + pad, prev.x + e.evt.movementX, cd.w - pad),
      y: clamp(0 - bd.h + pad, prev.y + e.evt.movementY, cd.h - pad),
    }));
  };

  if (!bubbleImage) return null;

  return (
    <Layer onMouseMove={handleMouseMove} onMouseDown={() => setMouseDown(true)}>
      <Image image={bubbleImage} x={bp.x} y={bp.y} width={bd.w} height={bd.h} />
    </Layer>
  );
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
