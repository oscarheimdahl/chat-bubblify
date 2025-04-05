import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { useAtom } from "jotai";
import { Text as TextType } from "konva/lib/shapes/Text";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { Layer, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";

import {
  bubbleImageAtom,
  bubblePositionAtom,
  textFocusedAtom,
  textFontAtom,
  textPositionAtom,
  textSizeAtom,
} from "@/store/store";
import { cn } from "@/utils/cn";
import { useShiftHeld } from "@/utils/use-shift-held";

export const TextLayer = () => {
  const [bubbleImage] = useAtom(bubbleImageAtom);
  const [bubblePosition] = useAtom(bubblePositionAtom);
  const [textPosition, setTextPosition] = useAtom(textPositionAtom);
  const [textSize] = useAtom(textSizeAtom);
  const [textFont] = useAtom(textFontAtom);

  const [textFocused, setTextFocused] = useAtom(textFocusedAtom);

  const [text, setText] = useState("Text...");
  const [isEditing, setIsEditing] = useState(false);
  const [textWidth, setTextWidth] = useState(200);
  const textRef = useRef<TextType>(null);
  const trRef = useRef<TransformerType>(null);

  const [, setTestX] = useState(0);

  const shift = useShiftHeld();

  useEffect(() => {
    if (trRef.current && textRef.current) {
      trRef.current.nodes([textRef.current]);
    }
  }, [isEditing]);

  const handleTextDblClick = () => {
    setIsEditing(true);
    setTestX(100);
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

  return (
    <Layer visible={!!bubbleImage}>
      <Text
        offsetX={textWidth / 2}
        offsetY={textSize}
        ref={textRef}
        text={text}
        width={textWidth}
        x={bubblePosition.x + textPosition.x}
        y={bubblePosition.y + textPosition.y}
        padding={10}
        fontSize={textSize}
        fontFamily={textFont}
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
        onClick={() => setTextFocused((prev) => !prev)}
        onDragMove={(e) =>
          setTextPosition({
            x: e.target.x() - bubblePosition.x,
            y: e.target.y() - bubblePosition.y,
          })
        }
      />
      {isEditing && (
        <TextEditor
          textNode={textRef.current}
          value={text}
          onChange={handleTextChange}
          onClose={handleClose}
        />
      )}

      <Transformer
        visible={textFocused && !isEditing}
        ref={trRef}
        enabledAnchors={["middle-left", "middle-right"]}
        rotationSnaps={[0, 90, 180, 270]}
        rotationSnapTolerance={shift ? 20 : 0}
        boundBoxFunc={(_oldBox, newBox) => ({
          ...newBox,
          width: Math.max(30, newBox.width),
        })}
      />
    </Layer>
  );
};

const TextEditor = (props: {
  value: string;
  textNode: TextType | null;
  onClose: () => void;
  onChange: (text: string) => void;
}) => {
  const [bubblePosition] = useAtom(bubblePositionAtom);
  const [textPosition] = useAtom(textPositionAtom);

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
  const size = textNode?.fontSize() ?? 0;

  textarea?.focus();

  return (
    <Html>
      <textarea
        autoFocus
        onBlur={onClose}
        style={{
          left: `${textPosition.x + bubblePosition.x - width / 2}px`,
          top: `${textPosition.y + bubblePosition.y - size}px`,
          width: `${width - padding * 2}px`,
          height: `${height - padding * 2 + 5}px`,
          fontSize: `${size}px`,
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
