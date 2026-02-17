"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { TextareaAutosize, Alert } from "@mui/material";
import Link from "next/link";
import { SitemarkIcon } from "./SitemarkIcon";
import type { ApiResponse } from "@/api/types";
import type { PostResponseDTO } from "@/api/posts";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

interface CreatePostFormData {
  title: string;
  content: string;
  authorName: string;
}

const EMPTY_FORM: CreatePostFormData = {
  title: "",
  content: "",
  authorName: "",
};

export function Header(): React.ReactNode {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreatePostFormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = (): void => {
    setDialogOpen(false);
    setFormData(EMPTY_FORM);
    setError(null);
  };

  const handleSubmit = async (): Promise<void> => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          published: false,
        }),
      });

      const json: ApiResponse<PostResponseDTO> = await res.json();

      if (!json.success) {
        setError(json.error);
        return;
      }

      handleClose();
      router.refresh();
    } catch {
      setError("Failed to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: "calc(var(--template-frame-height, 0px) + 16px)",
        }}
      >
        <Container maxWidth="lg">
          <StyledToolbar variant="dense" disableGutters>
            <Box
              sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
            >
              <Link href="/">
                <SitemarkIcon />
              </Link>
            </Box>
            <Box
              sx={{
                gap: 1,
                alignItems: "center",
                display: "flex",
              }}
            >
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => setDialogOpen(true)}
              >
                New Post
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                component={Link}
                href="/manage"
              >
                Manage
              </Button>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>

      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create new post</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 1 }}
        >
          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 1 }}
          />
          <TextareaAutosize
            minRows={4}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
            value={formData.content}
            name="content"
            onChange={handleChange}
            placeholder="Post text..."
          />
          <TextField
            label="Author name"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
