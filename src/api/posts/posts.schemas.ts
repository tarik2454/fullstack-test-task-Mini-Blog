import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(2, "Title is required")
    .max(255, "Maximum 255 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(2000, "Maximum 2000 characters"),
  authorName: z
    .string()
    .min(1, "Author name is required")
    .max(255, "Maximum 255 characters"),
  published: z.boolean().optional(),
});

export type CreatePost = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  title: z
    .string()
    .min(2, "Title is required")
    .max(255, "Maximum 255 characters")
    .optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .max(2000, "Maximum 2000 characters")
    .optional(),
  authorName: z
    .string()
    .min(1, "Author name is required")
    .max(255, "Maximum 255 characters")
    .optional(),
  published: z.boolean().optional(),
});

export type UpdatePost = z.infer<typeof updatePostSchema>;
