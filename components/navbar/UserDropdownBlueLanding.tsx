"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserDropdownProps {
  userLabel: string | null | undefined;
  userEmail: string | null | undefined;
}

export function UserDropdownBlueLanding({
  userLabel,
  userEmail,
}: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex h-full items-center w-auto z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center text-pink-600 font-bold justify-center rounded-xl hover:filter-[drop-shadow(0_0_0.5px_#db2777)_drop-shadow(0_0_0.5px_#db2777)]"
      >
        <User className="w-5 h-5 text-pink-600" />
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full font-rethink -right-5 mt-3 bg-pink-400 backdrop-blur-md rounded-xl overflow-hidden w-52">
          <div className="text-main-black cursor-default text-xs w-full h-14 flex items-center justify-center pt-1.5 px-1.5">
            <div className="w-full h-full rounded-lg bg-sky-700/10 items-center justify-center flex flex-col">
              <div className="text-yellow-50">{userLabel}</div>
              <div className="text-yellow-50/50">{userEmail}</div>
            </div>
          </div>
          <div className="flex flex-col h-26 justify-evenly items-center">
            <a
              href="/user"
              className="hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor] text-sm font-medium text-main-black"
            >
              Dashboard
            </a>
            <a
              href="/user"
              className="hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor] text-sm font-medium text-main-black"
            >
              Settings
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor] text-sm font-medium text-main-black cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
