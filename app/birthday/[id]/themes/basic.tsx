"use client";

import { useState } from "react";

interface BasicThemeBirthdayProps {
  toName: string;
  message: string;
  gift?: boolean;
  giftDescription?: string;
  fromName: string;
}

export function BasicThemeBirthday({
  toName,
  message,
  gift,
  giftDescription,
  fromName,
}: BasicThemeBirthdayProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const hasGift = gift && giftDescription;
  const totalSlides = hasGift ? 2 : 1;

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <main className="bg-main-white min-h-screen flex flex-col items-center justify-center p-6 lg:p-12">
      {/* Main card container */}
      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg border border-zinc-100 mb-6">
            <span className="text-xl">🎂</span>
            <span className="text-sm font-medium text-zinc-500">
              A special message for you
            </span>
          </div>
          <h1 className="text-4xl font-semibold text-zinc-900">
            Happy birthday{" "}
            <span className="bg-linear-to-r font-bold from-red-500 to-yellow-500 bg-clip-text text-transparent">
              {toName}
            </span>
            ! 🎉
          </h1>
        </div>

        {/* Carousel container */}
        <div className="relative overflow-hidden rounded-2xl h-120">
          {/* Slides wrapper */}
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Slide 1: Message */}
            <div className="w-full h-full shrink-0">
              <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden h-full flex flex-col">
                {/* Card header accent */}
                <div className="h-1.5 bg-linear-to-r from-red-500 via-yellow-500 to-red-500" />

                <div className="p-6 flex-1 flex flex-col justify-between">
                  {/* Message section */}
                  <div className="flex items-start gap-6">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-sm text-zinc-400 mb-3">
                        Your Message
                      </h2>
                      <p className="text-lg text-zinc-700 leading-relaxed whitespace-pre-wrap">
                        {message}
                      </p>
                    </div>
                  </div>

                  {/* Signature */}
                  <div className={`flex w-full ${hasGift ? "justify-between" : "justify-end"} pt-6 border-t border-zinc-200`}>
                    {/* Gift hint */}
                    {hasGift && (
                      <div className="flex items-center justify-center">
                        <button
                          onClick={nextSlide}
                          className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <span>There&apos;s a surprise waiting for you</span>
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400">With love,</span>
                      <div className="inline-flex items-center bg-linear-to-r from-red-500 to-yellow-500 rounded-full p-px">
                        <div className="bg-white rounded-full px-4 py-1.5">
                          <span className="font-semibold text-zinc-900">
                            {fromName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2: Gift (only if gift exists) */}
            {hasGift && (
              <div className="w-full h-full shrink-0">
                <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden h-full flex flex-col">
                  {/* Card header accent */}
                  <div className="h-1.5 bg-linear-to-r from-yellow-500 via-red-500 to-yellow-500" />

                  <div className="p-6 lg:p-10 flex-1 flex flex-col justify-center">
                    {/* Gift icon and title */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-red-100 to-yellow-100 mb-4">
                        <svg
                          className="w-10 h-10 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                          />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-medium text-zinc-900 mb-2">
                        You&apos;ve got a gift! 🎁
                      </h2>
                      <p className="text-zinc-400 text-sm">
                        {fromName} has something special for you
                      </p>
                    </div>

                    {/* Gift description */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-r from-red-500 to-yellow-500 rounded-xl blur opacity-20" />
                      <div className="relative bg-linear-to-br from-red-50 to-yellow-50 rounded-xl p-6 border border-red-100">
                        <p className="text-lg text-zinc-700 text-center leading-relaxed">
                          {giftDescription}
                        </p>
                      </div>
                    </div>

                    {/* Footer message */}
                    <div className="mt-8 text-center">
                      <div className="inline-flex items-center gap-2 text-zinc-400">
                        <svg
                          className="w-5 h-5 text-red-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="text-sm">
                          I hope this brings a smile to your face!
                        </span>
                        <svg
                          className="w-5 h-5 text-red-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </div>
                    </div>

                    {/* Back to message button */}
                    <div className="mt-6 flex items-center justify-center">
                      <button
                        onClick={prevSlide}
                        className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        <span>Back to message</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation arrows (only show if multiple slides) */}
        {hasGift && (
          <>
            <button
              onClick={prevSlide}
              className={`absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:shadow-xl transition-all cursor-pointer ${
                currentSlide === 0
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className={`absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:shadow-xl transition-all cursor-pointer ${
                currentSlide === totalSlides - 1
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Carousel indicators (only show if multiple slides) */}
        {hasGift && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === index
                    ? "w-8 bg-linear-to-r from-red-500 to-yellow-500"
                    : "w-2 bg-zinc-300 hover:bg-zinc-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Footer branding */}
        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-400">
            Made with ❤️ using{" "}
            <span className="font-medium bg-linear-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              Announcify
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
