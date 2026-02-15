"use client";

import { useState } from "react";

interface Agent {
  id: string;
  name: string;
  model: string;
  status: "running" | "idle" | "error";
  createdAt: string;
}

const initialAgents: Agent[] = [
  { id: "1", name: "Research Bot", model: "GPT-4", status: "running", createdAt: "2024-01-15" },
  { id: "2", name: "Data Scraper", model: "Claude", status: "idle", createdAt: "2024-01-20" },
  { id: "3", name: "Code Assistant", model: "GPT-4", status: "running", createdAt: "2024-02-01" },
];

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [showModal, setShowModal] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", model: "GPT-4" });

  const handleAddAgent = () => {
    if (!newAgent.name.trim()) return;
    
    const agent: Agent = {
      id: Date.now().toString(),
      name: newAgent.name,
      model: newAgent.model,
      status: "idle",
      createdAt: new Date().toISOString().split("T")[0],
    };
    
    setAgents([...agents, agent]);
    setNewAgent({ name: "", model: "GPT-4" });
    setShowModal(false);
  };

  const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
    running: { bg: "bg-[var(--success)]/20", text: "text-[var(--success)]", dot: "bg-[var(--success)]" },
    idle: { bg: "bg-[var(--warning)]/20", text: "text-[var(--warning)]", dot: "bg-[var(--warning)]" },
    error: { bg: "bg-[var(--danger)]/20", text: "text-[var(--danger)]", dot: "bg-[var(--danger)]" },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Agents</h1>
          <p className="text-[var(--text-secondary)]">Manage your AI agents</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Agent
        </button>
      </div>

      {/* Agent Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border)]/80 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[agent.status].bg} ${statusStyles[agent.status].text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[agent.status].dot} ${agent.status === 'running' ? 'pulse-dot' : ''}`} />
                {agent.status}
              </span>
            </div>
            
            <h3 className="font-semibold text-lg mb-1">{agent.name}</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">{agent.model}</p>
            
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--text-secondary)]">
                Created: {new Date(agent.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Agent Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-md p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl">
            <h2 className="text-xl font-semibold mb-6">Add New Agent</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Agent Name</label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="Enter agent name"
                  className="w-full px-4 py-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Model</label>
                <select
                  value={newAgent.model}
                  onChange={(e) => setNewAgent({ ...newAgent, model: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                >
                  <option value="GPT-4">GPT-4</option>
                  <option value="GPT-4 Turbo">GPT-4 Turbo</option>
                  <option value="Claude">Claude</option>
                  <option value="Claude Opus">Claude Opus</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] font-medium hover:bg-[var(--surface-elevated)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAgent}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors"
              >
                Add Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
