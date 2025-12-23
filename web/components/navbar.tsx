import Link from "next/link";

import { auth } from "@/auth";
import { handleSignOut } from "./actions";

export async function Navbar() {
  const session = await auth();
  const userLabel = session?.user?.name ?? session?.user?.email;

  return (
    <div className="h-22 fixed top-0 z-50 bg-transparent items-center pt-6 justify-center flex w-full">
      <div className="bg-main-black/50 backdrop-blur-md flex justify-between items-center rounded-full w-1/2 h-full px-10">
        <Link
          href="/"
          className="flex text-main-white font-accent text-lg font-bold items-center"
        >
          Announcify
        </Link>
        <div className="flex gap-5 text-sm">
          <Link
            href="/create"
            className="flex items-center font-medium text-main-white hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
          >
            Create a card
          </Link>
          <Link
            href="/more"
            className="flex items-center font-medium text-main-white hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
          >
            Learn more
          </Link>
          {session ? (
            <div className="flex h-full items-center gap-5 text-sm">
              {/* <div className="hidden flex-col cursor-default text-right text-xs text-zinc-600 sm:flex">
              <span className="font-semibold text-zinc-900">{userLabel}</span>
              <span>{session.user?.email}</span>
            </div> */}
              <a
                href="/user"
                className="flex items-center font-medium text-main-white hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
              >
                Account
              </a>
              <form action={handleSignOut} className="h-full">
                <button
                  type="submit"
                  className="flex items-center font-medium text-main-white cursor-pointer hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <div className="flex gap-5 text-sm h-full">
              <Link
                href="/signin"
                className="flex items-center font-medium text-main-white cursor-pointer hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="flex items-center font-medium text-main-white cursor-pointer hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
