import { DragEvent, useEffect, useState } from "react";

import { cn } from "@/utils/cn";
import { useUploadImage } from "@/utils/use-upload-image";

export const ImageDragListener = () => {
  const [isDragging, setIsDragging] = useState(false);

  const uploadImage = useUploadImage();

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));
    if (imageFile) {
      uploadImage(imageFile);
    }
    setIsDragging(false);
  };

  useEffect(() => {
    const handleDragOver = (e: globalThis.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = (e: globalThis.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("dragleave", handleDragLeave);
    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

  return (
    <div
      className={cn(
        "dotted pointer-events-none fixed inset-0 z-50 bg-white p-12 text-neutral-300 opacity-0 transition-opacity",
        isDragging && "pointer-events-auto opacity-100",
      )}
      onDrop={handleDrop}
    >
      <div className="flex size-full items-center justify-center rounded-3xl border-8 border-dashed border-current">
        <h1 className="text-5xl font-semibold text-blue-600">Drop image</h1>
      </div>
    </div>
  );
};
