import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Sidebar from "@/components/Sidebar";
import ToastContainer from "@/components/Toast";

export const metadata: Metadata = {
  title: "OpenClaw Lite - Build AI Agents Without Code",
  description: "Create powerful automation workflows in minutes. No programming required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProvider>
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
