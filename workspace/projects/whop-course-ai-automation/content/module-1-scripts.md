# Module 1: Foundations of AI Automation
## Video Scripts

---

### Lesson 1.1: What Are AI Agents? (8 minutes)

**[INTRO - 1 min]**
Hey everyone! Welcome to Module 1. I'm excited to start here because we're going to build the foundation that everything else sits on.

Here's what you'll learn:
- What AI agents actually are
- How they differ from regular automation
- Why this matters for your business

Let's get started.

**[EXPLANATION - 4 min]**

So what IS an AI agent?

Think of it like this: Regular automation is like a robot following a recipe. It does exactly what you tell it, step by step. But if something unexpected happens, it freezes.

An AI agent is more like a smart intern. You give them a goal, and they figure out how to get there. They can:
- Understand context
- Make decisions
- Learn from feedback
- Handle Curveballs

The simplest definition: An AI agent is a program that uses AI to accomplish a goal, with the ability to take action.

Let me show you the difference with a real example.

**[EXAMPLE - 2 min]**

Scenario: You want to summarize customer emails.

**Traditional Automation:**
- Rule: If email contains "complaint" → forward to manager
- Problem: It misses context, can't handle nuance

**AI Agent:**
- Goal: "Summarize each customer email and categorize the sentiment"
- It reads the email, understands the tone, identifies the issue, and creates a summary
- It handles typos, slang, complex sentences

That's the power.

**[WRAP UP - 1 min]**

Key takeaways:
- AI agents = goal-oriented AI programs
- They think, decide, adapt
- They're the future of automation

Next up: We'll look at the AI agent landscape and where OpenClaw fits in.

---

### Lesson 1.2: The AI Agent Landscape (10 minutes)

**[INTRO - 1 min]**

In this lesson, I'll give you a tour of the AI agent ecosystem. You'll understand:
- The major players
- Their strengths and weaknesses
- Why we're focusing on OpenClaw

Let's go.

**[OVERVIEW - 3 min]**

Here's the current landscape:

**Consumer Level:**
- ChatGPT - Great for conversation, limited actions
- Claude - Excellent reasoning, but passive
- Gemini - Google integration, evolving

**Developer Level:**
- OpenAI Assistants API - Powerful but expensive
- LangChain - Flexible, steep learning curve
- AutoGen - Microsoft backed, complex

**Automation Level:**
- Zapier AI - Limited customization
- Make.com - Visual but expensive
- OpenClaw - Open source, customizable, Discord-native

**[DEEP DIVE - 4 min]**

Let me compare the top options for YOUR use case:

| Tool | Best For | Weakness |
|------|----------|----------|
| ChatGPT | Quick tasks | Can't take actions |
| Zapier | Simple automations | Gets expensive fast |
| OpenAI API | Custom builds | Need dev skills |
| OpenClaw | Discord-first, no-code | Newer, smaller community |

**Why OpenClaw for this course:**

1. **Free to start** - No per-message costs
2. **Discord native** - Most teams already there
3. **Highly customizable** - Build exactly what you need
4. **Active development** - New features weekly
5. **Open source** - You own it

**[PRACTICAL - 1 min]**

Here's what we'll build in this course using OpenClaw:
- Research agents
- Content generators  
- Support bots
- Full automation systems

No coding required (mostly).

**[OUTRO - 1 min]**

Next: Let's get OpenClaw installed and your first agent running.

---

### Lesson 1.3: Setting Up Your First Agent (12 minutes)

**[INTRO - 1 min]**

This is the hands-on lesson. By the end, you'll have a working AI agent connected to Discord.

Let's do this.

**[PREREQS - 2 min]**

What you need:
1. Node.js installed (I'll show how)
2. Discord account
3. 10 minutes

I'll walk you through each step.

**[STEP 1: Install - 3 min]**

Open your terminal (Mac: Terminal, Windows: Command Prompt)

```bash
# Check if Node is installed
node --version

# If not installed, go to nodejs.org and download LTS
```

Then:

```bash
# Install OpenClaw
npm install -g openclaw

# Verify
openclaw --version
```

Easy.

**[STEP 2: Configure - 3 min]**

```bash
openclaw configure
```

This starts the wizard. I'll show you what to enter:
- Choose Discord
- Create bot (I'll show where)
- Connect to your server

I'll do a live demo here.

**[STEP 3: Connect Discord - 3 min]**

1. Go to discord.com/developers
2. New Application
3. Bot → Reset Token
4. Enable Message Content Intent
5. OAuth2 → URL Generator → Select "bot" → Copy URL
6. Add to your server

I'll show the exact settings.

**[TEST - 1 min]**

Send "hello" in your Discord.

Your agent should respond!

**[TROUBLESHOOTING - 1 min]**

Common issues:
- Bot not responding → Check permissions
- Command not found → Restart the service

I'll show quick fixes.

**[OUTRO - 1 min]**

You now have a working AI agent!

Next lesson: Get your agent to do something useful.

---

### Lesson 1.4: Your First Useful Task (10 minutes)

**[INTRO - 1 min]**

Now for the fun part. Let's get your agent to do actual work.

We'll build: An automatic responder that greets new members.

**[CONCEPT - 2 min]**

Here's the flow:
1. New member joins Discord
2. Agent detects join event
3. Agent sends personalized welcome
4. Agent asks what they need help with

Simple but powerful.

**[SETUP - 4 min]**

In your OpenClaw config:

```yaml
triggers:
  - event: member_join
    action: welcome_new_member
```

Then define the action:

```
welcome_new_member:
  response: "Hey {user}! Welcome to {server}. What brings you here today?"
```

I'll show the exact YAML.

**[CUSTOMIZE - 2 min]**

Make it yours:
- Change the greeting
- Add your server name
- Include helpful links
- Ask relevant questions

**[ADVANCED - 1 min]**

You can also:
- Send to specific channels
- Add to role
- Create intro thread

**[OUTRO - 1 min]**

That's your first automation!

Next: We go deeper into prompts and commands.

---

### Module 1 Summary (3 minutes)

**[RECAP]**

This module you learned:
1. What AI agents are (and why they matter)
2. The AI agent landscape (and why OpenClaw)
3. How to set up your first agent
4. How to build your first useful automation

**[PREVIEW]**

Module 2 is where it gets exciting. We'll cover:
- Research automation
- Content pipelines
- Customer support bots
- Reporting systems

Each one you can implement immediately.

**[CALL TO ACTION]**

Don't just watch - implement! Set up your agent this week.

See you in Module 2.
