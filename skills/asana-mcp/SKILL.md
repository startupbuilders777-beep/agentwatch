---
name: asana-mcp
description: Use Asana MCP server via mcporter for fast task management. Use instead of REST API when available.
---

# Asana MCP Skill

Use mcporter to call Asana MCP server for faster operations.

## Setup

```bash
# Install dependencies
npm install -g tiny-asana-mcp-server mcporter

# Configure with personal access token
mcporter config add asana --command "tiny-asana-mcp-server" --env ASANA_TOKEN="your-asana-token"
```

## Available Tools

### List Projects
```bash
mcporter call asana.asana_get_projects
```

### Get Tasks in Project
```bash
mcporter call asana.asana_get_tasks "project_id:1213287173640360"
```

### Create Task
```bash
mcporter call asana.asana_create_task "name:Test Task,project_id:1213287173640360,notes:Test description"
```

### Update Task
```bash
mcporter call asana.asana_update_task "task_id:123456789,completed:true"
```

### Get Task
```bash
mcporter call asana.asana_get_task "task_id:123456789"
```

## Our Projects

| Project | GID |
|---------|-----|
| AgentWatch | 1213277278397665 |
| NexusAI | 1213277068607518 |
| Whop Course | 1213287173636195 |
| RedditAutoMarket | 1213287173640360 |

## Faster Than REST API

MCP calls are faster because:
- No HTTP overhead
- Direct process communication
- Cached connections

---

*Use mcporter for Asana when speed matters.*
