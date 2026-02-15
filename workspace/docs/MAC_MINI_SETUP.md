# OpenClaw Swarm Setup - Complete Guide

## Overview

This document describes how to set up the same OpenClaw agent swarm on a new Mac mini.

---

## What is OpenClaw?

OpenClaw is an AI-first agent system that:
- Lives in your communication channels (Discord, Telegram, etc.)
- Can research, build, deploy, and coordinate
- Works 24/7 via heartbeat + cron jobs
- Spawns sub-agents for parallel work

---

## Hardware Requirements

### Minimum (for testing)
- Mac mini M1/M2 or newer
- 8GB RAM
- 50GB SSD

### Recommended (for production)
- Mac mini M2 Pro or newer
- 16GB+ RAM
- 100GB+ SSD

---

## Installation Steps

### 1. Install Node.js

```bash
# Option A: Homebrew (recommended)
brew install node

# Option B: Direct download
# Go to nodejs.org and download LTS version
```

Verify:
```bash
node --version  # Should be v18+
npm --version
```

### 2. Install OpenClaw

```bash
npm install -g openclaw
openclaw --version
```

### 3. Configure OpenClaw

```bash
openclaw configure
```

This wizard will ask for:
- **Channel:** Discord (recommended)
- **Bot Token:** Create at discord.com/developers
- **API Keys:** OpenAI, etc.

### 4. Environment Variables

Create `~/.openclaw.env` or set in gateway:

```bash
export OPENROUTER_API_KEY="your-key-here"
export MINIMAX_API_KEY="your-key-here"
```

### 5. Run Gateway

```bash
# Start the gateway
openclaw gateway start

# Or run in foreground for debugging
openclaw gateway run
```

---

## Discord Setup

### Create a Bot

1. Go to https://discord.com/developers/applications
2. Click "New Application"
3. Go to "Bot" → Reset Token
4. Enable "Message Content Intent"
5. Go to OAuth2 → URL Generator
6. Select `bot` scope
7. Select permissions: `Send Messages`, `Read Message History`
8. Add bot to your server

### Create Channels

Create these channels in Discord:
- #general (for me to post updates)
- #builds (Builder agent)
- #qa (QA agent)
- #deploys (Deploy agent)
- #tasks (Task coordination)

---

## Configuration File

Located at: `~/.openclaw/openclaw.json`

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "minimax/MiniMax-M2.5"
      },
      "heartbeat": {
        "every": "30m",
        "model": "openrouter/google/gemini-2.0-001"
      }
    },
    "list": [
      {
        "id": "main",
        "name": "Main Coordinator",
        "default": true,
        "identity": {
          "name": "Sage",
          "theme": "You are a coordinator. Research, plan, and spawn sub-agents."
        }
      }
    ]
  },
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_DISCORD_BOT_TOKEN"
    }
  }
}
```

---

## Running the Swarm

### Start Gateway

```bash
# On Mac mini terminal
openclaw gateway start
```

### Check Status

```bash
openclaw status
```

### View Logs

```bash
openclaw gateway logs
```

---

## Syncing Across Devices

### Option A: Shared Workspace (Recommended)

Use a shared folder (iCloud Drive, Dropbox, or network drive):

```bash
# Set workspace to shared folder
openclaw configure --workspace /path/to/shared/workspace
```

### Option B: Git Sync

Push workspace to GitHub, pull on new machine:

```bash
cd ~/openclaw-workspace
git add .
git commit -m "Update"
git push

# On new Mac mini:
git clone your-repo
openclaw configure --workspace ./your-repo
```

### Option C: Manual Copy

Copy the workspace folder via external drive or file sharing.

---

## Key Files

| File | Purpose |
|------|---------|
| `tasks/board.json` | Jira-style task board |
| `tasks/PROJECTS.md` | Project index |
| `projects/*/` | All project code/content |
| `agents/*/` | Agent system prompts |
| `docs/` | Documentation |

---

## Cron Jobs

The swarm runs these automated tasks:

| Job | Frequency | Task |
|-----|-----------|------|
| Heartbeat | Every 30min | Process task queue |
| B2B Trends | Hourly | Research + post to #general |
| Project Updates | Hourly | Progress reports |

---

## Troubleshooting

### Bot Not Responding
- Check Discord bot permissions
- Verify channel IDs in config
- Check gateway logs

### Exec Blocked
- Run `openclaw configure` 
- Set exec security to "allowlist"

### Model Errors
- Verify API keys have credits
- Check model names are correct

---

## Cost Estimate

| Item | Monthly Cost |
|------|--------------|
| OpenAI API | $20-100 |
| Discord Bot | Free |
| Hosting | Free (your Mac) |
| **Total** | **$20-100/mo** |

---

## Next Steps

1. Get Discord bot token
2. Run `openclaw configure`
3. Sync workspace from existing machine
4. Start gateway

Questions? Ask in #general!
