"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateValentinePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const to = (formData.get("to") ?? "").toString().trim();
    const from = (formData.get("from") ?? "").toString().trim();
    const message = (formData.get("message") ?? "").toString().trim();

    if (!to || !from || !message) {
      setError("Share the love by filling in every field.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/valentine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toName: to,
          fromName: from,
          message,
          presentEnabled: true,
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong while crafting your card.");
      }

      const body = (await res.json()) as { id?: string; url?: string };
      const redirectTo = body.url ?? (body.id ? `/valentine/${body.id}` : null);
      if (!redirectTo) {
        throw new Error("Missing valentine id.");
      }

      router.push(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create card.");
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-pink-50/60 px-4 py-12">
      <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl shadow-rose-100">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">
          announcify
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-zinc-900 sm:text-4xl">
          Create a valentine card
        </h1>
        <p className="mt-2 text-zinc-600">Pour your heart out and we&apos;ll package it instantly.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-zinc-700">
              Who&apos;s this valentine for?
            </label>
            <input
              id="to"
              name="to"
              type="text"
              className="mt-2 w-full rounded-2xl border border-rose-100 bg-rose-50/50 px-4 py-3 text-base text-zinc-900 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
              placeholder="Jamie"
              maxLength={80}
              disabled={submitting}
              required
            />
          </div>

          <div>
            <label htmlFor="from" className="block text-sm font-medium text-zinc-700">
              Your name
            </label>
            <input
              id="from"
              name="from"
              type="text"
              className="mt-2 w-full rounded-2xl border border-rose-100 bg-rose-50/50 px-4 py-3 text-base text-zinc-900 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
              placeholder="Avery"
              maxLength={80}
              disabled={submitting}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-2 w-full rounded-2xl border border-rose-100 bg-rose-50/50 px-4 py-3 text-base text-zinc-900 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
              placeholder="Write something heartfelt..."
              maxLength={500}
              disabled={submitting}
              required
            />
          </div>

          {error ? (
            <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-rose-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600 disabled:opacity-60"
          >
            {submitting ? "Crafting..." : "Create card"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          <Link href="/" className="hover:text-rose-500">
            ← Back to landing
          </Link>
        </div>
      </div>
    </main>
  );
}
