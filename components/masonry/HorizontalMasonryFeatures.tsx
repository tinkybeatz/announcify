type Feature = { text: string; ok: boolean };

export function HorizontalMasonryFeatures({ features }: { features: Feature[] }) {
  const row1: Feature[] = [];
  const row2: Feature[] = [];

  // Simple alternating distribution (always 2 rows)
  for (let i = 0; i < features.length; i++) {
    (i % 2 === 0 ? row1 : row2).push(features[i]);
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
        {row1.map((f, i) => (
          <FeaturePill key={`r1-${i}`} feature={f} />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
        {row2.map((f, i) => (
          <FeaturePill key={`r2-${i}`} feature={f} />
        ))}
      </div>
    </div>
  );
}

function FeaturePill({ feature }: { feature: Feature }) {
  return (
    <div
      className={`inline-flex w-fit items-center bg-linear-to-r ${
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