"use client";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { PageContainer } from "@toolpad/core";
import Link from "next/link";

const dummyPosts = [
  { id: 1, title: "First Post", status: "Published" },
  { id: 2, title: "Second Post", status: "Draft" },
];

export default function AdminPostsPage() {
  return (
    <PageContainer breadcrumbs={[{ title: "Posts", path: "/admin/posts" }]}>
      <Paper className="">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    component={Link}
                    href={`/admin/posts/${post.id}`}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </PageContainer>
  );
}
