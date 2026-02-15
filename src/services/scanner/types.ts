import type { ScanReport } from "../../types/report";

export type ScanRequest = {
    target: string
}

export type Scanner = {
    scan: (input: ScanRequest) => Promise<ScanReport>
}