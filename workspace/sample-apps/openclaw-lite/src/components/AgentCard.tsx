'use client';

import { Agent } from '@/lib/types';
import { useApp } from '@/context/AppContext';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const { deleteAgent, runAgent, addToast } = useApp();

  const handleRun = () => {
    runAgent(agent.id);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${agent.name}"?`)) {
      deleteAgent(agent.id);
    }
  };

  const handleEdit = () => {
    addToast('Edit functionality coming soon!', 'info');
  };

  return (
    <div className="card group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-2xl">
            {agent.icon}
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">{agent.name}</h3>
            <span className={`badge ${agent.status === 'active' ? 'badge-active' : 'badge-paused'}`}>
              {agent.status}
            </span>
          </div>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
        {agent.description}
      </p>

      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
        <span className="flex items-center gap-1">
          <span>⏰</span> {agent.schedule}
        </span>
        <span>Last run: {agent.lastRun}</span>
      </div>

      <div className="flex gap-2 pt-4 border-t border-slate-700">
        <button
          onClick={handleRun}
          className="flex-1 py-2 px-4 rounded-lg bg-emerald-500/20 text-emerald-400 font-medium text-sm hover:bg-emerald-500/30 transition-colors"
        >
          ▶ Run
        </button>
        <button
          onClick={handleEdit}
          className="flex-1 py-2 px-4 rounded-lg bg-slate-700 text-slate-300 font-medium text-sm hover:bg-slate-600 transition-colors"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          className="py-2 px-4 rounded-lg bg-red-500/20 text-red-400 font-medium text-sm hover:bg-red-500/30 transition-colors"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
