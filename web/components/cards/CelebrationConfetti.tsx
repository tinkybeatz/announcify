"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function CelebrationConfetti() {
  useEffect(() => {
    const colors = ["#ff4d6d", "#ffd166", "#6a4cff", "#00c6ff", "#00b894", "#ff9f1c"];
    confetti({
      particleCount: 300,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 1 },
      startVelocity: 70,
      colors,
    });

    confetti({
      particleCount: 300,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 1 },
      startVelocity: 70,
      colors,
    });
  }, []);

  return null;
}
