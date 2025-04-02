import { useAtom } from "jotai";
import { motion } from "motion/react";

import guyImage from "@/assets/guy.png";
import { backgroundImageAtom } from "@/store/store";

export const Intro = () => {
  const [backgroundImage] = useAtom(backgroundImageAtom);

  return (
    <motion.div
      initial={{
        translateX: "9rem",
        translateY: "1rem",
        transition: {
          delay: 4,
        },
      }}
      animate={{
        translateX: backgroundImage ? "25rem" : "0rem",
        translateY: "0rem",
      }}
      className="fixed -right-12 bottom-0 select-none"
    >
      <motion.img
        draggable={false}
        whileTap={{ translateX: "-1rem" }}
        whileHover={{ translateX: "-2rem" }}
        src={guyImage}
        alt="Upload an image to get started"
        className="aspect-square w-full max-w-[250px] md:max-w-[400px]"
      />
    </motion.div>
  );
};
