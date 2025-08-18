"use client";

import { ReactNode } from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Image from "next/image";
// import { redirect } from "next/navigation";
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

// async function checkAuth() {
//   // здесь можно проверить cookie, сессию или вызвать API
//   // верни true, если авторизован, иначе false
//   // для демо — всегда false
//   return false;
// }

export default function DashboardLayoutBranding({
  children,
}: {
  children: ReactNode;
}) {
  // const isAuth = checkAuth();

  // if (!isAuth) {
  //   redirect("/sign-in");
  // }

  return (
    <NextAppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <Image
            src="https://mui.com/static/logo.png"
            width={40}
            height={40}
            alt="MUI logo"
          />
        ),
        title: "MUI",
        homeUrl: "/admin",
      }}
      theme={adminTheme}
    >
      <DashboardLayout sidebarExpandedWidth="240px">{children}</DashboardLayout>
    </NextAppProvider>
  );
}
