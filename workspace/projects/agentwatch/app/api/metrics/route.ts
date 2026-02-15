import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/metrics - Get aggregated metrics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'today' // today, week, month
    const agentId = searchParams.get('agentId')

    let startDate = new Date()
    startDate.setHours(0, 0, 0, 0)

    switch (period) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1)
        break
      default:
        // today - already set
        break
    }

    const whereClause = agentId 
      ? { agentId, date: { gte: startDate } }
      : { date: { gte: startDate } }

    // Get usage stats
    const usageStats = await prisma.usageRecord.aggregate({
      where: whereClause,
      _sum: {
        inputTokens: true,
        outputTokens: true,
        totalTokens: true,
        cost: true,
      },
    })

    // Get error stats
    const errorStats = await prisma.errorLog.count({
      where: agentId 
        ? { agentId, createdAt: { gte: startDate } }
        : { createdAt: { gte: startDate } },
    })

    // Get task stats
    const taskStats = await prisma.task.groupBy({
      by: ['status'],
      where: agentId
        ? { agentId, startedAt: { gte: startDate } }
        : { startedAt: { gte: startDate } },
      _count: true,
    })

    // Get daily breakdown
    const dailyUsage = await prisma.usageRecord.findMany({
      where: whereClause,
      orderBy: { date: 'asc' },
      select: {
        date: true,
        totalTokens: true,
        cost: true,
      },
    })

    // Get agent counts
    const agentCounts = await prisma.agent.groupBy({
      by: ['status'],
      _count: true,
    })

    return NextResponse.json({
      period,
      agentId: agentId || null,
      usage: {
        inputTokens: usageStats._sum.inputTokens || 0,
        outputTokens: usageStats._sum.outputTokens || 0,
        totalTokens: usageStats._sum.totalTokens || 0,
        cost: usageStats._sum.cost || 0,
      },
      errors: errorStats,
      tasks: {
        completed: taskStats.find(t => t.status === 'COMPLETED')?._count || 0,
        failed: taskStats.find(t => t.status === 'FAILED')?._count || 0,
        running: taskStats.find(t => t.status === 'RUNNING')?._count || 0,
        pending: taskStats.find(t => t.status === 'PENDING')?._count || 0,
      },
      agents: {
        total: agentCounts.reduce((sum, a) => sum + a._count, 0),
        active: agentCounts.find(a => a.status === 'ACTIVE')?._count || 0,
        inactive: agentCounts.find(a => a.status === 'INACTIVE')?._count || 0,
        error: agentCounts.find(a => a.status === 'ERROR')?._count || 0,
      },
      daily: dailyUsage,
    })
  } catch (error) {
    console.error('Get metrics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
