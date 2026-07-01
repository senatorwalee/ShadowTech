import { z } from "zod";

export type EnvSource = Record<string, string | undefined>;

export class EnvValidationError extends Error {
  constructor(public readonly issues: z.ZodIssue[]) {
    super("Environment validation failed");
    this.name = "EnvValidationError";
  }
}

export function createEnvSchema<TShape extends z.ZodRawShape>(shape: TShape) {
  return z.object(shape);
}

export function parseEnv<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  values: unknown,
): z.infer<TSchema> {
  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    throw new EnvValidationError(parsed.error.issues);
  }

  return parsed.data;
}
