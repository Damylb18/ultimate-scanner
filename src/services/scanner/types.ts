import type { ScanReport } from "../../types/report";

export type ScanTokenInput = {
    target: string
}

export type Scanner = {
    scan: (input: ScanTokenInput) => Promise<ScanReport>
}