import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentWatch Lite",
  description: "Monitor your AI agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Agent<span className="text-[var(--primary)]">Watch</span>
            </Link>
            <div className="flex items-center gap-8">
              <Link 
                href="/dashboard" 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all" />
              </Link>
              <Link 
                href="/agents" 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative group"
              >
                Agents
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all" />
              </Link>
            </div>
          </div>
        </nav>
        
        {/* Main content */}
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
