// Mock data for demonstration
const AGENT_DATA: Record<string, {
  name: string;
  status: string;
  currentTask: string | null;
  activities: { id: string; type: string; message: string; timestamp: Date }[];
  costs: { id: string; tokens: number; duration: number; cost: number; date: Date }[];
}> = {
  sage: {
    name: "Sage",
    status: "running",
    currentTask: "Researching AI trends",
    activities: [
      { id: "1", type: "spawn", message: "Started research task", timestamp: new Date(Date.now() - 60000) },
      { id: "2", type: "complete", message: "Found 15 relevant articles", timestamp: new Date(Date.now() - 120000) },
      { id: "3", type: "spawn", message: "Initiated data analysis", timestamp: new Date(Date.now() - 180000) },
    ],
    costs: [
      { id: "1", tokens: 50000, duration: 120000, cost: 0.50, date: new Date() },
      { id: "2", tokens: 45000, duration: 110000, cost: 0.45, date: new Date(Date.now() - 3600000) },
    ]
  },
  forge: {
    name: "Forge",
    status: "idle",
    currentTask: null,
    activities: [
      { id: "1", type: "complete", message: "Built AgentWatch feature", timestamp: new Date(Date.now() - 300000) },
      { id: "2", type: "spawn", message: "Starting new build", timestamp: new Date(Date.now() - 360000) },
    ],
    costs: [
      { id: "1", tokens: 80000, duration: 180000, cost: 0.80, date: new Date() },
    ]
  },
  check: {
    name: "Check",
    status: "error",
    currentTask: "Build verification failed",
    activities: [
      { id: "1", type: "fail", message: "TypeScript compilation error", timestamp: new Date(Date.now() - 30000) },
      { id: "2", type: "spawn", message: "Starting build verification", timestamp: new Date(Date.now() - 60000) },
    ],
    costs: [
      { id: "1", tokens: 15000, duration: 30000, cost: 0.15, date: new Date() },
    ]
  },
  deploy: {
    name: "Deploy",
    status: "idle",
    currentTask: null,
    activities: [
      { id: "1", type: "complete", message: "Deployed to production", timestamp: new Date(Date.now() - 600000) },
    ],
    costs: [
      { id: "1", tokens: 10000, duration: 45000, cost: 0.10, date: new Date() },
    ]
  }
};

function getStatusColor(status: string) {
  switch (status) {
    case "running": return "bg-green-500";
    case "idle": return "bg-gray-500";
    case "error": return "bg-red-500";
    default: return "bg-gray-500";
  }
}

function formatDuration(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
}

export default function AgentDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  const agent = AGENT_DATA[id] || AGENT_DATA["forge"];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-8">
        <a href="/" className="text-blue-400 hover:text-blue-300 mb-2 inline-block">← Back to Dashboard</a>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agent.status)} text-white`}>
            {agent.status}
          </span>
        </div>
        {agent.currentTask && (
          <p className="text-gray-400 mt-2">Current Task: {agent.currentTask}</p>
        )}
      </header>

      {/* Agent Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-4">Activity History</h2>
          <div className="space-y-3">
            {agent.activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-2 rounded bg-gray-800">
                <span className={`w-2 h-2 mt-2 rounded-full ${
                  activity.type === 'complete' ? 'bg-green-500' :
                  activity.type === 'fail' ? 'bg-red-500' :
                  activity.type === 'spawn' ? 'bg-blue-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{formatTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Details */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-4">Cost Breakdown</h2>
          <div className="space-y-3">
            {agent.costs.map((cost) => (
              <div key={cost.id} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                <div>
                  <p className="text-white">{cost.tokens.toLocaleString()} tokens</p>
                  <p className="text-gray-400 text-sm">{formatDuration(cost.duration)}</p>
                </div>
                <p className="text-green-400 font-medium">${cost.cost.toFixed(2)}</p>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded mt-4 border border-gray-700">
              <p className="text-white font-medium">Total</p>
              <p className="text-green-400 font-bold">${agent.costs.reduce((sum, c) => sum + c.cost, 0).toFixed(2)}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
