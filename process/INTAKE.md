# The Intake Loop — How Work Flows

```
DISCOVER → TRIAGE → ASANA → EXECUTE → COMPLETE
    ↑                                      ↓
    └──────────────────────────────────────┘
```

---

## Phase 1: DISCOVER

**Where:** #ideas Discord channel

**Who:** Anyone can post ideas

**What:**
- Market opportunities
- Feature requests
- Bugs discovered
- Competitor analysis
- Business ideas

**Output:** Ideas posted to #ideas

---

## Phase 2: TRIAGE

**Who:** Killer (main coordinator)

**What:**
- Review #ideas channel
- Evaluate feasibility
- Decide priority
- Determine project

**Output:** Proper Jira-style task created in Asana

---

## Phase 3: ASANA (Jira-Style Tickets)

**Where:** https://app.asana.com

### Ticket Format

Every task MUST have:

| Field | Required | Example |
|-------|----------|---------|
| **Name** | ✅ | "Set up agent monitoring dashboard" |
| **Description** | ✅ | Context + Acceptance Criteria + Tech Notes |
| **Assignee** | If in progress | "me" or agent name |
| **Due Date** | For time-sensitive | "2026-02-20" |
| **Status** | ✅ | Not Started / In Progress / Completed |

### Description Template

```
## Context
Why this matters, who requested, business value

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2  
- [ ] Criterion 3

## Technical Notes
Any relevant technical details

## Dependencies
- Depends on: [other task]
- Blocks: [other task]
```

### Priority Labels

- 🔴 **P0** - Critical (blocker, revenue impact)
- 🟠 **P1** - High (important for release)
- 🟡 **P2** - Medium (should do)
- ⚪ **P3** - Low (nice to have)

---

## Phase 4: EXECUTE

**Who:** Builder, QA, Deploy (spawned by Killer)

**Rules:**
1. Pick up task from Asana (any unassigned)
2. Set status to "In Progress"
3. Assign to yourself
4. Do the work
5. Update Asana with progress comments

**During Work:**
- Add comments regularly: "Currently working on X"
- If blocked: add comment with blocker details
- If scope changes: update description

---

## Phase 5: COMPLETE

**What:**
1. Mark task complete in Asana
2. Add completion comment: "Done! [summary]"
3. Note any follow-up tasks (create new tickets)
4. Post update to relevant Discord channel
5. Log any learnings to memory

---

## Self-Service Rules

1. **Any agent can pick up** unassigned Asana tasks
2. **No approval needed** to start Ready tasks
3. **Always update Asana** - it's the source of truth
4. **Log progress** - comments help the next agent
5. **No stale tickets** - update or complete every heartbeat

---

## Task Status Flow

```
Not Started → In Progress → Completed
                  ↓
              Blocked
```

**Status Rules:**
- **Not Started**: Fresh ticket, ready to pick up
- **In Progress**: Currently being worked on
- **Completed**: Done, acceptance criteria met
- **Blocked**: Can't proceed, need help

---

## Heartbeat Integration

Every heartbeat (30 min):
1. Check Asana for unassigned tasks
2. Pick highest priority
3. Work on it
4. Update status/comments
5. If done, complete and pick next

---

*The loop never stops. The ticket is the truth.*
