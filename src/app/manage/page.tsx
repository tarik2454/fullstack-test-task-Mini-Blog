"use client";

import { useEffect, useState, useCallback } from "react";
import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  CircularProgress,
  Box,
  Alert,
  IconButton,
  Container,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { PostResponseDTO } from "@/api/posts";
import type { ApiResponse } from "@/api/types";

type PostStatus = "Published" | "Draft";

function getStatusFromPublished(published: boolean): PostStatus {
  return published ? "Published" : "Draft";
}

export default function ManagePage(): React.ReactNode {
  const [posts, setPosts] = useState<PostResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewPost, setViewPost] = useState<PostResponseDTO | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<PostResponseDTO | null>(
    null
  );

  const fetchPosts = useCallback(async (): Promise<void> => {
    try {
      const res = await fetch("/api/posts?all=true");
      const json: ApiResponse<PostResponseDTO[]> = await res.json();

      if (!json.success) {
        setError(json.error);
        return;
      }

      setPosts(json.data);
    } catch {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  const handleStatusChange = async (
    id: number,
    newStatus: PostStatus
  ): Promise<void> => {
    const published = newStatus === "Published";

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published }),
      });

      const json: ApiResponse<PostResponseDTO> = await res.json();

      if (!json.success) {
        setError(json.error);
        return;
      }

      setPosts((prev) =>
        prev.map((post) => (post.id === id ? json.data : post))
      );
    } catch {
      setError("Failed to update post status");
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      const json: ApiResponse<{ deleted: boolean }> = await res.json();

      if (!json.success) {
        setError(json.error);
        return;
      }

      setPosts((prev) => prev.filter((post) => post.id !== id));
      setDeleteConfirm(null);
    } catch {
      setError("Failed to delete post");
    }
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 14, gap: 3 }}
      >
        <Typography variant="h4" gutterBottom>
          Manage Posts
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : posts.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{ py: 4, textAlign: "center" }}
          >
            No posts yet.
          </Typography>
        ) : (
          <Paper variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post, index) => (
                  <TableRow key={post.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link href={`/${post.id}`} style={{ color: "inherit" }}>
                        {post.title}
                      </Link>
                    </TableCell>
                    <TableCell>{post.authorName}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusFromPublished(post.published)}
                        color={post.published ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        <Select
                          size="small"
                          value={getStatusFromPublished(post.published)}
                          onChange={(e) =>
                            void handleStatusChange(
                              post.id,
                              e.target.value as PostStatus
                            )
                          }
                          sx={{ width: 130, height: 30 }}
                        >
                          <MenuItem value="Published">Publish</MenuItem>
                          <MenuItem value="Draft">Draft</MenuItem>
                        </Select>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ height: 30 }}
                          onClick={() => setViewPost(post)}
                        >
                          View
                        </Button>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteConfirm(post)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Container>
      <Footer />

      {/* View dialog */}
      <Dialog
        open={viewPost !== null}
        onClose={() => setViewPost(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>{viewPost?.title}</DialogTitle>
        <DialogContent>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 2, display: "block" }}
          >
            By {viewPost?.authorName} |{" "}
            {viewPost?.createdAt
              ? new Date(viewPost.createdAt).toLocaleDateString()
              : ""}
          </Typography>
          <DialogContentText sx={{ whiteSpace: "pre-line" }}>
            {viewPost?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewPost(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete &quot;{deleteConfirm?.title}&quot;?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() =>
              deleteConfirm ? void handleDelete(deleteConfirm.id) : undefined
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
