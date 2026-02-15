# Self-Audit: Agentic System Improvements

## Current State

### ✅ Working
- 4 cron jobs active (Execute, Scout, Competitor, Memory)
- All 4 projects have GitHub repos
- Asana linked to GitHub in project descriptions
- Self-improvement system set up (.learnings/, memory/)
- Agent prompts use Asana only

### ❌ Gaps Identified

| Gap | Severity | Issue |
|-----|----------|-------|
| SafeAgent empty repo | Critical | No code, 6 Asana tasks but no project folder |
| Tasks not in sections | High | All 21 tasks in "Untitled" section |
| No GitHub PRDs | Medium | SPEC.md exists but not linked in Asana |
| No commit-task linking | Medium | Cron doesn't enforce `[TASK-ID]` format |
| No repo sync cron | Medium | Code changes not auto-pushed |
| Missing QA tasks | Medium | No dedicated QA tasks in Asana |
| No staging deploy | Low | Deploy agent has no staging env |

---

## Improvements to Implement

### 1. Create SafeAgent Project Folder
```
projects/safeagent/
├── SPEC.md (create PRD)
├── src/app/...
├── prisma/schema.prisma
└── package.json
```

### 2. Move Tasks to Proper Sections
- RedditAutoMarket has 8 sections but 0 tasks in them
- Move tasks using Asana API

### 3. Add Commit Hook
- Every cron spawn needs to enforce `[TASK-ID]` commit format
- Add pre-commit validation

### 4. Add Auto-Sync Cron
- Push code to GitHub after task completion
- Tag releases

### 5. Add QA Tasks to Asana
- Add proper QA/Testing tasks per project

### 6. Add Project README to Each Repo
- Badge links
- Quick start
- Asana link

---

## Constraint Checklist

- [x] Asana is only source of truth
- [ ] GitHub repos always have SPEC.md
- [ ] Every commit references Asana task
- [ ] Daily memory logging works
- [ ] Self-improvement logs errors
- [ ] Cron jobs execute (not just query)
- [ ] Builder agents spawn for work

---

## Action Items

### P0 - Critical
1. Create SafeAgent project folder with SPEC.md
2. Move Asana tasks to proper sections

### P1 - High
3. Add QA tasks to each Asana project
4. Add auto-sync cron for GitHub push

### P2 - Medium
5. Add pre-commit validation for `[TASK-ID]`
6. Add README.md to each project repo

---

*Audit Date: 2026-02-15*
