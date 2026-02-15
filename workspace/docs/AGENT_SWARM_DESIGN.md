# 🐝 Agent Swarm Design

## Current State
- Me = "Coordinator" (researcher)
- Builder, QA, Deploy exist in config but not used
- Single-threaded work

## Proposed Agent Swarm

| Agent | Name | Role | Channel | Emoji |
|-------|------|------|---------|-------|
| **Orchestrator** | 🧠 **Sage** | Coordinator, research, planning, handoffs | #general | 🧠 |
| **Builder** | 🔨 **Forge** | Writes code, builds features | #builds | 🔨 |
| **Reviewer** | 🧪 **Check** | Code review, testing, QA | #qa | 🧪 |
| **Shipper** | 🚀 **Deploy** | Deployment, DevOps, infrastructure | #deploys | 🚀 |

---

## Workflow Design

```
📥 Task Received (from Harry or cron)
    ↓
🧠 Sage (Me)
    ├── Analyzes task
    ├── Breaks into tickets
    └── Assigns to appropriate agent
    ↓
🔨 Forge (Builder)
    ├── Writes code
    ├── Creates PR / commits
    └── Notifies Check when done
    ↓
🧪 Check (QA)
    ├── Reviews code
    ├── Runs tests
    └── Approves or requests changes
    ↓
🚀 Deploy (DevOps)
    ├── Deploys to staging/prod
    ├── Runs smoke tests
    └── Confirms live
    ↓
🧠 Sage
    └── Reports to Harry
```

---

## Agent Detailed Specs

### 🧠 Sage (Orchestrator/Researcher)
**Current:** That's me!

**Responsibilities:**
- Research & ideation
- Task breakdown
- Agent coordination
- Communication with Harry
- Quality control

**Skills:**
- Web research
- Writing & content
- Planning
- Project management

**Files:**
- `agents/sage/system-prompt.md`

---

### 🔨 Forge (Builder Agent)

**Responsibilities:**
- Write production code
- Fix bugs
- Implement features
- Code formatting
- Basic self-testing

**Skills:**
- Next.js, TypeScript, React
- Python, APIs
- Database design
- Git workflows

**Trigger:** Mention in #builds or spawned by Sage

**Files:**
- `agents/forge/system-prompt.md`
- `agents/forge/tasks/`

---

### 🧪 Check (QA Agent)

**Responsibilities:**
- Code review
- Security audit
- Testing
- Bug finding
- Quality metrics

**Trigger:** Tag in #qa or spawned by Forge

**Skills:**
- Manual + automated testing
- Security best practices
- Performance analysis
- Documentation review

**Files:**
- `agents/check/system-prompt.md`
- `agents/check/reviews/`

---

### 🚀 Deploy (DevOps Agent)

**Responsibilities:**
- Deployment automation
- Server configuration
- CI/CD pipelines
- Monitoring
- Rollbacks

**Trigger:** Approved by Check, mentioned in #deploys

**Skills:**
- Docker, Kubernetes
- AWS, Vercel
- CI/CD (GitHub Actions)
- SSL, domains
- Scripts

**Files:**
- `agents/deploy/system-prompt.md`
- `agents/deploy/configs/`

---

## Communication Protocol

### Task Assignment Format

```
@forge Build login page for RedditAutoMarket
Priority: P1
Deadline: Today
Spec: See SPEC.md section 3.2
```

### Handoff Format

```
@check Code ready for review
PR: github.com/.../pull/123
Changes: login form, auth flow
Tests: passed locally
```

### Approval Format

```
@deploy Approved for staging
Environment: staging.reddit-market.io
Notes: Ready for smoke testing
```

---

## Task Queue Flow

### Each Project Has:
```
projects/
├── SPEC.md
├── tasks/
│   └── QUEUE.md
└── ...
```

### QUEUE.md Format:
```markdown
## Ready
- TICKET-123: Build login page

## In Progress
- TICKET-120: Setup auth (by @forge)

## Blocked
- TICKET-115: API keys (waiting on Harry)

## Done
- ✓ TICKET-100: Project setup
```

---

## Cron Jobs

| Job | Frequency | Task |
|-----|-----------|------|
| Research Sweep | Hourly | B2B trends to #general |
| Project Standup | Daily | Post project status to #general |
| Health Check | Daily | System health |
| Deploy Nightly | Daily | Deploy pending changes |

---

## Implementation Steps

1. ✅ Design complete (this doc)
2. ⏳ Create agent prompts
3. ⏳ Set up channels
4. ⏳ Test handoff workflow
5. ⏳ Full swarm operation

---

## Success Metrics

- Parallel work (2+ agents active)
- < 1hr task completion
- 0 deployment errors
- Harry satisfaction 😄
