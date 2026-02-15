# Ralph Loop — Adapted for Asana

*The autonomous development loop. Continuous, validated, never stops.*

---

## The Loop

```
┌─────────────────────────────────────────────────────────────┐
│                    RALPH LOOP                               │
├─────────────────────────────────────────────────────────────┤
│  1. Pick task from Asana (highest priority)              │
│  2. Create subtasks from PRD/features                       │
│  3. Execute subtask                                        │
│  4. Validate output                                        │
│     - Code works?                                          │
│     - Meets spec?                                           │
│  5. If complete → mark done in Asana                      │
│     If incomplete → write progress to task comments         │
│  6. Spawn new session with context                         │
│  7. Continue until done                                    │
│  8. Compact progress → Asana comments                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Task Breakdown

### Step 1: PRD → Features
For each project, break PRD into features:
```
PRD (Product Requirements)
    ↓
Features (distinct capabilities)
    ↓
Tasks (Asana subtasks)
```

### Step 2: Features → Asana Tasks
Each feature becomes an Asana task with:
- **Name**: Feature title
- **Description**: Context + Acceptance Criteria
- **Subtasks**: Checklist items in description

### Step 3: Execute Task
1. Assign to self in Asana
2. Set status to "In Progress"
3. Do the work
4. Validate

### Step 4: Validation

**Code Validation:**
- [ ] Code written
- [ ] Compiles/builds
- [ ] No obvious bugs

**Spec Validation:**
- [ ] Matches acceptance criteria
- [ ] Works as expected

### Step 5: Complete or Continue

**If Complete:**
- Mark task complete in Asana
- Add completion comment: "Done! [summary]"
- Pick next task

**If Incomplete:**
- Add progress comment: "In progress. Currently: [what]. Still need: [what]"
- Save context to `progress_[task_id].txt`
- Spawn new agent session with context
- Continue working

---

## Progress Context File

When a task spans multiple sessions, save context:

```markdown
# Progress: [Task Name]
## Task ID: [Asana GID]
## Status: In Progress

## What Was Done
- [x] Component X created
- [x] API endpoint Y working

## Current Work
- Working on: Z
- Blocked by: none

## Remaining
- [ ] Need to implement A
- [ ] Then B
- [ ] Then test C

## Notes
Any additional context
```

---

## Spawning with Context

When continuing a task:
```bash
# Get task context
cat progress_[task_id].txt

# Spawn agent with context
sessions_spawn with task including:
- Current progress
- What's remaining
- Technical context
```

---

## Asana Integration

### Create Feature Task
```bash
# Create task with subtasks in description
curl -X POST "https://app.asana.com/api/1.0/tasks" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "data": {
      "name": "[FEATURE] Feature Name",
      "projects": ["PROJECT_GID"],
      "notes": "## Context\n...\n## Acceptance Criteria\n- [ ] ...\n## Subtasks\n- [ ] ..."
    }
  }'
```

### Update Progress
```bash
# Add progress comment
curl -X POST "https://app.asana.com/api/1.0/tasks/[TASK_GID]/stories" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"data": {"text": "Progress: Working on X. Still need Y."}}'
```

### Mark Complete
```bash
curl -X PUT "https://app.asana.com/api/1.0/tasks/[TASK_GID]" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"data": {"completed": true}}'
```

---

## Circuit Breaker

If > 3 consecutive failures on same task:
1. Stop the loop
2. Log the errors to memory
3. Notify Harry
4. Wait for human intervention

---

## Exit Conditions

Task is truly complete when:
1. All acceptance criteria checked off
2. Code works (builds/runs)
3. Added completion comment in Asana
4. No blocking issues

---

## Key Rules

1. **Always break into subtasks** - Don't tackle big blobs
2. **Validate after each subtask** - Catch issues early
3. **Update Asana constantly** - It's the source of truth
4. **Save progress context** - For session continuity
5. **Spawn agents for parallel work** - Don't bottleneck
6. **Never leave stale tasks** - Complete or update progress

---

## Ralph + Asana Workflow

```
Heartbeat fires
    ↓
Check Asana for incomplete tasks
    ↓
Pick highest priority task
    ↓
Break into subtasks (if not already)
    ↓
Execute subtask
    ↓
Validate
    ↓
    ├─ Complete → Mark done, next task
    │
    └─ Incomplete → Add progress, spawn session, continue
```

---

*Never stop. Always make progress. Asana is the truth.*
