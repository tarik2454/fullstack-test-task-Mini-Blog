"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import CardActionArea from "@mui/material/CardActionArea";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Link from "next/link";
import type { PostResponseDTO } from "@/api/posts";

interface BlogProps {
  posts: PostResponseDTO[];
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const ClampedTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

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
        padding: "16px",
      }}
    >
      <Typography variant="caption">{authorName}</Typography>
      <Typography variant="caption">{formattedDate}</Typography>
    </Box>
  );
}

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

function Search({ value, onChange }: SearchProps): React.ReactNode {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

const PLACEHOLDER_IMAGES = [
  "https://picsum.photos/800/450?random=1",
  "https://picsum.photos/800/450?random=2",
  "https://picsum.photos/800/450?random=3",
  "https://picsum.photos/800/450?random=4",
  "https://picsum.photos/800/450?random=5",
  "https://picsum.photos/800/450?random=6",
];

function getImageForIndex(index: number): string {
  return (
    PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length] ??
    PLACEHOLDER_IMAGES[0]!
  );
}

export function Blog({ posts }: BlogProps): React.ReactNode {
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = searchQuery
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  const topPosts = filteredPosts.slice(0, 6);

  const handleFocus = (index: number): void => {
    setFocusedCardIndex(index);
  };

  const handleBlur = (): void => {
    setFocusedCardIndex(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <div>
        <Typography variant="h1" gutterBottom>
          Blog
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "start", md: "center" },
            gap: 2,
          }}
        >
          <Typography>
            Stay in the loop with the latest about our products
          </Typography>
          <Search value={searchQuery} onChange={setSearchQuery} />
        </Box>
      </div>

      {topPosts.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ py: 4, textAlign: "center" }}
        >
          {searchQuery
            ? "No posts found matching your search."
            : "No posts yet. Be the first to write one!"}
        </Typography>
      ) : (
        <Grid container spacing={2} columns={12}>
          {topPosts.map((post, index) => {
            const isLarge = index < 2;
            const gridSize = isLarge ? { xs: 12, md: 6 } : { xs: 12, md: 4 };

            return (
              <Grid key={post.id} size={gridSize}>
                <StyledCard
                  variant="outlined"
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className={focusedCardIndex === index ? "Mui-focused" : ""}
                  sx={{ height: "100%" }}
                >
                  <CardActionArea
                    component={Link}
                    href={`/${post.id}`}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={post.title}
                      image={getImageForIndex(index)}
                      sx={{
                        aspectRatio: "16 / 9",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      }}
                    />
                    <StyledCardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {post.title}
                      </Typography>
                      <ClampedTypography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {post.content}
                      </ClampedTypography>
                    </StyledCardContent>
                    <Author
                      authorName={post.authorName}
                      createdAt={post.createdAt}
                    />
                  </CardActionArea>
                </StyledCard>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
