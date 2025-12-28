export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PresentUnwrap from "@/components/cards/PresentUnwrap";

type BirthdayPageProps = {
  params: Promise<{ id?: string }>;
};

export default async function BirthdayPage({ params }: BirthdayPageProps) {
  const { id } = await params;
  if (!id) return notFound();

  const card = await prisma.birthdayCard.findUnique({ where: { id } });
  if (!card) return notFound();
  if (!card.isPublic) return notFound();
  if (card.expiresAt && card.expiresAt.getTime() < new Date().getTime()) return notFound();

  console.log(card);

  const content = (
    <main className="bg-zinc-100 min-h-screen flex flex-col items-center text-black">
      <div className="flex flex-1 flex-col items-center justify-center w-full px-6 py-12 lg:px-20">
        <h1 className="text-4xl font-bold text-center">Happy Birthday {card.toName}! 🎉</h1>
        <div className="mt-10 w-full max-w-3xl border border-zinc-600 bg-zinc-200/50 rounded-lg shadow-lg p-10">
          <p className="min-h-[8rem] text-lg leading-relaxed">{card.message}</p>
          {card.gift && card.giftDescription ? (
            <div className="mt-6 rounded-xl border border-rose-200 bg-white/70 p-4 text-center text-rose-600">
              {card.giftDescription}
            </div>
          ) : null}
          <p className="mt-8 text-right text-lg font-semibold">- {card.fromName}</p>
        </div>
      </div>
    </main>
  );

  return card.gift ? <PresentUnwrap>{content}</PresentUnwrap> : content;
}
