import { Connection, PublicKey } from "@solana/web3.js";
import type { Scanner } from "./types";
import type { ScanRequest } from "../../types/scan";
import type { ScanReport } from "../../types/report";
import { InvalidInputError, NotFoundError, UpstreamError } from "../errors/errors";
import { env } from "../config/env";

const connection = new Connection(env.solanaRpcUrl, "confirmed");

export const solanaScanner: Scanner = {
  async scan({ target }: ScanRequest): Promise<ScanReport> {
    let pubkey: PublicKey;

    try {
      pubkey = new PublicKey(target);
    } catch (e) {
      throw new InvalidInputError("Invalid Solana address", { target });
    }

    try {
      const accountInfo = await connection.getAccountInfo(pubkey);

      if (!accountInfo) {
        throw new NotFoundError("Token account not found", { target });
      }

      // return placeholder report for now
      return {
        tokenName: "Unknown Token",
        tokenSymbol: "N/A",
        tokenAddress: target,
        safetyScore: 50,
        safetyLabel: "Data Retrieved",
        summary: "Basic Solana account data fetched successfully.",
        sections: [],
      };
    } catch (e) {
      // If it was one of our own errors, let it pass through.
      if (e instanceof InvalidInputError || e instanceof NotFoundError) throw e;

      // Otherwise treat as upstream failure
      throw new UpstreamError("Solana RPC request failed", {
        cause: e,
        details: { target },
      });
    }
  },
};