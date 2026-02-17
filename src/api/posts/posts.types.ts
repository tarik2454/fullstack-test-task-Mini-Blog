import type { InferSelectModel } from "drizzle-orm";
import type { posts } from "@/db/schema";

export type Post = InferSelectModel<typeof posts>;

export interface PostResponseDTO {
  id: number;
  title: string;
  content: string;
  authorName: string;
  published: boolean;
  createdAt: string;
}

export interface CreatePostDTO {
  title: string;
  content: string;
  authorName: string;
  published?: boolean;
}

export interface UpdatePostDTO {
  title?: string;
  content?: string;
  authorName?: string;
  published?: boolean;
}

export function mapPostToResponseDTO(post: Post): PostResponseDTO {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    authorName: post.authorName,
    published: post.published,
    createdAt: post.createdAt.toISOString(),
  };
}
