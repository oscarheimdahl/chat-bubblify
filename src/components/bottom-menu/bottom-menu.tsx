import { useAtom } from "jotai";
import { Baseline, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { activeMenuAtom, backgroundImageAtom } from "@/store/store";

import { IconButton } from "../icon-button";
import { BubbleMenu } from "./bubble-menu";
import { TextMenu } from "./text-menu";

export const BottomMenu = () => {
  const [backgroundImage] = useAtom(backgroundImageAtom);
  const [activeMenu] = useAtom(activeMenuAtom);

  return (
    <motion.div
      className="absolute bottom-0 flex w-full items-center justify-center px-4 pb-4"
      animate={{
        opacity: backgroundImage ? 1 : 0,
      }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      {!activeMenu && <MenuSelect />}
      <AnimatePresence>
        {activeMenu === "bubble" && <BubbleMenu />}
        {activeMenu === "text" && <TextMenu />}
      </AnimatePresence>
    </motion.div>
  );
};

const MenuSelect = () => {
  const [, setActiveMenu] = useAtom(activeMenuAtom);

  return (
    <div className="absolute bottom-8 flex flex-row items-center gap-4">
      <IconButton
        className="bg-zinc-500"
        icon={<MessageCircle />}
        label="Bubble menu"
        onClick={() => setActiveMenu("bubble")}
      ></IconButton>
      <IconButton
        className="bg-zinc-500"
        icon={<Baseline />}
        label="Bubble menu"
        onClick={() => setActiveMenu("text")}
      ></IconButton>
    </div>
  );
};
