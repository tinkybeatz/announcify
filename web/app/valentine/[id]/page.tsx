export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PresentUnwrap from "@/components/cards/PresentUnwrap";

type ValentinePageProps = {
  params: Promise<{ id?: string }>;
};

export default async function ValentinePage({ params }: ValentinePageProps) {
  const { id } = await params;
  if (!id) return notFound();

  const card = await prisma.valentineCard.findUnique({ where: { id } });
  if (!card) return notFound();
  if (!card.isPublic) return notFound();
  if (card.expiresAt && card.expiresAt.getTime() < Date.now()) return notFound();

  const content = (
    <main className="bg-rose-50 min-h-screen flex flex-col items-center text-rose-900">
      <div className="flex flex-1 flex-col items-center justify-center w-full px-6 py-12 lg:px-20">
        <h1 className="text-4xl font-bold text-center">Happy Valentine&apos;s Day {card.toName}! 💘</h1>
        <div className="mt-10 w-full max-w-3xl border border-rose-200 bg-white/80 rounded-lg shadow-lg p-10">
          <p className="min-h-[8rem] text-lg leading-relaxed">{card.message}</p>
          {card.presentEnabled && card.presentText ? (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50/70 p-4 text-center text-rose-600">
              {card.presentText}
            </div>
          ) : null}
          <p className="mt-8 text-right text-lg font-semibold">- {card.fromName}</p>
        </div>
      </div>
    </main>
  );

  return card.presentEnabled ? <PresentUnwrap>{content}</PresentUnwrap> : content;
}
