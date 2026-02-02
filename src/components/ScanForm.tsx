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
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="block text-slate-200 text-sm mb-2">
          Solana Token Address
        </span>
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Paste Solana token address"
          disabled={isLoading}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400 outline-none focus:border-cyan-400/40"
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 font-medium text-white disabled:opacity-50"
      >
        {isLoading ? "Scanning..." : "Scan Token"}
      </button>
    </form>
  );
}
