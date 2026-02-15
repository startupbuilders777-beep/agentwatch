import { Agent, Template, Integration } from './types';

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Daily Email Digest',
    description: 'Summarizes important emails and sends a digest every morning',
    icon: '📧',
    schedule: 'daily',
    status: 'active',
    lastRun: '2 hours ago',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Meeting Scheduler',
    description: 'Automatically schedules meetings based on availability',
    icon: '📅',
    schedule: 'hourly',
    status: 'active',
    lastRun: '30 minutes ago',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Social Media Poster',
    description: 'Posts scheduled content to social media platforms',
    icon: '📱',
    schedule: 'weekly',
    status: 'paused',
    lastRun: '3 days ago',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Data Backup',
    description: 'Automatically backs up important files to cloud storage',
    icon: '💾',
    schedule: 'daily',
    status: 'active',
    lastRun: '5 hours ago',
    createdAt: '2024-02-05',
  },
  {
    id: '5',
    name: 'Customer Responder',
    description: 'Responds to customer inquiries with AI-generated responses',
    icon: '🤖',
    schedule: 'manual',
    status: 'paused',
    lastRun: '1 week ago',
    createdAt: '2024-02-10',
  },
];

export const templates: Template[] = [
  {
    id: 'email-summarizer',
    name: 'Email Summarizer',
    description: 'Summarize daily emails and get key points',
    icon: '📧',
  },
  {
    id: 'calendar-assistant',
    name: 'Calendar Assistant',
    description: 'Automatically schedule meetings and manage calendar',
    icon: '📅',
  },
  {
    id: 'slack-notifier',
    name: 'Slack Notifier',
    description: 'Alert your team on important events',
    icon: '💬',
  },
  {
    id: 'data-collector',
    name: 'Data Collector',
    description: 'Gather and organize data from the web',
    icon: '📊',
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Auto-reply to customer inquiries',
    icon: '🤖',
  },
  {
    id: 'content-writer',
    name: 'Content Writer',
    description: 'Generate blog posts and marketing content',
    icon: '📝',
  },
];

export const integrations: Integration[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    icon: '📧',
    color: '#EA4335',
    connected: false,
  },
  {
    id: 'outlook',
    name: 'Outlook',
    icon: '📨',
    color: '#0078D4',
    connected: false,
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: '💬',
    color: '#4A154B',
    connected: false,
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    icon: '📆',
    color: '#4285F4',
    connected: false,
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: '📓',
    color: '#000000',
    connected: false,
  },
  {
    id: 'webhook',
    name: 'Webhook',
    icon: '🔗',
    color: '#6366F1',
    connected: false,
  },
];
