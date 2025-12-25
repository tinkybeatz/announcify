"use client";

import { HorizontalMasonryFeatures } from "@/components/masonry/HorizontalMasonryFeatures";
import { Navbar } from "@/components/navbar/navbar";
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
        { text: "Customizable templates", ok: false },
        { text: "Stickers", ok: false },
        { text: "Color picking", ok: false },
        { text: "Collaborative options", ok: false },
        { text: "Image upload", ok: false },
        { text: "Gift options", ok: false },
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
      <div className="flex flex-col gap-6 h-full w-3/4 pt-28">
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
                    ? "w-[calc(100%-100px)] border-red-300 bg-red-50 shadow-none"
                    : "w-full border-zinc-200 bg-white"
                } py-3 justify-between transition-[width,border,color,box-shadow] duration-250 ${hoveredCardIndex !== key ? "delay-250" : ""}`}
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
                  </div><div className="text-main-black text-end font-semibold">
                    $0
                  </div>
                </div>
              </div>
              <Link
                href={card.link}
                className={`${hoveredCardIndex === key ? "opacity-100 delay-250" : "opacity-0"} h-22 w-22 text-center p-2 absolute flex items-center justify-center rounded-xl bg-main-black/50 text-main-white transition-opacity duration-250 hover:bg-main-black/75 right-0`}
              >
                Create card
              </Link>
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
