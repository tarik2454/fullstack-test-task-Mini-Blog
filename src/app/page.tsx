import Container from "@mui/material/Container";
import { Blog } from "@/components/Blog";
import { Latest } from "@/components/Latest";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllPosts } from "@/api/posts";
import type { PostResponseDTO } from "@/api/posts";

export const dynamic = "force-dynamic";

export default async function BlogPage(): Promise<React.ReactNode> {
  let posts: PostResponseDTO[] = [];
  try {
    posts = await getAllPosts(true);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 14, gap: 4 }}
      >
        <Blog posts={posts} />
        <Latest posts={posts} />
      </Container>
      <Footer />
    </>
  );
}
