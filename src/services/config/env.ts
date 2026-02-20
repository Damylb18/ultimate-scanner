
type ScannerMode = "mock" | "real";

function readEnv(key: string): string | undefined {
  // Vite env lives on import.meta.env
  const v = (import.meta as any).env?.[key];
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;
}

export const env = {
  scannerMode: (readEnv("VITE_SCANNER_MODE") as ScannerMode) ?? "mock",

  // RPC
  solanaRpcUrl: readEnv("VITE_SOLANA_RPC_URL") ?? "https://api.mainnet-beta.solana.com",

  //  paid provider keys 
  heliusApiKey: readEnv("VITE_HELIUS_API_KEY"),
  birdeyeApiKey: readEnv("VITE_BIRDEYE_API_KEY"),
  shyftApiKey: readEnv("VITE_SHYFT_API_KEY"),
};

export function assertEnvForRealMode() {
  if (env.scannerMode !== "real") return;

  // For now: real mode can run with public RPC only (basic checks)
  // Later it will require Helius/Birdeye when we implement holders/dump logic.
  if (!env.solanaRpcUrl) {
    throw new Error("Missing VITE_SOLANA_RPC_URL");
  }
}