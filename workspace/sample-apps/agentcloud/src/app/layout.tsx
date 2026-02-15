import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentCloud IAAS - AI Infrastructure for Developers",
  description: "Build, deploy, and scale your AI agents with enterprise-grade infrastructure",
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
