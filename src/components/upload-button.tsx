import { ChangeEvent, useEffect, useRef } from "react";

import { useAtom } from "jotai";
import { FileUp } from "lucide-react";
import { motion } from "motion/react";

import testImage from "@/assets/test.png";
import { backgroundImageAtom } from "@/store/store";
import { useUploadImage } from "@/utils/use-upload-image";

import { IconButtonLarge } from "./icon-button";

export const UploadBackgroundButton = () => {
  const [backgroundImage] = useAtom(backgroundImageAtom);
  const uploadRef = useRef<HTMLInputElement>(null);

  const uploadImage = useUploadImage();

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
