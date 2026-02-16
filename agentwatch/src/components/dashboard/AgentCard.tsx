'use client';

import { Agent } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { UptimeDisplay, TimeAgo } from './UptimeDisplay';

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:bg-gray-800 hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors">
            {agent.name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">ID: {agent.id}</p>
        </div>
        <StatusBadge status={agent.status} />
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500 text-xs mb-0.5">Uptime</p>
          <p className="text-white font-medium">
            <UptimeDisplay seconds={agent.uptime} />
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-0.5">Last Activity</p>
          <p className="text-white font-medium">
            <TimeAgo date={agent.lastActivity} />
          </p>
        </div>
      </div>
    </button>
  );
}
