import { redirect } from "next/navigation";

import { Navbar } from "@/components/navbar/navbar";
import { auth } from "@/auth";
import Link from "next/link";
import { getAllUserCards } from "@/lib/cards";
import { UserCardsDisplay } from "./UserCardsDisplay";
import BackgroundGlares from "@/components/customBackgrounds/backgroundGlares/BackgroundGlares";

export const dynamic = "force-dynamic";

export default async function UserDashboardPage() {
  const session = await auth();

  if (!session?.user?.email || !session.user.id) {
    redirect("/signin");
  }

  const { birthdayCards, valentineCards, total } = await getAllUserCards(session.user.id);

  const mappedBirthdayCards = birthdayCards.map(card => ({
    ...card,
    giftDescription: card.giftDescription ?? undefined,
    customCardSignature: card.customCardSignature ?? undefined,
    customGiftSignature: card.customGiftSignature ?? undefined
  }));

  const userName = session.user?.name ?? session.user.email.split("@")[0];
  const firstName = session.user?.firstName ?? userName.split(" ")[0];

  return (
    <main className="flex min-h-screen h-screen flex-col pt-22 items-center p-6 bg-zinc-100 text-zinc-900 overflow-hidden">
      <Navbar initialSession={session} />
      <BackgroundGlares />
      <section className="grid grid-flow-row grid-rows-6 grid-cols-3 gap-6 w-full flex-1 mt-6 z-10 min-h-0">
        {/* Main section */}
        <div className="row-span-3 col-span-1 w-full rounded-2xl border border-zinc-200 space-y-4 bg-white p-6 shadow-lg">
          <div className="text-2xl font-semibold w-full text-zinc-900">
            <h1>Hey {firstName} 👋</h1>
          </div>

          <div className="flex flex-col space-y-4">
            <Link
              href="/create/birthday"
              className="inline-flex text-sm w-full items-center justify-center rounded-lg bg-main-red px-5 py-3 text-white shadow-lg shadow-rose-200 transition hover:bg-red-600! sm:w-auto"
            >
              Create birthday card
            </Link>
            <Link
              href="/create/valentine"
              className="inline-flex text-sm w-full items-center justify-center rounded-lg bg-main-red px-5 py-3 text-white shadow-lg shadow-rose-200 transition hover:bg-red-600! sm:w-auto"
            >
              Create valentine card
            </Link>
          </div>
        </div>

        <UserCardsDisplay
          birthdayCards={mappedBirthdayCards}
          valentineCards={valentineCards}
          total={total}
        />

        <div className="row-span-3 col-span-1 w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg">
          <h3 className="text-2xl font-semibold h-[16%]">Stats</h3>
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[84%] w-full">
            <div className="flex flex-col rounded-lg bg-zinc-100 border border-zinc-200 inset-shadow-sm justify-center items-center">
              <p className="text-3xl font-bold">{total}</p>
              <p className="text-center">Total of cards created</p>
            </div>
            <div className="flex flex-col rounded-lg bg-zinc-100 border border-zinc-200 inset-shadow-sm justify-center items-center">
              <p className="text-3xl font-bold">{birthdayCards.length}</p>
              <p className="text-center">Total of
                <span className="text-transparent bg-clip-text font-bold bg-linear-to-r from-yellow-500 to-red-500">&#32;birthday&#32;</span>
                cards created</p>
            </div>
            <div className="flex flex-col rounded-lg bg-zinc-100 border border-zinc-200 inset-shadow-sm justify-center items-center">
              <p className="text-3xl font-bold">{valentineCards.length}</p>
              <p className="text-center">Total of
                <span className="text-transparent bg-clip-text bg-linear-to-r font-bold from-pink-500 to-purple-500">&#32;valentines&#32;</span>
                cards created</p>
            </div>
            <div className="rounded-lg bg-zinc-100 border border-zinc-200 inset-shadow-sm"></div>
            <div className="rounded-lg bg-zinc-100 border border-zinc-200 inset-shadow-sm"></div>
            <div className="rounded-lg bg-zinc-100 border border-zinc-200 inset-shadow-sm"></div>
          </div>
          {/* <p className="text-3xl font-bold text-rose-500">{total}</p>
          <p className="text-sm text-zinc-600">Total cards created</p> */}
        </div>
      </section>
    </main>
  );
}
