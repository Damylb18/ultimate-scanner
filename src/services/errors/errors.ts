// src/services/errors/errors.ts

export type ErrorCode =
  | "INVALID_INPUT"
  | "NOT_FOUND"
  | "RATE_LIMIT"
  | "UPSTREAM"
  | "UNKNOWN";

export type ErrorDetails = Record<string, unknown>;

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly httpStatus: number;
  public readonly retryable: boolean;
  public readonly details?: ErrorDetails;
  public readonly cause?: unknown;

  constructor(
    message: string,
    opts: {
      code: ErrorCode;
      httpStatus: number;
      retryable?: boolean;
      details?: ErrorDetails;
      cause?: unknown;
    },
  ) {
    super(message);
    this.name = "AppError";
    this.code = opts.code;
    this.httpStatus = opts.httpStatus;
    this.retryable = opts.retryable ?? false;
    this.details = opts.details;
    this.cause = opts.cause;
  }
}

export class InvalidInputError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, {
      code: "INVALID_INPUT",
      httpStatus: 400,
      retryable: false,
      details,
    });
    this.name = "InvalidInputError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, {
      code: "NOT_FOUND",
      httpStatus: 404,
      retryable: false,
      details,
    });
    this.name = "NotFoundError";
  }
}

export class RateLimitError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, {
      code: "RATE_LIMIT",
      httpStatus: 429,
      retryable: true,
      details,
    });
    this.name = "RateLimitError";
  }
}

export class UpstreamError extends AppError {
  constructor(message: string, opts?: { details?: ErrorDetails; cause?: unknown }) {
    super(message, {
      code: "UPSTREAM",
      httpStatus: 502,
      retryable: true,
      details: opts?.details,
      cause: opts?.cause,
    });
    this.name = "UpstreamError";
  }
}