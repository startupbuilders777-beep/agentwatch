// Agent type definitions
export type AgentStatus = 'running' | 'idle' | 'error';

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  uptime: number; // in seconds
  lastActivity: Date;
  createdAt: Date;
}

export interface AgentMetrics {
  agentId: string;
  cpu: number; // percentage
  memory: number; // percentage
  tasksCompleted: number;
  tasksFailed: number;
  messagesProcessed: number;
  averageResponseTime: number; // ms
  uptime: number;
}

export interface AgentEvent {
  id: string;
  agentId: string;
  type: 'started' | 'stopped' | 'error' | 'task_completed' | 'message_received';
  message: string;
  timestamp: Date;
}
