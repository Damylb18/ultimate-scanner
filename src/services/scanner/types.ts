import type { ScanReport } from "../../types/report";
import type { ScanRequest } from "../../types/scan";



export type Scanner = {
    scan: (input: ScanRequest) => Promise<ScanReport>
}