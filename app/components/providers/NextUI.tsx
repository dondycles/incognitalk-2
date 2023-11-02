"use client";

import { useTheme } from "@/store";
import { NextUIProvider } from "@nextui-org/react";
import { Gabarito } from "next/font/google";

export const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export function NextUI({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <NextUIProvider
      className={`${
        theme.isDarkMode ? "dark" : "light"
      } max-h-[100dvh] w-full h-screen bg-background text-foreground text-sm sm:text-base ${
        gabarito.className
      }`}
    >
      {children}
    </NextUIProvider>
  );
}
