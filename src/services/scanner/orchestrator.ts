
import type { Scanner } from "./types";
import { mockScanner } from "./mockScanner";
import { solanaScanner } from "./solanaScanner";
import { env } from "../config/env";

export function getScanner(): Scanner {
  // MVP: only Solana supported, but we still allow mock/real swapping
  return env.scannerMode === "real" ? solanaScanner : mockScanner;
}

export const scanner: Scanner = {
  scan: (request) => getScanner().scan(request),
};