import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import { NextUI } from "./components/providers/NextUI";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "incognitalk",
  description: "incognitalk",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={gabarito.className}>
        <NextUI session={session}>{children}</NextUI>
      </body>
    </html>
  );
}
