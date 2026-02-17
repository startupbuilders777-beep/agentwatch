import { prisma } from './prisma';

// Model pricing (per 1M tokens)
const MODEL_PRICING = {
  'gpt-4': { input: 30, output: 60 },
  'gpt-4-turbo': { input: 10, output: 30 },
  'gpt-3.5-turbo': { input: 0.5, output: 1.5 },
  'claude-3-opus': { input: 15, output: 75 },
  'claude-3-sonnet': { input: 3, output: 15 },
  'claude-3-haiku': { input: 0.25, output: 1.25 },
  'claude-3.5-haiku': { input: 0.2, output: 1.0 },
  'claude-3.5-sonnet': { input: 3, output: 15 },
} as const;

export interface CostAnalysis {
  totalCost: number;
  costByAgent: Record<string, number>;
  costByType: Record<string, number>;
  trend: 'increasing' | 'decreasing' | 'stable';
  avgDailyCost: number;
}

export interface OptimizationRecommendation {
  id: string;
  type: 'model_switch' | 'caching' | 'batching' | 'anomaly_fix';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  potentialSavings: number;
  agentId?: string;
}

export interface Anomaly {
  id: string;
  agentId: string;
  agentName: string;
  type: 'cost_spike' | 'token_spike' | 'latency_spike';
  expectedValue: number;
  actualValue: number;
  deviation: number;
  timestamp: Date;
  possibleCauses: string[];
}

export interface ROIPrediction {
  estimatedCost: number;
  estimatedTokens: number;
  recommendedModel: string;
  alternatives: Array<{ model: string; cost: number; savings: number }>;
  confidence: number;
}

/**
 * Get cost analytics for all agents or a specific agent
 */
export async function getCostAnalysis(agentId?: string, days: number = 7): Promise<CostAnalysis> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const where = agentId 
    ? { agentId, type: 'cost', timestamp: { gte: startDate } }
    : { type: 'cost', timestamp: { gte: startDate } };

  const metrics = await prisma.metric.findMany({
    where,
    include: { agent: true },
    orderBy: { timestamp: 'asc' },
  });

  const totalCost = metrics.reduce((sum, m) => sum + m.value, 0);
  
  // Cost by agent
  const costByAgent: Record<string, number> = {};
  for (const m of metrics) {
    costByAgent[m.agent.name] = (costByAgent[m.agent.name] || 0) + m.value;
  }

  // Cost by type (if we have other cost types)
  const costByType: Record<string, number> = { cost: totalCost };

  // Calculate trend
  const midPoint = Math.floor(metrics.length / 2);
  const firstHalf = metrics.slice(0, midPoint).reduce((s, m) => s + m.value, 0);
  const secondHalf = metrics.slice(midPoint).reduce((s, m) => s + m.value, 0);
  
  let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
  if (secondHalf > firstHalf * 1.1) trend = 'increasing';
  else if (secondHalf < firstHalf * 0.9) trend = 'decreasing';

  const avgDailyCost = totalCost / days;

  return { totalCost, costByAgent, costByType, trend, avgDailyCost };
}

/**
 * Detect cost anomalies
 */
export async function detectCostAnomalies(agentId?: string, threshold: number = 2): Promise<Anomaly[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);

  const where = agentId 
    ? { agentId, type: 'cost', timestamp: { gte: startDate } }
    : { type: 'cost', timestamp: { gte: startDate } };

  const metrics = await prisma.metric.findMany({
    where,
    include: { agent: true },
    orderBy: { timestamp: 'asc' },
  });

  // Group by agent and calculate statistics
  const agentMetrics: Record<string, number[]> = {};
  for (const m of metrics) {
    if (!agentMetrics[m.agentId]) agentMetrics[m.agentId] = [];
    agentMetrics[m.agentId].push(m.value);
  }

  const anomalies: Anomaly[] = [];

  for (const [aId, values] of Object.entries(agentMetrics)) {
    if (values.length < 3) continue;
    
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(values.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / values.length);
    
    // Check most recent metric
    const latest = values[values.length - 1];
    if (latest > avg + (stdDev * threshold)) {
      const agent = metrics.find(m => m.agentId === aId)?.agent;
      anomalies.push({
        id: `anomaly-${aId}-${Date.now()}`,
        agentId: aId,
        agentName: agent?.name || 'Unknown',
        type: 'cost_spike',
        expectedValue: avg,
        actualValue: latest,
        deviation: ((latest - avg) / avg) * 100,
        timestamp: new Date(),
        possibleCauses: [
          'Unexpected spike in request volume',
          'Model upgrade without optimization',
          'Inefficient prompt engineering',
          'Missing response caching',
        ],
      });
    }
  }

  return anomalies;
}

/**
 * Generate optimization recommendations
 */
export async function getOptimizationRecommendations(agentId?: string): Promise<OptimizationRecommendation[]> {
  const recommendations: OptimizationRecommendation[] = [];
  
  const agentFilter = agentId ? { id: agentId } : {};
  const agents = await prisma.agent.findMany({ where: agentFilter });

  for (const agent of agents) {
    // Get cost metrics for this agent
    const costMetrics = await prisma.metric.findMany({
      where: { agentId: agent.id, type: 'cost' },
      orderBy: { timestamp: 'desc' },
      take: 30,
    });

    if (costMetrics.length < 5) continue;

    const avgCost = costMetrics.reduce((s, m) => s + m.value, 0) / costMetrics.length;
    const totalCost = costMetrics.reduce((s, m) => s + m.value, 0);

    // Check for high-cost agents
    if (avgCost > 0.10) { // > $0.10 per request is high
      recommendations.push({
        id: `rec-model-${agent.id}`,
        type: 'model_switch',
        priority: 'high',
        title: `Switch ${agent.name} to cheaper model`,
        description: `Current average cost $${avgCost.toFixed(4)} per request. Consider Claude 3.5 Haiku or GPT-3.5 for non-complex tasks.`,
        potentialSavings: totalCost * 0.6,
        agentId: agent.id,
      });
    }

    // Check for caching opportunities
    const taskCount = await prisma.task.count({ where: { agentId: agent.id } });
    if (taskCount > 10 && avgCost > 0.01) {
      recommendations.push({
        id: `rec-cache-${agent.id}`,
        type: 'caching',
        priority: 'medium',
        title: `Implement response caching for ${agent.name}`,
        description: 'Based on request patterns, implementing caching could reduce costs significantly.',
        potentialSavings: totalCost * 0.3,
        agentId: agent.id,
      });
    }
  }

  // General recommendations
  const anomalies = await detectCostAnomalies(agentId);
  for (const anomaly of anomalies) {
    recommendations.push({
      id: `rec-anomaly-${anomaly.id}`,
      type: 'anomaly_fix',
      priority: 'high',
      title: `Investigate cost spike in ${anomaly.agentName}`,
      description: `Cost deviated ${anomaly.deviation.toFixed(1)}% from expected. Review recent changes.`,
      potentialSavings: anomaly.actualValue - anomaly.expectedValue,
      agentId: anomaly.agentId,
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Predict ROI for a task before execution
 */
export async function predictROI(
  agentType: string, 
  estimatedTokens: number,
  complexity: 'low' | 'medium' | 'high' = 'medium'
): Promise<ROIPrediction> {
  // Select appropriate models based on complexity
  const modelsForComplexity = {
    low: ['claude-3.5-haiku', 'gpt-3.5-turbo'],
    medium: ['claude-3.5-sonnet', 'gpt-4-turbo'],
    high: ['claude-3-opus', 'gpt-4'],
  };

  const inputTokens = Math.floor(estimatedTokens * 0.3);
  const outputTokens = Math.floor(estimatedTokens * 0.7);

  // Calculate costs for each model
  const alternatives = modelsForComplexity[complexity].map(model => {
    const pricing = MODEL_PRICING[model as keyof typeof MODEL_PRICING];
    if (!pricing) return null;
    
    const cost = (inputTokens / 1_000_000 * pricing.input) + 
                  (outputTokens / 1_000_000 * pricing.output);
    return { model, cost, savings: 0 };
  }).filter(Boolean) as Array<{ model: string; cost: number; savings: number }>;

  // Sort by cost
  alternatives.sort((a, b) => a.cost - b.cost);

  // Calculate savings vs most expensive option
  const maxCost = Math.max(...alternatives.map(a => a.cost));
  for (const alt of alternatives) {
    alt.savings = maxCost - alt.cost;
  }

  const recommendedModel = alternatives[0]?.model || 'gpt-3.5-turbo';
  const estimatedCost = alternatives[0]?.cost || 0;

  // Confidence based on data availability
  const confidence = 0.7 + (complexity === 'low' ? 0.2 : complexity === 'medium' ? 0.1 : 0);

  return {
    estimatedCost,
    estimatedTokens,
    recommendedModel,
    alternatives,
    confidence,
  };
}

/**
 * Get cost breakdown by time period
 */
export async function getCostBreakdown(
  agentId?: string, 
  period: 'day' | 'week' | 'month' = 'week'
): Promise<Array<{ date: string; cost: number }>> {
  const now = new Date();
  let startDate: Date;
  
  switch (period) {
    case 'day':
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  const where = agentId 
    ? { agentId, type: 'cost', timestamp: { gte: startDate } }
    : { type: 'cost', timestamp: { gte: startDate } };

  const metrics = await prisma.metric.findMany({
    where,
    orderBy: { timestamp: 'asc' },
  });

  // Group by date
  const grouped: Record<string, number> = {};
  for (const m of metrics) {
    const date = m.timestamp.toISOString().split('T')[0];
    grouped[date] = (grouped[date] || 0) + m.value;
  }

  return Object.entries(grouped).map(([date, cost]) => ({ date, cost }));
}
