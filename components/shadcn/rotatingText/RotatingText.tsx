"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  Transition,
  type VariantLabels,
  type Target,
  type TargetAndTransition,
} from "motion/react";

import "./RotatingText.css";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | TargetAndTransition;
  exit?: Target | VariantLabels;

  animatePresenceMode?: "sync" | "wait" | "popLayout";
  animatePresenceInitial?: boolean;

  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;

  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;

  /** Delay after exit completes before starting the resize (ms) */
  resizeDelayMs?: number;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (props, ref) => {
    const {
      texts,
      transition = { type: "spring", damping: 30, stiffness: 400 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },

      animatePresenceMode = "wait",
      animatePresenceInitial = false,

      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,

      mainClassName,
      splitLevelClassName,
      elementLevelClassName,

      resizeDelayMs = 500,

      ...rest
    } = props;

    // currently displayed text index
    const [displayIndex, setDisplayIndex] = useState(0);

    // whether the text is mounted (when false, current text exits)
    const [showText, setShowText] = useState(true);

    // pending next index and its measured size
    const [pendingIndex, setPendingIndex] = useState<number | null>(null);
    const [pendingSize, setPendingSize] = useState<{ w: number; h: number } | null>(
      null
    );

    // the size currently applied to the pill
    const [appliedSize, setAppliedSize] = useState<{ w: number; h: number } | null>(
      null
    );

    // are we currently animating the resize?
    const [resizeInProgress, setResizeInProgress] = useState(false);

    const wrapperRef = useRef<HTMLSpanElement | null>(null);
    const measureRef = useRef<HTMLSpanElement | null>(null);
    const timeoutRef = useRef<number | null>(null);

    const displayText = texts[displayIndex] ?? "";
    const measureText =
      pendingIndex !== null ? texts[pendingIndex] ?? "" : displayText;

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), (s) => s.segment);
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const currentText: string = displayText;

      if (splitBy === "characters") {
        const words = currentText.split(" ");
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      if (splitBy === "words") {
        return currentText.split(" ").map((word, i, arr) => ({
          characters: [word],
          needsSpace: i !== arr.length - 1,
        }));
      }
      if (splitBy === "lines") {
        return currentText.split("\n").map((line, i, arr) => ({
          characters: [line],
          needsSpace: i !== arr.length - 1,
        }));
      }
      return currentText.split(splitBy).map((part, i, arr) => ({
        characters: [part],
        needsSpace: i !== arr.length - 1,
      }));
    }, [displayText, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number): number => {
        const total = totalChars;
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
        if (staggerFrom === "center") {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * total);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs((staggerFrom as number) - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration]
    );

    const clearTimer = () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };

    const schedule = (fn: () => void, ms: number) => {
      clearTimer();
      timeoutRef.current = window.setTimeout(fn, ms);
    };

    useEffect(() => {
      return () => clearTimer();
    }, []);

    // Measure text + wrapper padding -> pendingSize (for pendingIndex)
    useLayoutEffect(() => {
      const wEl = wrapperRef.current;
      const mEl = measureRef.current;
      if (!wEl || !mEl) return;

      const textRect = mEl.getBoundingClientRect();

      const cs = window.getComputedStyle(wEl);
      const padX =
        (parseFloat(cs.paddingLeft || "0") || 0) +
        (parseFloat(cs.paddingRight || "0") || 0);
      const padY =
        (parseFloat(cs.paddingTop || "0") || 0) +
        (parseFloat(cs.paddingBottom || "0") || 0);

      const w = Math.ceil(textRect.width + padX);
      const h = Math.ceil(textRect.height + padY);

      // if no pending change, this is also the initial applied size
      if (pendingIndex === null) {
        setAppliedSize({ w, h });
      } else {
        setPendingSize({ w, h });
      }
    }, [measureText, pendingIndex]);

    const requestIndexChange = useCallback(
      (newIndex: number) => {
        if (newIndex === displayIndex) return;
        if (!showText || resizeInProgress) return; // ignore mid-transition

        setPendingIndex(newIndex);
        setPendingSize(null);

        // start exit by unmounting current text
        setShowText(false);
      },
      [displayIndex, showText, resizeInProgress]
    );

    const next = useCallback(() => {
      const nextIndex =
        displayIndex === texts.length - 1 ? (loop ? 0 : displayIndex) : displayIndex + 1;
      if (nextIndex !== displayIndex) requestIndexChange(nextIndex);
    }, [displayIndex, texts.length, loop, requestIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        displayIndex === 0 ? (loop ? texts.length - 1 : displayIndex) : displayIndex - 1;
      if (prevIndex !== displayIndex) requestIndexChange(prevIndex);
    }, [displayIndex, texts.length, loop, requestIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== displayIndex) requestIndexChange(validIndex);
      },
      [texts.length, displayIndex, requestIndexChange]
    );

    const reset = useCallback(() => {
      if (displayIndex !== 0) requestIndexChange(0);
    }, [displayIndex, requestIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      if (!auto) return;
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [next, rotationInterval, auto]);

    return (
      <motion.span
        {...rest}
        ref={wrapperRef}
        className={cn("text-rotate-wrapper", mainClassName)}
        animate={appliedSize ? { width: appliedSize.w, height: appliedSize.h } : undefined}
        transition={transition}
        onAnimationComplete={() => {
          // When resize finishes, mount new text
          if (!resizeInProgress) return;
          if (pendingIndex === null) return;

          const idx = pendingIndex;

          setResizeInProgress(false);
          setPendingIndex(null);
          setPendingSize(null);

          setDisplayIndex(idx);
          setShowText(true);
          onNext?.(idx);
        }}
      >
        <span className="text-rotate-sr-only">{displayText}</span>

        {/* Hidden measurer: measures the NEXT text (pending) */}
        <span ref={measureRef} className="text-rotate-measure">
          {measureText}
        </span>

        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
          onExitComplete={() => {
            // exit finished, wait, then resize the box (but keep text hidden)
            if (pendingIndex === null) {
              // no pending -> show again
              setShowText(true);
              return;
            }

            schedule(() => {
              // apply new size and start resize animation
              if (pendingSize) {
                setAppliedSize(pendingSize);
                setResizeInProgress(true);
              } else {
                // if not measured yet, fallback: mount immediately
                setDisplayIndex(pendingIndex);
                setPendingIndex(null);
                setShowText(true);
                onNext?.(pendingIndex);
              }
            }, resizeDelayMs);
          }}
        >
          {showText && (
            <motion.span key={displayIndex} className="text-rotate" aria-hidden="true">
              {elements.map((wordObj, wordIndex, array) => {
                const previousCharsCount = array
                  .slice(0, wordIndex)
                  .reduce((sum, word) => sum + word.characters.length, 0);

                const totalChars = array.reduce(
                  (sum, word) => sum + word.characters.length,
                  0
                );

                return (
                  <span
                    key={wordIndex}
                    className={cn("text-rotate-word", splitLevelClassName)}
                  >
                    {wordObj.characters.map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{
                          ...transition,
                          delay: getStaggerDelay(previousCharsCount + charIndex, totalChars),
                        }}
                        className={cn("text-rotate-element", elementLevelClassName)}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
                  </span>
                );
              })}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;