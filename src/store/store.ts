import { RefObject } from "react";

import { atom } from "jotai";
import { Stage as KonvaStage } from "konva/lib/Stage";

export const canvasStageRefAtom = atom<RefObject<KonvaStage | null> | null>(
  null,
);

export const canvasDimensionsAtom = atom<{ w: number; h: number }>({
  w: 0,
  h: 0,
});

export const bubbleFocusedAtom = atom<boolean>(false);
export const textFocusedAtom = atom<boolean>(false);
export const textPositionAtom = atom<{ x: number; y: number }>({
  x: 0,
  y: 0,
});

export const bubbleImageAtom = atom<string | null>(null);
export const backgroundImageAtom = atom<HTMLImageElement | null>(null);

export const activeMenuAtom = atom<"bubble" | "text" | null>(null);
