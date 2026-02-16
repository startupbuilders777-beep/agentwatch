'use client';

import { Agent, AgentMetrics, AgentEvent } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { UptimeDisplay, TimeAgo } from './UptimeDisplay';
import { MetricBar } from './MetricBar';

interface AgentDetailProps {
  agent: Agent;
  metrics: AgentMetrics;
  events: AgentEvent[];
  onClose: () => void;
}

export function AgentDetail({ agent, metrics, events, onClose }: AgentDetailProps) {
  const eventTypeColors = {
    started: 'text-green-400',
    stopped: 'text-gray-400',
    error: 'text-red-400',
    task_completed: 'text-blue-400',
    message_received: 'text-purple-400',
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{agent.name}</h2>
            <p className="text-sm text-gray-500 mt-1">ID: {agent.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status & Basic Info */}
          <div className="flex flex-wrap gap-4 items-center">
            <StatusBadge status={agent.status} />
            <div className="text-sm text-gray-400">
              Running for <span className="text-white font-medium"><UptimeDisplay seconds={agent.uptime} /></span>
            </div>
          </div>

          {/* Metrics Grid */}
          {agent.status !== 'error' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h3 className="text-sm font-medium text-gray-400 mb-4">Resource Usage</h3>
                <div className="space-y-4">
                  <MetricBar label="CPU" value={metrics.cpu} color={metrics.cpu > 80 ? 'red' : metrics.cpu > 60 ? 'yellow' : 'green'} />
                  <MetricBar label="Memory" value={metrics.memory} color={metrics.memory > 80 ? 'red' : metrics.memory > 60 ? 'yellow' : 'green'} />
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h3 className="text-sm font-medium text-gray-400 mb-4">Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tasks Completed</span>
                    <span className="text-green-400 font-medium">{metrics.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tasks Failed</span>
                    <span className="text-red-400 font-medium">{metrics.tasksFailed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Messages Processed</span>
                    <span className="text-purple-400 font-medium">{metrics.messagesProcessed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Response Time</span>
                    <span className="text-blue-400 font-medium">{metrics.averageResponseTime}ms</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {agent.status === 'error' && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-medium">Agent Error</span>
              </div>
              <p className="text-gray-400 text-sm">This agent encountered an error and is currently unavailable. Please check the agent logs for more details.</p>
            </div>
          )}

          {/* Recent Events */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Events</h3>
            <div className="space-y-2">
              {events.length === 0 ? (
                <p className="text-gray-500 text-sm">No recent events</p>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 text-sm p-2 rounded-lg hover:bg-gray-800/50">
                    <span className={`text-xs font-medium ${eventTypeColors[event.type]}`}>
                      {event.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-gray-300 flex-1">{event.message}</span>
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      <TimeAgo date={event.timestamp} />
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
