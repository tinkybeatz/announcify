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
    <div className="row-span-6 col-span-2 w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg overflow-auto">
      <h2 className="text-2xl font-semibold h-[7%]">Your cards</h2>
      <div className="bg-zinc-100 border border-zinc-200 h-[93%] rounded-xl inset-shadow-sm p-2 flex flex-col">
        <div className="bg-white rounded-lg h-14 shadow-lg grid grid-cols-2 w-full divide-zinc-200">
          <button
            onClick={() => setCurrentCardTab("birthday")}
            className={`cursor-pointer my-2 ml-2 mr-1 rounded flex col-span-1 items-center justify-center font-medium transition ${
              currentCardTab === "birthday"
                ? "bg-rose-500 text-white shadow-md"
                : "text-zinc-600 hover:bg-zinc-200/75"
            }`}
          >
            Birthday cards
          </button>
          <button
            onClick={() => setCurrentCardTab("valentine")}
            className={`cursor-pointer my-2 ml-1 mr-2 rounded flex col-span-1 items-center justify-center font-medium transition ${
              currentCardTab === "valentine"
                ? "bg-rose-500 text-white shadow-md"
                : "text-zinc-600 hover:bg-zinc-200/75"
            }`}
          >
            Valentines cards
          </button>
        </div>

        <div className="flex-1 overflow-auto mt-2">
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
                          className="block p-4 shadow-lg rounded-lg border border-zinc-200 bg-white hover:border-rose-300 hover:bg-rose-50 transition"
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
                          className="block p-4 shadow-lg rounded-lg border border-zinc-200 bg-white hover:border-rose-300 hover:bg-rose-50 transition"
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
