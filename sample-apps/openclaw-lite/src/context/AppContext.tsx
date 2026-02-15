'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Agent, Toast } from '@/lib/types';
import { mockAgents } from '@/lib/data';

interface AppContextType {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, 'id' | 'createdAt' | 'lastRun'>) => void;
  deleteAgent: (id: string) => void;
  runAgent: (id: string) => void;
  toasts: Toast[];
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    // Load agents from localStorage or use mock data
    const stored = localStorage.getItem('openclaw-agents');
    if (stored) {
      try {
        setAgents(JSON.parse(stored));
      } catch {
        setAgents(mockAgents);
      }
    } else {
      setAgents(mockAgents);
    }
  }, []);

  useEffect(() => {
    // Persist agents to localStorage
    if (agents.length > 0) {
      localStorage.setItem('openclaw-agents', JSON.stringify(agents));
    }
  }, [agents]);

  const addAgent = (agentData: Omit<Agent, 'id' | 'createdAt' | 'lastRun'>) => {
    const newAgent: Agent = {
      ...agentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      lastRun: 'Never',
    };
    setAgents(prev => [...prev, newAgent]);
    addToast(`Agent "${newAgent.name}" created successfully!`, 'success');
  };

  const deleteAgent = (id: string) => {
    const agent = agents.find(a => a.id === id);
    setAgents(prev => prev.filter(a => a.id !== id));
    if (agent) {
      addToast(`Agent "${agent.name}" deleted`, 'info');
    }
  };

  const runAgent = (id: string) => {
    const agent = agents.find(a => a.id === id);
    setAgents(prev => prev.map(a => 
      a.id === id 
        ? { ...a, lastRun: 'Just now' }
        : a
    ));
    if (agent) {
      addToast(`Agent "${agent.name}" is running...`, 'success');
    }
  };

  const addToast = (message: string, type: Toast['type']) => {
    const toast: Toast = {
      id: Date.now().toString(),
      message,
      type,
    };
    setToasts(prev => [...prev, toast]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      agents, 
      addAgent, 
      deleteAgent, 
      runAgent, 
      toasts, 
      addToast, 
      removeToast 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
