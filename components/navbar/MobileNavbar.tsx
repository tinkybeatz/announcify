"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { User } from "lucide-react";
import type { Session } from "next-auth";

interface MobileNavbarProps {
  initialSession?: Session | null;
}

export function MobileNavbar({ initialSession }: MobileNavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, update } = useSession();
  const pathname = usePathname();

  const currentSession = session ?? initialSession;
  const userLabel = currentSession?.user?.name ?? currentSession?.user?.email;

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Navbar Header */}
      <div className="h-22 fixed top-0 z-50 bg-transparent items-center pt-6 justify-center flex w-full gap-3 md:hidden">
        <div className="bg-main-black/50 backdrop-blur-md flex justify-between items-center rounded-xl w-2/3 h-full pl-6 pr-3">
          <Link
            href="/"
            className="flex text-main-white font-accent text-lg font-bold items-center"
          >
            Announcify
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-main-black/10 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={`absolute h-0.5 w-5 bg-main-white rounded-full transition-all duration-300 ease-out ${
                isOpen ? "rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-main-white rounded-full transition-all duration-300 ease-out ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-main-white rounded-full transition-all duration-300 ease-out ${
                isOpen ? "-rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-down Menu Panel */}
      <div
        className={`fixed pt-27 flex items-center justify-center w-full z-45 transition-all duration-300 ease-out md:hidden ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-main-black/50 backdrop-blur-md rounded-xl overflow-hidden w-3/4">
          {/* User Section (if logged in) */}
          {currentSession && (
            <div className="text-main-white text-xs w-full p-2 border-b border-white/10">
              <div className="w-full rounded-lg bg-main-black/10 p-2 flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-main-black/20">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userLabel}</span>
                  <span className="text-zinc-300">
                    {currentSession.user?.email}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col">
            <div className="flex flex-col p-2 gap-2">
              <Link
                href="/create"
                className="flex items-center px-5 py-4 text-sm font-medium text-main-white hover:bg-main-black/10 active:bg-main-black/20 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Create a card
              </Link>
              <Link
                href="/more"
                className="flex items-center px-5 py-4 text-sm font-medium text-main-white hover:bg-main-black/10 active:bg-main-black/20 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Learn more
              </Link>
            </div>

            {currentSession ? (
              <>
                <div className="h-px bg-white/10 mx-4" />
                <div className="flex flex-col p-2 gap-2">
                  <Link
                    href="/user"
                    className="flex items-center px-5 py-4 text-sm font-medium text-main-white hover:bg-main-black/10 active:bg-main-black/20 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/user"
                    className="flex items-center px-5 py-4 text-sm font-medium text-main-white hover:bg-main-black/10 active:bg-main-black/20 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                </div>
                <div className="h-px bg-white/10 mx-4" />
                <div className="flex flex-col p-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex items-center px-5 py-4 text-sm font-medium text-main-white hover:bg-main-black/10 active:bg-main-black/20 rounded-lg transition-colors w-full text-left"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="h-px bg-white/10 mx-4" />
                <div className="flex gap-2 p-2">
                  <Link
                    href="/signin"
                    className="flex-1 flex items-center justify-center py-3 text-sm font-medium text-main-white rounded-lg bg-main-black/10 hover:bg-main-black/20 active:bg-main-black/30 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="flex-1 flex items-center justify-center py-3 text-sm font-medium text-main-white rounded-lg bg-main-black/20 hover:bg-main-black/30 active:bg-main-black/40 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
