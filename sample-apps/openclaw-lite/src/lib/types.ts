export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  schedule: 'manual' | 'hourly' | 'daily' | 'weekly';
  status: 'active' | 'paused';
  lastRun: string;
  createdAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Integration {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
