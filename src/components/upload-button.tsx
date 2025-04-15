import { ChangeEvent, useEffect, useRef } from "react";

import { useAtom } from "jotai";
import { FileUp } from "lucide-react";
import { motion } from "motion/react";

import testImage from "@/assets/test.png";
import {
  backgroundImageAtom,
  bubblePositionAtom,
  canvasDimensionsAtom,
  textPositionAtom,
  textSizeAtom,
} from "@/store/store";

import { IconButtonLarge } from "./icon-button";

export const UploadBackgroundButton = () => {
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);
  const [, setCanvasDim] = useAtom(canvasDimensionsAtom);
  const [, setTextPosition] = useAtom(textPositionAtom);
  const [, setBubblePosition] = useAtom(bubblePositionAtom);
  const [, setTextSize] = useAtom(textSizeAtom);
  const uploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // if (!import.meta.env.PROD) uploadStaticAsset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadStaticAsset = async () => {
    const response = await fetch(testImage);
    const blob = await response.blob();
    const file = new File([blob], "filename", { type: "image/png" });
    uploadImage(file);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    uploadImage(file);
  };

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

  return (
    <motion.div
      layout
      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      style={{
        position: backgroundImage ? "absolute" : "unset",
        top: "-100px",
      }}
    >
      <motion.div
        aria-label="Upload"
        style={{
          transformOrigin: "left",
          scale: backgroundImage ? 0.5 : 1,
        }}
        animate={{ scale: backgroundImage ? 0.5 : 1 }}
        transition={{ type: "spring", duration: 0.5, delay: 0.6 }}
      >
        <IconButtonLarge
          className="bg-blue-600"
          label="Upload"
          icon={<FileUp />}
          onClick={() => uploadRef.current?.click()}
        />
      </motion.div>
      <input
        ref={uploadRef}
        hidden
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => {
          handleImageUpload(e);
        }}
      />
    </motion.div>
  );
};
