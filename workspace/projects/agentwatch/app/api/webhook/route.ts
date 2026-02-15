import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Webhook event schema
const webhookEventSchema = z.object({
  event: z.string(),
  agent: z.string().optional(),
  agentId: z.string().optional(),
  data: z.record(z.unknown()).optional(),
  timestamp: z.string().datetime().optional(),
})

// POST /api/webhook - Generic webhook endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const event = webhookEventSchema.parse(body)

    // Resolve agent
    let agentId = event.agentId
    if (!agentId && event.agent) {
      let agent = await prisma.agent.findUnique({
        where: { name: event.agent },
      })
      if (!agent) {
        agent = await prisma.agent.create({
          data: { name: event.agent },
        })
      }
      agentId = agent.id
    }

    if (!agentId) {
      return NextResponse.json({ error: 'Agent not found or provided' }, { status: 400 })
    }

    const eventType = event.event
    const eventData = event.data || {}

    // Handle different event types
    switch (eventType) {
      case 'task.start':
      case 'task.started':
        await prisma.task.create({
          data: {
            agentId,
            name: (eventData.name as string) || `task-${Date.now()}`,
            description: (eventData.description as string) || null,
            status: 'RUNNING',
            startedAt: event.timestamp ? new Date(event.timestamp) : new Date(),
          },
        })
        break

      case 'task.complete':
      case 'task.completed':
        // Find the running task or create new one
        const existingTask = await prisma.task.findFirst({
          where: {
            agentId,
            status: 'RUNNING',
          },
          orderBy: { startedAt: 'desc' },
        })

        if (existingTask) {
          await prisma.task.update({
            where: { id: existingTask.id },
            data: {
              status: 'COMPLETED',
              completedAt: event.timestamp ? new Date(event.timestamp) : new Date(),
              inputTokens: (eventData.inputTokens as number) || 0,
              outputTokens: (eventData.outputTokens as number) || 0,
              totalTokens: ((eventData.inputTokens as number) || 0) + ((eventData.outputTokens as number) || 0),
              cost: (eventData.cost as number) || 0,
              durationMs: (eventData.durationMs as number) || undefined,
            },
          })
        }

        // Update usage
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        await prisma.usageRecord.upsert({
          where: {
            agentId_date: {
              agentId,
              date: today,
            },
          },
          create: {
            agentId,
            date: today,
            inputTokens: (eventData.inputTokens as number) || 0,
            outputTokens: (eventData.outputTokens as number) || 0,
            totalTokens: ((eventData.inputTokens as number) || 0) + ((eventData.outputTokens as number) || 0),
            cost: (eventData.cost as number) || 0,
            model: (eventData.model as string) || null,
          },
          update: {
            inputTokens: { increment: (eventData.inputTokens as number) || 0 },
            outputTokens: { increment: (eventData.outputTokens as number) || 0 },
            totalTokens: { increment: ((eventData.inputTokens as number) || 0) + ((eventData.outputTokens as number) || 0) },
            cost: { increment: (eventData.cost as number) || 0 },
          },
        })
        break

      case 'task.fail':
      case 'task.failed':
        const failingTask = await prisma.task.findFirst({
          where: {
            agentId,
            status: 'RUNNING',
          },
          orderBy: { startedAt: 'desc' },
        })

        if (failingTask) {
          await prisma.task.update({
            where: { id: failingTask.id },
            data: {
              status: 'FAILED',
              completedAt: event.timestamp ? new Date(event.timestamp) : new Date(),
            },
          })
        }

        // Log error
        await prisma.errorLog.create({
          data: {
            agentId,
            taskId: failingTask?.id,
            type: 'API_ERROR',
            message: (eventData.message as string) || 'Task failed',
            severity: 'ERROR',
          },
        })
        break

      case 'error':
        await prisma.errorLog.create({
          data: {
            agentId,
            type: (eventData.type as any) || 'UNKNOWN',
            message: (eventData.message as string) || 'Unknown error',
            severity: (eventData.severity as any) || 'ERROR',
          },
        })
        break

      case 'audit':
        await prisma.auditLog.create({
          data: {
            agentId,
            action: (eventData.action as string) || eventType,
            details: eventData as any,
          },
        })
        break

      default:
        // Generic audit log for unknown events
        await prisma.auditLog.create({
          data: {
            agentId,
            action: eventType,
            details: eventData as any,
          },
        })
    }

    return NextResponse.json({ success: true, event: eventType })
  } catch (error) {
    console.error('Webhook error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/webhook - Webhook info
export async function GET() {
  return NextResponse.json({
    name: 'AgentWatch Webhook Endpoint',
    version: '1.0.0',
    supportedEvents: [
      'task.start',
      'task.complete',
      'task.fail',
      'error',
      'audit',
    ],
    example: {
      event: 'task.complete',
      agent: 'my-agent',
      data: {
        inputTokens: 1000,
        outputTokens: 500,
        cost: 0.02,
      },
    },
  })
}
