import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { scanner } from "../services/scanner/orchestrator";
import type { ScanReport } from "../types/report";
import { SafetyScoreCard } from "../components/SafetyScoreCard";
import { AnalysisSectionCard } from "../components/AnalysisSectionCard";
import { isAppError } from "../services/errors/guards";
import { toUserMessage } from "../services/errors/toUserMessage";

function getSingleParam(params: URLSearchParams, key: string) {
  const value = params.get(key);
  return value?.trim() || "";
}

type PageProps = {
  children: React.ReactNode;
};

function Page({ children }: PageProps) {
  return <main className="page">{children}</main>;
}

export function ResultsPage() {
  const [searchParams] = useSearchParams();

  const chain = useMemo(
    () => getSingleParam(searchParams, "chain"),
    [searchParams],
  );
  const target = useMemo(
    () => getSingleParam(searchParams, "target"),
    [searchParams],
  );

  const [report, setReport] = useState<ScanReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!target) return;

      setReport(null);
      setIsLoading(true);
      setError(null);

      try {
        const result = await scanner.scan({ target });
        if (!cancelled) setReport(result);
      } catch (e) {
        if (!cancelled) {
          if (isAppError(e)) setError(toUserMessage(e));
          else setError("Something went wrong. Please try again.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [target]);

  const hasRequiredParams = chain.length > 0 && target.length > 0;

  if (!hasRequiredParams) {
    return (
      <Page>
        <h1>Scan Results</h1>
        <p>Missing scan details. Go back and submit a token address.</p>
      </Page>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f3a] to-[#0a1628]">
        <main className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl text-white mb-6">Scan Results</h1>

          <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-8 text-center backdrop-blur-sm">
            <p className="text-slate-300 text-lg animate-pulse">
              Scanning token...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f3a] to-[#0a1628]">
        <main className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl text-white mb-6">Scan Results</h1>

          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
            <p className="text-red-300">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  if (!report) {
    return (
      <Page>
        <h1>Scan Results</h1>
        <p>No report available.</p>
      </Page>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f3a] to-[#0a1628]">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl text-red-500">Scan Results</h1>

        <p>
          <strong>Token:</strong> {report.tokenName} ({report.tokenSymbol})
        </p>
        <SafetyScoreCard
          score={report.safetyScore}
          label={report.safetyLabel}
          summary={report.summary}
        />

        <div className="grid">
          {report.sections.map((section) => (
            <AnalysisSectionCard key={section.title} section={section} />
          ))}
        </div>
      </main>
    </div>
  );
}
