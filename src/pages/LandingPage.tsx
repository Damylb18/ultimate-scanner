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
    <main>
      <h1>Ultimate Scanner</h1>
      <p>Paste a token address to scan risk signals.</p>

      <ScanForm onSubmit={handleScan}></ScanForm>
    </main>
  );
}
