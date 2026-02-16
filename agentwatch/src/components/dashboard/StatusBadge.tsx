import { AgentStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: AgentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    running: 'bg-green-500/20 text-green-400 border-green-500/30',
    idle: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const icons = {
    running: '●',
    idle: '○',
    error: '✕',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <span className={status === 'running' ? 'animate-pulse' : ''}>{icons[status]}</span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
