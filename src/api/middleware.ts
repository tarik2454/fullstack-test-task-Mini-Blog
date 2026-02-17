import type { Context } from "hono";
import { AppError } from "@/api/errors";

/**
 * Global error handler — catches all errors and returns consistent JSON responses.
 * Eliminates try/catch in individual route handlers.
 */
export function onError(err: Error, c: Context): Response {
  if (err instanceof AppError) {
    return c.json(
      { success: false, error: err.message },
      err.statusCode as 400,
    );
  }

  console.error("Unhandled error:", err);
  return c.json({ success: false, error: "Internal server error" }, 500);
}
