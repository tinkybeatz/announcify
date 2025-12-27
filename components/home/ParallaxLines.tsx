import { motion, MotionValue, useTransform } from "framer-motion";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp01(t: number) {
  return Math.max(0, Math.min(1, t));
}

export function ParallaxLine({
  line,
  index,
  pages,
  scrollYProgress,
}: {
  line: { label: string; value: number | string };
  index: number;
  pages: number;
  scrollYProgress: MotionValue<number>;
}) {
  // progress in "page units"
  const progress = useTransform(scrollYProgress, (v) => v * pages);

  const center = index + 1;

  // Final stacked slot for this line (top-aligned stack)
  const STACK_GAP = 72; // tweak
  const slotY = index * STACK_GAP;

  // Move only during [center-1, center], then lock forever
  const y = useTransform(progress, (p) => {
    const t = clamp01(p - (center - 1)); // 0 → 1 over this line's segment
    return lerp(slotY + 120, slotY, t);  // from below into its slot
  });

  // Fade in during the same segment, then stay visible
  const opacity = useTransform(progress, (p) => {
    const t = clamp01((p - (center - 1)) / 0.85); // slightly quicker fade
    return t;
  });

  // Small pop as it arrives, then settle
  const scale = useTransform(progress, (p) => {
    const t = clamp01(p - (center - 1));
    // quick overshoot feel
    const peak = t < 0.6 ? lerp(0.98, 1.0, t / 0.6) : lerp(1.0, 0.995, (t - 0.6) / 0.4);
    return peak;
  });

  return (
    <motion.div className="absolute left-0 right-0" style={{ y, opacity, scale }}>
      <div className="flex font-accent items-baseline gap-6">
        <span className="text-6xl font-bold tabular-nums">{line.value}</span>
        <span className="mt-2 text-3xl font-medium text-white/90">{line.label}</span>
      </div>
    </motion.div>
  );
}