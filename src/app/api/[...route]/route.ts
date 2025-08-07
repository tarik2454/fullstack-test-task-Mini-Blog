import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

app.get("/:wild", (c) => {
  const wild = c.req.param("wild");
  return c.json({ message: `Dynamic: ${wild}` });
});

export const GET = handle(app);
