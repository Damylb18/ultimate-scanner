type SafetyScoreCardProps = {
  score: number;
  label: string;
  summary: string;
};

function getSafetyTheme(score: number) {
  if (score >= 70) {
    return {
      color: "text-green-300",
      bg: "from-green-500/15 to-green-600/5",
      glow: "shadow-green-500/10",
    };
  }
  if (score >= 40) {
    return {
      color: "text-amber-300",
      bg: "from-amber-500/15 to-amber-600/5",
      glow: "shadow-amber-500/10",
    };
  }
  return {
    color: "text-red-300",
    bg: "from-red-500/15 to-red-600/5",
    glow: "shadow-red-500/10",
  };
}

export function SafetyScoreCard({
  score,
  label,
  summary,
}: SafetyScoreCardProps) {
  const theme = getSafetyTheme(score);

  return (
    <section
      className={[
        "rounded-2xl border border-cyan-500/20 bg-gradient-to-br p-6 md:p-8",
        "backdrop-blur-sm shadow-lg",
        theme.bg,
        theme.glow,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-slate-300 text-sm uppercase tracking-wide mb-2">
            Safety Score
          </p>

          <p
            className={[
              "text-4xl md:text-5xl font-semibold mb-2",
              theme.color,
            ].join(" ")}
          >
            {score} <span className="text-slate-300">/ 100</span>
          </p>

          <p
            className={[
              "text-xl md:text-2xl font-medium mb-3",
              theme.color,
            ].join(" ")}
          >
            {label}
          </p>

          <p className="text-slate-300 text-sm max-w-xl">{summary}</p>
        </div>

        {/* Placeholder for the circle gauge (next step) */}
        <div className="hidden md:flex items-center justify-center w-32 h-32 rounded-full border border-white/10 bg-white/5">
          <span className={["text-2xl font-bold", theme.color].join(" ")}>
            {score}
          </span>
        </div>
      </div>
    </section>
  );
}
