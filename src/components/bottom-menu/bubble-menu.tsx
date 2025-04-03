import { ReactNode } from "react";

import { useAtom } from "jotai";
import { motion } from "motion/react";

import talkBubble from "@/assets/talk-bubble.svg";
import thinkBubble from "@/assets/think-bubble.svg";
import {
  backgroundImageAtom,
  bubbleImageAtom,
  canvasDimensionsAtom,
} from "@/store/store";

import { MenuWrapper } from "./menu-wrapper";

export const BubbleMenu = () => {
  return (
    <MenuWrapper>
      <div className="mx-auto flex flex-row gap-2">
        <BubbleButton bubbleImage={talkBubble} />
        <BubbleButton bubbleImage={thinkBubble} />
      </div>
    </MenuWrapper>
  );
};

const BubbleButton = (props: { bubbleImage: string }) => {
  const [loadedBubbleImage, setLoadedBubbleImage] = useAtom(bubbleImageAtom);
  const [canvasDim] = useAtom(canvasDimensionsAtom);
  const [backgroundImage] = useAtom(backgroundImageAtom);

  return (
    <motion.button
      layout
      disabled={!backgroundImage || loadedBubbleImage === props.bubbleImage}
      className="rounded-md px-2 py-1 disabled:hidden"
      onClick={() => setLoadedBubbleImage(props.bubbleImage)}
      onTap={() => setLoadedBubbleImage(props.bubbleImage)}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <Stack>
        <img
          style={{ maxWidth: `${canvasDim.w / 3}px` }}
          className="size-36 opacity-50 blur-xs select-none"
          draggable={false}
          src={props.bubbleImage}
          alt=""
        />
        <img
          style={{ maxWidth: `${canvasDim.w / 3}px` }}
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
