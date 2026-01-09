"use client";

import CardSvg from "@/assets/svg/card.svg";
import NavbarBlueLanding from "@/components/navbar/NavbarBlueLanding";
import Image from "next/image";

export default function LearnMorePage() {
  return (
    <div className="flex flex-col h-screen bg-sky-400">
      <NavbarBlueLanding />
      <div className="bg-yellow-50 relative flex flex-col h-full mb-8 mx-8 items-center rounded-xl">
        {/* hero headline */}
        <div className="flex my-12 font-raleway font-extrabold text-5xl justify-center w-4/5 text-main-black">
          <h1>
            Learn{" "}
            <span className="bg-pink-300 drop-shadow-lg px-4 py-1 rounded-full text-main-black">
              more
            </span>{" "}
            about announcify.
          </h1>
        </div>

        <div className="flex flex-col w-4/5 h-auto font-rethink font-main-black font-medium text-xl">
          <p>
            Create meaningful cards for your loved ones.
          </p>
          <p>
            Celebrate special moments with personalized birthday and
            valentine&apos;s day cards. Make every occasion unforgettable with
            Announcify.
          </p>
          <p>
            Announcify is constantly evolving. We&apos;re working hard to bring
            you new features and card types to make your experience even better.
          </p>
        </div>

        {/* card svg */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={CardSvg}
            alt="Greeting card illustration"
            className="absolute -bottom-20 -right-40 drop-shadow-lg h-100"
          />
        </div>
      </div>
    </div>
  );
}
