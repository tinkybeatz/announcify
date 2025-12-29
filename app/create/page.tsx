"use client";

import BackgroundGlares from "@/components/customBackgrounds/backgroundGlares/BackgroundGlares";
import { HorizontalMasonryFeatures } from "@/components/masonry/HorizontalMasonryFeatures";
import { Navbar } from "@/components/navbar/navbar";
import GlareHover from "@/components/shadcn/glareHover/GlareHover";
import Link from "next/link";
import { useState } from "react";

export default function CreatePage() {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const handleCardMouseEnter = (index: number) => {
    setHoveredCardIndex(index);
  };

  const handleCardMouseLeave = () => {
    setHoveredCardIndex(null);
  };

  const cardTypes = [
    {
      name: "Birthday card",
      description: "Create a personalized birthday card.",
      features: [
        { text: "Personal messages", ok: true },
        { text: "Gift options", ok: true },
        { text: "Theme options", ok: true },
        { text: "Stickers", ok: false },
        { text: "Color picking", ok: false },
        { text: "Collaborative options", ok: false },
        { text: "Image upload", ok: false },
        { text: "Custom signature", ok: false },
      ],
      link: "/create/birthday",
    },
    {
      name: "Valentine's day card",
      description: "Create a romantic valentine's day card.",
      features: [
        { text: "Personal messages", ok: true },
        { text: "Customizable templates", ok: false },
        { text: "Stickers", ok: false },
        { text: "Color picking", ok: false },
        { text: "Image upload", ok: false },
        { text: "Gift options", ok: false },
      ],
      link: "/create/valentine",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-main-white">
      <Navbar />
      <BackgroundGlares />
      <div className="flex flex-col gap-6 h-full w-3/4 pt-28 z-10">
        <div className="flex flex-col gap-1 items-start justify-start">
          <h1 className="text-4xl font-bold font-accent">Create a new card</h1>
          <p className="font-main font-light text-main-black/75">
            Create meaningful cards for your loved ones. Choose between a
            selection of card types below.
          </p>
        </div>
        <div className="flex flex-col gap-3 items-start justify-start w-full">
          {cardTypes.map((card, key) => (
            <div
              key={key}
              onMouseEnter={() => handleCardMouseEnter(key)}
              onMouseLeave={() => handleCardMouseLeave()}
              className="w-full flex relative"
            >
              <div
                className={`flex border rounded-xl h-22 shadow-lg ${
                  hoveredCardIndex === key
                    ? "w-[calc(100%-88px)] border-red-300 bg-red-50 shadow-none"
                    : "w-full border-zinc-200 bg-white"
                } py-3 justify-between transition-[width,border,color,box-shadow] duration-300 z-20 ease-in-out`}
              >
                <div className="flex w-4/5">
                  <div className="flex flex-col justify-center px-6">
                    <h2 className="text-lg font-medium">{card.name}</h2>
                    <p className="text-sm text-main-black/50 text-nowrap">
                      {card.description}
                    </p>
                  </div>
                  <div className="w-full px-2 items-center flex">
                    <HorizontalMasonryFeatures features={card.features} />
                  </div>
                </div>
                <div className="flex items-center justify-center pr-6 gap-6">
                  <div className="text-xs text-main-black/25 w-35 text-end">
                    * We are currently working on the missing features
                  </div>
                  <div className="text-main-black text-end font-semibold">
                    $0
                  </div>
                </div>
              </div>
              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.5}
                glareAngle={-45}
                glareSize={300}
                height="88px"
                width="104px"
                transitionDuration={650}
                playOnce={false}
                className={`absolute transition-all duration-250 pl-4 right-0 bg-main-black/50 hover:bg-main-black/75 rounded-r-xl pointer-events-none`}
              >
                <Link
                  href={card.link}
                  className="h-22 w-22 flex items-center justify-center text-center font-medium border-none rounded-r-xl p-2 text-main-white leading-5 pointer-events-auto"
                >
                  Create card
                </Link>
              </GlareHover>
            </div>
          ))}
        </div>
        <div className="w-full text-center text-main-black/25 text-sm">
          <p>More card types coming soon!</p>
          <p>
            In the meantime, feel free to create birthday and valentine&apos;s
            day cards.
          </p>
        </div>
      </div>
    </div>
  );
}
