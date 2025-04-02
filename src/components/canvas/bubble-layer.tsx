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

  const shift = useShiftHeld();

  const imageRef = useRef<ImageType>(null);
  const trRef = useRef<TransformerType>(null);

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
        onDragMove={(e) => {
          setTextPosition({
            x: textPosition.x + e.evt.movementX,
            y: textPosition.y + e.evt.movementY,
          });
        }}
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
