import { useMemo, useState } from "react";
import type { ScanRequest } from "../types/scan";

type ScanFormProps = {
  onSubmit: (request: ScanRequest) => void;
  isLoading?: boolean;
};

function normalizeTarget(value: string) {
  return value.trim();
}

export function ScanForm({ onSubmit, isLoading = false }: ScanFormProps) {
  const [target, setTarget] = useState("");

  const normalizedTarget = useMemo(() => normalizeTarget(target), [target]);
  const canSubmit = normalizedTarget.length > 0 && !isLoading;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    onSubmit({
      chain: "solana",
      target: normalizedTarget,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Solana Token Address
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Paste Solana Token Address"
          disabled={isLoading}
        />
      </label>

      <button type="submit" disabled={!canSubmit}>
        {isLoading ? "Scanning..." : "Scan Token"}
      </button>
    </form>
  );
}
