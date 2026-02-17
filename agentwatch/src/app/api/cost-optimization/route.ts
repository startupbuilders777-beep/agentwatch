import { NextResponse } from 'next/server';
import { 
  getCostAnalysis, 
  detectCostAnomalies, 
  getOptimizationRecommendations,
  predictROI,
  getCostBreakdown 
} from '@/lib/cost-optimizer';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get('agentId') || undefined;
  const action = searchParams.get('action') || 'analysis';
  const period = searchParams.get('period') as 'day' | 'week' | 'month' || 'week';
  const days = parseInt(searchParams.get('days') || '7');

  try {
    switch (action) {
      case 'analysis': {
        const analysis = await getCostAnalysis(agentId, days);
        return NextResponse.json(analysis);
      }

      case 'anomalies': {
        const anomalies = await detectCostAnomalies(agentId);
        return NextResponse.json({ anomalies });
      }

      case 'recommendations': {
        const recommendations = await getOptimizationRecommendations(agentId);
        return NextResponse.json({ recommendations });
      }

      case 'breakdown': {
        const breakdown = await getCostBreakdown(agentId, period);
        return NextResponse.json({ breakdown });
      }

      case 'predict-roi': {
        const estimatedTokens = parseInt(searchParams.get('tokens') || '1000');
        const complexity = (searchParams.get('complexity') as 'low' | 'medium' | 'high') || 'medium';
        const agentType = searchParams.get('agentType') || 'openai';
        const prediction = await predictROI(agentType, estimatedTokens, complexity);
        return NextResponse.json(prediction);
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Cost optimization error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
