import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPostById } from "@/api/posts";
import { AppError } from "@/api/errors";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<React.ReactNode> {
  const { id } = await params;
  const postId = Number(id);

  if (Number.isNaN(postId) || postId <= 0) {
    notFound();
  }

  try {
    const post = await getPostById(postId);

    if (!post.published) {
      notFound();
    }

    const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <>
        <Header />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: "flex", flexDirection: "column", my: 14, gap: 4 }}
        >
          <Button
            component={Link}
            href="/"
            startIcon={<ArrowBackIcon />}
            sx={{ alignSelf: "flex-start" }}
          >
            Back to Blog
          </Button>

          <Box
            component="img"
            src={`https://picsum.photos/1200/500?random=${post.id}`}
            alt={post.title}
            sx={{
              width: "100%",
              aspectRatio: "16 / 6",
              objectFit: "cover",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          />

          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            {post.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip label={post.authorName} size="small" variant="outlined" />
            <Typography variant="body2" color="text.secondary">
              {formattedDate}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line", lineHeight: 1.8, fontSize: "1.1rem" }}
          >
            {post.content}
          </Typography>
        </Container>
        <Footer />
      </>
    );
  } catch (error) {
    if (error instanceof AppError && error.statusCode === 404) {
      notFound();
    }
    throw error;
  }
}
