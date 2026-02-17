import { Hono } from "hono";
import { logger } from "hono/logger";
import { onError } from "./middleware";
import { postsRoutes } from "@/api/posts";

const app = new Hono().basePath("/api");

app.use("*", logger());
app.onError(onError);

app.route("/posts", postsRoutes);

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

export { app };
