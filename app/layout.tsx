import type { Metadata } from "next";
import "./globals.css";
import { NextUI } from "./components/providers/NextUI";

export const metadata: Metadata = {
  title: "incognitalk | Anonymously revealing the world, one secret at a time.",
  description: "incognitalk",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextUI>{children}</NextUI>
      </body>
    </html>
  );
}
