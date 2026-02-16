import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      // Send initial data
      const sendEvent = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Simulate real-time updates
      const agents = [
        { id: '1', name: 'Builder Agent', status: 'running', uptime: 3600 },
        { id: '2', name: 'QA Agent', status: 'idle', uptime: 7200 },
        { id: '3', name: 'Deploy Agent', status: 'running', uptime: 1800 },
        { id: '4', name: 'Research Agent', status: 'error', uptime: 0 },
      ];

      const metrics = {
        '1': { cpu: 45, memory: 62 },
        '2': { cpu: 12, memory: 28 },
        '3': { cpu: 78, memory: 45 },
        '4': { cpu: 0, memory: 0 },
      };

      // Send updates every 2 seconds
      const interval = setInterval(() => {
        
        // Simulate varying metrics
        const updatedMetrics: Record<string, { cpu: number; memory: number }> = {};
        
        Object.keys(metrics).forEach((agentId) => {
          const base = metrics[agentId as keyof typeof metrics];
          if (base.cpu > 0) {
            updatedMetrics[agentId] = {
              cpu: Math.max(5, Math.min(95, base.cpu + Math.floor(Math.random() * 20) - 10)),
              memory: Math.max(10, Math.min(90, base.memory + Math.floor(Math.random() * 10) - 5)),
            };
          }
        });

        sendEvent({
          type: 'update',
          timestamp: new Date().toISOString(),
          agents: agents.map(a => ({
            ...a,
            uptime: a.status === 'running' ? a.uptime + 2 : a.uptime,
            lastActivity: new Date().toISOString(),
          })),
          metrics: updatedMetrics,
        });
      }, 2000);

      // Keep connection alive with heartbeat
      const heartbeat = setInterval(() => {
        sendEvent({ type: 'heartbeat', timestamp: new Date().toISOString() });
      }, 10000);

      // Send initial data
      sendEvent({
        type: 'init',
        timestamp: new Date().toISOString(),
        agents,
        metrics,
      });

      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        clearInterval(heartbeat);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
