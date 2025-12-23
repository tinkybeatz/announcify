"use client";

import { LayoutGroup, motion } from "motion/react";
import RotatingText from "@/components/shadcn/rotatingText/RotatingText";

export default function HeroHeadline() {
  return (
    <LayoutGroup>
      <motion.div layout className="flex flex-nowrap gap-4 items-center justify-center">
        {/* <motion.p layout className="text-6xl font-accent font-bold whitespace-nowrap">
          Create
        </motion.p> */}

        <RotatingText
          texts={["christmas", "birthday", "valentine's day", "anniversary", "graduation"]}
          mainClassName="px-5 py-3 bg-linear-to-r from-main-yellow to-main-red text-main-white font-accent text-6xl font-bold rounded-lg"
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