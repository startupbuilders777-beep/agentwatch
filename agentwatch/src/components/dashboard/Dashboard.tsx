'use client';

import { useState, useEffect, useCallback } from 'react';
import { Agent, AgentMetrics, AgentEvent } from '@/lib/types';
import { AgentCard } from './AgentCard';
import { AgentDetail } from './AgentDetail';

export function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentMetrics, setAgentMetrics] = useState<Record<string, { cpu: number; memory: number }>>({});
  const [agentDetails, setAgentDetails] = useState<{ metrics: AgentMetrics; events: AgentEvent[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch initial data
  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch('/api/agents');
        const data = await res.json();
        setAgents(data);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAgents();
  }, []);

  // Connect to SSE for real-time updates
  useEffect(() => {
    const eventSource = new EventSource('/api/agents/stream');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'init' || data.type === 'update') {
          setAgents(data.agents);
          setAgentMetrics(data.metrics);
          setIsConnected(true);
        } else if (data.type === 'heartbeat') {
          setIsConnected(true);
        }
      } catch (error) {
        console.error('SSE parse error:', error);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Fetch agent details when selected
  const handleAgentClick = useCallback(async (agent: Agent) => {
    setSelectedAgent(agent);
    try {
      const res = await fetch(`/api/agents/${agent.id}`);
      const data = await res.json();
      setAgentDetails({ metrics: data.metrics, events: data.events });
    } catch (error) {
      console.error('Failed to fetch agent details:', error);
    }
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedAgent(null);
    setAgentDetails(null);
  }, []);

  const runningCount = agents.filter(a => a.status === 'running').length;
  const idleCount = agents.filter(a => a.status === 'idle').length;
  const errorCount = agents.filter(a => a.status === 'error').length;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">AgentWatch</h1>
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-gray-400">{isConnected ? 'Live' : 'Connecting...'}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total Agents</p>
            <p className="text-2xl font-bold text-white">{agents.length}</p>
          </div>
          <div className="bg-gray-900 border border-green-900/50 rounded-xl p-4">
            <p className="text-green-400 text-sm">Running</p>
            <p className="text-2xl font-bold text-green-400">{runningCount}</p>
          </div>
          <div className="bg-gray-900 border border-yellow-900/50 rounded-xl p-4">
            <p className="text-yellow-400 text-sm">Idle</p>
            <p className="text-2xl font-bold text-yellow-400">{idleCount}</p>
          </div>
          <div className="bg-gray-900 border border-red-900/50 rounded-xl p-4">
            <p className="text-red-400 text-sm">Error</p>
            <p className="text-2xl font-bold text-red-400">{errorCount}</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
          </div>
        ) : (
          /* Agent Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={{
                  ...agent,
                  metrics: agentMetrics[agent.id],
                } as Agent}
                onClick={() => handleAgentClick(agent)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && agents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No agents found</p>
          </div>
        )}
      </main>

      {/* Agent Detail Modal */}
      {selectedAgent && agentDetails && (
        <AgentDetail
          agent={selectedAgent}
          metrics={agentDetails.metrics}
          events={agentDetails.events}
          onClose={closeDetail}
        />
      )}
    </div>
  );
}
