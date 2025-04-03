import { ReactNode, useEffect, useRef } from "react";

import { useAtom } from "jotai";
import { motion } from "motion/react";

import { activeMenuAtom } from "@/store/store";

export const MenuWrapper = (props: { children: ReactNode }) => {
  const [, setActiveMenu] = useAtom(activeMenuAtom);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (
      e: globalThis.MouseEvent | globalThis.TouchEvent,
    ) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as Node)) return;
      setActiveMenu(null);
    };

    setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    });
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [setActiveMenu]);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: "300px" }}
      animate={{ opacity: 1, translateY: "0px" }}
      exit={{ opacity: 0, translateY: "300px" }}
      ref={ref}
      className="mx-auto flex w-fit items-center justify-center gap-2 rounded-md border-2 border-black bg-neutral-200 p-4 shadow-sm"
    >
      {props.children}
    </motion.div>
  );
};
