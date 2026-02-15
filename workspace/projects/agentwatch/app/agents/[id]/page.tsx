import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatNumber, formatDateTime } from '@/lib/utils'
import { Activity, AlertTriangle, Bot, Clock, DollarSign, Settings, Trash2 } from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering - requires database
export const dynamic = 'force-dynamic'

async function getAgent(id: string) {
  const agent = await prisma.agent.findUnique({
    where: { id },
    include: {
      tasks: {
        orderBy: { startedAt: 'desc' },
        take: 20,
      },
      errorLogs: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      usageRecords: {
        orderBy: { date: 'desc' },
        take: 7,
      },
      budgets: true,
    },
  })

  if (!agent) return null

  const totalTokens = agent.usageRecords.reduce((sum, r) => sum + r.totalTokens, 0)
  const totalCost = agent.usageRecords.reduce((sum, r) => sum + r.cost, 0)

  return {
    ...agent,
    stats: {
      totalTokens,
      totalCost,
      taskCount: agent.tasks.length,
      errorCount: agent.errorLogs.length,
    },
  }
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const agent = await getAgent(id)

  if (!agent) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground mb-1"
              >
                ← Back
              </Link>
              <div className="p-2 bg-primary rounded-lg">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{agent.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {agent.description || 'No description'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                agent.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500' :
                agent.status === 'ERROR' ? 'bg-red-500/10 text-red-500' :
                'bg-gray-500/10 text-gray-500'
              }`}>
                {agent.status}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tokens</p>
                <p className="text-2xl font-bold">{formatNumber(agent.stats.totalTokens)}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Activity className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">{formatCurrency(agent.stats.totalCost)}</p>
              </div>
              <div className="p-2 bg-yellow-500/10 rounded-full">
                <DollarSign className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasks</p>
                <p className="text-2xl font-bold">{formatNumber(agent.stats.taskCount)}</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold">{formatNumber(agent.stats.errorCount)}</p>
              </div>
              <div className={`p-2 rounded-full ${agent.stats.errorCount > 0 ? 'bg-red-500/10' : 'bg-muted'}`}>
                <AlertTriangle className={`h-5 w-5 ${agent.stats.errorCount > 0 ? 'text-red-500' : 'text-muted-foreground'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Budget Info */}
        {(agent.dailyBudget || agent.monthlyBudget) && (
          <div className="rounded-lg border bg-card p-6 mb-8">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Budget Settings
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {agent.dailyBudget && (
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Daily Budget</p>
                  <p className="text-xl font-bold">{formatCurrency(agent.dailyBudget)}</p>
                </div>
              )}
              {agent.monthlyBudget && (
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Monthly Budget</p>
                  <p className="text-xl font-bold">{formatCurrency(agent.monthlyBudget)}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Tasks */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Recent Tasks</h2>
            </div>
            <div className="divide-y">
              {agent.tasks.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No tasks yet
                </div>
              ) : (
                agent.tasks.map((task) => (
                  <div key={task.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{task.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.description || 'No description'}
                      </p>
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
                        {formatNumber(task.totalTokens)} tokens
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
              {agent.errorLogs.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No errors
                </div>
              ) : (
                agent.errorLogs.map((error) => (
                  <div key={error.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-4 w-4 ${
                          error.severity === 'CRITICAL' ? 'text-red-500' :
                          error.severity === 'ERROR' ? 'text-orange-500' :
                          'text-yellow-500'
                        }`} />
                        <span className="font-medium">{error.type}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDateTime(error.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
