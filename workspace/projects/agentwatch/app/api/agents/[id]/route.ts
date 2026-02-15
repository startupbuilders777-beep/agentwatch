import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateAgentSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ERROR']).optional(),
  dailyBudget: z.number().optional(),
  monthlyBudget: z.number().optional(),
})

// GET /api/agents/[id] - Get single agent
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
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
          take: 30,
        },
        budgets: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    // Calculate stats
    const totalTokens = agent.usageRecords.reduce((sum, r) => sum + r.totalTokens, 0)
    const totalCost = agent.usageRecords.reduce((sum, r) => sum + r.cost, 0)

    return NextResponse.json({
      ...agent,
      stats: {
        totalTokens,
        totalCost,
        taskCount: agent.tasks.length,
        errorCount: agent.errorLogs.length,
      },
    })
  } catch (error) {
    console.error('Get agent error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/agents/[id] - Update agent
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = updateAgentSchema.parse(body)

    const agent = await prisma.agent.update({
      where: { id },
      data,
    })

    return NextResponse.json(agent)
  } catch (error) {
    console.error('Update agent error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/agents/[id] - Delete agent
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.agent.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete agent error:', error)
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }
}
