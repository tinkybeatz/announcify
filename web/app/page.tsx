import { Navbar } from "@/components/navbar";
import HeroHeadline from "@/components/home/HeroHeadline";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col bg-zinc-100 text-zinc-900">
      <Navbar />
      <section className="text-center flex items-center justify-center flex-col w-full h-screen">
        <HeroHeadline />
        <p className="mt-4 text-lg text-zinc-600">
          Start with a simple birthday or valentine template and we&apos;ll
          generate a shareable announcement site based on your message.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/create/birthday"
            className="inline-flex w-full items-center justify-center rounded-full bg-rose-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600 sm:w-auto"
          >
            🎂 Create birthday card
          </Link>
          <Link
            href="/create/valentine"
            className="inline-flex w-full items-center justify-center rounded-full border border-rose-200 px-8 py-4 text-lg font-semibold text-rose-500 shadow-lg shadow-rose-100 transition hover:border-rose-400 hover:text-rose-600 sm:w-auto"
          >
            💌 Create valentine card
          </Link>
        </div>
      </section>
      <section className="text-center flex items-center justify-center flex-col w-full h-screen">
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
          Spin up heartfelt, data-driven celebration pages in minutes.
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Start with a simple birthday or valentine template and we&apos;ll
          generate a shareable announcement site based on your message.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/create/birthday"
            className="inline-flex w-full items-center justify-center rounded-full bg-rose-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600 sm:w-auto"
          >
            🎂 Create birthday card
          </Link>
          <Link
            href="/create/valentine"
            className="inline-flex w-full items-center justify-center rounded-full border border-rose-200 px-8 py-4 text-lg font-semibold text-rose-500 shadow-lg shadow-rose-100 transition hover:border-rose-400 hover:text-rose-600 sm:w-auto"
          >
            💌 Create valentine card
          </Link>
        </div>
      </section>
    </main>
  );
}
