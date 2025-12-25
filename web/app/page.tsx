"use client";

import { Navbar } from "@/components/navbar/navbar";
import HeroHeadline from "@/components/home/HeroHeadline";
import Link from "next/link";
import Image from "next/image";
import svgCard2 from "@/assets/svg/SVG-Card-2.svg";
import { Tilt } from "@/components/tilt/tilt";

import ScrollFloat from "@/components/shadcn/scrollFloat/ScrollFloat";
import CountUp from "@/components/shadcn/countUp/CountUp";
import DarkVeil from "@/components/shadcn/darkVeil/DarkVeil";
import { useSmoothWheel } from "./useSmoothScroll";
import { useState, useEffect } from "react";

export default function Home() {
  useSmoothWheel({ multiplier: 0.5, enabled: true });
  const [showButtons, setShowButtons] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timerCta = setTimeout(() => {
      setCtaVisible(true);
    }, 3000);
    return () => clearTimeout(timerCta);
  }, []);

  useEffect(() => {
    async function fetchTotalCards() {
      try {
        const response = await fetch("/api/cards");
        const data = await response.json();
        setTotalCards(data.total);
      } catch (error) {
        console.error("Error fetching total cards:", error);
      }
    }
    fetchTotalCards();
  }, []);

  return (
    <main className="flex flex-col bg-main-white text-zinc-900">
      <Navbar />
      <section className="relative text-center flex items-center justify-start flex-col w-full h-screen overflow-hidden bg-main-white">
        <div className="relative w-5/6 z-10 grid grid-cols-2 cursor-default h-[70%] place-content-end">
          <div className="flex flex-col items-start space-y-4 justify-center animate-in slide-in-from-left-20 duration-1500 fade-in">
            <p className="flex text-6xl font-accent justify-end font-bold whitespace-nowrap">
              Create
            </p>
            <div className="flex justify-start">
              <HeroHeadline />
            </div>
            <p className="text-6xl font-accent font-bold whitespace-nowrap">
              cards in minutes.
            </p>
          </div>
          <div className="flex items-center justify-center animate-in slide-in-from-right-20 duration-1500 fade-in">
            <Tilt className="inline-block">
              <Image
                src={svgCard2}
                alt="SVG card"
                className="rounded-xl shadow-2xl"
              />
            </Tilt>
          </div>
        </div>
        <div
          className={`relative z-10 flex gap-3 mt-12 transition-all duration-1500 ${
            showButtons
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-xl bg-main-black/50 px-4 py-2 font-medium text-white transition hover:bg-main-black/60!"
          >
            Get started
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-xl bg-main-black/50 px-4 py-3 font-medium text-white transition hover:bg-main-black/60!"
            href="/more"
          >
            Learn more
          </Link>
        </div>
        {/* Bottom spacer with scroll indicator */}
        <div className="flex flex-[0.8] flex-col items-center justify-end absolute bottom-8">
          <div
            className={`flex flex-col items-center transition-all duration-500 gap-1 ${
              ctaVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
          >
            <span className="font-main text-xs font-medium uppercase text-main-black/50">
              Scroll
            </span>
            <div className="relative h-8 w-4 rounded-full border border-main-black/15">
              <div className="absolute left-1/2 top-1.5 h-1.5 w-0.5 animate-scrollIndicator rounded-full" />
            </div>
          </div>
        </div>
      </section>
      <section className="relative text-center flex items-center justify-center font-accent flex-col w-full h-screen overflow-hidden bg-main-black text-main-white font-accent">
        <DarkVeil hueShift={239} />
        <CountUp
          from={0}
          to={totalCards}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text text-main-white text-[100px]/5 font-bold z-10"
        />
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          cards created
        </ScrollFloat>
      </section>
    </main>
  );
}
