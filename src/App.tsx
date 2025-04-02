import { BottomMenu } from "@/components/bottom-menu/bottom-menu";
import { Canvas } from "@/components/canvas/canvas";
import { Intro } from "@/components/intro";

function App() {
  return (
    <div className="relative mx-auto flex h-full w-fit flex-col items-center justify-center gap-4 overflow-hidden">
      <Canvas />
      <BottomMenu />
      <Intro />
    </div>
  );
}

export default App;
