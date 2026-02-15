'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import AgentCard from '@/components/AgentCard';
import CreateAgentForm from '@/components/CreateAgentForm';

export default function DashboardPage() {
  const { agents } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const activeCount = agents.filter(a => a.status === 'active').length;
  const pausedCount = agents.filter(a => a.status === 'paused').length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Agents</h1>
          <p className="text-slate-400">Manage and monitor your AI agents</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <span>➕</span>
          Create Agent
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="stat-card">
          <div className="stat-value">{agents.length}</div>
          <div className="stat-label">Total Agents</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-emerald-400">{activeCount}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-amber-400">{pausedCount}</div>
          <div className="stat-label">Paused</div>
        </div>
      </div>

      {/* Agent Cards */}
      {agents.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold text-white mb-2">No agents yet</h2>
          <p className="text-slate-400 mb-6">Create your first AI agent to get started</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary"
          >
            Create Your First Agent
          </button>
        </div>
      ) : (
        <div className="agent-grid">
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      )}

      {/* Create Agent Modal */}
      <CreateAgentForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
