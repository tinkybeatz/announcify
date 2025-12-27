"use client";

import BackgroundGlares from "@/components/customBackgrounds/backgroundGlares/BackgroundGlares";
import { Navbar } from "@/components/navbar/navbar";

export default function LearnMorePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-main-white">
      <Navbar />
      <BackgroundGlares />
      <div className="flex flex-col gap-6 h-full w-3/4 pt-28 z-10">
        <div className="flex flex-col gap-1 items-start justify-start">
          <h1 className="text-4xl font-bold font-accent">
            Learn more about announcify
          </h1>
          <p className="font-main font-light text-main-black/75">
            Create meaningful cards for your loved ones.
          </p>
          <p className="font-main font-light text-main-black/75">
            Celebrate special moments with personalized birthday and
            valentine&apos;s day cards. Make every occasion unforgettable with
            Announcify.
          </p>
          <p className="font-main font-light text-main-black/75">
            Announcify is constantly evolving. We&apos;re working hard to bring
            you new features and card types to make your experience even better.
          </p>
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
