import { BottomMenu } from "@/components/bottom-menu/bottom-menu";
import { Canvas } from "@/components/canvas/canvas";
import { Intro } from "@/components/intro";

import { ImageDragListener } from "./components/image-drag-listener";

function App() {
  return (
    <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center gap-4">
      <Canvas />
      <BottomMenu />
      <Intro />
      <ImageDragListener />
    </div>
  );
}

export default App;
