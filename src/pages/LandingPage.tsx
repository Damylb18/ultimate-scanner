import { useNavigate } from "react-router-dom";
import { ScanForm } from "../components/ScanForm";
import type { ScanRequest } from "../types/scan";

export function LandingPage() {
  const navigate = useNavigate();

  function handleScan(request: ScanRequest) {
    const params = new URLSearchParams({
      chain: request.chain,
      target: request.target,
    });
    navigate(`/results?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f3a] to-[#0a1628]">
      <main className="max-w-3xl mx-auto px-6 py-16">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-3">
            Ultimate Scanner
          </h1>
          <p className="text-slate-300">
            Paste a Solana token address to scan risk signals.
          </p>
        </header>

        <section className="rounded-2xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-sm">
          <ScanForm onSubmit={handleScan} />
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-white font-medium mb-1">Technical Checks</h3>
            <p className="text-slate-300 text-sm">
              Mint, freeze, liquidity, holders and pool signals.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-white font-medium mb-1">Insider Behaviour</h3>
            <p className="text-slate-300 text-sm">
              Early accumulation, distribution and coordinated selling risk.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-white font-medium mb-1">Market Patterns</h3>
            <p className="text-slate-300 text-sm">
              Pump/dump flags and volume stability.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
