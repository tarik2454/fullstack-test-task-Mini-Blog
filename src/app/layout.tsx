import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material";
import { roboto } from "../styles/fonts";
import { theme } from "@/styles/theme";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Mini Blog",
  description: "A fullstack mini blog application",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>): React.ReactNode {
  return (
    <html
      lang="en"
      className={roboto.variable}
      data-toolpad-color-scheme="light"
    >
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
