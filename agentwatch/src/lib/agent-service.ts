import { Agent, AgentMetrics, AgentEvent } from './types';

// Mock data store - in production, this would come from a database
const agents: Agent[] = [
  {
    id: '1',
    name: 'Builder Agent',
    status: 'running',
    uptime: 3600,
    lastActivity: new Date(),
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: '2',
    name: 'QA Agent',
    status: 'idle',
    uptime: 7200,
    lastActivity: new Date(Date.now() - 300000),
    createdAt: new Date(Date.now() - 172800000),
  },
  {
    id: '3',
    name: 'Deploy Agent',
    status: 'running',
    uptime: 1800,
    lastActivity: new Date(),
    createdAt: new Date(Date.now() - 259200000),
  },
  {
    id: '4',
    name: 'Research Agent',
    status: 'error',
    uptime: 0,
    lastActivity: new Date(Date.now() - 60000),
    createdAt: new Date(Date.now() - 345600000),
  },
];

const metrics: Record<string, AgentMetrics> = {
  '1': {
    agentId: '1',
    cpu: 45,
    memory: 62,
    tasksCompleted: 127,
    tasksFailed: 3,
    messagesProcessed: 892,
    averageResponseTime: 234,
    uptime: 3600,
  },
  '2': {
    agentId: '2',
    cpu: 12,
    memory: 28,
    tasksCompleted: 45,
    tasksFailed: 1,
    messagesProcessed: 156,
    averageResponseTime: 180,
    uptime: 7200,
  },
  '3': {
    agentId: '3',
    cpu: 78,
    memory: 45,
    tasksCompleted: 89,
    tasksFailed: 2,
    messagesProcessed: 445,
    averageResponseTime: 312,
    uptime: 1800,
  },
  '4': {
    agentId: '4',
    cpu: 0,
    memory: 0,
    tasksCompleted: 12,
    tasksFailed: 8,
    messagesProcessed: 34,
    averageResponseTime: 0,
    uptime: 0,
  },
};

const events: AgentEvent[] = [
  {
    id: '1',
    agentId: '1',
    type: 'task_completed',
    message: 'Completed task: Build agent monitoring dashboard',
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: '2',
    agentId: '1',
    type: 'message_received',
    message: 'Received new task request',
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: '3',
    agentId: '3',
    type: 'started',
    message: 'Agent started successfully',
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: '4',
    agentId: '4',
    type: 'error',
    message: 'Connection timeout - retrying...',
    timestamp: new Date(Date.now() - 60000),
  },
];

export async function getAgents(): Promise<Agent[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return agents;
}

export async function getAgent(id: string): Promise<Agent | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return agents.find((a) => a.id === id);
}

export async function getAgentMetrics(id: string): Promise<AgentMetrics | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return metrics[id];
}

export async function getAgentEvents(id: string): Promise<AgentEvent[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return events.filter((e) => e.agentId === id);
}

export function getAllMetrics(): Record<string, AgentMetrics> {
  return metrics;
}

export function getAllEvents(): AgentEvent[] {
  return events;
}
