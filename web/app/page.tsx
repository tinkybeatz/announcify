import { Navbar } from "@/components/navbar";
import RotatingText from "@/components/shadcn/rotatingText/RotatingText";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col bg-zinc-100 text-zinc-900">
      <Navbar />
      <section className="text-center flex items-center justify-center flex-col w-full h-screen">
        <div className="flex gap-4 items-center justify-center transition">
          <h1 className="text-4xl font-accent font-semibold text-zinc-900 sm:text-5xl">
            Create
          </h1>
          <RotatingText
            texts={["christmas", "birthday", "valentine's day", "anniversary", "graduation"]}
            mainClassName="px-2 sm:px-2 md:px-3 bg-linear-to-r from-main-yellow to-main-red text-main-white font-accent text-4xl font-bold py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName=""
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
          <h1 className="text-4xl font-accent font-semibold leading-tight text-zinc-900 sm:text-5xl">
            cards in minutes.
          </h1>
        </div>
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
