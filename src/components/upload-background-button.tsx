import { ChangeEvent, useRef } from "react";

import { useAtom } from "jotai";

import { backgroundImageAtom } from "@/store/store";

export const UploadBackgroundButton = () => {
  const [, setBackgroundImage] = useAtom(backgroundImageAtom);

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) =>
      setBackgroundImage(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <button
        className="rounded-md bg-amber-600 px-2 py-1"
        onClick={() => uploadRef.current?.click()}
      >
        Upload Image
      </button>
      <input
        ref={uploadRef}
        hidden
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => handleImageUpload(e)}
      />
    </>
  );
};
