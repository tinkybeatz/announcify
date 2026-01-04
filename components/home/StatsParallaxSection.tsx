"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { ParallaxLine } from "./ParallaxLines";
import DarkVeil from "../shadcn/darkVeil/DarkVeil";

type StatLine = { label: string; value: number | string };

export function StatsParallaxSection({
  lines,
  title = "Live stats",
}: {
  lines: StatLine[];
  title?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const pages = lines.length + 1;
  
  // Responsive stack gap based on screen size
  const [stackGap, setStackGap] = useState(72);

  useEffect(() => {
    const updateGap = () => {
      if (window.innerWidth < 768) {
        setStackGap(64); // mobile
      } else if (window.innerWidth < 1024) {
        setStackGap(64); // tablet
      } else {
        setStackGap(64); // lg screens and up
      }
    };

    updateGap();
    window.addEventListener("resize", updateGap);
    return () => window.removeEventListener("resize", updateGap);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-yellow-50 text-main-black"
      style={{ height: `${pages * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden z-10">
        <div className="grid grid-cols-3 grid-rows-1 h-full w-full">
          <div className="w-full col-start-2 col-span-2 xl:p-40 lg:py-40 lg:px-30 z-10">
            <p className="mb-10 text-sm uppercase font-raleway text-main-black">
              {title}
            </p>

            <div
              className="relative z-10"
              style={{ height: `${lines.length * stackGap}px` }}
            >
              {lines.map((line, index) => (
                <ParallaxLine
                  key={`${line.label}-${index}`}
                  line={line}
                  index={index}
                  pages={pages}
                  scrollYProgress={scrollYProgress}
                  stackGap={stackGap}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
