import type { ReportSection } from "../types/report";
import { StatusBadge } from "./StatusBadge";

type AnalysisSectionCardProps = {
  section: ReportSection;
};

export function AnalysisSectionCard({ section }: AnalysisSectionCardProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h2 className="text-lg font-semibold text-white mb-4">{section.title}</h2>

      <ul className="space-y-3">
        {section.items.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between gap-4"
          >
            <span className="text-slate-200">{item.label}</span>
            <StatusBadge text={item.status.text} tone={item.status.tone} />
          </li>
        ))}
      </ul>
    </section>
  );
}
