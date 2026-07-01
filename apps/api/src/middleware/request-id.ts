import type { MiddlewareHandler } from "hono";
import type { AppVariables, Env } from "../types";

export const requestIdMiddleware: MiddlewareHandler<{
  Bindings: Env;
  Variables: AppVariables;
}> = async (c, next) => {
  const incomingRequestId = c.req.header("x-request-id");
  const requestId = incomingRequestId?.trim() || crypto.randomUUID();

  c.set("requestId", requestId);
  c.header("x-request-id", requestId);

  await next();
};
