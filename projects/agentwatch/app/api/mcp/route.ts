import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// MCP metrics schema
const metricsSchema = z.object({
  agent: z.string(),
  task: z.string().optional(),
  status: z.enum(['pending', 'running', 'completed', 'failed', 'cancelled']).optional(),
  tokens: z.number().optional(),
  inputTokens: z.number().optional(),
  outputTokens: z.number().optional(),
  cost: z.number().optional(),
  duration: z.number().optional(),
  errors: z.array(z.object({
    type: z.string(),
    message: z.string(),
    severity: z.enum(['info', 'warning', 'error', 'critical']).optional(),
  })).optional(),
  action: z.string().optional(),
  details: z.record(z.unknown()).optional(),
})

// POST /api/mcp - Receive metrics from MCP clients
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = metricsSchema.parse(body)

    // Find or create agent
    let agent = await prisma.agent.findUnique({
      where: { name: data.agent },
    })

    if (!agent) {
      agent = await prisma.agent.create({
        data: { name: data.agent },
      })
    }

    // Handle task metrics
    if (data.task) {
      const taskStatus = data.status?.toUpperCase() || 'RUNNING'
      
      const task = await prisma.task.upsert({
        where: {
          id: `${agent.id}-${data.task}`,
        },
        create: {
          id: `${agent.id}-${data.task}`,
          agentId: agent.id,
          name: data.task,
          status: taskStatus as any,
          inputTokens: data.inputTokens || data.tokens || 0,
          outputTokens: data.outputTokens || 0,
          totalTokens: (data.inputTokens || data.tokens || 0) + (data.outputTokens || 0),
          cost: data.cost || 0,
          durationMs: data.duration,
          completedAt: data.status === 'completed' || data.status === 'failed' ? new Date() : null,
        },
        update: {
          status: taskStatus as any,
          inputTokens: data.inputTokens || data.tokens || 0,
          outputTokens: data.outputTokens || 0,
          totalTokens: (data.inputTokens || data.tokens || 0) + (data.outputTokens || 0),
          cost: data.cost || 0,
          durationMs: data.duration,
          completedAt: data.status === 'completed' || data.status === 'failed' ? new Date() : undefined,
        },
      })

      // Update daily usage record
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      await prisma.usageRecord.upsert({
        where: {
          agentId_date: {
            agentId: agent.id,
            date: today,
          },
        },
        create: {
          agentId: agent.id,
          date: today,
          inputTokens: data.inputTokens || data.tokens || 0,
          outputTokens: data.outputTokens || 0,
          totalTokens: (data.inputTokens || data.tokens || 0) + (data.outputTokens || 0),
          cost: data.cost || 0,
        },
        update: {
          inputTokens: { increment: data.inputTokens || data.tokens || 0 },
          outputTokens: { increment: data.outputTokens || 0 },
          totalTokens: { increment: ((data.inputTokens || data.tokens || 0) + (data.outputTokens || 0)) },
          cost: { increment: data.cost || 0 },
        },
      })
    }

    // Handle errors
    if (data.errors && data.errors.length > 0) {
      for (const error of data.errors) {
        await prisma.errorLog.create({
          data: {
            agentId: agent.id,
            type: (error.type as any) || 'UNKNOWN',
            message: error.message,
            severity: (error.severity?.toUpperCase() as any) || 'ERROR',
          },
        })
      }
    }

    // Handle audit logs (actions)
    if (data.action) {
      await prisma.auditLog.create({
        data: {
          agentId: agent.id,
          action: data.action,
          details: (data.details || {}) as any,
        },
      })
    }

    // Check budget alerts
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayUsage = await prisma.usageRecord.aggregate({
      where: {
        agentId: agent.id,
        date: { gte: today },
      },
      _sum: { cost: true },
    })

    const currentSpend = todayUsage._sum.cost || 0
    const alerts = await prisma.budgetAlert.findMany({
      where: {
        agentId: agent.id,
        type: 'DAILY',
        alertSent: false,
      },
    })

    for (const alert of alerts) {
      if (currentSpend >= alert.threshold) {
        await prisma.budgetAlert.update({
          where: { id: alert.id },
          data: {
            alertSent: true,
            sentAt: new Date(),
            currentSpend,
          },
        })
        // TODO: Send actual notification (Slack, email, etc.)
        console.log(`[ALERT] Budget exceeded for agent ${agent.name}: $${currentSpend} >= $${alert.threshold}`)
      }
    }

    return NextResponse.json({ success: true, agentId: agent.id })
  } catch (error) {
    console.error('MCP error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/mcp - MCP server info
export async function GET() {
  return NextResponse.json({
    name: 'AgentWatch MCP Server',
    version: '1.0.0',
    description: 'AI Agent Monitoring Platform - Datadog for AI agents',
    endpoints: {
      POST: 'Send metrics (agent, task, status, tokens, cost, duration, errors)',
    },
    example: {
      agent: 'my-agent',
      task: 'task-001',
      status: 'completed',
      tokens: 45000,
      cost: 0.15,
      duration: 5000,
      errors: [],
    },
  })
}
