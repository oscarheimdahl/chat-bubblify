import { useAtom } from "jotai";
import {
  ArrowBigDown,
  ArrowBigUp,
  Bold,
  CaseSensitive,
  Check,
  Italic,
  Underline,
} from "lucide-react";

import { IconButton } from "@/components/icon-button";
import {
  textBoldAtom,
  textFontAtom,
  textItalicsAtom,
  textSizeAtom,
  textUnderlineAtom,
} from "@/store/store";
import { cn } from "@/utils/cn";

import { MenuWrapper } from "./menu-wrapper";

export const TextMenu = () => {
  const [textSize, setTextSize] = useAtom(textSizeAtom);
  const [textFont, setTextFont] = useAtom(textFontAtom);
  const [, setTextItalics] = useAtom(textItalicsAtom);
  const [, setTextBold] = useAtom(textBoldAtom);
  const [, setTextUnderline] = useAtom(textUnderlineAtom);

  return (
    <MenuWrapper>
      <div className="flex items-center gap-2 select-none">
        <div className="flex flex-col">
          <IconButton
            className="bg-emerald-600 transition-all active:-translate-y-1"
            icon={<ArrowBigUp fill="white" />}
            label="Increase text size"
            onClick={() => setTextSize(textSize + 2)}
          ></IconButton>
          <CaseSensitive className="size-12 text-neutral-900" />
          <IconButton
            className="bg-emerald-600 transition-all active:translate-y-1"
            icon={<ArrowBigDown fill="white" />}
            label="Decrease text size"
            onClick={() => setTextSize(textSize - 2)}
          ></IconButton>
        </div>
        <div className="group ml-8 flex flex-col items-start">
          <FontButton
            selected={textFont === "Inter"}
            onClick={() => setTextFont("Inter")}
            className="font-inter"
          >
            Sans serif
          </FontButton>
          <FontButton
            selected={textFont === "JetBrains Mono"}
            onClick={() => setTextFont("JetBrains Mono")}
            className="font-jetbrains"
          >
            Mono space
          </FontButton>
          <FontButton
            selected={textFont === "EB Garamond"}
            onClick={() => setTextFont("EB Garamond")}
            className="font-garamond text-2xl md:text-4xl"
          >
            Serif
          </FontButton>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <IconButton
            className="bg-neutral-500 transition-all active:-translate-y-1"
            icon={<Italic />}
            label="Text style italic"
            onClick={() => setTextItalics((prev) => !prev)}
          />
          <IconButton
            className="bg-neutral-500 transition-all active:-translate-y-1"
            icon={<Bold />}
            label="Text style bold"
            onClick={() => setTextBold((prev) => !prev)}
          />
          <IconButton
            className="bg-neutral-500 transition-all active:-translate-y-1"
            icon={<Underline />}
            label="Text style underline"
            onClick={() => setTextUnderline((prev) => !prev)}
          />
        </div>
      </div>
    </MenuWrapper>
  );
};

const FontButton = (props: {
  children: string;
  className?: string;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <button
      onClick={props.onClick}
      className={cn(
        "font-inter relative flex items-center gap-2 pr-8 text-xl transition-all md:text-3xl",
        props.selected && "translate-x-8",
        !props.selected && "hover:translate-x-2",
        props.className,
      )}
    >
      <Check
        className={cn(
          "absolute -left-8 transition-opacity",
          props.selected && "duration-300",
          !props.selected && "opacity-0",
        )}
      />
      {props.children}
    </button>
  );
};
