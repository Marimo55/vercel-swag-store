export class ApiError extends Error {
  readonly status: number;
  readonly statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function readApiErrorMessage(body: unknown) {
  const b = body as { error?: { message?: unknown }; message?: unknown };
  const m = b?.error?.message ?? b?.message;
  return typeof m === "string" ? m : undefined;
}
