// components/Providers.tsx
"use client";

import React, { Suspense } from "react";
import { ThemeProvider, LinearProgress } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { theme } from "@/styles/theme";

const NAVIGATION = [{ segment: "posts", title: "Posts", icon: null }];

const BRANDING = {
  logo: <img src="/logo.png" alt="logo" width={32} height={32} />,
  title: "Admin",
  homeUrl: "/admin",
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // StyledEngineProvider injectFirst полезен при совместном использовании Tailwind
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* Suspense fallback сюда уже может быть MUI компонент */}
        <Suspense fallback={<LinearProgress />}>
          <NextAppProvider navigation={NAVIGATION} branding={BRANDING}>
            {children}
          </NextAppProvider>
        </Suspense>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
