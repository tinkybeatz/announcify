"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";

interface UserDropdownProps {
  userLabel: string | null | undefined;
  handleSignOut: () => Promise<void>;
  userEmail: string | null | undefined;
}

export function UserDropdown({
  userLabel,
  handleSignOut,
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
    <div className="relative flex items-center h-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-main-black/50 backdrop-blur-md flex items-center text-main-white justify-center rounded-xl h-full w-full px-4"
      >
        <User className="w-5 h-5" />
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
        <div className="absolute top-full right-0 mt-3 bg-main-black/50 backdrop-blur-md rounded-xl overflow-hidden w-52">
          <div className="text-main-white cursor-default text-xs w-full h-14 flex items-center justify-center pt-1.5 px-1.5">
            <div className="w-full h-full rounded-lg bg-main-black/10 items-center justify-center flex flex-col">
              <div>{userLabel}</div>
              <div className="text-zinc-300">{userEmail}</div>
            </div>
          </div>
          <div className="flex flex-col h-26 justify-evenly items-center">
            <a
              href="/user"
              className="hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor] text-sm font-medium text-main-white"
            >
              Dashboard
            </a>
            <a
              href="/user"
              className="hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor] text-sm font-medium text-main-white"
            >
              Settings
            </a>
            <a
              onClick={handleSignOut}
              className="hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor] text-sm font-medium text-main-white cursor-pointer"
            >
              Sign out
            </a>
            {/* <form action={handleSignOut}>
              <button
                type="submit"
                className="font-medium text-main-white text-sm cursor-pointer hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
              >
                Sign out
              </button>
            </form> */}
          </div>
        </div>
      )}
    </div>
  );
}
