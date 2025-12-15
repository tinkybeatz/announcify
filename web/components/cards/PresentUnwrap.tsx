"use client";

import { useState, ReactNode } from "react";
import CelebrationConfetti from "./CelebrationConfetti";

type PresentUnwrapProps = {
  children: ReactNode;
};

export default function PresentUnwrap({ children }: PresentUnwrapProps) {
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  const handleClick = () => {
    setIsUnwrapped(true);
  };

  return (
    <>
      {children}

      <div
        className={`fixed top-0 left-0 w-full h-1/2 bg-red-500 cursor-pointer z-50 transition-transform duration-1000 ease-in-out ${
          isUnwrapped ? "-translate-y-[200%]" : "translate-y-0"
        }`}
        onClick={handleClick}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-full bg-yellow-300 shadow-lg" />
        <div className="absolute bottom-0 left-0 w-full h-12 bg-yellow-300" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 translate-y-1/2">
          <div className="relative w-48 h-48">
            <div className="absolute left-0 w-20 h-32 z-10 -rotate-30 bg-yellow-400 rounded-full border-8 border-yellow-500 shadow-2xl" />
            <div className="absolute right-0 w-20 h-32 z-10 rotate-30 bg-yellow-400 rounded-full border-8 border-yellow-500 shadow-2xl" />
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-500 rounded-full shadow-2xl" />
            <div className="absolute left-[40%] top-1/2 -translate-x-1/2 w-12 h-40 bg-yellow-400 rotate-20" />
            <div className="absolute left-[60%] top-1/2 -translate-x-1/2 w-12 h-40 bg-yellow-400 -rotate-20" />
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-0 left-0 w-full h-1/2 bg-red-500 cursor-pointer z-10 transition-transform duration-1000 ease-in-out ${
          isUnwrapped ? "translate-y-[200%]" : "translate-y-0"
        }`}
        onClick={handleClick}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-full bg-yellow-300 shadow-lg" />
        <div className="absolute top-0 left-0 w-full h-12 bg-yellow-300" />
      </div>

      {isUnwrapped && <CelebrationConfetti />}
    </>
  );
}
