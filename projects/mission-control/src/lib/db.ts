import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getAgents() {
  return await prisma.agent.findMany({
    include: {
      activities: {
        orderBy: { timestamp: "desc" },
        take: 10
      },
      costs: {
        orderBy: { date: "desc" },
        take: 30
      }
    }
  })
}

export async function getAgentById(id: string) {
  return await prisma.agent.findUnique({
    where: { id },
    include: {
      activities: { orderBy: { timestamp: "desc" } },
      costs: { orderBy: { date: "desc" } }
    }
  })
}

export async function getRecentActivities(limit = 50) {
  return await prisma.activity.findMany({
    orderBy: { timestamp: "desc" },
    take: limit,
    include: { agent: true }
  })
}

export async function getCostSummary() {
  const costs = await prisma.cost.findMany()
  return costs.reduce(
    (acc, c) => ({
      tokens: acc.tokens + c.tokens,
      duration: acc.duration + c.durationMs,
      cost: acc.cost + c.cost
    }),
    { tokens: 0, duration: 0, cost: 0 }
  )
}
