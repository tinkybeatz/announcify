"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { UserDropdownBlue } from "./UserDropdownBlue";
import type { Session } from "next-auth";

interface NavbarProps {
  initialSession?: Session | null;
  isVisible?: boolean;
}

export function NavbarBlue({ initialSession, isVisible = true }: NavbarProps = {}) {
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
    <div className="h-22 z-50 bg-transparent transition-all items-center pt-6 justify-center flex w-full gap-3">
      <div className="relative flex justify-between items-center rounded-xl w-1/2 h-full px-5">
        {/* Blurred background layer */}
        <div className={`absolute inset-0 rounded-xl bg-sky-400/50 backdrop-blur-md transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        {/* Content */}
        <Link
          href="/"
          className="relative flex text-main-black font-rethink text-xl font-extrabold items-center"
        >
          announcify.
        </Link>
        <div className="relative flex gap-5 font-rethink text-sm">
          <Link
            href="/create"
            className="flex items-center font-bold text-main-black hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
          >
            Create a card
          </Link>
          <Link
            href="/more"
            className="flex items-center font-bold text-main-black hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
          >
            Learn more
          </Link>
        </div>
      </div>
      {currentSession ? (
        <div className="aspect-square h-full">
          <UserDropdownBlue userLabel={userLabel} userEmail={currentSession.user?.email} />
        </div>
      ) : (
        <div className="relative rounded-xl flex gap-5 text-sm h-full px-5">
          {/* Blurred background layer */}
          <div className={`absolute inset-0 rounded-xl bg-sky-400/50 backdrop-blur-md transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
          <Link
            href="/signin"
            className="relative flex items-center font-medium text-main-white cursor-pointer hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="relative flex items-center font-medium text-main-white cursor-pointer hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
