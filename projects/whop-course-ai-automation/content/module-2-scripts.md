# Module 2: Building Production AI Agents

---

## Lesson 2.1: Research Automation (10 minutes)

**[INTRO - 1 min]**

Welcome to Module 2! This is where we move from basics to building real, production-ready AI agents.

In this lesson, you'll learn:
- How to automate research tasks
- Build agents that search, summarize, and synthesize information
- Create your own research assistant

Let's dive in.

**[WHY RESEARCH AUTOMATION - 2 min]**

Think about how much time you spend researching:
- Competitor analysis
- Industry news
- Product reviews
- Market trends

What if an AI could do 80% of that work for you?

That's what research automation does.

Real example: A course creator uses a research agent to:
- Monitor 20 competitor websites
- Summarize new content weekly
- Alert on pricing changes

Saves them 10+ hours per week.

**[BUILDING YOUR FIRST RESEARCH AGENT - 4 min]**

Here's the architecture:

```
User Request → Agent → Web Search → Summarize → Present Results
```

Let me show you how to build one in OpenClaw.

**Step 1: Configure the research trigger**

```yaml
commands:
  research:
    description: "Research any topic"
    example: "research AI trends 2026"
    prompt: |
      The user wants to research: {query}
      
      1. Search for current information on this topic
      2. Find at least 3 reliable sources
      3. Summarize key findings in 3-5 bullet points
      4. Include relevant URLs
```

**Step 2: Add web search capability**

```yaml
actions:
  search_web:
    tool: web_search
    params:
      query: "{query}"
      count: 5
```

**Step 3: Summarize and present**

The agent automatically synthesizes results into clean, readable format.

**[LIVE DEMO - 2 min]**

Let me show a real research agent in action.

I'd type: "research best AI tools for small business"

And the agent returns:
- Top 5 tools with pricing
- Key features
- Pros and cons
- Links to learn more

**[CUSTOMIZATION - 1 min]**

Make your research agent smarter:

1. **Add specific sources** - Tell it to prioritize certain sites
2. **Filter by date** - Only recent information
3. **Industry focus** - Customize prompts for your niche

```yaml
prompts:
  research:
    additional_context: |
      Focus on small business use cases.
      Prioritize free/low-cost options.
      Include real user reviews.
```

**[WRAP UP - 1 min]**

Key takeaways:
- Research agents save hours every week
- Build once, use forever
- Customize for your specific needs

Next: How to build content pipelines.

---

## Lesson 2.2: Content Pipelines (12 minutes)

**[INTRO - 1 min]**

This is one of the most powerful use cases for AI agents: content automation.

By the end of this lesson, you'll know how to:
- Automate content creation
- Build content pipelines
- Scale your output without scaling effort

Let's go.

**[THE CONTENT PROBLEM - 2 min]**

Content is king, but it's also:
- Time-consuming to create
- Expensive to outsource
- Hard to scale consistently

Here's the reality: Most creators spend 80% of time creating, 20% on distribution.

What if you could flip that?

AI content pipelines let you:
- Generate first drafts instantly
- Repurpose content across platforms
- Maintain consistent quality
- Scale to 10x output

**[CONTENT PIPELINE ARCHITECTURE - 3 min]**

Here's what a full content pipeline looks like:

```
Ideas → Draft → Edit → Format → Publish → Distribute
   ↑                                            |
   └──────────── Feedback Loop ←───────────────┘
```

Each step can be AI-assisted or automated.

**The simplest version:**

```yaml
content_pipeline:
  triggers:
    - schedule: "daily 9am"
    - command: "create content"
  
  steps:
    1:
      name: "generate_ideas"
      action: "brainstorm_topics"
    2:
      name: "write_draft"
      action: "create_post"
    3:
      name: "format"
      action: "apply_template"
    4:
      name: "publish"
      action: "post_to_discord"
```

**[BUILDING A BLOG POST GENERATOR - 4 min]**

Let's build a practical example: A blog post generator.

**Step 1: Define the input**

```yaml
commands:
  blog:
    description: "Generate a blog post"
    example: "blog 10 tips for productivity"
    prompt: |
      Create a comprehensive blog post about: {topic}
      
      Requirements:
      - 800-1200 words
      - Use engaging, conversational tone
      - Include 5-7 subheadings
      - Add a call to action at the end
```

**Step 2: Add SEO optimization**

```yaml
blog:
  seo:
    include_keywords: true
    meta_description: auto
    internal_links: suggested
```

**Step 3: Multi-format output**

```yaml
outputs:
  - format: "markdown"
    save_to: "content/blog/{topic}.md"
  - format: "social"
    platforms: ["twitter", "linkedin"]
    length: optimal
```

**[REAL WORLD EXAMPLE - 1 min]**

A marketing agency uses this pipeline to:
1. Generate 5 blog posts per week
2. Auto-post to their website
3. Create social snippets for each
4. Schedule everything in advance

Output: 50 pieces of content per month
Time investment: 2 hours per month

**[CONTENT REPURPOSING - 1 min] pro tip: One**

Here's a piece of content → Many formats.

```yaml
repurpose:
  input: "blog_post"
  
  outputs:
    - "twitter_thread"
    - "linkedin_post"
    - "newsletter"
    - "video_script"
    - "email_sequence"
```

The agent takes your main content and adapts it for each platform automatically.

**[QUALITY CONTROL - 1 min]**

Always add a human review step:

```yaml
pipeline:
  steps:
    - generate
    - review  # Human reviews before publish
    - publish
```

AI creates drafts, you perfect and publish.

**[WRAP UP - 1 min]**

Key takeaways:
- Content pipelines 10x your output
- Start simple, iterate
- Always include human review

Next: Customer support bots.

---

## Lesson 2.3: Customer Support Bots (11 minutes)

**[INTRO - 1 min]**

Now let's build something that directly impacts revenue: A customer support bot.

You'll learn:
- How to automate support without losing quality
- Build bots that handle common questions
- Escalate complex issues to humans

Let's do this.

**[SUPPORT AUTOMATION PRINCIPLES - 2 min]**

Here's the truth about support bots:

**What they do well:**
- Answer common questions 24/7
- Gather information before handoff
- Route to the right person
- Provide instant responses

**What they can't do:**
- Handle complex edge cases
- Understand tone perfectly
- Replace human empathy

**The golden rule:** Automate the repetitive, humanize the relationship.

**[BOT ARCHITECTURE - 3 min]**

Here's the support bot structure:

```
Customer Message → Intent Detection → Knowledge Base → Response
                                              ↓
                                    No match found → Human
```

**Level 1: FAQ Bot**
- Answers common questions
- Links to resources
- Limited but reliable

**Level 2: Smart Support Bot**
- Understands context
- Searches knowledge base
- Handles variations

**Level 3: Hybrid Bot**
- AI + Human handoff
- Learns from interactions
- Continuous improvement

**[BUILDING A SUPPORT BOT - 4 min]**

Let's build Level 2 - a smart support bot.

**Step 1: Define intents**

```yaml
support_bot:
  intents:
    - name: "pricing"
      examples:
        - "how much does it cost"
        - "pricing plans"
        - "how much"
      response: |
        Here's our pricing:
        - Starter: $29/mo
        - Pro: $79/mo
        - Enterprise: Custom
        
        Which would you like to learn more about?
    
    - name: "refund"
      examples:
        - "can I get a refund"
        - "money back"
        - "not satisfied"
      response: |
        I'm sorry to hear that! We offer a 30-day money-back guarantee.
        
        Would you like me to process a refund, or would you prefer to talk to our team first?
    
    - name: "technical_issue"
      examples:
        - "not working"
        - "error"
        - "bug"
      response: |
        I'm sorry you're experiencing issues. Let me gather some info...
        
        What exactly is happening? And what device/browser are you using?
```

**Step 2: Add knowledge base search**

```yaml
knowledge_base:
  source: "content/help-docs.md"
  search: semantic
  
  fallback_response: |
    I'm not certain about that specific question.
    
    Would you like me to:
    - Connect you with our support team
    - Search our full documentation
    - Create a ticket for follow-up
```

**Step 3: Human handoff**

```yaml
handoff:
  trigger: "customer says 'talk to human'"
  action: "create_ticket"
  notify: "#support-team"
  
  also_trigger:
    - "3 failed responses"
    - "sentiment: frustrated"
```

**[SETTING EXPECTATIONS - 1 min]**

Your bot should be honest:

```yaml
greeting: |
  Hi! I'm an AI assistant here to help.
  
  I can answer common questions instantly.
  If you need more help, just say "talk to human" and our team will jump in.
  
  What can I help you with today?
```

**[MEASURING SUCCESS - 1 min]**

Track these metrics:

- **Deflection rate**: % of issues resolved without human
- **Satisfaction score**: Customer feedback after support
- **Response time**: How fast the bot responds
- **Escalation quality**: Are handoffs appropriate?

**[WRAP UP - 1 min]**

Key takeaways:
- Support bots handle 70% of questions automatically
- Build knowledge base first
- Always have human fallback

Next: Reporting and summaries.

---

## Lesson 2.4: Reporting & Summaries (10 minutes)

**[INTRO - 1 min]**

The final piece of the puzzle: Automated reporting.

In this lesson, you'll build agents that:
- Pull data from multiple sources
- Generate insights automatically
- Deliver reports on schedule

Let's go.

**[WHY AUTOMATE REPORTS - 2 min]**

Think about your reporting:

- Weekly team updates
- Client reports
- Analytics summaries
- Sales dashboards

Most of this is repetitive. The data changes, the format doesn't.

AI reporting agents:
- Pull latest data
- Generate insights
- Format beautifully
- Deliver on schedule

What took hours now takes minutes.

**[REPORTING ARCHITECTURE - 2 min]**

Here's the structure:

```
Data Sources → Aggregation → Analysis → Formatting → Delivery
```

**Data sources:**
- Discord analytics
- Google Analytics
- API integrations
- Manual inputs

**Delivery methods:**
- Discord message
- Email
- Scheduled post

**[BUILDING A REPORTING AGENT - 4 min]**

Let's build a weekly stats report.

**Step 1: Define the report structure**

```yaml
weekly_report:
  schedule: "every monday 9am"
  
  data_sources:
    - discord_analytics
    - sales_data
    - support_metrics
  
  sections:
    - name: "overview"
      prompt: |
        Summarize the key metrics for {date_range}
        
        Include:
        - Total activity
        - Growth % vs last week
        - Notable changes
        
    - name: "highlights"
      prompt: |
        What were the top 3 wins this week?
        
    - name: "action_items"
      prompt: |
        What should the team focus on next week?
```

**Step 2: Configure data pulling**

```yaml
data:
  discord:
    metrics:
      - member_count
      - messages_count
      - active_users
      - channel_activity
  
  sales:
    metrics:
      - new_customers
      - revenue
      - churn
```

**Step 3: Format the output**

```yaml
format:
  style: "markdown"
  template: |
    📊 **{server_name} Weekly Report**
    📅 {date_range}
    
    ## Overview
    {overview_content}
    
    ## Highlights
    {highlights_content}
    
    ## Action Items
    {action_items_content}
    
    ---
    *Generated by AI* | *{timestamp}*
```

**[CUSTOM REPORT TYPES - 2 min]**

Here are other reports you can build:

**Client Report:**
```yaml
client_report:
  trigger: "monthly"
  audience: "external"
  
  sections:
    - work_completed
    - metrics_improvement
    - next_month_plans
```

**Analytics Digest:**
```yaml
analytics_digest:
  trigger: "daily"
  
  sections:
    - traffic_summary
    - top_content
    - anomalies
```

**Meeting Notes:**
```yaml
meeting_summary:
  trigger: "after_meeting"
  input: "transcript"
  
  output:
    - key_decisions
    - action_items
    - owner_deadlines
```

**[SCHEDULING - 1 min]**

Set up automated delivery:

```yaml
delivery:
  schedule:
    - "daily 8am"
    - "monday 9am"
    - "first_of_month 9am"
  
  channels:
    - "#general"
    - direct_message
  
  format: "embed"
```

**[WRAP UP - 1 min]**

Key takeaways:
- Reports save hours every week
- Build once, run forever
- Customize for your audience

---

## Module 2 Summary (3 minutes)

**[RECAP]**

This module covered:

1. **Research Automation** - Build agents that search, summarize, and synthesize information from the web

2. **Content Pipelines** - Automate content creation from ideas to publish across multiple formats

3. **Customer Support Bots** - Create intelligent support systems that handle common questions and escalate when needed

4. **Reporting & Summaries** - Build automated reporting that delivers insights on schedule

**[PREVIEW]**

Module 3 gets even more advanced:
- Multi-agent systems
- Advanced integrations
- Custom workflows
- Scaling strategies

**[CALL TO ACTION]**

Pick ONE of these four topics and build it this week.

Don't try to do everything at once. Master one, then move to the next.

Start with what will save you the most time.

See you in Module 3!
