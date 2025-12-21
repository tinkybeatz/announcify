import Link from "next/link";

import { auth } from "@/auth";
import { handleSignOut } from "./actions";

export async function Navbar() {
  const session = await auth();
  const userLabel = session?.user?.name ?? session?.user?.email;

  return (
    <div className="h-18 fixed top-0 bg-transparent items-center pt-2 justify-center flex w-full">
      <div className="bg-zinc-200/50 backdrop-blur-xs border border-zinc-300 flex justify-between rounded-full w-1/2 h-full p-2">
        <Link
          href="/"
          className="flex text-main-white bg-main-red font-accent font-semibold h-full px-3 items-center rounded-full shadow-md hover:bg-red-600! hover:shadow-none"
        >
          Announcify
        </Link>
        {session ? (
          <div className="flex h-full items-center gap-2 text-sm">
            <div className="hidden flex-col text-right text-xs text-zinc-600 sm:flex">
              <span className="font-semibold text-zinc-900">{userLabel}</span>
              <span>{session.user?.email}</span>
            </div>
            <Link
              href="/user"
              className="flex h-full items-center rounded-full border border-rose-500 px-3 font-medium text-rose-600 shadow-md transition hover:bg-rose-500/10 hover:text-rose-700 hover:shadow-none"
            >
              Dashboard
            </Link>
            <form action={handleSignOut} className="h-full">
              <button
                type="submit"
                className="flex h-full px-3 cursor-pointer items-center rounded-full bg-main-yellow text-white shadow-md transition hover:bg-yellow-600! hover:shadow-none"
              >
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <div className="flex gap-2 text-sm h-full">
            <Link
              href="/signin"
              className="flex border border-rose-500 h-full w-20 justify-center items-center rounded-full shadow-md hover:bg-rose-500/15 hover:shadow-none font-medium"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="flex bg-rose-500 h-full w-20 justify-center items-center text-white rounded-full shadow-md hover:bg-rose-600 hover:shadow-none font-medium"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
