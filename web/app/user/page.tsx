import { redirect } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { auth } from "@/auth";
import Link from "next/link";

export default async function UserDashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/signin");
  }

  const userName = session.user?.name ?? session.user.email.split("@")[0];
  const firstName = session.user?.firstName ?? userName.split(" ")[0];

  return (
    <main className="flex min-h-screen h-screen flex-col pt-16 items-center p-6 bg-zinc-100 text-zinc-900">
      <Navbar />
      <section className="grid grid-flow-row grid-rows-3 grid-cols-3 gap-6 w-full h-full mt-6">
        {/* Main section */}
        <div className="row-span-2 col-span-1 w-full rounded-2xl border border-zinc-200 space-y-4 bg-white p-6 shadow-lg">
          <div className="text-2xl font-semibold w-full text-zinc-900">
            <h1>Hey {firstName} 👋</h1>
          </div>

          <div className="flex flex-col space-y-4">
            <Link
              href="/create/birthday"
              className="inline-flex text-sm w-full items-center justify-center rounded-lg bg-rose-500 px-5 py-3 text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600 sm:w-auto"
            >
              Create birthday card
            </Link>
            <Link
              href="/create/valentines"
              className="inline-flex text-sm w-full items-center justify-center rounded-lg bg-rose-500 px-5 py-3 text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600 sm:w-auto"
            >
              Create valentine card
            </Link>
          </div>
        </div>

        <div className="row-span-3 col-span-2 w-full rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg"></div>

        <div className="row-span-1 col-span-1 w-full rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg"></div>

        {/* <div className="row-span-2 col-span-1 rounded-2xl border border-rose-100 bg-rose-50 p-5">
          <h2 className="text-lg font-semibold text-rose-600">
            Create quickly
          </h2>
          <p className="mt-2 text-sm text-rose-700">
            Start a birthday or valentine announcement. We&apos;ll save your
            progress to your account.
          </p>
        </div>
        <div className="row-span-1 col-span-1 rounded-2xl border border-rose-100 bg-rose-50 p-5">
          <h2 className="text-lg font-semibold text-rose-600">
            Create quickly
          </h2>
          <p className="mt-2 text-sm text-rose-700">
            Start a birthday or valentine announcement. We&apos;ll save your
            progress to your account.
          </p>
        </div> */}

        {/* <div className="row-span-2 col-span-1 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 p-5">
            <h2 className="text-lg font-semibold text-zinc-900">
              Private by default
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Only you can edit your cards. Shareable links stay under your
              control.
            </p>
          </div>
        </div> */}
      </section>
    </main>
  );
}
