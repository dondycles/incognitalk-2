"use client";

import { useTheme } from "@/store";
import { NextUIProvider } from "@nextui-org/react";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";

export function NextUI({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const theme = useTheme();
  useEffect(() => {
    console.log(session?.user.id);
  });
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
