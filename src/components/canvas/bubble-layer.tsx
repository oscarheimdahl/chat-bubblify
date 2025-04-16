import { useEffect, useRef } from "react";

import { useAtom } from "jotai";
import { Image as ImageType } from "konva/lib/shapes/Image";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { Image, Layer, Rect, Transformer } from "react-konva";
import useImage from "use-image";

import lucideFlip from "@/assets/lucide-flip.svg";
import lucideRotate from "@/assets/lucide-rotate.svg";
import {
  bubbleImageAtom,
  bubblePositionAtom,
  canvasDimensionsAtom,
  canvasFocusAtom,
} from "@/store/store";
import { useShiftHeld } from "@/utils/use-shift-held";

export const BubbleLayer = () => {
  const [bubbleImageSrc] = useAtom(bubbleImageAtom);
  const [bubbleImage] = useImage(bubbleImageSrc ?? "", "anonymous");
  const [flipImage] = useImage(lucideFlip ?? "", "anonymous");
  const [rotateImage] = useImage(lucideRotate ?? "", "anonymous");
  const [canvasDim] = useAtom(canvasDimensionsAtom);
  const [canvasFocus, setCanvasFocus] = useAtom(canvasFocusAtom);
  const [bubblePosition, setBubblePosition] = useAtom(bubblePositionAtom);

  const shift = useShiftHeld();

  const imageRef = useRef<ImageType>(null);
  const trRef = useRef<TransformerType>(null);

  useEffect(() => {
    if (!trRef.current || !imageRef.current) return;
    trRef.current.nodes([imageRef.current]);
  }, [bubbleImage]);

  const handleBubbleClick = () => {
    if (canvasFocus === "bubble") setCanvasFocus(null);
    else setCanvasFocus("bubble");
  };

  const flipHorizontal = () => {
    const image = imageRef.current;
    if (!image) return;

    image.scaleX(image.scaleX() * -1);
  };

  const flipVertical = () => {
    const image = imageRef.current;
    if (!image) return;

    image.scaleY(image.scaleY() * -1);
  };

  const rotate = () => {
    const image = imageRef.current;
    if (!image) return;

    image.rotate(90);
  };

  if (!bubbleImage) return null;

  return (
    <Layer>
      <Image
        offsetX={canvasDim.w / 6}
        offsetY={canvasDim.w / 6}
        x={bubblePosition.x}
        y={bubblePosition.y}
        onTap={handleBubbleClick}
        onClick={handleBubbleClick}
        width={canvasDim.w / 3}
        height={canvasDim.w / 3}
        ref={imageRef}
        image={bubbleImage}
        onDblClick={flipHorizontal}
        onDblTap={flipHorizontal}
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
        visible={canvasFocus === "bubble"}
        useSingleNodeRotation={false}
        rotationSnaps={[0, 90, 180, 270]}
        rotationSnapTolerance={shift ? 20 : 0}
        ref={trRef}
      />
      <Rect
        visible={canvasFocus === "bubble"}
        x={canvasDim.w / 2 - 55 / 2}
        y={canvasDim.h - 55 - 16}
        width={55}
        height={55}
        cornerRadius={5}
        stroke={"black"}
        strokeWidth={2}
        fill={"white"}
        onClick={flipHorizontal}
        onTap={flipHorizontal}
      />
      <Image
        listening={false}
        offsetX={-10}
        offsetY={-10}
        visible={canvasFocus === "bubble"}
        x={canvasDim.w / 2 - 55 / 2}
        y={canvasDim.h - 55 - 16}
        width={55 - 20}
        height={55 - 20}
        image={flipImage}
      />
      <Rect
        visible={canvasFocus === "bubble"}
        x={canvasDim.w / 2 - 55 / 2 + 55 + 16}
        y={canvasDim.h - 55 - 16}
        width={55}
        height={55}
        cornerRadius={5}
        stroke={"black"}
        strokeWidth={2}
        fill={"white"}
        onClick={flipVertical}
        onTap={flipVertical}
      />
      <Image
        listening={false}
        rotation={90}
        visible={canvasFocus === "bubble"}
        x={canvasDim.w / 2 - 55 / 2 + 55 + 16 + 45}
        y={canvasDim.h - 55 - 16 + 10}
        width={55 - 20}
        height={55 - 20}
        image={flipImage}
      />
      <Rect
        visible={canvasFocus === "bubble"}
        x={canvasDim.w / 2 - 55 / 2 - 55 - 16}
        y={canvasDim.h - 55 - 16}
        width={55}
        height={55}
        cornerRadius={5}
        stroke={"black"}
        strokeWidth={2}
        fill={"white"}
        onClick={rotate}
        onTap={rotate}
      />
      <Image
        listening={false}
        offsetX={-10}
        offsetY={-10}
        visible={canvasFocus === "bubble"}
        x={canvasDim.w / 2 - 55 / 2 - 55 - 16}
        y={canvasDim.h - 55 - 16}
        width={55 - 20}
        height={55 - 20}
        image={rotateImage}
      />
    </Layer>
  );
};
