"use client";

import { Navbar } from "@/components/navbar/navbar";
import { MobileNavbar } from "@/components/navbar/MobileNavbar";
import HeroHeadline from "@/components/home/HeroHeadline";
import Link from "next/link";
import Image from "next/image";
import CardSvg from "@/assets/svg/card.svg";
import birthdayCakeSvg from "@/assets/svg/birthday-cake.svg";
import fireworkSvg from "@/assets/svg/firework.svg";
import giftSvg from "@/assets/svg/gift.svg";
import graduationHatSvg from "@/assets/svg/graduation-hat.svg";
import heartSvg from "@/assets/svg/heart.svg";
import weddingRingSvg from "@/assets/svg/wedding-ring.svg";
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
    { label: "Birthday cards created", value: totalBirthdayCards },
    { label: "Valentines cards created", value: totalValentinesCards },
    { label: "Users", value: 1000 },
    { label: "Cards Created", value: totalCards },
    { label: "Templates", value: 25 },
    { label: "Users", value: 1000 },
  ];

  const CTAcards = [
    { type: "Birthday", icon: birthdayCakeSvg, link: "/create/birthday" },
    { type: "New Years Eve", icon: fireworkSvg, link: "/create/new-years-eve" },
    { type: "Valentine's Day", icon: heartSvg, link: "/create/valentines" },
    { type: "Anniversary", icon: weddingRingSvg, link: "/create/anniversary" },
    { type: "Graduation", icon: graduationHatSvg, link: "/create/graduation" },
    { type: "Christmas", icon: giftSvg, link: "/create/christmas" },
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
    <main className="flex flex-col bg-main-white text-main-black">
      <section className="flex flex-col bg-sky-400 h-auto">
        {/* navbar */}
        <div className="w-full text-main-black flex h-24 items-center px-16">
          <div className="font-rethink font-extrabold text-4xl">
            announcify.
          </div>
          <div className="font-rethink font-semibold text-xl w-full items-center flex justify-center gap-10">
            <div>test</div>
            <div>test</div>
            <div>test</div>
          </div>
        </div>
        <div className="bg-yellow-50 flex flex-col h-full mx-8 rounded-xl font-raleway font-extrabold text-2xl">
          {/* hero headline */}
          <div className="flex h-80 relative items-center justify-center text-6xl mx-70 text-center">
            <p className="leading-18">
              Create{" "}
              <span className="bg-pink-300 px-6 py-1 rounded-full text-main-black">
                meaningful
              </span>{" "}
              cards that last for a lifetime, in{" "}
              <span className="bg-pink-400 px-6 py-1 rounded-full text-main-black">
                minutes.
              </span>
            </p>
          </div>

          {/* card section */}
          <div className="flex h-200 items-start justify-end text-6xl mx-35 text-center overflow-hidden">
            <Image
              src={CardSvg}
              alt="Greeting card illustration"
              className="drop-shadow-lg h-250"
            />
          </div>
        </div>
      </section>
      <section className="flex bg-sky-400 h-auto p-24 font-raleway">
        <div className="flex items-center flex-col h-full w-full">
          <p className="flex text-5xl font-extrabold">What sort of cards</p>
          <p className="flex text-4xl font-extrabold">do you want to send?</p>
          <p className="flex w-full justify-center text-xl mt-2">
            You can choose between multiple type of cards including birthday,
            christmas, valentine&apos;s day, wedding, etc...
          </p>
          <p className="flex w-full justify-center text-xl">
            Each type of card has its own unique templates and designs to choose
            from.
          </p>
          <div className="h-auto grid grid-cols-3 w-full mt-12 gap-4">
            {CTAcards.map((card) => (
              <Link
                key={card.type}
                href={card.link}
                className={`flex items-center justify-between py-4 px-8 bg-yellow-50 rounded-xl duration-300`}
              >
                <p className="text-2xl font-bold">{card.type}</p>
                <Image
                  src={card.icon}
                  alt={`${card.type} icon`}
                  className="h-12 w-12"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <StatsParallaxSection lines={statsLanding} />
    </main>
  );
}
