"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type TiltProps = {
  children: React.ReactNode;
  maxTilt?: number;      // degrees
  perspective?: number;  // px
  scale?: number;        // hover scale
  className?: string;
};

export function Tilt({
  children,
  maxTilt = 12,
  perspective = 900,
  scale = 1.03,
  className,
}: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const rotateX = useSpring(rx, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(ry, { stiffness: 300, damping: 25 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height;  // 0..1

    const tiltY = (px - 0.5) * 2 * maxTilt;   // left/right => rotateY
    const tiltX = (0.5 - py) * 2 * maxTilt;   // up/down   => rotateX

    rx.set(tiltX);
    ry.set(tiltY);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div style={{ perspective }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}