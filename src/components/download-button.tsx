import { useAtom } from "jotai";
import { FileDown } from "lucide-react";
import { motion } from "motion/react";

import { backgroundImageAtom, canvasStageRefAtom } from "@/store/store";
import { cn } from "@/utils/cn";

import { IconButton } from "./icon-button";

export const ExportButton = () => {
  const [backgroundImage] = useAtom(backgroundImageAtom);
  const [stageRef] = useAtom(canvasStageRefAtom);

  const handleExport = () => {
    console.log(`🔴`);
    if (!stageRef?.current) return;

    const link = document.createElement("a");
    link.href = stageRef.current.toDataURL({ pixelRatio: 2 });
    link.download = "superimposed-image.png";
    link.click();
  };

  const enabled = backgroundImage;

  return (
    <div className={cn("absolute top-[-100px] right-0 transition-all")}>
      <motion.div
        aria-label="Download"
        initial={{ scale: 0 }}
        animate={{
          scale: enabled ? 0.5 : 0,
          transformOrigin: "right",
        }}
        transition={{ type: "spring", duration: 0.5, delay: 0.6 }}
      >
        <IconButton
          label="Download"
          icon={<FileDown />}
          onClick={handleExport}
        />
      </motion.div>
    </div>
  );
};
