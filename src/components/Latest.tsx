"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Link from "next/link";
import type { PostResponseDTO } from "@/api/posts";

interface LatestProps {
  posts: PostResponseDTO[];
}

const ITEMS_PER_PAGE = 6;

const ClampedTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  "&:hover": { cursor: "pointer" },
  "& .arrow": {
    visibility: "hidden",
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  "&:hover .arrow": {
    visibility: "visible",
    opacity: 0.7,
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "3px",
    borderRadius: "8px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: 0,
    height: "1px",
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  "&:hover::before": {
    width: "100%",
  },
}));

interface AuthorProps {
  authorName: string;
  createdAt: string;
}

function Author({ authorName, createdAt }: AuthorProps): React.ReactNode {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="caption">{authorName}</Typography>
      <Typography variant="caption">{formattedDate}</Typography>
    </Box>
  );
}

export function Latest({ posts }: LatestProps): React.ReactNode {
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);

  const totalPages = Math.max(1, Math.ceil(posts.length / ITEMS_PER_PAGE));
  const paginatedPosts = posts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleFocus = (index: number): void => {
    setFocusedCardIndex(index);
  };

  const handleBlur = (): void => {
    setFocusedCardIndex(null);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
  };

  if (posts.length === 0) {
    return <div />;
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom sx={{ fontSize: 40 }}>
        Latest
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {paginatedPosts.map((post, index) => (
          <Grid key={post.id} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 1,
                height: "100%",
              }}
            >
              <Link
                href={`/${post.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <TitleTypography
                  gutterBottom
                  variant="h6"
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className={focusedCardIndex === index ? "Mui-focused" : ""}
                >
                  {post.title}
                  <NavigateNextRoundedIcon
                    className="arrow"
                    sx={{ fontSize: "1rem" }}
                  />
                </TitleTypography>
              </Link>
              <ClampedTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {post.content}
              </ClampedTypography>
              <Author authorName={post.authorName} createdAt={post.createdAt} />
            </Box>
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            pt: 4,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </div>
  );
}
