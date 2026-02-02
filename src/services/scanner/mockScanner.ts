import { buildMockReport } from "../../utils/mockReport";
import type { Scanner } from "./types";

export const mockScanner: Scanner = {
    async scan({target}){
        return buildMockReport(target)
    },
}