# Heartbeat Routine — Killer's Autonomous System

## Overview
- **Coordinator:** Killer (main agent)
- **Task System:** Asana (Jira-style tickets)
- **Communication:** Discord channels
- **Goal:** 24/7 continuous work

---

## 0. Scout for Opportunities (Every Heartbeat!)

**Always be scouting for new projects:**

1. **Web Research** (use browser tool)
   - Search for AI automation trends
   - Find pain points in SMB market
   - Discover competitor gaps
   - Look for viral products

2. **Add to #ideas channel**
   - Post discoveries to #ideas
   - Tag as opportunity

3. **Create Asana tasks**
   - If opportunity is solid → create task in appropriate project
   - Break into subtasks
   - Set priority

---

## 1. Quick Checks (30 seconds)

### Urgent Items
- [ ] Human messages waiting in Discord?
- [ ] Blocked tasks needing escalation?

### Asana Quick Scan
```bash
TOKEN="2/1213287152205467/1213287139030185:70bce90f612d0ea072617e4dc8686bcd"

# Get incomplete tasks
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://app.asana.com/api/1.0/tasks?assignee=me&completed=false"
```

**If urgent:** Handle immediately, then continue.

---

## 2. Work Mode (Ralph Loop)

### Ralph Loop Steps

1. **Pick task from Asana** - highest priority, unassigned
2. **Break into subtasks** - if large, create Asana checklist items
3. **Execute subtask** - do the work
4. **Validate** - does it work? does it meet spec?
5. **Complete or Continue**
   - ✅ Complete → mark done in Asana, add completion comment
   - ⏳ Incomplete → add progress comment, save context, spawn new session

### Task Execution Rules

- **Create as many tasks as possible** - More tasks = more parallel work
- **Break big tasks into small ones** - Easier to complete
- **Always validate** - Don't just write code, test it
- **Update Asana constantly** - It's the source of truth
- **Never leave stale** - Complete or update progress every heartbeat

---

## 3. Asana Verification (Every Heartbeat)

### Verify & Update All Tickets

1. List all projects in Asana
2. Check each for incomplete tasks
3. Update stale tasks with progress comments
4. Add context if scope changed

### Jira-Style Ticket Format

Every task MUST have:
- **Name**: Clear, actionable title
- **Description**: Context + Acceptance Criteria + Technical Notes
- **Assignee**: Who working (or unassigned)
- **Due Date**: For time-sensitive
- **Status**: Not Started → In Progress → Completed

---

## 4. Before Finishing

### Log Progress
- Update daily memory: `memory/YYYY-MM-DD.md`
- Note what was accomplished

### If Task Incomplete
- Write detailed progress in Asana comment
- Note what remains to be done
- Save context to file if complex

---

## 5. GitHub Sync

```bash
cd /home/ubuntu/.openclaw/workspace
git add -A
git commit -m "Heartbeat sync: $(date)"
git push origin main
```

---

## Asana Projects

| Project | GID |
|---------|-----|
| AgentWatch | 1213277278397665 |
| NexusAI | 1213277068607518 |
| Whop Course | 1213287173636195 |
| RedditAutoMarket | 1213287173640360 |

---

## Process Flow

```
DISCOVER → TRIAGE → ASANA → RALPH LOOP → COMPLETE
    ↑                                          ↓
    └──────────────────────────────────────────┘
```

1. **Discover** - Scout opportunities, post to #ideas
2. **Triage** - Evaluate, prioritize
3. **Asana** - Create Jira-style tasks
4. **Ralph Loop** - Execute, validate, complete
5. **Complete** - Mark done, sync GitHub

---

## Anti-Patterns

❌ **HEARTBEAT_OK** — Never just say ok, do work
❌ **Ignore Asana** — Task queue IS Asana
❌ **Skip scouting** — Always look for opportunities
❌ **Leave stale tasks** — Update or complete
❌ **Solo everything** — Spawn agents for parallel work
❌ **No validation** — Test your code

---

## Tools Available

| Tool | Purpose |
|------|---------|
| browser | Web research, scouting |
| exec | Run commands, build |
| Asana API | Task management |
| Discord | Communication |
| sessions_spawn | Parallel work |

---

*24/7. Always working. Always scouting. Always shipping.*
