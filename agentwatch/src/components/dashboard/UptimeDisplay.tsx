interface UptimeDisplayProps {
  seconds: number;
}

export function UptimeDisplay({ seconds }: UptimeDisplayProps) {
  if (seconds === 0) return <span className="text-gray-500">--</span>;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return <span>{hours}h {minutes}m</span>;
  }
  if (minutes > 0) {
    return <span>{minutes}m {secs}s</span>;
  }
  return <span>{secs}s</span>;
}

interface TimeAgoProps {
  date: Date;
}

export function TimeAgo({ date }: TimeAgoProps) {
  const now = new Date();
  const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  if (diff < 60) return <span>Just now</span>;
  if (diff < 3600) return <span>{Math.floor(diff / 60)}m ago</span>;
  if (diff < 86400) return <span>{Math.floor(diff / 3600)}h ago</span>;
  return <span>{Math.floor(diff / 86400)}d ago</span>;
}
