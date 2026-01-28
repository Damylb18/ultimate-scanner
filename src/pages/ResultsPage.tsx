import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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

      <p>Next: We will display a risk score here</p>
    </main>
  );
}
