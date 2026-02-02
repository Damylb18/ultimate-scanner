import type { BadgeTone } from "../types/report";

type StatusBadgeProps = {
  text: string;
  tone: BadgeTone;
};

function toneClasses(tone: BadgeTone) {
  switch (tone) {
    case "good":
      return "bg-green-500/15 text-green-300 border-green-500/30";
    case "warn":
      return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    case "bad":
      return "bg-red-500/15 text-red-300 border-red-500/30";
    default:
      return "bg-slate-500/15 text-slate-200 border-slate-500/30";
  }
}

export function StatusBadge({ text, tone }: StatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-lg border px-3 py-1 text-sm font-medium",
        toneClasses(tone),
      ].join(" ")}
    >
      {text}
    </span>
  );
}
