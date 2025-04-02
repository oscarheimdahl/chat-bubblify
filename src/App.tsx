import { BottomMenu } from "@/components/bottom-menu/bottom-menu";
import { Canvas } from "@/components/canvas/canvas";

function App() {
  return (
    <div className="relative mx-auto flex h-full w-fit flex-col items-center justify-center gap-4">
      <Canvas />
      <BottomMenu />
    </div>
  );
}

export default App;
