import { Navbar } from "@/components/navbar";
import HeroHeadline from "@/components/home/HeroHeadline";
import Link from "next/link";
import Image from "next/image";
// import svgCard1 from "@/assets/svg/SVG-Card-1.svg";
import svgCard2 from "@/assets/svg/SVG-Card-2.svg";
import { Tilt } from "@/components/tilt/tilt";

export default function Home() {
  return (
    <main className="flex flex-col bg-main-white text-zinc-900">
      <Navbar />
      <section className="relative text-center flex items-center justify-center flex-col w-full h-screen overflow-hidden bg-main-white">
        {/* <div className="cursor-default relative z-10 mb-8 py-1 px-3 font-accent font-medium rounded-full backdrop-blur-xs border border-zinc-200 bg-white/50">
          Announcify
        </div> */}
        <div className="relative w-5/6 z-10 mb-6 grid grid-cols-2 cursor-default">
          <div className="flex flex-col items-start space-y-4 justify-center">
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
          <div className="flex items-center justify-center">
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
        {/* <div className="relative z-10 flex gap-4">
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full bg-main-red px-6 py-3 text-lg font-medium text-white shadow-lg transition hover:bg-red-600! hover:shadow-none"
          >
            Get started
          </Link>
          <Link
            href="/more"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-main-white/50 backdrop-blur-xs px-6 py-3 text-lg font-medium text-main-black transition hover:border-zinc-300"
          >
            Learn more
          </Link>
        </div> */}
      </section>
      <section className="relative text-center flex items-center justify-center flex-col w-full h-screen overflow-hidden bg-main-white">
        {/* <div className="cursor-default relative z-10 mb-8 py-1 px-3 font-accent font-medium rounded-full backdrop-blur-xs border border-zinc-200 bg-white/50">
          Announcify
        </div> */}
        <div className="relative z-10 mb-8 cursor-default">
          <HeroHeadline />
        </div>
        <div className="relative z-10 flex gap-4">
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full bg-main-red px-6 py-3 text-lg font-medium text-white shadow-lg transition hover:bg-red-600! hover:shadow-none"
          >
            Get started
          </Link>
          <Link
            href="/more"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-main-white/50 backdrop-blur-xs px-6 py-3 text-lg font-medium text-main-black transition hover:border-zinc-300"
          >
            Learn more
          </Link>
        </div>
      </section>
    </main>
  );
}
