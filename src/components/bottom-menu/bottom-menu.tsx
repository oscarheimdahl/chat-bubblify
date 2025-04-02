import { ReactNode } from "react";

import { useAtom } from "jotai";
import { Baseline, MessageCircle, X } from "lucide-react";
import { motion } from "motion/react";

import talkBubble from "@/assets/talk-bubble.svg";
import thinkBubble from "@/assets/think-bubble.svg";
import {
  activeMenuAtom,
  backgroundImageAtom,
  bubbleImageAtom,
} from "@/store/store";

import { IconButton } from "../icon-button";

export const BottomMenu = () => {
  const [backgroundImage] = useAtom(backgroundImageAtom);
  const [activeMenu] = useAtom(activeMenuAtom);

  let menuHide = "0%";
  if (!backgroundImage) menuHide = "100%";

  return (
    <motion.div
      className="absolute bottom-0 flex w-full items-center justify-center pb-4"
      animate={{
        translateY: menuHide,
      }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      {!activeMenu && <MenuSelect />}
      {activeMenu === "bubble" && <BubbleMenu />}
    </motion.div>
  );
};

const MenuSelect = () => {
  const [, setActiveMenu] = useAtom(activeMenuAtom);

  return (
    <div className="flex scale-50 flex-row gap-4">
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
        onClick={() => setActiveMenu("bubble")}
      ></IconButton>
    </div>
  );
};

const BubbleMenu = () => {
  const [, setActiveMenu] = useAtom(activeMenuAtom);

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <div className="size-8"></div>
      <div className="mx-auto flex flex-row gap-2">
        <BubbleButton bubbleImage={talkBubble} />
        <BubbleButton bubbleImage={thinkBubble} />
      </div>
      <button className="justify-end" onClick={() => setActiveMenu(null)}>
        <X className="size-8" />
      </button>
    </div>
  );
};

const BubbleButton = (props: { bubbleImage: string }) => {
  const [loadedBubbleImage, setLoadedBubbleImage] = useAtom(bubbleImageAtom);
  const [backgroundImage] = useAtom(backgroundImageAtom);

  return (
    <motion.button
      layout
      disabled={!backgroundImage || loadedBubbleImage === props.bubbleImage}
      className="rounded-md px-2 py-1 disabled:hidden"
      onClick={() => setLoadedBubbleImage(props.bubbleImage)}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <Stack>
        <img
          className="size-36 opacity-50 blur-xs select-none"
          draggable={false}
          src={props.bubbleImage}
          alt=""
        />
        <img
          className="size-36 brightness-100 select-none"
          draggable={false}
          src={props.bubbleImage}
          alt=""
        />
      </Stack>
    </motion.button>
  );
};

const Stack = (props: { children: ReactNode }) => (
  <div className="grid [&>*]:[grid-area:1/1]">{props.children}</div>
);
