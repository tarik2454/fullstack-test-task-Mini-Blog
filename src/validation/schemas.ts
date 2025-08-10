import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Minimum 2 characters")
    .max(20, "Maximum 20 characters"),
  email: z.email("Invalid email").max(255),
  password: z.string().min(6, "Minimum 6 characters").max(255),
});

export const signInSchema = z.object({
  email: z.email("Invalid email").max(255),
  password: z.string().min(6, "Minimum 6 characters").max(255),
});

export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;

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
