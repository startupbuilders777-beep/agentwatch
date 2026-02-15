import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Agent creation schema
const agentSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  dailyBudget: z.number().optional(),
  monthlyBudget: z.number().optional(),
})

// GET /api/agents - List all agents
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const agents = await prisma.agent.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        _count: {
          select: {
            tasks: true,
            errorLogs: true,
          },
        },
        usageRecords: {
          orderBy: { date: 'desc' },
          take: 7,
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(agents)
  } catch (error) {
    console.error('Get agents error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/agents - Create new agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = agentSchema.parse(body)

    // Check if agent already exists
    const existing = await prisma.agent.findUnique({
      where: { name: data.name },
    })

    if (existing) {
      return NextResponse.json({ error: 'Agent already exists' }, { status: 400 })
    }

    const agent = await prisma.agent.create({
      data: {
        name: data.name,
        description: data.description,
        dailyBudget: data.dailyBudget,
        monthlyBudget: data.monthlyBudget,
      },
    })

    // Create budget alerts if budgets are set
    if (data.dailyBudget) {
      await prisma.budgetAlert.create({
        data: {
          agentId: agent.id,
          type: 'DAILY',
          threshold: data.dailyBudget,
        },
      })
    }

    if (data.monthlyBudget) {
      await prisma.budgetAlert.create({
        data: {
          agentId: agent.id,
          type: 'MONTHLY',
          threshold: data.monthlyBudget,
        },
      })
    }

    return NextResponse.json(agent, { status: 201 })
  } catch (error) {
    console.error('Create agent error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
