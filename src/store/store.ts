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

export const bubblePositionAtom = atom<{ x: number; y: number }>({
  x: 0,
  y: 0,
});

export const bubbleDimensionsAtom = atom<{ w: number; h: number }>({
  w: 150,
  h: 100,
});

export const bubbleImageAtom = atom<string | null>(null);
export const backgroundImageAtom = atom<HTMLImageElement | null>(null);
