import { z } from "zod";

export const createAdminSchema = z.object({
  email: z.email().max(255),
  password: z.string().min(6).max(255),
});

export const createPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(2000),
  authorName: z.string().min(1).max(255),
  published: z.boolean().optional(),
});
