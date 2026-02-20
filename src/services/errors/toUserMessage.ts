// src/services/errors/toUserMessage.ts
import type { AppError } from "./errors";

export function toUserMessage(err: AppError): string {
  switch (err.code) {
    case "INVALID_INPUT":
      return "Invalid Solana address. Please paste a valid token address.";
    case "NOT_FOUND":
      return "Token not found. Double-check the address and try again.";
    case "RATE_LIMIT":
      return "We’re being rate-limited right now. Please try again in a moment.";
    case "UPSTREAM":
      return "A data provider is temporarily unavailable. Please try again shortly.";
    default:
      return "Something went wrong. Please try again.";
  }
}