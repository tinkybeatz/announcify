import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 via-white to-white px-6 py-16 text-zinc-900">
      <section className="max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-400">announcify</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
          Spin up heartfelt, data-driven celebration pages in minutes.
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Start with a simple birthday card template and we&apos;ll generate a shareable
          announcement site based on your message.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/create/birthday"
            className="inline-flex w-full items-center justify-center rounded-full bg-rose-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600 sm:w-auto"
          >
            🎂 Create birthday card
          </Link>
        </div>
      </section>
    </main>
  );
}
