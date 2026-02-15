# AgentWatch - Business Model Variations

## The Core Problem
We want to track AI agent usage. But HOW do we connect to their agents?

---

## Option 1: API Key Reader (Easiest)

**How:** User gives us their OpenRouter/Anthropic/OpenAI API key. We query their usage.

**Pros:**
- 10-second setup
- Works with ANY agent
- No code needed

**Cons:**
- Only gives totals
- Can't see per-task breakdown
- Rate limits on API queries
- Privacy concerns (giving us keys)

**Pricing:** Free for API key, $29/mo for alerts/dashboards

**Example:**
```
User pastes OpenRouter key
We show: "You've spent $847 this month"
Done.
```

---

## Option 2: MCP Integration (Native)

**How:** Install our MCP server. All agent communication goes through us.

**Pros:**
- Full visibility (per-task, per-agent)
- Native to OpenClaw, Claude Code, etc.
- No API key needed

**Cons:**
- Requires installation
- More complex setup

**Pricing:** Free tier + Pro at $49/mo

---

## Option 3: SDK Wrapper (Developer)

**How:** User wraps their agent in our SDK
```python
import agentwatch

agent = agentwatch.monitor(my_agent)
result = await agent.run(task)
```

**Pros:**
- Most detailed data
- Can track custom metrics
- Works with any agent

**Cons:**
- Requires code changes
- More work for user

**Pricing:** Free + $29/mo for teams

---

## Option 4: Proxy Mode (Invisible)

**How:** User routes their AI calls through our proxy
```
User's App → AgentWatch Proxy → OpenAI
           ↓
        We track everything
```

**Pros:**
- Zero code changes
- Complete visibility
- Can cache, optimize too

**Cons:**
- Privacy concerns
- Latency added
- Trust required

**Pricing:** Based on volume + $99/mo platform

---

## Option 5: Open Source Self-Hosted

**How:** User runs our software on their infrastructure

**Pros:**
- Full control
- No data leaves their server
- Enterprise/privacy focus

**Cons:**
- More setup work
- Support heavy

**Pricing:** Free (self-host) + $499/mo for managed version

---

## Option 6: Browser Extension

**How:** Chrome extension tracks AI usage in browser

**Pros:**
- Clicks, not code
- Quick install
- Tracks ChatGPT, Claude.ai web

**Cons:**
- Limited to browser
- Can't see API-level

**Pricing:** Free + $9/mo premium

---

## Hybrid Approach (Best of All Worlds)

**We offer ALL of these:**

| Connection | Setup Time | Visibility | Price |
|------------|-----------|------------|-------|
| API Key | 10 sec | Limited | Free |
| MCP | 5 min | Full | $29/mo |
| SDK | 1 hour | Complete | $29/mo |
| Proxy | 30 min | Complete | $99/mo |
| Self-host | 1 hour | Complete | Free/$499/mo |
| Extension | 1 min | Basic | Free |

**User chooses based on their needs.**

---

## Revenue Model

### Monthly Recurring

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | 1 source, basic stats |
| **Pro** | $29/mo | Unlimited sources, alerts, 30-day history |
| **Team** | $99/mo | Multiple users, projects, Slack |
| **Enterprise** | $399/mo | SSO, unlimited, dedicated support |

### Usage-Based

| Metric | Price |
|--------|-------|
| API queries tracked | $0.001/query |
| Events/month | $9/10k events |
| Storage | $5/GB/month |

### Enterprise

- Self-hosted: $499/mo + setup fee
- Custom integrations: $5k one-time
- SLA: +$2k/mo

---

## Which Should We Start With?

### Phase 1: API Key Easiest
- Lowest barrier to entry
- Proves demand
- Fastest to build

### Phase 2: MCP Integration
- Native OpenClaw support
- More detailed tracking
- Higher perceived value

### Phase 3: SDK
- Developer-focused
- Most customization
- Community building

---

## Our Recommendation

**Start with API Key + MCP**

| Feature | API Key | MCP |
|---------|---------|-----|
| Setup time | 10 sec | 5 min |
| Visibility | Total only | Per-task |
| Price | Free | $29/mo |
| Users | Anyone with key | OpenClaw users |

**Go-to-market:**
1. "Connect your OpenRouter key in 10 seconds"
2. Show them their usage breakdown
3. Offer MCP for deeper tracking at $29/mo

---

## Competitor Positioning

| Competitor | Our Advantage |
|-----------|--------------|
| **LangSmith** | We're agent-focused, not just tracing |
| **Helicone** | We're more than a proxy |
| **Datadog** | We're AI-native, not retrofitted |
| **OpenTelemetry** | We're easier, ready-to-use |

---

## The Hook

**Landing page:**
```
🤖 Know what your AI agents are doing

See exactly how much you're spending, 
which tasks cost the most, 
and get alerts before budget overruns.

[Connect OpenRouter Key] (Free)
[Get AgentWatch Pro] ($29/mo)
```

**10 seconds later they're using the product.**

---

## Decision Points

1. **Which connection method first?**
   - API Key (fastest adoption) OR
   - MCP (deepest integration)

2. **Pricing?**
   - Simple ($29/mo all-in) OR
   - Usage-based

3. **Open source?**
   - Yes, build community OR
   - No, proprietary

What do you think? Which variation resonates most?
