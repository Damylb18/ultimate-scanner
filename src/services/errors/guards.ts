// src/services/errors/guards.ts
import { AppError } from "./errors";

export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}