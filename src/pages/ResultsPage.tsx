import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { buildMockReport } from "../utils/mockReport";
import type { ScanReport } from "../types/report";

function getSingleParam(params: URLSearchParams, key: string) {
  const value = params.get(key);
  return value?.trim() || "";
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
  const report: ScanReport | null = useMemo(() => {
    if (!target) return null;
    return buildMockReport(target);
  }, [target]);

  const hasRequiredParams = chain.length > 0 && target.length > 0;

  if (!hasRequiredParams) {
    return (
      <main>
        <h1>Scan Results</h1>
        <p>Missing scan details. Go back and submit a token address.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Scan Results</h1>

      <dl>
        <div>
          <dt>Chain</dt>
          <dd>{chain}</dd>
        </div>

        <div>Target</div>
        <div>{target}</div>
      </dl>

      {report && (
        <>
          <section>
            <h2>Safety Score</h2>
            <p>
              {report.safetyScore} / 100 — <strong>{report.safetyLabel}</strong>
            </p>
            <p>{report.summary}</p>
          </section>

          {report.sections.map((section) => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item.label}>
                    {item.label}: {item.status.text}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </main>
  );
}
