import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class ProviderNotConfiguredError extends Error {
  constructor(providerName: string) {
    super(`${providerName} is not configured`);
    this.name = "ProviderNotConfiguredError";
  }
}

export function createErrorResponse(c: Context, error: unknown, fallbackRequestId: string) {
  const requestId = c.get("requestId") ?? fallbackRequestId;

  if (error instanceof HTTPException) {
    return c.json(
      {
        requestId,
        code: `http_${error.status}`,
        message: error.message,
      },
      error.status,
    );
  }

  if (error instanceof ProviderNotConfiguredError) {
    return c.json(
      {
        requestId,
        code: "provider_not_configured",
        message: "This provider is not configured yet.",
      },
      503,
    );
  }

  return c.json(
    {
      requestId,
      code: "internal_server_error",
      message: "Something went wrong.",
    },
    500,
  );
}
