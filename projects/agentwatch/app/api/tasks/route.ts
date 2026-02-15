import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const taskSchema = z.object({
  agentId: z.string(),
  name: z.string(),
  description: z.string().optional(),
})

// GET /api/tasks - List tasks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const agentId = searchParams.get('agentId')
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    const tasks = await prisma.task.findMany({
      where: {
        ...(agentId ? { agentId } : {}),
        ...(status ? { status: status as any } : {}),
      },
      include: {
        agent: {
          select: { id: true, name: true },
        },
      },
      orderBy: { startedAt: 'desc' },
      take: limit,
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Get tasks error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/tasks - Create task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = taskSchema.parse(body)

    const task = await prisma.task.create({
      data: {
        agentId: data.agentId,
        name: data.name,
        description: data.description,
        status: 'PENDING',
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Create task error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
