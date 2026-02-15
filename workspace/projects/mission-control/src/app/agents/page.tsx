import { Bot, Plus, Play, Pause, Trash2, RefreshCw } from 'lucide-react'

const agents = [
  { 
    id: 'sage', 
    name: 'Sage', 
    role: 'Coordinator', 
    status: 'active', 
    emoji: '🧠', 
    currentTask: 'Monitoring all agents',
    spawned: '2026-02-13T12:00:00Z',
    completed: 15
  },
  { 
    id: 'agent-reddit-market', 
    name: 'RedditMarket Agent', 
    role: 'Builder', 
    status: 'running', 
    emoji: '🔨', 
    currentTask: 'TICKET-025: Deploy to EC2 with Docker',
    spawned: '2026-02-13T19:50:00Z',
    completed: 0
  },
  { 
    id: 'agent-whop-course', 
    name: 'WhopCourse Agent', 
    role: 'Content', 
    status: 'running', 
    emoji: '📝', 
    currentTask: 'COURSE-002: Video scripts for Module 2',
    spawned: '2026-02-13T19:50:00Z',
    completed: 1
  },
]

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Agents</h1>
                  <p className="text-xs text-gray-400">Manage your agent swarm</p>
                </div>
              </a>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
              <Plus className="w-4 h-4" />
              Spawn Agent
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Total Agents</p>
            <p className="text-3xl font-bold mt-1">3</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Active</p>
            <p className="text-3xl font-bold mt-1 text-green-500">2</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Idle</p>
            <p className="text-3xl font-bold mt-1 text-gray-500">1</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Tasks Completed</p>
            <p className="text-3xl font-bold mt-1">16</p>
          </div>
        </div>

        {/* Agent List */}
        <div className="space-y-4">
          {agents.map((agent) => (
            <div 
              key={agent.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{agent.emoji}</div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{agent.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        agent.status === 'active' ? 'bg-green-500/20 text-green-400' : 
                        agent.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{agent.role}</p>
                    <p className="text-blue-400 text-sm mt-2">{agent.currentTask}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {agent.status === 'running' ? (
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                      <Pause className="w-5 h-5 text-gray-400" />
                    </button>
                  ) : (
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                      <Play className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                    <RefreshCw className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-red-900/30 rounded-lg transition">
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700 flex gap-6 text-sm text-gray-400">
                <span>Spawned: {new Date(agent.spawned).toLocaleString()}</span>
                <span>Tasks completed: {agent.completed}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
