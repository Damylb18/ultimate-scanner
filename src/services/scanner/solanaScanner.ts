import { Connection, PublicKey } from "@solana/web3.js";
import type { Scanner } from "./types";
import type { ScanRequest } from "../../types/scan";
import type { ScanReport } from "../../types/report";

const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);

export const solanaScanner: Scanner = {
  async scan({ target }: ScanRequest): Promise<ScanReport> {
    const pubkey = new PublicKey(target);

    // Fetch account info
    const accountInfo = await connection.getAccountInfo(pubkey);

    if (!accountInfo) {
      throw new Error("Token account not found");
    }

    // For now return something real-based
    return {
      tokenName: "Unknown Token",
  tokenSymbol: "N/A",
  tokenAddress: target,
  safetyScore: 50,
  safetyLabel: "Data Retrieved",
  summary: "Basic Solana account data fetched successfully.",
  sections: [],
    };
  },
};