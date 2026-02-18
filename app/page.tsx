import { Activity, Bot, CreditCard, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AgentWatch</h1>
                <p className="text-sm text-muted-foreground">AI Agent Monitoring</p>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="/api/mcp"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                MCP Server
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Monitor Your AI Agents
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Track token usage, monitor costs, and get alerted to errors in real-time.
            Connect your agents via MCP or webhooks.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/api/mcp"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium hover:bg-accent"
            >
              View MCP Docs
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="p-2 bg-primary/10 rounded-full w-fit mb-4">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Agent Monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Track all your AI agents in one place. Monitor status, activity, and performance.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="p-2 bg-green-500/10 rounded-full w-fit mb-4">
              <CreditCard className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="font-semibold mb-2">Cost Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Monitor token usage and costs in real-time. Set budgets and get alerts.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="p-2 bg-red-500/10 rounded-full w-fit mb-4">
              <Shield className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="font-semibold mb-2">Error Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Get instant notifications when errors occur. Track and resolve issues fast.
            </p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-16 rounded-lg border bg-card p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
            <p className="text-muted-foreground mb-6">
              Connect your first agent using MCP or webhooks to start monitoring.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/api/mcp"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                MCP Documentation
              </Link>
              <Link
                href="/api/webhook"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
              >
                Webhook Endpoint
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
