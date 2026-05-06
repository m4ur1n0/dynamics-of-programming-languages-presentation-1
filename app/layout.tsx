import type { Metadata } from "next";
import "./globals.css";
import "reveal.js/reveal.css";
import "reveal.js/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";

export const metadata: Metadata = {
  title: "React Hooks Formal Modeling - Presentation",
  description: "A presentation on formally modeling dynamics of React hooks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
