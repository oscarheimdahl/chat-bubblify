import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { useAtom } from "jotai";
import { Text as TextType } from "konva/lib/shapes/Text";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { Layer, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";

import {
  bubbleImageAtom,
  canvasDimensionsAtom,
  textFocusedAtom,
} from "@/store/store";
import { cn } from "@/utils/cn";
import { useShiftHeld } from "@/utils/use-shift-held";

export const TextLayer = () => {
  const [bubbleImage] = useAtom(bubbleImageAtom);
  const [canvasDim] = useAtom(canvasDimensionsAtom);

  const [textFocused, setTextFocused] = useAtom(textFocusedAtom);

  const [text, setText] = useState("Text...");
  const [isEditing, setIsEditing] = useState(false);
  const [textWidth, setTextWidth] = useState(200);
  const textRef = useRef<TextType>(null);
  const trRef = useRef<TransformerType>(null);

  const shift = useShiftHeld();

  useEffect(() => {
    if (trRef.current && textRef.current) {
      trRef.current.nodes([textRef.current]);
    }
  }, [isEditing]);

  const handleTextDblClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleTransform = () => {
    const node = textRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const newWidth = node.width() * scaleX;
    setTextWidth(newWidth);
  };

  if (!bubbleImage) return null;

  return (
    <Layer>
      <Text
        ref={textRef}
        text={text}
        width={textWidth}
        x={-100 + canvasDim.w / 6}
        y={-40 + canvasDim.w / 6}
        padding={10}
        fontSize={30}
        draggable
        shadowColor="white"
        shadowBlur={2}
        shadowEnabled
        onTransform={handleTransform}
        visible={!isEditing}
        align="center"
        onDblClick={handleTextDblClick}
        onDblTap={handleTextDblClick}
        onTap={() => setTextFocused((prev) => !prev)}
        onClick={() => {
          console.log(`Click`);
          return setTextFocused((prev) => !prev);
        }}
      />
      {isEditing && (
        <TextEditor
          textNode={textRef.current}
          value={text}
          onChange={handleTextChange}
          onClose={handleClose}
        />
      )}
      {!isEditing && (
        <Transformer
          ref={trRef}
          visible={textFocused}
          enabledAnchors={["middle-left", "middle-right"]}
          rotationSnaps={[0, 90, 180, 270]}
          rotationSnapTolerance={shift ? 20 : 0}
          boundBoxFunc={(_oldBox, newBox) => ({
            ...newBox,
            width: Math.max(30, newBox.width),
          })}
        />
      )}
    </Layer>
  );
};

const TextEditor = (props: {
  value: string;
  textNode: TextType | null;
  onClose: () => void;
  onChange: (text: string) => void;
}) => {
  const { textNode, onClose } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textarea = textareaRef.current;

  useEffect(() => {
    const handleOutsideClick = (
      e: globalThis.MouseEvent | globalThis.TouchEvent,
    ) => {
      if (!textarea || e.target === textarea) return;
      onClose();
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [onClose, textarea]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      props.onChange(e.currentTarget.value);
      props.onClose();
    }
    if (e.key === "Escape") {
      props.onClose();
    }
  };

  const handleInput = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textNode = props.textNode;
    const textArea = textareaRef.current;
    if (!textNode || !textArea) return;

    const scale = textNode.getAbsoluteScale().x;
    textArea.style.width = `${textNode.width() * scale}px`;
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight + textNode.fontSize()}px`;

    props.onChange(e.currentTarget.value);
  };

  const padding = textNode?.padding() ?? 0;
  const width = textNode?.width() ?? 0;
  const height = textNode?.height() ?? 0;

  textarea?.focus();

  return (
    <Html>
      <textarea
        autoFocus
        onBlur={onClose}
        style={{
          left: `${textNode?.position().x}px`,
          top: `${textNode?.position().y}px`,
          width: `${width - padding * 2}px`,
          height: `${height - padding * 2 + 5}px`,
          fontSize: `${textNode?.fontSize()}px`,
          lineHeight: textNode?.lineHeight().toString(),
          fontFamily: textNode?.fontFamily(),
          // textAlign: textNode?.align(),
          textAlign: "center",
          color: textNode?.fill().toString(),
          transform: `rotateZ(${textNode?.rotation()}deg)`,
          transformOrigin: "left top",
          padding: "10px",
        }}
        value={props.value}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={cn(
          "absolute z-30 m-0 box-content min-h-4 origin-top-left resize-none overflow-hidden border-none bg-none italic outline-none",
        )}
        ref={textareaRef}
      />
    </Html>
  );
};
