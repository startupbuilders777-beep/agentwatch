export default function Dashboard() {
  const stats = [
    {
      label: "Total Agents",
      value: "3",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "var(--primary)",
    },
    {
      label: "Monthly Spend",
      value: "$1,247.50",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "var(--success)",
    },
    {
      label: "Active Now",
      value: "2",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "var(--warning)",
    },
  ];

  const activities = [
    { agent: "Research Bot", action: "Processing query", time: "2 min ago", status: "running" },
    { agent: "Data Scraper", action: "Fetched 150 pages", time: "15 min ago", status: "completed" },
    { agent: "Code Assistant", action: "Code review done", time: "30 min ago", status: "completed" },
    { agent: "Research Bot", action: "Started new task", time: "1 hour ago", status: "running" },
    { agent: "Data Scraper", action: "Rate limited", time: "2 hours ago", status: "error" },
  ];

  const statusStyles: Record<string, string> = {
    running: "bg-[var(--success)]/20 text-[var(--success)]",
    completed: "bg-[var(--primary)]/20 text-[var(--primary)]",
    error: "bg-[var(--danger)]/20 text-[var(--danger)]",
    idle: "bg-[var(--warning)]/20 text-[var(--warning)]",
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-[var(--text-secondary)]">Overview of your AI agent fleet</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border)]/80 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                {stat.icon}
              </div>
              {stat.label === "Active Now" && (
                <span className="w-2 h-2 rounded-full bg-[var(--success)] pulse-dot" />
              )}
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="px-6 py-4 text-left text-sm font-medium text-[var(--text-secondary)]">Agent</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[var(--text-secondary)]">Action</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[var(--text-secondary)]">Time</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[var(--text-secondary)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, i) => (
                <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--surface-elevated)]/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{activity.agent}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{activity.action}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{activity.time}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[activity.status]}`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
