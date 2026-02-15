# How MCP Actually Works - Simple Explanation

## What is MCP?

**MCP = Model Context Protocol**

Think of it like USB-C for AI agents. Just like USB-C lets your phone connect to any charger/headphones, MCP lets any AI agent connect to any service (like us).

---

## Without MCP (The Old Way)

```
You: "Hey AI, do X"

AI: Does X
   (no one is watching)
   
You: "What did you spend?"

AI: "No idea"
```

---

## With MCP (Our Way)

```
You: "Hey AI, do X"

AI: → Does X
   → Tells AgentWatch: "I did X, used 500 tokens, cost $0.02"
   → We record everything

You check AgentWatch dashboard:
→ Total spend: $847 this month
→ This task: $0.02
→ Agent is working ✓
```

---

## But Wait - How Does It Actually Connect?

### Option A: Install Our MCP Server

You run this command:
```bash
npm install @agentwatch/mcp-server
```

Then your AI agent (OpenClaw, Claude Code, etc.) routes through us.

```
Your Agent → AgentWatch MCP → OpenAI/Anthropic → Response → You
              ↓
         We record everything
```

### Option B: We Become The Middleman

Instead of:
```
You → OpenAI: "Write me a poem"
```

You do:
```
You → AgentWatch → OpenAI: "Write me a poem"
         ↓
    We see everything
    We forward to OpenAI
    We get the response
    We give it to you
```

---

## What Does "Route Through AgentWatch" Mean?

### Before (No AgentWatch):
```
You (via OpenClaw) ──────→ OpenAI API
                              ↑
                          (OpenAI sees request)
```

### With AgentWatch MCP:
```
You (via OpenClaw) ──→ AgentWatch ──→ OpenAI API
                            ↓
                       (We see & log everything)
                       (Then forward to OpenAI)
```

---

## Does This Slow Things Down?

**Minimal impact:**
- We add ~50ms latency (unnoticeable)
- We're a thin proxy (just forward + log)

---

## What We Actually See

When they route through us:

```json
{
  "timestamp": "2026-02-13T20:00:00Z",
  "agent": "sage",
  "task": "Write blog post",
  "model": "gpt-4",
  "input_tokens": 1200,
  "output_tokens": 800,
  "cost": "$0.08",
  "duration_ms": 3200,
  "success": true
}
```

---

## User Experience

### For OpenClaw Users:
1. Install our skill:
```bash
openclaw install agentwatch
```

2. Add API key in config:
```yaml
agentwatch:
  api_key: "your-key"
```

3. That's it! All tasks now tracked automatically.

### For Other Agents:
1. Install MCP server
2. Point their config to us
3. Done

---

## But Wait - What If They Don't Want To Route Through Us?

### Alternative: Just Give Us API Key

We query OpenRouter's API (not their key) to get usage:
```
We call OpenRouter: "Give me usage for this key"
OpenRouter: "Here's the data"
We show it in dashboard
```

**Pros:** No routing through us
**Cons:** Only totals, no per-task detail

---

## The Two Options Summary

| Method | Setup | What We See | Speed |
|--------|-------|-------------|-------|
| **API Key** | Paste key | Totals only | Fast |
| **MCP Route** | Install skill | Everything | ~50ms slower |

---

## So Yes - They Route Through Us

But it's:
- ✅ Transparent (they see we're logging)
- ✅ Optional (can use API key for basic)
- ✅ Minimal slowdown
- ✅ WAY more detailed data

---

## Is This Trustworthy?

We emphasize:
- We DON'T use their data
- We DON'T train models
- We DON'T see their prompts/content (just metadata)
- Enterprise: can self-host

---

## Does This Help?

Want me to explain anything more simply?
