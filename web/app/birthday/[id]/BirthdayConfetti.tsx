"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function BirthdayConfetti() {
  useEffect(() => {
    // Confetti from bottom left
    confetti({
      particleCount: 300,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 1 },
      startVelocity: 70,
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
    });

    // Confetti from bottom right
    confetti({
      particleCount: 300,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 1 },
      startVelocity: 70,
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
    });
  }, []);

  return null;
}
