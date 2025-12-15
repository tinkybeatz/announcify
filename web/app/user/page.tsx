import { redirect } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { auth } from "@/auth";

export default async function UserDashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/signin");
  }

  const userName = session.user?.name ?? session.user.email.split("@")[0];

  return (
    <main className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      <Navbar />
      <section className="flex flex-1 flex-col items-center px-4 py-12">
        <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Dashboard</p>
          <h1 className="mt-4 text-3xl font-semibold text-zinc-900">Hey {userName} 👋</h1>
          <p className="mt-2 text-base text-zinc-600">
            You are signed in as <span className="font-semibold text-zinc-900">{session.user.email}</span>. Soon you will
            be able to pin, revisit, and protect every celebration card from here.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-5">
              <h2 className="text-lg font-semibold text-rose-600">Create quickly</h2>
              <p className="mt-2 text-sm text-rose-700">
                Start a birthday or valentine announcement. We&apos;ll save your progress to your account.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 p-5">
              <h2 className="text-lg font-semibold text-zinc-900">Private by default</h2>
              <p className="mt-2 text-sm text-zinc-600">Only you can edit your cards. Shareable links stay under your control.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
