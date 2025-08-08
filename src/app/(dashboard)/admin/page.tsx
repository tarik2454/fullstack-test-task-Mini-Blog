"use client";

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
} from "@mui/material";
import { PageContainer } from "@toolpad/core";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
  status: "Published" | "Draft";
  description: string;
};

const dummyPosts: Post[] = [
  {
    id: 1,
    title: "First Post",
    status: "Published",
    description: "This is the first post description.",
  },
  {
    id: 2,
    title: "Second Post",
    status: "Draft",
    description: "This is the second post description.",
  },
];

export default function MainPage() {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleStatusChange = (id: number, newStatus: Post["status"]) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, status: newStatus } : post
      )
    );
  };

  const handleView = (post: Post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  return (
    <PageContainer breadcrumbs={[{ title: "Posts", path: "/admin" }]}>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Title</TableCell>
              <TableCell sx={{ width: 150 }}>Status</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={post.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>
                  <Button
                    sx={{ height: 30 }}
                    variant="outlined"
                    size="small"
                    onClick={() => handleView(post)}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={post.status}
                    onChange={(e) =>
                      handleStatusChange(
                        post.id,
                        e.target.value as Post["status"]
                      )
                    }
                    sx={{
                      width: 130,
                      height: 30,
                      bgcolor: post.status === "Draft" ? "#f44336" : "#4caf50",
                      color: "white",
                      borderRadius: 1,
                      "& .MuiSelect-icon": {
                        color: "white",
                      },
                    }}
                  >
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              minWidth: 400,
              minHeight: 100,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontSize: 30, fontWeight: "bold" }}>
          {selectedPost?.title}
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ whiteSpace: "pre-line" }}>
            {selectedPost?.description}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
