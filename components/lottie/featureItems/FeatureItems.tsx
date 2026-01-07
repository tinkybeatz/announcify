"use client";

import { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import tickAnimation from "./35202437_hand_drawn_tick-1.json";

export default function FeatureItems({
  text,
  index,
  shouldPlay,
}: {
  text: string;
  index: number;
  shouldPlay: boolean;
}) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    if (shouldPlay && lottieRef.current) {
      // Stagger each animation by 1 second based on index
      const delay = index * 1000;
      const timer = setTimeout(() => {
        lottieRef.current?.goToAndPlay(0, true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [shouldPlay, index]);

  return (
    <div className="flex items-center gap-2 text-3xl font-rethink font-bold h-14">
      <Lottie
        lottieRef={lottieRef}
        animationData={tickAnimation}
        loop={false}
        autoplay={false}
        className="w-12 h-12"
      />
      <p>{text}</p>
    </div>
  );
}