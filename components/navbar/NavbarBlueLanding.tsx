"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { UserDropdownBlueLanding } from "./UserDropdownBlueLanding";

interface NavbarProps {
  initialSession?: Session | null;
}

export default function NavbarBlueLanding({ initialSession }: NavbarProps = {}) {
  const { data: session, update } = useSession();
  const pathname = usePathname();
  // Use initialSession on first render to prevent flash, then use client session
  const currentSession = session ?? initialSession;
  const userLabel = currentSession?.user?.name ?? currentSession?.user?.email;

  useEffect(() => {
    // Refresh session when pathname changes (e.g., after redirect)
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <div className="w-full text-main-black flex h-24 items-center justify-between px-16">
      <Link href="/" className="font-rethink font-extrabold text-4xl">
        announcify.
      </Link>
      <div className="font-rethink font-semibold text-xl items-center flex justify-center gap-10 h-full">
        <Link href="/create">Create a card</Link>
        <Link href="/more">Learn more</Link>
        {currentSession ? (
          <div className="aspect-square h-full">
            <UserDropdownBlueLanding
              userLabel={userLabel}
              userEmail={currentSession.user?.email}
            />
          </div>
        ) : (
          <div className="bg-sky-400/50 rounded-xl flex gap-5 text-sm h-full px-5">
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
  );
}
