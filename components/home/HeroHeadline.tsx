"use client";

import { LayoutGroup, motion } from "motion/react";
import RotatingText from "@/components/shadcn/rotatingText/RotatingText";

export default function HeroHeadline() {
  return (
    <LayoutGroup>
      <motion.div
        layout
        className="flex flex-wrap items-center justify-center gap-3 md:flex-nowrap md:gap-4"
      >
        {/* <motion.p layout className="text-6xl font-accent font-bold whitespace-nowrap">
          Create
        </motion.p> */}

        <RotatingText
          texts={[
            "christmas",
            "birthday",
            "valentine's day",
            "anniversary",
            "graduation",
          ]}
          mainClassName="bg-linear-to-r from-main-yellow to-main-red px-4 py-2 font-accent text-4xl font-bold text-main-white rounded-xl sm:px-5 sm:py-3 xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          staggerFrom="last"
          staggerDuration={0.025}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
          animatePresenceMode="wait"
        />

        {/* <motion.p layout className="text-6xl font-accent font-bold whitespace-nowrap">
          cards in minutes.
        </motion.p> */}
      </motion.div>
    </LayoutGroup>
  );
}
