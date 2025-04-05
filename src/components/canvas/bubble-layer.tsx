import { useEffect, useRef } from "react";

import { useAtom } from "jotai";
import { Image as ImageType } from "konva/lib/shapes/Image";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { Image, Layer, Rect, Transformer } from "react-konva";
import useImage from "use-image";

import lucideFlip from "@/assets/lucide-flip.svg";
import {
  bubbleFocusedAtom,
  bubbleImageAtom,
  bubblePositionAtom,
  canvasDimensionsAtom,
} from "@/store/store";
import { useShiftHeld } from "@/utils/use-shift-held";

export const BubbleLayer = () => {
  const [bubbleImageSrc] = useAtom(bubbleImageAtom);
  const [bubbleImage] = useImage(bubbleImageSrc ?? "", "anonymous");
  const [flipImage] = useImage(lucideFlip ?? "", "anonymous");
  const [canvasDim] = useAtom(canvasDimensionsAtom);
  const [bubbleFocused, setBubbleFocused] = useAtom(bubbleFocusedAtom);
  const [bubblePosition, setBubblePosition] = useAtom(bubblePositionAtom);

  const shift = useShiftHeld();

  const imageRef = useRef<ImageType>(null);
  const trRef = useRef<TransformerType>(null);

  useEffect(() => {
    if (!trRef.current || !imageRef.current) return;
    trRef.current.nodes([imageRef.current]);
  }, [bubbleImage]);

  const flip = () => {
    const image = imageRef.current;
    if (!image) return;

    image.scaleX(image.scaleX() * -1);
  };

  const rotate = () => {
    const image = imageRef.current;
    if (!image) return;

    image.rotate(image.rotation() + 90);
  };

  if (!bubbleImage) return null;

  return (
    <Layer>
      <Image
        offsetX={canvasDim.w / 6}
        offsetY={canvasDim.w / 6}
        x={bubblePosition.x}
        y={bubblePosition.y}
        onTap={() => setBubbleFocused((prev) => !prev)}
        onClick={() => setBubbleFocused((prev) => !prev)}
        width={canvasDim.w / 3}
        height={canvasDim.w / 3}
        ref={imageRef}
        image={bubbleImage}
        onDblClick={flip}
        onDblTap={flip}
        draggable
        onDragMove={(e) =>
          setBubblePosition({ x: e.target.x(), y: e.target.y() })
        }
      />
      <Transformer
        anchorSize={20}
        anchorCornerRadius={90}
        anchorStroke="#aaaaaa"
        borderDash={[5, 5]}
        borderStroke="white"
        visible={bubbleFocused}
        useSingleNodeRotation={false}
        rotationSnaps={[0, 90, 180, 270]}
        rotationSnapTolerance={shift ? 20 : 0}
        ref={trRef}
      />
      <Rect
        visible={bubbleFocused}
        x={canvasDim.w / 2 - 55 / 2}
        y={canvasDim.w - 55 - 16}
        width={55}
        height={55}
        cornerRadius={5}
        stroke={"black"}
        strokeWidth={2}
        fill={"white"}
        onClick={flip}
        onTap={flip}
      />
      <Image
        listening={false}
        offsetX={-10}
        offsetY={-10}
        visible={bubbleFocused}
        x={canvasDim.w / 2 - 55 / 2}
        y={canvasDim.w - 55 - 16}
        width={55 - 20}
        height={55 - 20}
        image={flipImage}
      />
    </Layer>
  );
};
