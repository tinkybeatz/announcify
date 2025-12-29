"use client";

import { useState } from "react";
import Link from "next/link";

type BirthdayCard = {
  id: string;
  toName: string;
  fromName: string;
  createdAt: Date;
  gift?: boolean;
  giftDescription?: string;
  theme?: "basic" | "dark" | string;
  customCardSignature?: string;
  customGiftSignature?: string;
};

type ValentineCard = {
  id: string;
  toName: string;
  fromName: string;
  createdAt: Date;
};

type UserCardsDisplayProps = {
  birthdayCards: BirthdayCard[];
  valentineCards: ValentineCard[];
  total: number;
};

function BirthdayCardItem({ card }: { card: BirthdayCard }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const themeConfig: Record<
    string,
    { label: string; colors: string; bgColors: string }
  > = {
    basic: {
      label: "Basic",
      colors: "from-main-red to-main-yellow",
      bgColors: "from-red-50 to-yellow-50",
    },
    dark: {
      label: "Dark",
      colors: "from-zinc-600 to-zinc-800",
      bgColors: "from-zinc-100 to-zinc-200",
    },
  };

  const theme = themeConfig[card.theme ?? "basic"] ?? themeConfig.basic;

  return (
    <div
      className={`
        group relative rounded-lg border bg-white transition-all duration-300 overflow-hidden
        ${
          isExpanded
            ? "border-red-300 shadow-lg"
            : "border-zinc-200 hover:border-red-200 hover:shadow-lg"
        }
      `}
    >
      {/* Main clickable area */}
      <Link href={`/birthday/${card.id}`} target="_blank" className="block p-4">
        <div className="flex items-start justify-between gap-4">
          {/* Left section: Recipients */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            {/* Avatar/Icon */}
            <div className="w-12 h-12 rounded-lg bg-linear-to-br from-red-100 to-yellow-100 flex items-center justify-center shrink-0">
              <span className="text-xl">🎂</span>
            </div>

            {/* Names */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-zinc-900 truncate">
                  To: {card.toName}
                </h3>
                <span className="text-zinc-300">•</span>
                <p className="text-sm text-zinc-500 truncate">
                  From: {card.fromName}
                </p>
              </div>

              {/* Quick badges row */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {/* Theme badge */}
                <div
                  className={`inline-flex items-center bg-linear-to-r ${theme.colors} rounded-full p-px`}
                >
                  <div
                    className={`bg-linear-to-r ${theme.bgColors} rounded-full px-2 py-0.5 flex items-center gap-1`}
                  >
                    <svg
                      className="w-3 h-3 text-zinc-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                    <span className="text-xs font-medium text-zinc-700">
                      {theme.label}
                    </span>
                  </div>
                </div>

                {/* Gift badge */}
                {card.gift && (
                  <div className="inline-flex items-center bg-linear-to-r from-main-red to-main-yellow rounded-full p-px">
                    <div className="bg-linear-to-r from-red-50 to-yellow-50 rounded-full px-2 py-0.5 flex items-center gap-1">
                      <span className="text-xs">🎁</span>
                      <span className="text-xs font-medium text-zinc-700">
                        Gift
                      </span>
                    </div>
                  </div>
                )}

                {/* Custom signatures badges */}
                {card.customCardSignature !== undefined && (
                  <div className="inline-flex items-center bg-linear-to-r from-main-red to-main-yellow rounded-full p-px">
                    <div className="bg-linear-to-r from-red-50 to-yellow-50 rounded-full px-2 py-0.5 flex items-center gap-1">
                      <span className="text-xs font-medium text-zinc-700">
                        Custom card signature
                      </span>
                    </div>
                  </div>
                )}
                {card.customGiftSignature !== undefined && (
                  <div className="inline-flex items-center bg-linear-to-r from-main-red to-main-yellow rounded-full p-px">
                    <div className="bg-linear-to-r from-red-50 to-yellow-50 rounded-full px-2 py-0.5 flex items-center gap-1">
                      <span className="text-xs font-medium text-zinc-700">
                        Custom gift signature
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right section: Date & Actions */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <p className="text-xs text-zinc-400">
              {new Date(card.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>

            {/* Open link indicator */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1 text-xs text-red-500">
                <span>View</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Expandable details section (only if has gift or custom signatures) */}
      {(card.gift ||
        card.giftDescription ||
        card.customCardSignature ||
        card.customGiftSignature) && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }}
            className="w-full px-4 py-2 border-t border-zinc-100 flex items-center justify-center gap-2 text-xs text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
          >
            <span>
              {isExpanded ? "Hide card details" : "Show card details"}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Expanded content */}
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="px-4 pb-4 space-y-3">
              {/* Gift Description - only show if gift exists */}
              {card.giftDescription && (
                <div className="bg-linear-to-br from-red-50 to-yellow-50 rounded-lg p-3 border border-red-100">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <span className="text-sm">🎁</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-zinc-500 mb-1">
                        Gift Description
                      </p>
                      <p className="text-sm text-zinc-700 leading-relaxed">
                        {card.giftDescription}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom Signatures */}
              <div className="bg-white rounded-lg p-3 border border-zinc-200">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center shrink-0 shadow-sm">
                    <svg
                      className="w-3.5 h-3.5 text-zinc-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="text-xs font-medium text-zinc-500 mb-2">
                      {card.customCardSignature || card.customGiftSignature
                        ? "Custom Signatures"
                        : "Signatures"}
                    </p>

                    {/* Card Signature */}
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">
                        Card Signature
                      </p>
                      {card.customCardSignature ? (
                        <div className="inline-flex items-center gap-2">
                          <div className="inline-flex w-fit items-center bg-linear-to-r from-main-red to-main-yellow rounded-full px-px py-px">
                            <div className="bg-linear-to-r from-red-50 to-yellow-50 rounded-full px-1.5 py-0.5">
                              <p className="text-xs text-main-black/80 font-medium whitespace-nowrap">
                                Custom
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-zinc-700">
                            {card.customCardSignature}
                          </p>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <div className="inline-flex w-fit items-center bg-linear-to-r from-zinc-300 to-zinc-400 rounded-full px-px py-px">
                            <div className="bg-linear-to-r from-zinc-50 to-zinc-100 rounded-full px-1.5 py-0.5">
                              <p className="text-xs text-main-black/80 font-medium whitespace-nowrap">
                                Default
                              </p>
                            </div>
                          </div>
                          <p className="text-zinc-700 text-sm">With love,</p>
                        </div>
                      )}
                    </div>

                    {/* Gift Signature */}
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">
                        Gift Signature
                      </p>
                      {card.customGiftSignature ? (
                        <div className="inline-flex items-center gap-2">
                          <div className="inline-flex w-fit items-center bg-linear-to-r from-main-red to-main-yellow rounded-full px-px py-px">
                            <div className="bg-linear-to-r from-red-50 to-yellow-50 rounded-full px-1.5 py-0.5">
                              <p className="text-xs text-main-black/80 font-medium whitespace-nowrap">
                                Custom
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-zinc-700">
                            {card.customGiftSignature}
                          </p>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <div className="inline-flex w-fit items-center bg-linear-to-r from-zinc-300 to-zinc-400 rounded-full px-px py-px">
                            <div className="bg-linear-to-r from-zinc-50 to-zinc-100 rounded-full px-1.5 py-0.5">
                              <p className="text-xs text-main-black/80 font-medium whitespace-nowrap">
                                Default
                              </p>
                            </div>
                          </div>
                          <p className="text-zinc-700 text-xs">
                            I hope this brings a smile to your face!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ValentineCardItem({ card }: { card: ValentineCard }) {
  return (
    <Link
      href={`/valentine/${card.id}`}
      target="_blank"
      className="group block rounded-xl border border-zinc-200 bg-white p-4 hover:border-pink-200 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Avatar/Icon */}
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-pink-100 to-purple-100 flex items-center justify-center shrink-0">
            <span className="text-xl">💝</span>
          </div>

          {/* Names */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-zinc-900 truncate">
                To: {card.toName}
              </h3>
              <span className="text-zinc-300">•</span>
              <p className="text-sm text-zinc-500 truncate">
                From: {card.fromName}
              </p>
            </div>

            {/* Type badge */}
            <div className="flex items-center gap-2 mt-2">
              <div className="inline-flex items-center bg-linear-to-r from-pink-500 to-purple-500 rounded-full p-px">
                <div className="bg-linear-to-r from-pink-50 to-purple-50 rounded-full px-2 py-0.5 flex items-center gap-1">
                  <span className="text-xs">💕</span>
                  <span className="text-xs font-medium text-zinc-700">
                    Valentine&apos;s Day
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <p className="text-xs text-zinc-400">
            {new Date(card.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          {/* Open link indicator */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1 text-xs text-pink-500">
              <span>View</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function UserCardsDisplay({
  birthdayCards,
  valentineCards,
  total,
}: UserCardsDisplayProps) {
  const [currentCardTab, setCurrentCardTab] = useState("birthday");

  return (
    <div className="row-span-6 col-span-2 w-full h-full rounded-xl border border-zinc-200 bg-white p-6 shadow-lg flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-2xl font-semibold">Your cards</h2>
        <div className="text-sm text-zinc-400">
          {total} card{total !== 1 ? "s" : ""} total
        </div>
      </div>

      <div className="bg-zinc-100 border border-zinc-200 flex-1 rounded-xl inset-shadow-sm p-2 flex flex-col min-h-0 overflow-hidden">
        {/* Tab switcher */}
        <div className="bg-white border border-zinc-200 rounded-lg h-14 grid grid-cols-2 w-full shrink-0">
          <button
            onClick={() => setCurrentCardTab("birthday")}
            className={`cursor-pointer mr-1 ml-2 my-2 rounded-md flex items-center justify-center gap-2 font-medium transition-all duration-200 ${
              currentCardTab === "birthday"
                ? "bg-main-red text-white shadow-md"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <span>🎂</span>
            <span>Birthday</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                currentCardTab === "birthday" ? "bg-white/20" : "bg-zinc-200"
              }`}
            >
              {birthdayCards.length}
            </span>
          </button>
          <button
            onClick={() => setCurrentCardTab("valentine")}
            className={`cursor-pointer ml-1 mr-2 my-2 rounded-md flex items-center justify-center gap-2 font-medium transition-all duration-200 ${
              currentCardTab === "valentine"
                ? "bg-main-red text-white shadow-md"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <span>💝</span>
            <span>Valentine&apos;s</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                currentCardTab === "valentine" ? "bg-white/20" : "bg-zinc-200"
              }`}
            >
              {valentineCards.length}
            </span>
          </button>
        </div>

        {/* Cards list */}
        <div className="flex-1 overflow-auto mt-2 min-h-0">
          {total === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-lg bg-zinc-200 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="text-zinc-500 font-medium">No cards yet</p>
              <p className="text-zinc-400 text-sm mt-1">
                Create your first card to see it here
              </p>
            </div>
          ) : (
            <>
              {/* Birthday cards tab */}
              {currentCardTab === "birthday" && (
                <div className="space-y-2">
                  {birthdayCards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-14 h-14 rounded-lg bg-linear-to-br from-red-100 to-yellow-100 flex items-center justify-center">
                        <span className="text-2xl">🎂</span>
                      </div>
                      <p className="text-zinc-500 font-medium">
                        No birthday cards yet
                      </p>
                      <p className="text-zinc-400 text-sm mt-1">
                        Create one to celebrate someone special!
                      </p>
                    </div>
                  ) : (
                    birthdayCards.map((card) => (
                      <BirthdayCardItem key={card.id} card={card} />
                    ))
                  )}
                </div>
              )}

              {/* Valentine cards tab */}
              {currentCardTab === "valentine" && (
                <div className="space-y-3">
                  {valentineCards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-14 h-14 rounded-xl bg-linear-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-3">
                        <span className="text-2xl">💝</span>
                      </div>
                      <p className="text-zinc-500 font-medium">
                        No valentine cards yet
                      </p>
                      <p className="text-zinc-400 text-sm mt-1">
                        Spread some love with a romantic card!
                      </p>
                    </div>
                  ) : (
                    valentineCards.map((card) => (
                      <ValentineCardItem key={card.id} card={card} />
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
