import { useAtom } from "jotai";

import {
  backgroundImageAtom,
  bubblePositionAtom,
  canvasDimensionsAtom,
  textSizeAtom,
} from "@/store/store";

export const useUploadImage = () => {
  const [, setBackgroundImage] = useAtom(backgroundImageAtom);
  const [, setCanvasDim] = useAtom(canvasDimensionsAtom);
  // const [, setTextPosition] = useAtom(textPositionAtom);
  const [, setBubblePosition] = useAtom(bubblePositionAtom);
  const [, setTextSize] = useAtom(textSizeAtom);

  const uploadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target?.result as string;
      image.onload = () => {
        const bgWidth = image.width;
        const bgHeight = image.height;
        const ratio = bgWidth / bgHeight;
        let newWidth = Math.min(bgWidth, window.innerWidth * 0.9);
        let newHeight = Math.min(bgHeight, window.innerHeight * 0.7);

        if (newWidth / newHeight > ratio) newWidth = newHeight * ratio;
        else newHeight = newWidth / ratio;

        setCanvasDim({ w: newWidth, h: newHeight });
        setTextSize(newWidth / 20);
        setBubblePosition({ x: newWidth / 6, y: newHeight / 6 });
        // setTextPosition({ x: 0, y: 0 });
        setBackgroundImage(image);
      };
    };

    reader.readAsDataURL(file);
  };

  return uploadImage;
};
