import { Navbar } from "@/components/navbar/navbar";
import HeroHeadline from "@/components/home/HeroHeadline";
import Link from "next/link";
import Image from "next/image";
import svgCard2 from "@/assets/svg/SVG-Card-2.svg";
import { Tilt } from "@/components/tilt/tilt";

import ScrollFloat from "@/components/shadcn/scrollFloat/ScrollFloat";
import CountUp from "@/components/shadcn/countUp/CountUp";
import DarkVeil from "@/components/shadcn/darkVeil/DarkVeil";

export default function Home() {
  return (
    <main className="flex flex-col bg-main-white text-zinc-900">
      <Navbar />
      <section className="relative text-center flex items-center justify-start flex-col w-full h-screen overflow-hidden bg-main-white">
        {/* <div className="cursor-default relative z-10 mb-8 py-1 px-3 font-accent font-medium rounded-full backdrop-blur-xs border border-zinc-200 bg-white/50">
          Announcify
        </div> */}
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
            {/* <div className="text-xl">
              Personalize cards{" "}
              <span className="font-semibold font-accent">instantly</span> — no
              design skills required — because meaningful moments deserve{" "}
              <span className="font-semibold font-accent">more</span> than a
              generic card.
            </div> */}
            {/* <Image
              src={svgCard1}
              alt="SVG card"
              className="rounded-xl shadow-2xl"
            /> */}
            <Tilt className="inline-block">
              <Image
                src={svgCard2}
                alt="SVG card"
                className="rounded-xl shadow-2xl"
              />
            </Tilt>
          </div>
        </div>
        <div className="relative z-10 flex gap-3 mt-12 animate-in slide-in-from-bottom duration-1500 fade-in">
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
      </section>
      <section className="relative text-center flex items-center justify-center font-accent flex-col w-full h-screen overflow-hidden bg-main-black text-main-white font-accent">
        <DarkVeil />
        <CountUp
          from={0}
          to={100}
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
