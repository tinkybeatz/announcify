"use client";

import BackgroundGlares from "@/components/customBackgrounds/backgroundGlares/BackgroundGlares";
import { HorizontalMasonryFeatures } from "@/components/masonry/HorizontalMasonryFeatures";
import { Navbar } from "@/components/navbar/Navbar";
import { NavbarBlue } from "@/components/navbar/NavbarBlue";
import GlareHover from "@/components/shadcn/glareHover/GlareHover";
import Link from "next/link";
import Image from "next/image";
import NavbarBlueLanding from "@/components/navbar/NavbarBlueLanding";

import weddingRingSvg from "@/assets/svg/wedding-ring.svg";
import graduationHatSvg from "@/assets/svg/graduation-hat.svg";
import fireworkSvg from "@/assets/svg/firework.svg";
import giftSvg from "@/assets/svg/gift.svg";
import heartSvg from "@/assets/svg/heart.svg";
import { useEffect, useState, useRef } from "react";

interface IcardTypes {
  name: string;
  ready: boolean;
  description: string;
  image: string;
  features?: string[];
  link?: string;
}

export default function CreatePage() {
  const [showNavbarBlue, setShowNavbarBlue] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Show/hide NavbarBlue based on scroll position
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollY = scrollContainer.scrollTop;
      setShowNavbarBlue(scrollY > 96);
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const cardTypes: IcardTypes[] = [
    {
      name: "Birthday card",
      ready: true,
      description: "Create a personalized birthday card.",
      image: giftSvg,
      features: ["Personal messages", "Gift options", "Theme options"],
      link: "/create/birthday",
    },
    {
      name: "Valentine's day card",
      ready: true,
      description: "Create a romantic valentine's day card.",
      image: heartSvg,
      features: ["Personal messages"],
      link: "/create/valentine",
    },
    {
      name: "Christmas card",
      ready: false,
      description: "Create a festive christmas card.",
      image: giftSvg,
    },
    {
      name: "New Year's Eve card",
      ready: false,
      description: "Create a joyful new year's eve card.",
      image: fireworkSvg,
    },
    {
      name: "Graduation card",
      ready: false,
      description: "Create a customized graduation card.",
      image: graduationHatSvg,
    },
    {
      name: "Wedding card",
      ready: false,
      description: "Create a personalized wedding card.",
      image: weddingRingSvg,
    },
  ];
  return (
    <main className="flex flex-col bg-main-white text-main-black">
      <div
        ref={scrollContainerRef}
        className="flex flex-col h-screen overflow-y-scroll bg-sky-400"
      >
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
            showNavbarBlue
              ? "translate-y-0"
              : "-translate-y-full pointer-events-none"
          }`}
        >
          <NavbarBlue isVisible={showNavbarBlue} />
        </div>
        <NavbarBlueLanding />
        <div className="bg-yellow-50 rounded-xl mb-8 mx-8 relative flex flex-col p-8 items-center">
          {/* hero headline */}
          <div className="fle flex-col my-12 font-raleway font-extrabold text-center text-5xl text-main-black">
            <h1>
              Create a{" "}
              <span className="bg-pink-300 drop-shadow-lg px-4 py-1 rounded-full text-main-black">
                new card
              </span>{" "}
              now.
            </h1>
            <p className="mt-4 text-xl font-medium font-rethink">
              Create a meaningful card. Choose between a selection of card types
              below.
            </p>
            <p className="text-xl font-medium font-rethink">
              More card types coming soon!
            </p>
          </div>

          <div className="flex flex-col gap-4 items-start justify-start p-8 rounded-xl w-full bg-pink-300">
            {/* <p className="text-main-black/75 font-medium w-full">
            Create meaningful cards for your loved ones. Choose between a
            selection of card types below.
          </p> */}
            <div className="grid grid-cols-3 gap-8 w-full">
              {cardTypes.map((card, key) =>
                card.ready &&
                card.description &&
                card.features &&
                card.image &&
                card.link ? (
                  <div
                    key={key}
                    className="flex flex-col rounded-xl h-110 cursor-default w-full bg-yellow-50 p-6 gap-6"
                  >
                    <div className="flex h-[15%] w-full">
                      <div className="flex h-full aspect-square items-center justify-center">
                        <Image
                          src={card.image}
                          alt={`${card.name} illustration`}
                          className="h-16 w-16"
                        />
                      </div>
                      <div className="flex flex-col ml-4 justify-center">
                        <h2 className="font-rethink font-bold text-2xl text-main-black">
                          {card.name}
                        </h2>
                        <p className="font-rethink font-medium text-main-black/75">
                          {card.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex h-[70%] border-y pt-4 pb-2 border-main-black/20 w-full justify-between flex-col">
                      <div className="flex flex-col content-start gap-1 items-start h-auto w-full">
                        {card.features.map((feature, key) => (
                          // <div
                          //   key={key}
                          //   className={`inline-flex w-fit items-center bg-linear-to-r ${
                          //     feature.ok
                          //       ? "from-pink-500 to-sky-500"
                          //       : "from-zinc-300/75 to-zinc-300"
                          //   } rounded-full px-px py-px`}
                          // >
                          //   <div
                          //     className={`bg-linear-to-r ${
                          //       feature.ok
                          //         ? "from-pink-100 to-sky-100"
                          //         : "from-zinc-50 to-zinc-100"
                          //     } rounded-full px-1.5 py-0.5`}
                          //   >
                          //     <p
                          //       className={`text-sm ${
                          //         feature.ok
                          //           ? "text-main-black/80"
                          //           : "text-main-black/50"
                          //       } font-medium whitespace-nowrap`}
                          //     >
                          //       {feature.text} {feature.ok ? "✓" : "✗"}
                          //     </p>
                          //   </div>
                          // </div>
                          <p key={key} className="inline-flex w-fit">
                            <span className="font-extrabold pr-2 text-pink-400">✓</span>
                            {feature}
                          </p>
                        ))}
                      </div>
                      <div className="text-xs text-main-black/25 w-full text-start">
                        * We are currently working on more features
                      </div>
                    </div>
                    <div className="flex h-[15%] w-full items-center">
                      <div className="flex flex-col text-main-black w-1/3 text-xl h-full font-semibold items-center justify-center">
                        $0
                      </div>
                      <Link
                        href={card.link}
                        className="flex items-center justify-center w-2/3 bg-sky-300 hover:bg-sky-400 hover:scale-105 transition-all duration-300 rounded-lg h-full text-base font-medium"
                      >
                        Create card
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div
                    key={key}
                    className="flex flex-col grayscale rounded-xl h-110 cursor-default w-full bg-yellow-50 p-6 gap-6"
                  >
                    <div className="flex h-[15%] w-full">
                      <div className="flex h-full aspect-square items-center justify-center">
                        <Image
                          src={card.image}
                          alt={`${card.name} illustration`}
                          className="h-16 w-16"
                        />
                      </div>
                      <div className="flex flex-col ml-4 justify-center">
                        <h2 className="font-rethink font-bold text-2xl text-main-black">
                          {card.name}
                        </h2>
                        <p className="font-rethink font-medium text-main-black/75">
                          {card.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex h-[85%] border-t pt-4 pb-2 border-main-black/20 text-main-black/25 text-lg w-full justify-center items-center flex-col">
                      This card type is coming soon!
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* card svg
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={CardSvg}
            alt="Greeting card illustration"
            className="absolute -bottom-20 -right-40 drop-shadow-lg h-100"
          />
        </div> */}
        </div>
      </div>
    </main>
  );
}
