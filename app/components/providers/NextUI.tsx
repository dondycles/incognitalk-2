"use client";

import { useTheme } from "@/store";
import { NextUIProvider } from "@nextui-org/react";

export function NextUI({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <NextUIProvider
      className={`${
        theme.isDarkMode ? "dark" : "light"
      } max-h-[100dvh] w-full h-screen bg-background text-foreground text-sm sm:text-base`}
    >
      {children}
    </NextUIProvider>
  );
}
