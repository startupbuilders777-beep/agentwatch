import { NextResponse } from 'next/server';
import { getAllMetrics, getAllEvents } from '@/lib/agent-service';

export async function GET() {
  const metrics = getAllMetrics();
  const events = getAllEvents();
  return NextResponse.json({ metrics, events });
}
