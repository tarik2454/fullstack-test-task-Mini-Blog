import Container from "@mui/material/Container";
import { Blog } from "@/components/Blog";
import { Latest } from "@/components/Latest";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function MainPage() {
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <Blog />
        <Latest />
      </Container>
      <Footer />
    </>
  );
}
