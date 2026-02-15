# Agent Team Workflow — Parallel Execution

*The Killer orchestration system: Scout → Triage → Asana → Spawn Agents → Git Worktrees → QA*

---

## The Full Flow

```
DISCOVER → TRIAGE → ASANA → SPAWN → WORKTREE → EXECUTE → QA → COMPLETE
    ↑                                                                        ↓
    └────────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Discover (Scout)

- Use agent-browser/web_fetch to find opportunities
- Post to #ideas channel
- Research market pain points

---

## Step 2: Triage

- Review #ideas
- Create Asana project if needed
- Break into Features (Epics)

---

## Step 3: Asana Structure

### Project = Product
### Section/Epic = Feature Group
### Task = Implementation Item

```
RedditAutoMarket (Project)
├── [EPIC] Account Management (Section)
│   ├── Task: Connect Reddit OAuth
│   ├── Task: Token refresh logic
│   └── Task: Account status dashboard
├── [EPIC] Campaign Management (Section)
│   ├── Task: Create campaign form
│   ├── Task: Keyword input
│   ├── Task: Subreddit selector
│   └── Task: Daily limits
├── [EPIC] AI Generation (Section)
│   ├── Task: OpenAI integration
│   ├── Task: Prompt templates
│   └── Task: Tone settings
└── [EPIC] Automation (Section)
    ├── Task: Cron worker
    ├── Task: Rate limiting
    └── Task: Error handling
```

---

## Step 4: Spawn Sub-Agents

When task is ready to work, spawn parallel agents:

```javascript
// Spawn builder agent for a feature
sessions_spawn({
  agentId: "builder",
  task: "Complete Task [TASK_GID] in RedditAutoMarket. Context: [description]"
})
```

### Parallel Spawning Rules

1. **Max 4 concurrent agents** (from config)
2. **One agent per feature** 
3. **Use git worktrees** for isolation

---

## Step 5: Git Worktrees

Each agent works in its own directory:

```bash
# Create worktree for feature branch
git worktree add ../reddit-feature-oauth -b feature/oauth

# Agent works in separate directory
cd ../reddit-feature-oauth

# After complete, merge and delete worktree
git checkout main
git merge feature/oauth
git worktree remove ../reddit-feature-oauth
git branch -d feature/oauth
```

### Why Worktrees?

- **Parallel work** - Multiple agents can work on same repo simultaneously
- **Isolated** - No conflicts
- **Clean merges** - Each feature is separate branch
- **Fast** - Don't need full clone

---

## Step 6: Execute (Ralph Loop)

Each spawned agent follows Ralph Loop:

1. **Pick task** from Asana
2. **Break** into subtasks
3. **Execute** - anticipating pitfalls
4. **Validate** - does it work?
5. **Complete** - mark done in Asana

---

## Step 7: QA Review

When agent completes task:

1. **Notify QA** in #qa channel
2. **QA reviews** code/changes
3. **QA tests** the feature
4. **QA approves** or **QA requests changes**

---

## Step 8: Complete

After QA approves:
1. Merge branch
2. Mark Asana task complete
3. Add completion comment
4. Log learnings if any

---

## Asana + Git Worktree Workflow

### Creating Tasks with Branch Info

Every Asana task should have:
```
## Implementation
- Branch: feature/[task-name]
- Worktree: ../[project]-[feature]
- PR: [link when created]
```

### Task Status Flow

```
Not Started → In Progress → Ready for QA → QA Approved → Merged → Completed
                              ↓
                         QA Requests Changes → In Progress
```

---

## Spawning Agents Command

```bash
# Example: Spawn builder for Reddit OAuth feature
sessions_spawn({
  agentId: "builder",
  task: `
    Complete Reddit OAuth integration for RedditAutoMarket.
    
    Task: [TASK_GID]
    Feature: Connect Reddit account via OAuth
    Branch: feature/reddit-oauth
    Worktree: ../reddit-oauth
    
    Context from Asana:
    - Allow users to connect Reddit accounts via OAuth
    - Store tokens securely
    - Handle refresh tokens
    
    Acceptance Criteria:
    - [ ] OAuth flow works
    - [ ] Tokens stored in DB
    - [ ] Can disconnect account
  `,
  model: "minimax/MiniMax-M2.5",
  timeoutSeconds: 3600
})
```

---

## Anti-Patterns

❌ **Single agent doing everything** - Spawn parallel agents
❌ **No git worktrees** - Use worktrees for isolation
❌ **Skip QA** - Always review before merge
❌ **Skip Asana updates** - Keep tickets current
❌ **No branch naming** - Always use feature branches

---

## Parallel Execution Summary

| Phase | Action | Tool |
|-------|--------|------|
| Discover | Scout opportunities | agent-browser, web_fetch |
| Triage | Create Asana tasks | Asana API |
| Spawn | Launch sub-agents | sessions_spawn |
| Worktree | Create branch dir | exec (git worktree) |
| Execute | Build feature | Agent (builder/qa/deploy) |
| QA | Review code | Agent (qa) |
| Merge | Integrate | exec (git) |
| Complete | Update Asana | Asana API |

---

*Parallel agents, isolated worktrees, continuous flow.*
