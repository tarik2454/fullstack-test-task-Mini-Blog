"use client";

import { ReactNode } from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
// import { PageContainer } from "@toolpad/core/PageContainer";

const NAVIGATION = [
  {
    segment: "admin/posts",
    title: "Posts",
    icon: <DashboardIcon />,
  },
];

const adminTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function DashboardLayoutBranding({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <NextAppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "MUI",
        homeUrl: "/admin/posts",
      }}
      theme={adminTheme}
    >
      <DashboardLayout sidebarExpandedWidth="240px">{children}</DashboardLayout>
    </NextAppProvider>
  );
}
