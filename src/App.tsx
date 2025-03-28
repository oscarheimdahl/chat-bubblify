import { useAtom } from "jotai";

import talkBubble from "@/assets/talk-bubble.png";
import thinkBubble from "@/assets/think-bubble.png";
import { Canvas } from "@/components/canvas";
import { ExportButton } from "@/components/export-button";
import { UploadBackgroundButton } from "@/components/upload-background-button";
import { bubbleImageAtom } from "@/store/store";

function App() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <UploadBackgroundButton />
      <Canvas />
      <SelectBubble />
      <ExportButton />
    </div>
  );
}

export const SelectBubble = () => {
  const [, setLoadedBubbleImage] = useAtom(bubbleImageAtom);

  return (
    <div className="flex flex-row gap-2">
      <button
        className="rounded-md bg-blue-600 px-2 py-1"
        onClick={() => setLoadedBubbleImage(talkBubble)}
      >
        Talk bubble
      </button>
      <button
        className="rounded-md bg-green-600 px-2 py-1"
        onClick={() => setLoadedBubbleImage(thinkBubble)}
      >
        Think bubble
      </button>
    </div>
  );
};

export default App;
