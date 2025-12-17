import Link from "next/link";

import { auth } from "@/auth";
import { handleSignOut } from "./actions";

export async function Navbar() {
  const session = await auth();
  const userLabel = session?.user?.name ?? session?.user?.email;

  return (
    <div className="h-16 absolute top-0 border-b border-zinc-300 bg-zinc-100 items-center flex w-screen p-3 justify-between">
      <Link
        href="/"
        className="flex text-black border border-rose-500 h-full px-2 items-center rounded-md shadow-md hover:bg-rose-500/15 hover:shadow-none font-medium"
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
          <form action={handleSignOut} className="h-full">
            <button
              type="submit"
              className="flex h-full px-3 cursor-pointer items-center rounded-md bg-rose-500 font-semibold text-white shadow-md transition hover:bg-rose-600 hover:shadow-none"
            >
              Sign out
            </button>
          </form>
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
