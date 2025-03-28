import { useAtom } from "jotai";

import { canvasStageRefAtom } from "@/store/store";

export const ExportButton = () => {
  const [stageRef] = useAtom(canvasStageRefAtom);

  const handleExport = () => {
    if (!stageRef) return;
    if (!stageRef.current) return;

    const link = document.createElement("a");
    link.href = stageRef.current.toDataURL({ pixelRatio: 2 });
    link.download = "superimposed-image.png";
    link.click();
  };

  return (
    <button className="rounded-md bg-rose-600 px-2 py-1" onClick={handleExport}>
      Export
    </button>
  );
};
