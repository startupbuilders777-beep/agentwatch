# OpenClaw Setup

This repo contains the configuration and workspace to replicate an OpenClaw AI agent system.

## What's Included

- `openclaw.json` - Main OpenClaw configuration
- `workspace/` - Projects, ideas, tasks, docs, skills
- `agents/` - Agent configurations (builder, qa, deploy, main)

## What's Excluded (not committed)

- `credentials/` - API keys and tokens
- `identity/` - Device authentication
- `agents/*/sessions/` - Conversation history
- `cron/` - Runtime cron jobs
- `media/` - Uploaded files
- `exec-approvals.json` - Runtime state

## Setup

1. Install OpenClaw: `npm install -g openclaw`
2. Copy `openclaw.json` to `~/.openclaw/openclaw.json`
3. Add your API keys to the config
4. Run `openclaw gateway start`

## For Replication

Copy this entire setup to a new machine, then:
```bash
openclaw gateway start
```

The workspace and agents will be loaded automatically.
