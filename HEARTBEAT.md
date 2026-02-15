# HEARTBEAT.md

1. Read tasks/board.json
2. If "Ready" tasks exist → pick one → work on it
3. After completing task:
   - Log to improvements.json (success or error)
   - Note what went well / what to improve
4. Post brief update to #general

## What to Track

### For Successes
- Task completed
- Time taken
- Quality rating

### For Failures
- What failed
- Why it failed
- Workaround used

## Metrics to Track
- Tasks completed today
- Errors encountered
- Time spent

---

## Quick Log Format

After any task, append to `tasks/improvements.json`:
```json
{
  "action": "completed",
  "task": "NEXUS-001",
  "duration": "5m",
  "rating": "8/10"
}
```
