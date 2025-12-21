"use client";

import { LayoutGroup, motion } from "motion/react";
import RotatingText from "@/components/shadcn/rotatingText/RotatingText";

export default function HeroHeadline() {
  return (
    <LayoutGroup>
      <motion.div
        layout
        className="flex gap-4 items-center justify-center transition"
      >
        <motion.h1
          layout
          className="text-4xl font-accent font-semibold text-zinc-900 sm:text-5xl"
        >
          Create
        </motion.h1>

        <RotatingText
          texts={[
            "christmas",
            "birthday",
            "valentine's day",
            "anniversary",
            "graduation",
          ]}
          mainClassName="overflow-hidden px-2 sm:px-2 md:px-3 bg-linear-to-r from-main-yellow to-main-red text-main-white font-accent text-4xl font-bold py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
          splitLevelClassName="overflow-hidden"
          animatePresenceMode="wait"
        />

        <motion.h1
          layout
          className="text-4xl font-accent font-semibold leading-tight text-zinc-900 sm:text-5xl"
        >
          cards in minutes.
        </motion.h1>
      </motion.div>
    </LayoutGroup>
  );
}