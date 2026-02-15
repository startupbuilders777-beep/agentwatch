import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--success)] pulse-dot" />
          <span className="text-sm text-[var(--text-secondary)]">AI Agent Monitoring</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Know what your{" "}
          <span className="text-[var(--primary)]">AI agents</span>{" "}
          are doing
        </h1>
        
        <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
          Monitor, track, and optimize your AI agent fleet. Get real-time insights into agent activity, performance, and costs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/agents"
            className="px-8 py-4 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] font-semibold hover:bg-[var(--surface-elevated)] transition-colors"
          >
            View Agents
          </Link>
        </div>
        
        {/* Features preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-left">
            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-sm text-[var(--text-secondary)]">Track agent performance and activity as it happens</p>
          </div>
          
          <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-left">
            <div className="w-10 h-10 rounded-lg bg-[var(--success)]/20 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Cost Tracking</h3>
            <p className="text-sm text-[var(--text-secondary)]">Monitor spending across all your AI agents</p>
          </div>
          
          <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-left">
            <div className="w-10 h-10 rounded-lg bg-[var(--warning)]/20 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-[var(--warning)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Alert System</h3>
            <p className="text-sm text-[var(--text-secondary)]">Get notified when agents need attention</p>
          </div>
        </div>
      </div>
    </div>
  );
}
