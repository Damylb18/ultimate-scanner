import { buildMockReport } from "../../utils/mockReport";
import type { Scanner } from "./types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const mockScanner: Scanner = {
  async scan({ target }) {
    await sleep(400);
    return buildMockReport(target);
  },
};