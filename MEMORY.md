# MEMORY.md — Core Knowledge

*What I know. Updated regularly.*

---

## About Harry

- **Name:** Harry
- **Timezone:** EST
- **GitHub:** startupbuilders777-beep
- **Email:** startupbuilders777@gmail.com
- **Goal:** Build multiple AI/automation SaaS businesses

---

## Projects (Current)

| Project | Status | Priority |
|---------|--------|----------|
| **AgentWatch** | In Progress | P0 |
| **NexusAI** | In Progress | P1 |
| **Whop Course** | Done | - |
| **RedditAutoMarket** | Done | - |

---

## Key Preferences

- **Communication:** Discord (#general, #builds, #qa, #deploys, #ideas)
- **Task Management:** Asana (source of truth)
- **Code Style:** TypeScript, Tailwind, Prisma, Next.js
- **No fluff:** Direct, actionable responses

---

## Technical

- **Gateway:** localhost:18789
- **Model:** MiniMax M2.5 (default), M2.5-highspeed (fast)
- **Exec:** Full mode (no approval needed)
- **GitHub:** https://github.com/startupbuilders777-beep/openclaw-setup

---

## Asana Projects

| Project | GID |
|---------|-----|
| AgentWatch | 1213277278397665 |
| NexusAI | 1213277068607518 |
| Whop Course | 1213287173636195 |
| RedditAutoMarket | 1213287173640360 |

---

## CRITICAL: NEVER USE LOCAL FILES FOR TASKS

### Task Source of Truth
- **Asana IS the source of truth** - Always query Asana API directly
- NEVER read local tasks/QUEUE.md or tasks/board.json for task status
- NEVER post numbers from local files - only from real Asana queries
- If you need task info, call the Asana API directly

### Asana Token
```
TOKEN="2/1213287152205467/1213287139030185:70bce90f612d0ea072617e4dc8686bcd"
```

### Quick Query
```bash
for pid in 1213277068607518 1213277278397665 1213287173640360 1213287696255155; do
  curl -s -H "Authorization: Bearer $TOKEN" "https://app.asana.com/api/1.0/projects/$pid/tasks?completed=false" | jq '.data | length'
done
```

---

## CRITICAL: How I Work With Harry

### When Blocked (MUST DO)
- If I don't have specs → tell you EXACTLY what I need in Discord
- If I'm stuck → say "BLOCKED: [reason]" explicitly
- Never fake progress, never post empty updates
- Tell you what I need to unblock

### Asana Protocol
- Query Asana at start of EVERY session to see REAL tasks
- Create tickets myself when I find work to do
- Update with actual progress, not fake numbers

### Before Posting Updates
- Actually check Asana first (via API, not local files)
- If no real work → say that, don't fabricate
- NEVER POST FAKE NUMBERS

---

*Updated: 2026-02-15*

---

## Agent Rules

- **Concurrency:** Only 1 agent per task. Check sessions_list before spawning.
- **Asana-Git:** Every commit must reference Asana task with `[TASK-ID]` prefix
- **Blocking:** Always tell Harry when blocked + what you need

