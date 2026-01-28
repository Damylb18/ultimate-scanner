export type BadgeTone = 'good' | 'warn' | 'bad' | 'neutral'

export type CheckStatus = {
  text: string  //e.g. "Verified", "Partial"
  tone: BadgeTone
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