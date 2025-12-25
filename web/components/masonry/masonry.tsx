import * as React from "react";

type Feature = { text: string; ok: boolean };

export function Masonry({
  features,
  className = "",
}: {
  features: Feature[];
  className?: string;
}) {
  return (
    <div
      className={[
        // masonry columns (responsive)
        "columns-2 lg:columns-3",
        // spacing between columns
        "gap-2",
        // optional: helps avoid weird balancing in some cases
        "[column-fill:_balance]",
        className,
      ].join(" ")}
    >
      {features.map((feature, index) => (
        <div
          key={`${feature.text}-${index}`}
          // IMPORTANT: prevent items from splitting across columns
          className="break-inside-avoid mb-2"
        >
          <FeaturePill feature={feature} />
        </div>
      ))}
    </div>
  );
}

function FeaturePill({ feature }: { feature: Feature }) {
  return (
    <div
      className={`inline-flex items-center bg-linear-to-r ${
        feature.ok ? "from-main-red to-main-yellow" : "from-zinc-300 to-zinc-400"
      } rounded-full px-px py-px`}
    >
      <div
        className={`bg-linear-to-r ${
          feature.ok ? "from-red-50 to-yellow-50" : "from-zinc-50 to-zinc-100"
        } rounded-full px-1.5 py-0.5`}
      >
        <p className="text-xs text-main-black/80 font-medium whitespace-nowrap">
          {feature.text} {feature.ok ? "✓" : "✗"}
        </p>
      </div>
    </div>
  );
}