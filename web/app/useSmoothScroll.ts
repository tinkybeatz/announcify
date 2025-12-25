"use client";

import { useEffect, useRef } from "react";

type SmoothScrollOptions = {
  multiplier?: number;
  duration?: number;
  enabled?: boolean;
};

export function useSmoothWheel({ 
  multiplier = 0.5, 
  duration = 1000,
  enabled = true 
}: SmoothScrollOptions = {}) {
  const isScrollingRef = useRef(false);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;

    let animationFrameId: number;

    const smoothScroll = () => {
      if (!isScrollingRef.current) return;

      const diff = targetScrollRef.current - currentScrollRef.current;
      const delta = diff * 0.1; // Easing factor

      if (Math.abs(diff) < 0.5) {
        currentScrollRef.current = targetScrollRef.current;
        window.scrollTo(0, targetScrollRef.current);
        isScrollingRef.current = false;
        return;
      }

      currentScrollRef.current += delta;
      window.scrollTo(0, currentScrollRef.current);
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Update current position if not already scrolling
      if (!isScrollingRef.current) {
        currentScrollRef.current = window.scrollY;
      }

      // Calculate new target
      targetScrollRef.current += e.deltaY * multiplier;
      
      // Clamp to valid scroll range
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollRef.current = Math.max(0, Math.min(maxScroll, targetScrollRef.current));

      // Start animation if not already running
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        smoothScroll();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [multiplier, duration, enabled]);
}