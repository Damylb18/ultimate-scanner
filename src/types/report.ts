export type BadgeTone = 'good' | 'warn' | 'bad' | 'neutral'

export type Evidence = {
  source: "rpc" | "dexscreener" | "birdeye" | "helius" | "shyft" | "solscan" | "manual";
  label?: string;            // e.g. "getAccountInfo", "token supply", "pair snapshot"
  url?: string;              // link to explorer / api docs / query
  detail?: string;           // short explanation
  confidence?: number;       // 0..1
  timestamp?: string;        // ISO string
};


export type CheckStatus = {
  text: string  //e.g. "Verified", "Partial"
  tone: BadgeTone
  evidence?: Evidence[]
}

export type ReportItem = {
  label: string  //e.g. Mint Authority
  status: CheckStatus
}

export type ReportSection = {
  title: string  //e.g Contract Analysis
  items: ReportItem[]
}

export type ScanReport = {
  tokenName: string
  tokenSymbol: string
  tokenAddress: string

  safetyScore: number // 0-100
  safetyLabel: string // "Safe" / "Caution" / "High Risk"
  summary: string 

  sections: ReportSection[]
}