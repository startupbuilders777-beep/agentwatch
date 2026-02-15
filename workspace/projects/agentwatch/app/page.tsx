import { prisma } from '@/lib/prisma'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { Activity, AlertTriangle, Bot, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering - requires database
export const dynamic = 'force-dynamic'

async function getDashboardStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [
    totalAgents,
    todayUsage,
    todayCost,
    errorCount,
    recentTasks,
    recentErrors,
  ] = await Promise.all([
    prisma.agent.count(),
    prisma.usageRecord.aggregate({
      where: { date: { gte: today } },
      _sum: { totalTokens: true },
    }),
    prisma.usageRecord.aggregate({
      where: { date: { gte: today } },
      _sum: { cost: true },
    }),
    prisma.errorLog.count({
      where: { createdAt: { gte: today } },
    }),
    prisma.task.findMany({
      take: 10,
      orderBy: { startedAt: 'desc' },
      include: { agent: true },
    }),
    prisma.errorLog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { agent: true },
    }),
  ])

  return {
    totalAgents,
    todayTokens: todayUsage._sum.totalTokens || 0,
    todayCost: todayCost._sum.cost || 0,
    errorCount,
    recentTasks,
    recentErrors,
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

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
            <Link
              href="/api/mcp"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              MCP Server
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Agents */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-bold">{formatNumber(stats.totalAgents)}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Bot className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Token Usage Today */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tokens Today</p>
                <p className="text-2xl font-bold">{formatNumber(stats.todayTokens)}</p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Cost Today */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cost Today</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.todayCost)}</p>
              </div>
              <div className="p-2 bg-yellow-500/10 rounded-full">
                <DollarSign className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Errors Today */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Errors Today</p>
                <p className="text-2xl font-bold">{formatNumber(stats.errorCount)}</p>
              </div>
              <div className={`p-2 rounded-full ${stats.errorCount > 0 ? 'bg-red-500/10' : 'bg-muted'}`}>
                <AlertTriangle className={`h-5 w-5 ${stats.errorCount > 0 ? 'text-red-500' : 'text-muted-foreground'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Tasks */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Recent Activity</h2>
            </div>
            <div className="divide-y">
              {stats.recentTasks.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No activity yet. Connect an agent to start monitoring.
                </div>
              ) : (
                stats.recentTasks.map((task) => (
                  <div key={task.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.status === 'COMPLETED' ? 'bg-green-500' :
                        task.status === 'FAILED' ? 'bg-red-500' :
                        task.status === 'RUNNING' ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium">{task.name}</p>
                        <p className="text-sm text-muted-foreground">{task.agent.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        task.status === 'COMPLETED' ? 'text-green-500' :
                        task.status === 'FAILED' ? 'text-red-500' :
                        'text-muted-foreground'
                      }`}>
                        {task.status.toLowerCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {task.totalTokens.toLocaleString()} tokens
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Errors */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Recent Errors</h2>
            </div>
            <div className="divide-y">
              {stats.recentErrors.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No errors. All systems operational.
                </div>
              ) : (
                stats.recentErrors.map((error) => (
                  <div key={error.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-4 w-4 ${
                          error.severity === 'CRITICAL' ? 'text-red-500' :
                          error.severity === 'ERROR' ? 'text-orange-500' :
                          'text-yellow-500'
                        }`} />
                        <span className="font-medium">{error.type}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(error.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{error.agent.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Getting Started */}
        {stats.totalAgents === 0 && (
          <div className="mt-8 rounded-lg border bg-card p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Get Started with AgentWatch</h2>
            <p className="text-muted-foreground mb-4">
              Connect your first AI agent to start monitoring token usage, costs, and errors.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/api/mcp"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                View MCP Docs
              </Link>
              <Link
                href="/api/webhook"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
              >
                Webhook Endpoint
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
