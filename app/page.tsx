"use client";

import { Navbar } from "@/components/navbar/navbar";
import { MobileNavbar } from "@/components/navbar/MobileNavbar";
import HeroHeadline from "@/components/home/HeroHeadline";
import FeatureItems from "@/components/lottie/featureItems/FeatureItems";
import Link from "next/link";
import Image from "next/image";
import CardSvg from "@/assets/svg/card.svg";
import birthdayCakeSvg from "@/assets/svg/birthday-cake.svg";
import fireworkSvg from "@/assets/svg/firework.svg";
import giftSvg from "@/assets/svg/gift.svg";
import graduationHatSvg from "@/assets/svg/graduation-hat.svg";
import heartSvg from "@/assets/svg/heart.svg";
import weddingRingSvg from "@/assets/svg/wedding-ring.svg";
// import arrow1Svg from "@/assets/svg/arrow1.svg";
// import arrow2Svg from "@/assets/svg/arrow2.svg";
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
import { NavbarBlue } from "@/components/navbar/navbar-blue";
import NavbarBlueLanding from "@/components/navbar/NavbarBlueLanding";
import { BorderBeam } from "@/components/shadcn/borderBeam/border-beam";
import FAQSection from "@/components/FAQ/FAQSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  useLenis(true);
  // useSmoothWheel({ multiplier: 0.5, enabled: true });
  const [showButtons, setShowButtons] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [totalCards, setTotalCards] = useState(0);
  const [totalBirthdayCards, setTotalBirthdayCards] = useState(0);
  const [totalValentinesCards, setTotalValentinesCards] = useState(0);
  const [showNavbarBlue, setShowNavbarBlue] = useState(false);

  // Show/hide NavbarBlue based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowNavbarBlue(scrollY > 96);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const statsLandingNew = [
    { label: "Users", value: 1000 },
    { label: "Templates", value: 25 },
    { label: "Birthday cards created", value: totalBirthdayCards },
    { label: "Valentines cards created", value: totalValentinesCards },
  ];

  // const statsLanding = [
  //   { label: "Cards created", value: totalCards },
  //   { label: "Birthday cards created", value: totalBirthdayCards },
  //   { label: "Valentines cards created", value: totalValentinesCards },
  //   { label: "Users", value: 1000 },
  //   { label: "Cards Created", value: totalCards },
  //   { label: "Templates", value: 25 },
  //   { label: "Users", value: 1000 },
  // ];

  const featuresTexts = [
    "Choose from multiple themes",
    "Customize every detail",
    "Save all your cards",
    "Edit cards anytime",
    "Use ready-made cards for free",
    "Share cards with one link",
    "No design skills needed",
    "Fast and easy process",
  ];

  const CTAcards = [
    { type: "Birthday", icon: birthdayCakeSvg, link: "/create/birthday" },
    { type: "New Years Eve", icon: fireworkSvg, link: "/create/new-years-eve" },
    { type: "Valentine's Day", icon: heartSvg, link: "/create/valentines" },
    { type: "Anniversary", icon: weddingRingSvg, link: "/create/anniversary" },
    { type: "Graduation", icon: graduationHatSvg, link: "/create/graduation" },
    { type: "Christmas", icon: giftSvg, link: "/create/christmas" },
  ];

  const [CTAhoveredIndex, setCTAHoveredIndex] = useState<number | null>(null);
  const [shouldPlayTicks, setShouldPlayTicks] = useState(false);

  const onCTAHover = (index: number) => {
    setCTAHoveredIndex(index);
  };

  const onCTALeave = () => {
    setCTAHoveredIndex(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Start Lottie animations after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPlayTicks(true);
    }, 1000);
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
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          showNavbarBlue
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <NavbarBlue />
      </div>
      <section className="flex flex-col bg-sky-400 h-auto">
        <NavbarBlueLanding />
        <div className="bg-yellow-50 flex flex-col h-full mx-8 rounded-xl font-raleway font-extrabold text-2xl">
          {/* hero headline */}
          <div className="flex h-80 relative items-center justify-center text-6xl mx-70 text-center">
            <h1 className="leading-18">
              Create{" "}
              <span className="bg-pink-300 drop-shadow-lg px-6 py-1 rounded-full text-main-black">
                meaningful
              </span>{" "}
              cards that last for a lifetime, in{" "}
              <span className="bg-pink-400 drop-shadow-lg px-6 py-1 rounded-full text-main-black">
                minutes.
              </span>
            </h1>
          </div>

          {/* card section */}
          <div className="relative h-200 mx-28">
            {/* arrows & features (can overflow) */}
            {/* <Image
              src={arrow1Svg}
              alt="Arrow 1"
              className="absolute z-10 -left-10 -top-25 scale-25"
            />
            <Image
              src={arrow2Svg}
              alt="Arrow 2"
              className="absolute z-10 left-130 -top-40 scale-25"
            /> */}
            {/* card container (clips overflow) */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={CardSvg}
                alt="Greeting card illustration"
                className="absolute right-0 top-0 drop-shadow-lg h-250"
              />
            </div>
            {/* features text */}
            <div className="absolute z-10 top-0 left-0 w-160">
              {featuresTexts.map((text, index) => (
                <FeatureItems
                  key={index}
                  text={text}
                  index={index}
                  shouldPlay={shouldPlayTicks}
                />
              ))}
              <Link
                href="/create"
                className="mt-6 bg-main-black text-yellow-50 font-medium px-6 py-3 rounded-full text-lg hover:scale-105 transition-transform duration-300 inline-block font-rethink"
              >
                Try now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flex bg-sky-400 h-auto p-28 font-rethink">
        <div className="flex items-center flex-col h-full w-full text-main-black">
          <h2 className="flex text-5xl font-extrabold font-raleway">
            What sort of cards
          </h2>
          <h3 className="flex text-4xl font-extrabold font-raleway">
            do you want to send?
          </h3>
          <p className="flex w-full justify-center text-xl mt-2">
            You can choose between multiple type of cards including birthday,
            christmas, valentine&apos;s day, wedding, etc...
          </p>
          <p className="flex w-full justify-center text-xl">
            Each type of card has its own unique templates and designs to choose
            from.
          </p>
          <div className="h-auto grid grid-cols-3 w-full mt-12 gap-4 text-main-black">
            {CTAcards.map((card, key) => (
              <Link
                onMouseEnter={() => onCTAHover(key)}
                onMouseLeave={() => onCTALeave()}
                key={key}
                href={card.link}
                className={`flex items-center justify-between py-4 px-8 bg-yellow-50 rounded-xl duration-300 ${
                  CTAhoveredIndex === key ? "ring-3 ring-sky-500" : ""
                }`}
              >
                <p className="text-xl font-semibold">{card.type}</p>
                <div className="flex justify-center items-center gap-2">
                  <Image
                    src={card.icon}
                    alt={`${card.type} icon`}
                    className={`h-12 w-12 duration-300 ${
                      CTAhoveredIndex === key ? "scale-90 rotate-10" : ""
                    }`}
                  />
                  <svg
                    className={`h-6 w-6 duration-300 ${
                      CTAhoveredIndex === key ? "translate-x-2" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="bg-yellow-50 h-screen p-28">
        <div className="relative rounded-xl h-full w-full items-center drop-shadow-lg flex flex-col overflow-hidden">
          {/* Background image */}
          <Image
            src="/images/hero-background.png"
            alt="Stats background"
            fill
            className="object-cover"
            priority
          />
          {/* Sky overlay */}
          <div className="absolute inset-0 bg-sky-400/75" />
          {/* Content */}
          <div className="relative z-10 h-3/10 flex w-full items-center justify-center">
            <div className="drop-shadow-lg font-rethink bg-yellow-50 rounded-full px-6 py-3 text-2xl font-semibold">
              <span className="text-transparent bg-clip-text font-extrabold bg-linear-to-r from-sky-400 to-pink-400">
                {totalCards}
              </span>{" "}
              cards created
            </div>
          </div>
          <div className="relative z-10 flex flex-col w-full h-4/10 items-center justify-center">
            <h2 className="text-7xl font-extrabold font-raleway text-yellow-50 drop-shadow-lg">
              Join our community
            </h2>
            <h3 className="text-2xl font-semibold font-rethink text-yellow-50 drop-shadow-lg">
              Create your first card for free
            </h3>
            <Link
              href="/create"
              className="mt-6 bg-main-black text-yellow-50 font-medium px-6 py-3 rounded-full text-lg hover:scale-105 transition-transform duration-300"
            >
              Create a card
            </Link>
            <Image
              src={giftSvg}
              alt="Gift icon"
              className="drop-shadow-lg absolute right-50 -top-20 w-22 h-22 animate-wiggle"
            />
            <Image
              src={birthdayCakeSvg}
              alt="Birthday cake icon"
              className="drop-shadow-lg absolute left-50 -top-20 w-22 h-22 animate-wiggle"
              style={{ animationDelay: "-0.5s" }}
            />
            <Image
              src={fireworkSvg}
              alt="Firework icon"
              className="drop-shadow-lg absolute left-70 bottom-0 w-22 h-22 animate-wiggle"
              style={{ animationDelay: "-1s" }}
            />
            <Image
              src={heartSvg}
              alt="Heart icon"
              className="drop-shadow-lg absolute right-70 bottom-0 w-22 h-22 animate-wiggle"
              style={{ animationDelay: "-1.5s" }}
            />
          </div>
          <div className="relative z-10 h-3/10 grid grid-cols-4 w-5/6">
            {statsLandingNew.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-yellow-50 drop-shadow-lg"
              >
                <div className="text-5xl font-extrabold font-raleway">
                  {stat.value}
                </div>
                <div className="text-xl font-medium font-rethink">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="bg-sky-400 h-auto">
        <FAQSection />
      </section>
      {/* <StatsParallaxSection lines={statsLanding} /> */}
      <Footer />
    </main>
  );
}
