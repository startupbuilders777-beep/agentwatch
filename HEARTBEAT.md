# Heartbeat Routine — Killer's Autonomous System

## Overview
- **Coordinator:** Killer (main agent)
- **Task System:** Asana (not local files)
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

## 3. Before Finishing

### Log Progress
- Update daily memory: `memory/YYYY-MM-DD.md`
- Note what was accomplished
- Note blockers encountered

### If Task Incomplete
- Write detailed progress comment in Asana
- Note what remains to be done
- Set appropriate status

---

## Asana Integration Commands

### List My Tasks
```bash
ASANA_TOKEN="2/1213287152205467/1213287139030185:70bce90f612d0ea072617e4dc8686bcd"
curl -s -H "Authorization: Bearer $ASANA_TOKEN" \
  "https://app.asana.com/api/1.0/tasks?assignee=me&opt_fields=name,status,projects.name"
```

### Get Project Tasks
```bash
# AgentWatch: 1213277278397665
curl -s -H "Authorization: Bearer $ASANA_TOKEN" \
  "https://app.asana.com/api/1.0/projects/1213277278397665/tasks?opt_fields=name,status,assignee.name"
```

### Update Task Status
```bash
# Mark task complete (gid: 1213287172832148)
curl -s -X PUT -H "Authorization: Bearer $ASANA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"completed": true}}' \
  "https://app.asana.com/api/1.0/tasks/1213287172832148"
```

### Add Comment
```bash
curl -s -X POST -H "Authorization: Bearer $ASANA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"text": "Task completed. Built the monitoring dashboard."}}' \
  "https://app.asana.com/api/1.0/tasks/1213287172832148/stories"
```

---

## Projects (Asana GIDs)

| Project | GID | Status |
|---------|-----|--------|
| AgentWatch | 1213277278397665 | Active |
| NexusAI | 1213277068607518 | Active |
| Whop Course | 1213287173636195 | Active |
| RedditAutoMarket | 1213287173640360 | Active |

---

## End of Heartbeat

- Post update to #general if significant progress
- Log to memory if new learnings
- If task incomplete, ensure Asana reflects current state
- **Commit and push to GitHub** - keep repo in sync

### GitHub Sync (Auto-commit)
```bash
cd /home/ubuntu/.openclaw/workspace
git add -A
git commit -m "Heartbeat sync: $(date)"
git push origin main
```

**Repo:** https://github.com/startupbuilders777-beep/openclaw-setup

---

## Anti-Patterns

❌ **HEARTBEAT_OK** — Don't just say ok, do work
❌ **Ignore Asana** — Task queue IS Asana, check it
❌ **Skip logging** — Memory is built from these moments
❌ **Solo everything** — Spawn sub-agents when needed

---

*Work doesn't wait for prompts. Neither do we.*
