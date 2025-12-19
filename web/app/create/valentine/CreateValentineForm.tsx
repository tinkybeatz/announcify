"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ShareButton from "@/components/shareButton";

export function CreateValentineForm() {
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cardLink, setCardLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function handleCreateCard() {
    setError(null);
    setSubmitting(true);

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
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
      const fullUrl = `${window.location.origin}${redirectTo}`;
      setCardLink(fullUrl);
      setShowModal(true);
      setSubmitting(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create card.");
      setSubmitting(false);
    }
  }

  return (
    <div className="h-full w-full flex-col pt-6 max-w-6xl">
      <button onClick={() => router.back()} className="hover:text-zinc-500 text-zinc-400 cursor-pointer">
        ← Back to previous page
      </button>
      <h1 className="text-3xl font-semibold text-zinc-800 sm:text-4xl pt-2">
        Create a valentine card
      </h1>
      <p className="text-zinc-400 pt-2">
        We&apos;ll turn this into a shareable page.
      </p>

      <form ref={formRef} className="mt-6">
        {/* main space */}
        <div className="flex flex-col w-full h-full p-6 rounded-xl space-y-4 bg-zinc-200">
          <h2 className="text-zinc-800 font-semibold text-2xl">
            Main informations
          </h2>
          <div className="flex w-full space-x-4">
            <div className="flex-col w-full">
              <label
                htmlFor="to"
                className="block text-sm font-medium text-zinc-700"
              >
                Who&apos;s this valentine for?
              </label>
              <input
                id="to"
                name="to"
                type="text"
                className="mt-2 w-full rounded-lg border border-zinc-100 bg-zinc-50/50 px-4 py-3 text-base text-zinc-900 outline-none focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200"
                placeholder="Jamie"
                maxLength={80}
                disabled={submitting}
                required
              />
            </div>

            <div className="flex-col w-full">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-zinc-700"
              >
                Your name
              </label>
              <input
                id="from"
                name="from"
                type="text"
                className="mt-2 w-full rounded-lg border border-zinc-100 bg-zinc-50/50 px-4 py-3 text-base text-zinc-900 outline-none focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200"
                placeholder="Avery"
                maxLength={80}
                disabled={submitting}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-2 w-full rounded-lg border border-zinc-100 bg-zinc-50/50 px-4 py-3 text-base text-zinc-900 outline-none focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200"
              placeholder="Write something heartfelt..."
              maxLength={500}
              disabled={submitting}
              required
            />
          </div>
        </div>

        {error ? (
          <p className="rounded-xl bg-zinc-200 px-4 py-3 mt-6 text-sm font-medium text-red-500">
            {error}
          </p>
        ) : null}

        <div className="flex mt-6 justify-end">
          <button
            type="button"
            onClick={handleCreateCard}
            disabled={submitting}
            className="inline-flex cursor-pointer items-center justify-center text-medium rounded-lg bg-rose-500 px-6 py-3 text-white shadow-lg shadow-zinc-200 transition hover:bg-rose-600 disabled:opacity-60"
          >
            {submitting ? "Crafting..." : "Create card"}
          </button>
        </div>
      </form>

      {showModal && <ShareButton shareUrl={cardLink} onClose={() => setShowModal(false)} />}
    </div>
  );
}
