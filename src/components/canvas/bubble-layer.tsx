import { useEffect, useRef } from "react";

import { useAtom } from "jotai";
import { Image as ImageType } from "konva/lib/shapes/Image";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { Image, Layer, Transformer } from "react-konva";
import useImage from "use-image";

import {
  bubbleFocusedAtom,
  bubbleImageAtom,
  canvasDimensionsAtom,
  textPositionAtom,
} from "@/store/store";
import { useShiftHeld } from "@/utils/use-shift-held";

export const BubbleLayer = () => {
  const [bubbleImageSrc] = useAtom(bubbleImageAtom);
  const [bubbleImage] = useImage(bubbleImageSrc ?? "", "anonymous");
  const [canvasDim] = useAtom(canvasDimensionsAtom);
  const [textPosition, setTextPosition] = useAtom(textPositionAtom);
  const [bubbleFocused, setBubbleFocused] = useAtom(bubbleFocusedAtom);

  const tapStart = useRef({ x: 0, y: 0 });

  const shift = useShiftHeld();

  const imageRef = useRef<ImageType>(null);
  const trRef = useRef<TransformerType>(null);

  const handleDragStart = (e: DragEvent) => {
    const isTouch = isTouchEvent(e);
    if (!isTouch) return;
    tapStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleDragMove = (e: DragEvent) => {
    const isTouch = isTouchEvent(e);
    if (isTouch) {
      setTextPosition({
        x: textPosition.x + e.touches[0].clientX - tapStart.current.x,
        y: textPosition.y + e.touches[0].clientY - tapStart.current.y,
      });
      tapStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    } else {
      setTextPosition({
        x: textPosition.x + e.movementX,
        y: textPosition.y + e.movementY,
      });
    }
  };

  useEffect(() => {
    if (!trRef.current || !imageRef.current) return;
    trRef.current.nodes([imageRef.current]);
  }, [bubbleImage]);

  if (!bubbleImage) return null;

  return (
    <Layer>
      <Image
        onTap={() => setBubbleFocused((prev) => !prev)}
        onClick={() => setBubbleFocused((prev) => !prev)}
        width={canvasDim.w / 3}
        height={canvasDim.w / 3}
        ref={imageRef}
        image={bubbleImage}
        draggable
        onDragStart={(e) => handleDragStart(e.evt)}
        onDragMove={(e) => handleDragMove(e.evt)}
      />
      <Transformer
        anchorSize={20}
        anchorCornerRadius={90}
        anchorStroke="#aaaaaa"
        borderDash={[5, 5]}
        borderStroke="white"
        visible={bubbleFocused}
        rotationSnaps={[0, 90, 180, 270]}
        rotationSnapTolerance={shift ? 20 : 0}
        ref={trRef}
      />
    </Layer>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTouchEvent = (e: any): e is TouchEvent => {
  return e.type === "touchmove" || e.type === "touchend";
};
