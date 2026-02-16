import { NextResponse } from 'next/server';
import { getAgent, getAgentMetrics, getAgentEvents } from '@/lib/agent-service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const agent = await getAgent(id);
  
  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
  }
  
  const metrics = await getAgentMetrics(id);
  const events = await getAgentEvents(id);
  
  return NextResponse.json({
    ...agent,
    metrics,
    events,
  });
}
