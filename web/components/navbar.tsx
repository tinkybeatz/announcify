import Link from "next/link";

import { auth, signOut } from "@/auth";

async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export async function Navbar() {
  const session = await auth();
  const userLabel = session?.user?.name ?? session?.user?.email;

  return (
    <div className="h-16 border-b border-zinc-300 items-center flex w-full p-3 justify-between">
      <Link
        href="/"
        className="flex border border-rose-500 h-full px-2 items-center rounded-md shadow-md hover:bg-rose-500/15 hover:shadow-none font-medium"
      >
        Announcify
      </Link>
      {session ? (
        <div className="flex h-full items-center gap-3 text-sm">
          <div className="hidden flex-col text-right text-xs text-zinc-600 sm:flex">
            <span className="font-semibold text-zinc-900">{userLabel}</span>
            <span>{session.user?.email}</span>
          </div>
          <Link
            href="/user"
            className="flex h-full items-center rounded-md border border-rose-500 px-3 font-medium text-rose-600 shadow-md transition hover:bg-rose-500/10 hover:text-rose-700 hover:shadow-none"
          >
            Dashboard
          </Link>
          <button
            onClick={handleSignOut}
            className="flex h-full px-3 cursor-pointer items-center rounded-md bg-rose-500 font-semibold text-white shadow-md transition hover:bg-rose-600 hover:shadow-none"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex gap-2 text-sm h-full">
          <Link
            href="/signin"
            className="flex border border-rose-500 h-full px-3 items-center rounded-md shadow-md hover:bg-rose-500/15 hover:shadow-none font-medium"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="flex bg-rose-500 h-full px-3 items-center text-white rounded-md shadow-md hover:bg-rose-600 hover:shadow-none font-medium"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
