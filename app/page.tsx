"use client";

import { Navbar } from "@/components/navbar/navbar";
import { MobileNavbar } from "@/components/navbar/MobileNavbar";
import HeroHeadline from "@/components/home/HeroHeadline";
import Link from "next/link";
// import { Tilt } from "@/components/tilt/tilt";

// import ScrollFloat from "@/components/shadcn/scrollFloat/ScrollFloat";
// import CountUp from "@/components/shadcn/countUp/CountUp";
// import DarkVeil from "@/components/shadcn/darkVeil/DarkVeil";
// import { useSmoothWheel } from "./useSmoothScroll";
import { useState, useEffect } from "react";
// import SpotlightCard from "@/components/shadcn/spotlightCard/SpotlightCard";
// import Beams from "@/components/shadcn/beams/Beams";
import BackgroundGlares from "@/components/customBackgrounds/backgroundGlares/BackgroundGlares";
import { useLenis } from "./useLenis";
import { StatsParallaxSection } from "@/components/home/StatsParallaxSection";

export default function Home() {
  useLenis(true);
  // useSmoothWheel({ multiplier: 0.5, enabled: true });
  const [showButtons, setShowButtons] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [totalCards, setTotalCards] = useState(0);
  const [totalBirthdayCards, setTotalBirthdayCards] = useState(0);
  const [totalValentinesCards, setTotalValentinesCards] = useState(0);

  const statsLanding = [
    { label: "Cards created", value: totalCards },
    { label: "Birthday cards created", value: totalBirthdayCards},
    { label: "Valentines cards created", value: totalValentinesCards},
    { label: "Users", value: 1000 },
    { label: "Cards Created", value: totalCards },
    { label: "Templates", value: 25 },
    { label: "Users", value: 1000 },
  ];

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
        console.log("Fetched total cards:", data);
        setTotalBirthdayCards(data.totalBirthday);
        setTotalValentinesCards(data.totalValentines);
        setTotalCards(data.total);
      } catch (error) {
        console.error("Error fetching total cards:", error);
      }
    }
    fetchTotalCards();
  }, []);

  return (
    <main className="flex flex-col bg-main-white text-zinc-900">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      <section className="relative flex min-h-svh w-full flex-col items-center justify-start overflow-hidden bg-main-white text-center md:h-screen md:text-left">
        <BackgroundGlares />
        <div className="relative z-10 grid w-11/12 cursor-default grid-cols-1 place-content-center gap-6 pt-20 sm:gap-8 sm:pt-24 md:h-[70%] md:w-5/6 md:grid-cols-2 md:place-content-end md:pt-0 lg:gap-12 xl:gap-14">
          <div className="flex flex-col items-center justify-center space-y-3 animate-in slide-in-from-left-20 duration-1500 fade-in sm:space-y-4 md:items-start lg:space-y-5">
            <p className="flex justify-end font-accent text-4xl font-bold whitespace-normal sm:text-5xl md:text-6xl md:whitespace-nowrap lg:text-7xl xl:text-8xl">
              Create
            </p>
            <div className="flex justify-center md:justify-start">
              <HeroHeadline />
            </div>
            <p className="font-accent text-4xl font-bold whitespace-normal sm:text-5xl md:text-6xl md:whitespace-nowrap lg:text-7xl xl:text-8xl">
              cards in minutes.
            </p>
            <div
              className={`relative z-10 mt-4 flex w-full flex-col gap-3 transition-all duration-1500 sm:mt-5 md:mt-6 md:flex-row md:items-center ${
                showButtons
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/create"
                className="inline-flex w-full items-center justify-center rounded-xl bg-main-black/50 px-4 py-2 font-medium text-white transition hover:bg-main-black/60! md:w-auto"
              >
                Get started
              </Link>
              <Link
                className="inline-flex w-full items-center justify-center rounded-xl bg-main-black/50 px-4 py-3 font-medium text-white transition hover:bg-main-black/60! md:w-auto"
                href="/more"
              >
                Learn more
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center animate-in slide-in-from-right-20 duration-1500 fade-in">
            {/* <Tilt className="inline-block">
              <SpotlightCard
                className="custom-spotlight-card rounded-xl relative overflow-hidden bg-zinc-900"
                spotlightColor="rgba(255, 255, 255, 0.3)"
              >
                <Beams
                  beamWidth={2}
                  beamHeight={20}
                  beamNumber={10}
                  lightColor="#ffffff"
                  speed={2}
                  noiseIntensity={1.75}
                  scale={0.2}
                  rotation={30}
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none p-10">
                  <div className="text-white text-center text-4xl font-medium">
                    Dear Grandma...
                  </div>
                </div>
              </SpotlightCard>
            </Tilt> */}
          </div>
        </div>
        {/* Bottom spacer with scroll indicator */}
        <div className="absolute bottom-6 flex flex-[0.8] flex-col items-center justify-end md:bottom-8">
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


      {/* <section className="relative text-center flex items-center justify-center font-accent flex-col w-full h-screen overflow-hidden bg-main-black text-main-white font-accent">
        <DarkVeil hueShift={140} hueShift2={240} />
        <div className="grid grid-cols-3 grid-rows-1 h-full w-full z-10">
          <div className="flex col-start-2 col-span-2 items-center justify-center h-full w-full bg-red-400 p-28">
            <div className="flex flex-col h-full w-full bg-green-500 gap-2">
              {statsLanding.map((stat, key) => (
                <div key={key} className="flex gap-4 w-full bg-blue-500">
                  <span className="text-5xl font-bold">{stat.value}</span>
                  <span className="text-main-white text-3xl font-medium mt-2">{stat.label}</span>
                </div>
              ))}
            </div>
            <StatsParallaxLines
              lines={statsLanding}
              className="h-full w-full bg-green-500"
              lineClassName="bg-blue-500"
            />
          </div>
        </div>
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
      </section> */}
      <StatsParallaxSection lines={statsLanding} title="Site stats" />
    </main>
  );
}
