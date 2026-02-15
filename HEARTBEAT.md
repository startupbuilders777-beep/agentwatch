# Heartbeat Routine — Killer's Autonomous System

## Overview
- **Coordinator:** Killer (main agent)
- **Task System:** Asana (Jira-style tickets)
- **Communication:** Discord channels
- **Goal:** Continuous work without waiting for prompts

---

## 1. Quick Checks (30 seconds)

### Urgent Items
- [ ] Human messages waiting in Discord?
- [ ] Blocked tasks needing escalation?

### Asana Quick Scan
```bash
# Get tasks assigned to me that are due soon
curl -s -H "Authorization: Bearer $ASANA_TOKEN" \
  "https://app.asana.com/api/1.0/tasks?assignee=me&status=in_progress"
```

**If urgent:** Handle immediately, then continue.

---

## 2. Work Mode (use remaining time)

### Step 1: Pull from Asana
1. Query Asana for unassigned tasks in active projects
2. Pick highest-priority task you can do
3. Assign it to yourself
4. Set status to "In Progress"

### Step 2: Do the Work
- Execute the task (build, review, deploy)
- Write code, run tests, whatever the task needs
- Document progress in task comments

### Step 3: Update Asana
- Set status to "Completed" when done
- Add completion comment with what was done
- Note any follow-up tasks discovered

---

## 3. Asana Verification (Part of Every Heartbeat)

### Every Heartbeat: Verify & Update Tickets

1. **List all projects in Asana**
2. **Check each project for tasks**
3. **Update incomplete tasks** with current progress
4. **Add context** if things have changed

```bash
# ASANA_TOKEN set in credentials
TOKEN="2/1213287152205467/1213287139030185:70bce90f612d0ea072617e4dc8686bcd"

#  projects
curl -s -H "Authorization: Bearer1. Get all $TOKEN" \
  "https://app.asana.com/api/1.0/workspaces/1213287151552231/projects"

# 2. For each project, get tasks
# AgentWatch: 1213277278397665
# NexusAI: 1213277068607518  
# Whop Course: 1213287173636195
# RedditAutoMarket: 1213287173640360

# 3. Update incomplete tasks with comments if they have no recent activity
```

### Jira-Style Ticket Format

Each task should have:
- **Name**: Clear, actionable title
- **Description**: 
  - Context (why this matters)
  - Acceptance criteria (what done looks like)
  - Technical notes if relevant
- **Assignee**: Who working on it
- **Due Date**: When needed
- **Status**: Not Started → In Progress → Completed

**Example:**
```
Task: Set up agent monitoring dashboard
Description:
- Context: Users need to see their agent status in real-time
- Acceptance: Dashboard shows agent name, status, uptime, last activity
- Tech: Next.js + Prisma + WebSocket for real-time
Due: 2026-02-20
```

### Updating Incomplete Tasks

If task not complete:
1. Add comment with progress: "Still working on X. Currently at Y."
2. Note blockers if any
3. Update description if scope changed

---

## 4. Before Finishing

### Log Progress
- Update daily memory: `memory/YYYY-MM-DD.md`
- Note what was accomplished
- Note blockers encountered

### If Task Incomplete
- Write detailed progress comment in Asana
- Note what remains to be done
- Set appropriate status

---

## 5. GitHub Sync (End of Heartbeat)

```bash
cd /home/ubuntu/.openclaw/workspace
git add -A
git commit -m "Heartbeat sync: $(date)"
git push origin main
```

**Repo:** https://github.com/startupbuilders777-beep/openclaw-setup

---

## Asana Projects (Source of Truth)

| Project | GID | Status |
|---------|-----|--------|
| AgentWatch | 1213277278397665 | Active |
| NexusAI | 1213277068607518 | Active |
| Whop Course | 1213287173636195 | Active |
| RedditAutoMarket | 1213287173640360 | Active |

---

## Process Flow (from process/)

```
DISCOVER → TRIAGE → ASANA → EXECUTE → COMPLETE
    ↑                                      ↓
    └──────────────────────────────────────┘
```

1. **Discover** - Ideas in #ideas channel
2. **Triage** - Killer creates Asana tickets
3. **Asana** - Tasks live here (Jira-style)
4. **Execute** - Agent picks up, works, updates
5. **Complete** - Mark done, log learnings

---

## Anti-Patterns

❌ **HEARTBEAT_OK** — Don't just say ok, do work
❌ **Ignore Asana** — Task queue IS Asana, check it
❌ **Skip logging** — Memory is built from these moments
❌ **Solo everything** — Spawn sub-agents when needed
❌ **Stale tickets** — Update Asana every heartbeat

---

*Work doesn't wait for prompts. Neither do we.*
