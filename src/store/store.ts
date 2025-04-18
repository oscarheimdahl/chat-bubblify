import { RefObject } from "react";

import { atom } from "jotai";
import { Stage as KonvaStage } from "konva/lib/Stage";

export type Fonts = "Inter" | "EB Garamond" | "JetBrains Mono";

export const canvasStageRefAtom = atom<RefObject<KonvaStage | null> | null>(
  null,
);

export const canvasDimensionsAtom = atom<{ w: number; h: number }>({
  w: 0,
  h: 0,
});

export const canvasFocusAtom = atom<"bubble" | "text" | null>(null);

export const textSizeAtom = atom<number>(20);
export const textFontAtom = atom<Fonts>("Inter");
export const textUnderlineAtom = atom(false);
export const textBoldAtom = atom(false);
export const textItalicsAtom = atom(true);
export const textPositionAtom = atom<{ x: number; y: number }>({
  x: 0,
  y: 0,
});
export const bubblePositionAtom = atom<{ x: number; y: number }>({
  x: 0,
  y: 0,
});

export const bubbleImageAtom = atom<string | null>(null);
export const backgroundImageAtom = atom<HTMLImageElement | null>(null);

export const activeMenuAtom = atom<"bubble" | "text" | null>(null);
