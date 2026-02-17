import { Hono } from "hono";
import type { Context } from "hono";
import * as postsService from "./posts.service";
import { createPostSchema, updatePostSchema } from "./posts.schemas";
import { ValidationError } from "@/api/errors";

function parseId(c: Context): number {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id) || id <= 0) {
    throw new ValidationError("Invalid post ID");
  }
  return id;
}

function parseBody<T>(schema: { safeParse: (data: unknown) => { success: true; data: T } | { success: false; error: { issues: { message: string }[] } } }, data: unknown): T {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new ValidationError(
      parsed.error.issues.map((i) => i.message).join(", "),
    );
  }
  return parsed.data;
}

export const postsRoutes = new Hono()

  .get("/", async (c) => {
    const query = c.req.query("q");
    const showAll = c.req.query("all") === "true";

    const data = query
      ? await postsService.searchPosts(query)
      : await postsService.getAllPosts(!showAll);

    return c.json({ success: true, data });
  })

  .post("/", async (c) => {
    const body = parseBody(createPostSchema, await c.req.json());
    const post = await postsService.createPost(body);
    return c.json({ success: true, data: post }, 201);
  })

  .get("/:id", async (c) => {
    const id = parseId(c);
    const post = await postsService.getPostById(id);
    return c.json({ success: true, data: post });
  })

  .put("/:id", async (c) => {
    const id = parseId(c);
    const body = parseBody(updatePostSchema, await c.req.json());
    const post = await postsService.updatePost(id, body);
    return c.json({ success: true, data: post });
  })

  .delete("/:id", async (c) => {
    const id = parseId(c);
    await postsService.deletePost(id);
    return c.json({ success: true, data: { deleted: true } });
  });
