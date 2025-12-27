"use client";

import { useState } from "react";
import Link from "next/link";

type Card = {
  id: string;
  toName: string;
  fromName: string;
  createdAt: Date;
};

type UserCardsDisplayProps = {
  birthdayCards: Card[];
  valentineCards: Card[];
  total: number;
};

export function UserCardsDisplay({ birthdayCards, valentineCards, total }: UserCardsDisplayProps) {
  const [currentCardTab, setCurrentCardTab] = useState("birthday");

  return (
    <div className="row-span-6 col-span-2 w-full h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg flex flex-col overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 flex-shrink-0">Your cards</h2>
      <div className="bg-zinc-100 border border-zinc-200 flex-1 rounded-xl inset-shadow-sm p-2 flex flex-col min-h-0 overflow-hidden">
        <div className="bg-white rounded-lg h-14 shadow-lg grid grid-cols-2 w-full divide-zinc-200 flex-shrink-0">
          <button
            onClick={() => setCurrentCardTab("birthday")}
            className={`cursor-pointer my-2 ml-2 mr-1 rounded flex col-span-1 items-center justify-center font-medium transition ${
              currentCardTab === "birthday"
                ? "bg-main-red text-white shadow-md"
                : "text-zinc-600 hover:bg-zinc-200/75"
            }`}
          >
            Birthday cards
          </button>
          <button
            onClick={() => setCurrentCardTab("valentine")}
            className={`cursor-pointer my-2 ml-1 mr-2 rounded flex col-span-1 items-center justify-center font-medium transition ${
              currentCardTab === "valentine"
                ? "bg-main-red text-white shadow-md"
                : "text-zinc-600 hover:bg-zinc-200/75"
            }`}
          >
            Valentine&apos;s day cards
          </button>
        </div>

        <div className="flex-1 overflow-auto mt-2 min-h-0">
          {total === 0 ? (
            <p className="text-zinc-500 text-center mt-8">You haven&apos;t created any cards yet.</p>
          ) : (
            <>
              {currentCardTab === "birthday" && (
                <div>
                  {birthdayCards.length === 0 ? (
                    <p className="text-zinc-500 text-center mt-8">No birthday cards yet.</p>
                  ) : (
                    <div className="grid gap-3">
                      {birthdayCards.map((card) => (
                        <Link
                          key={card.id}
                          target="_blank"
                          href={`/birthday/${card.id}`}
                          className="block p-4 shadow-lg rounded-lg border border-zinc-200 bg-white hover:border-red-300 hover:bg-red-50 transition"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">To: {card.toName}</p>
                              <p className="text-sm text-zinc-600">From: {card.fromName}</p>
                            </div>
                            <p className="text-xs text-zinc-500">
                              {new Date(card.createdAt).toLocaleDateString('en-GB')}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentCardTab === "valentine" && (
                <div>
                  {valentineCards.length === 0 ? (
                    <p className="text-zinc-500 text-center mt-8">No valentine cards yet.</p>
                  ) : (
                    <div className="grid gap-3">
                      {valentineCards.map((card) => (
                        <Link
                          key={card.id}
                          target="_blank"
                          href={`/valentine/${card.id}`}
                          className="block p-4 shadow-lg rounded-lg border border-zinc-200 bg-white hover:border-red-300 hover:bg-red-50 transition"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">To: {card.toName}</p>
                              <p className="text-sm text-zinc-600">From: {card.fromName}</p>
                            </div>
                            <p className="text-xs text-zinc-500">
                              {new Date(card.createdAt).toLocaleDateString('en-GB')}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
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
