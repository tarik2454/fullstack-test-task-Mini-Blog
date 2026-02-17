import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, desc, and, like } from "drizzle-orm";
import { NotFoundError } from "@/api/errors";
import type { PostResponseDTO, CreatePostDTO, UpdatePostDTO } from "./posts.types";
import { mapPostToResponseDTO } from "./posts.types";

export async function getAllPosts(onlyPublished: boolean = false): Promise<PostResponseDTO[]> {
  const rows = onlyPublished
    ? await db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.createdAt))
    : await db.select().from(posts).orderBy(desc(posts.createdAt));

  return rows.map(mapPostToResponseDTO);
}

export async function getPostById(id: number): Promise<PostResponseDTO> {
  const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!rows[0]) {
    throw new NotFoundError("Post");
  }
  return mapPostToResponseDTO(rows[0]);
}

export async function createPost(data: CreatePostDTO): Promise<PostResponseDTO> {
  const rows = await db
    .insert(posts)
    .values({
      title: data.title,
      content: data.content,
      authorName: data.authorName,
      published: data.published ?? false,
    })
    .returning();

  if (!rows[0]) {
    throw new Error("Failed to create post");
  }
  return mapPostToResponseDTO(rows[0]);
}

export async function updatePost(id: number, data: UpdatePostDTO): Promise<PostResponseDTO> {
  const rows = await db.update(posts).set(data).where(eq(posts.id, id)).returning();
  if (!rows[0]) {
    throw new NotFoundError("Post");
  }
  return mapPostToResponseDTO(rows[0]);
}

export async function deletePost(id: number): Promise<void> {
  const rows = await db.delete(posts).where(eq(posts.id, id)).returning();
  if (!rows[0]) {
    throw new NotFoundError("Post");
  }
}

export async function searchPosts(query: string): Promise<PostResponseDTO[]> {
  const rows = await db
    .select()
    .from(posts)
    .where(and(eq(posts.published, true), like(posts.title, `%${query}%`)))
    .orderBy(desc(posts.createdAt));

  return rows.map(mapPostToResponseDTO);
}
