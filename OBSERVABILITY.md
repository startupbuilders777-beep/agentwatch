# AgentWatch - Real-time Agent Observability Platform

## The Product

**AgentWatch** = "Datadog for AI Agents" - but with live session replay, not just traces.

## Two Use Cases

| Use Case | Description |
|----------|-------------|
| **Internal** | Monitor our own agents (Sage, Forge, Check, Deploy) |
| **External** | Sell to businesses who build AI agents |

---

## Connectivity Options (How Customers Connect)

### 1. MCP Server (Primary) ✅
```typescript
// Agent sends metrics via MCP
{
  "agent": "builder-001",
  "task": "FIX-123",
  "status": "running",
  "tokens": 45000,
  "cost": $0.15,
  "duration": "5m",
  "current_step": "Writing test",
  "errors": []
}
```

### 2. Webhook
```
POST https://agentwatch.io/webhook
{
  "event": "task.complete",
  "agent": "builder",
  "data": { ... }
}
```

### 3. Python SDK
```python
import agentwatch

@agentwatch.monitor
async def my_agent(task):
    # Auto-tracks everything
    result = await task.execute()
    # → Cost: $0.02, Tokens: 6,000, Time: 2.3s
    return result
```

### 4. Node.js SDK
```javascript
import { AgentWatch } from 'agentwatch'

const agent = new AgentWatch({ apiKey: '...' })
agent.monitor(myAgentFunction)
```

### 5. CLI
```bash
# Point to your agent
agentwatch monitor --agent openclaw
agentwatch status
```

---

## Monetization

| Tier | Price | Features |
|------|-------|----------|
| **Developer** | FREE | 1 agent, 10k tokens/day, basic dashboard |
| **Startup** | $49/mo | 5 agents, 500k tokens/day, alerts, 30-day logs |
| **Agency** | $199/mo | 25 agents, unlimited tokens, client reporting |
| **Enterprise** | $999/mo | Unlimited, on-prem, SSO, SLA, dedicated support |

---

## Revenue Model

### Direct Revenue
- Monthly subscriptions
- Enterprise contracts
- Professional services (setup)

### Indirect Revenue (Us)
- Better internal ops → ship faster
- Dogfooding = better product

---

## Competitive Advantage

| Competitor | What They Have | What's Missing |
|------------|----------------|----------------|
| LangSmith | Tracing, dashboards | No cost tracking, no live replay |
| Datadog | Infrastructure | Not AI-native |
| Helicone | OpenAI only | Just proxy, no monitoring |
| AgentOps | Similar idea | Just starting, early |

**Our Edge:**
- Live session replay (watch agent think)
- Agent-first (not API proxy)
- Full-stack (not just OpenAI)
- Built-in cost optimization tips
- Audit trail with rollback

---

## Internal Use

We dogfood AgentWatch to:
1. Monitor Sage/Forge/Check/Deploy
2. Track token costs across all projects
3. Debug failed tasks
4. Generate reports for Harry

---

## Technical Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   OpenClaw  │────▶│  AgentWatch  │────▶│  Dashboard  │
│   Agents    │     │   (MCP)     │     │   (Web)     │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │  Database   │
                    │  (logs,     │
                    │  metrics)   │
                    └─────────────┘
```

---

## MVP Features

### Phase 1: Core (Ship First)
1. MCP server for metrics ingestion
2. Database schema (agents, tasks, metrics, errors)
3. Basic dashboard (list agents, status)
4. Webhook receiver

### Phase 2: Features
5. Token/cost tracking
6. Error grouping
7. Real-time updates (polling)
8. Slack/Discord alerts

### Phase 3: Scale
9. Python SDK
10. Node.js SDK
11. CLI tool
12. Client reporting

### Phase 4: Enterprise
13. SSO
14. Custom dashboards
15. API access
16. On-premise option

---

## Success Metrics

| Metric | Target |
|--------|--------|
| First paid customer | Month 2 |
| Active users | 100 by month 6 |
| MRR | $10k by month 12 |
| Enterprise deals | 2+ by month 12 |
