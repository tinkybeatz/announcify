"use client";

import { useRef } from "react";
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-main-black text-main-white"
      style={{ height: `${pages * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden z-10">
        <DarkVeil hueShift={140} hueShift2={240} />

        <div className="grid grid-cols-3 grid-rows-1 h-full w-full">
          <div className="w-full col-start-2 col-span-2 p-40 z-10">
            <p className="mb-10 text-sm uppercase tracking-wider text-white/50">
              {title}
            </p>

            <div
              className="relative z-10"
              style={{ height: `${lines.length * 72}px` }}
            >
              {lines.map((line, index) => (
                <ParallaxLine
                  key={`${line.label}-${index}`}
                  line={line}
                  index={index}
                  pages={pages}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
