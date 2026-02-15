# Module 4: Advanced Techniques

## Video Scripts

---

### Lesson 4.1: Custom Skills & Capabilities (10 minutes)

**[INTRO - 1 min]**

Welcome to Module 4! This is where we take your agents from good to great.

In this lesson, you'll learn:
- What custom skills are
- How to build them
- Practical examples for your business

Let's go.

**[WHAT ARE CUSTOM SKILLS - 2 min]**

Custom skills are specialized abilities you add to your agents.

Think of them like apps on your phone:
- Your phone has basic functions (calls, texts)
- Apps add specialized abilities (camera, calendar, games)

Your agent has basic capabilities:
- Reading messages
- Responding to commands
- Running simple tasks

Custom skills add:
- Image analysis
- Data processing
- Third-party integrations
- Industry-specific knowledge

**[SKILL ARCHITECTURE - 3 min]**

Here's how skills work:

```yaml
skill:
  name: "image_analyzer"
  description: "Analyze images and extract information"
  
  # What triggers this skill
  triggers:
    - "analyze image"
    - "what's in this"
    - "describe this photo"
  
  # How it works
  action:
    tool: "image_analysis"
    model: "vision_model"
    
  # What it outputs
  output:
    format: "structured"
    fields:
      - "description"
      - "objects_detected"
      - "text_extracted"
      - "sentiment"
```

**[BUILDING YOUR FIRST SKILL - 3 min]**

Let's build a skill for analyzing screenshots.

```yaml
screenshot_analyzer:
  name: "Screenshot Analyzer"
  description: "Extract information from screenshots"
  
  triggers:
    - keywords: ["analyze", "screenshot", "this image"]
    
  action:
    type: "image_analysis"
    features:
      - "text_extraction"
      - "ui_elements"
      - "error_detection"
      
  response_template: |
    Here's what I found in the image:
    
    📝 **Text Detected:**
    {extracted_text}
    
    🎨 **UI Elements:**
    {ui_elements}
    
    ⚠️ **Potential Issues:**
    {issues}
    
    💡 **Recommendations:**
    {recommendations}
```

**Test it:**

```
User: Analyze this screenshot
[attaches image]

Agent: Here's what I found...
```

**[CUSTOM SKILL EXAMPLES - 2 min]**

Here are skills our students have built:

**1. Competitor Analyzer**
```yaml
competitor_skill:
  name: "Competitor Intelligence"
  
  triggers: ["analyze competitor", "competitor report"]
  
  action:
    tool: "web_search"
    targets: ["{company} website", "{company} social media"]
    
  output: "structured competitor profile"
```

**2. Code Reviewer**
```yaml
code_review_skill:
  name: "AI Code Reviewer"
  
  triggers: ["review code", "check this"]
  
  action:
    tool: "code_analysis"
    checks:
      - "security"
      - "performance"
      - "best_practices"
```

**3. Meeting Notes**
```yaml
meeting_notes_skill:
  name: "Meeting Summarizer"
  
  triggers: ["summarize", "meeting notes"]
  
  action:
    tool: "transcript_analysis"
    output: "action_items"
```

**[CREATING CUSTOM SKILLS - 1 min]**

The formula:

```yaml
custom_skill:
  # 1. Name and describe
  name: "Your Skill Name"
  description: "What it does"
  
  # 2. Define triggers
  triggers:
    - "command 1"
    - "command 2"
    
  # 3. Define the action
  action:
    tool: "tool_name"
    params: {}
    
  # 4. Format output
  output:
    template: "response structure"
```

We'll build more in future lessons.

**[OUTRO - 1 min]**

Next: Connect to external APIs.

---

### Lesson 4.2: API Integrations (12 minutes)

**[INTRO - 1 min]**

This is a game-changer. You'll learn how to connect your agents to external services.

By the end, you'll be able to:
- Pull data from any API
- Send data to external systems
- Build truly connected workflows

Let's go.

**[WHY API INTEGRATIONS MATTER - 2 min]**

APIs let your agents talk to the outside world.

**Without APIs:**
- Agent is isolated
- Limited to internal data
- Can't take real action

**With APIs:**
- Access unlimited data
- Connect to any service
- Automate everything

Real examples:
- CRM: Salesforce, HubSpot
- Payments: Stripe, PayPal
- Communication: Slack, Discord
- Marketing: Mailchimp, ConvertKit

**[API BASICS - 3 min]**

Here's what you need to know:

**Endpoint:** Where to send the request
```
https://api.stripe.com/v1/charges
```

**Method:** What to do
- GET: Retrieve data
- POST: Create something
- PUT: Update something
- DELETE: Remove something

**Headers:** Who you are
```
Authorization: Bearer sk_live_xxxxx
Content-Type: application/json
```

**Body:** What you're sending
```json
{
  "amount": 5000,
  "currency": "usd",
  "customer": "cus_xxx"
}
```

**[CONNECTING AN API - 4 min]**

Let's connect Stripe to your agent.

**Step 1: Store credentials**

```yaml
api_credentials:
  stripe:
    key: "sk_live_xxxxx"
    type: "bearer"
    
  # Store securely!
  # Never hardcode in config
```

**Step 2: Define the integration**

```yaml
integrations:
  stripe:
    base_url: "https://api.stripe.com/v1"
    
    endpoints:
      - name: "get_customer"
        method: "GET"
        path: "/customers/{customer_id}"
        
      - name: "create_charge"
        method: "POST"
        path: "/charges"
        body:
          amount: "{amount}"
          currency: "usd"
          customer: "{customer_id}"
```

**Step 3: Use in your agent**

```yaml
agent:
  commands:
    charge_customer:
      description: "Charge a customer"
      example: "charge customer cus_xxx $50"
      
      action:
        integration: "stripe"
        endpoint: "create_charge"
        params:
          amount: 5000  # in cents
          customer_id: "{args.customer_id}"
          
      response: |
        ✅ Charge created!
        
        Amount: ${amount / 100}
        Status: {charge.status}
        ID: {charge.id}
```

**[REAL-WORLD INTEGRATIONS - 3 min]**

Here are powerful integrations our students use:

**1. HubSpot CRM**
```yaml
hubspot:
  endpoints:
    - create_contact
    - log_deal
    - send_email
    
  use_case: "Automate lead management"
```

**2. Google Sheets**
```yaml
google_sheets:
  endpoints:
    - read_range
    - write_range
    - append_row
    
  use_case: "Track data in real-time"
```

**3. Notion**
```yaml
notion:
  endpoints:
    - create_page
    - update_page
    - query_database
    
  use_case: "Knowledge base automation"
```

**4. Twilio**
```yaml
twilio:
  endpoints:
    - send_sms
    - make_call
    
  use_case: "SMS notifications and alerts"
```

**[SECURITY BEST PRACTICES - 2 min]**

**DO:**
- Use environment variables
- Rotate API keys regularly
- Limit permissions to what's needed
- Store in secure vault

**DON'T:**
- Hardcode keys in config files
- Share keys in messages
- Use production keys in testing
- Grant excessive permissions

```yaml
# Good: Environment variable
api_key: "${STRIPE_API_KEY}"

# Good: Limited permissions
permissions:
  - "read:customers"
  - "write:charges"
  # Don't add: "delete:everything"
```

**[OUTRO - 1 min]**

Next: Webhooks for real-time updates.

---

### Lesson 4.3: Webhooks & Real-Time Data (11 minutes)

**[INTRO - 1 min]**

APIs are great for pulling data. Webhooks are better for getting data in real-time.

In this lesson:
- What webhooks are
- How to set them up
- Practical use cases

Let's go.

**[WHAT ARE WEBHOOKS - 2 min]**

**APIs:** You ask for data → You get data
- Pull-based
- You control timing
- Can miss real-time events

**Webhooks:** Data comes to you → You react
- Push-based
- Instant notifications
- Always up to date

**Real example:**

Without webhooks (API polling):
```
You: "Any new orders?"
API: "Let me check... Yes, one from 10 minutes ago"
```

With webhooks:
```
Stripe: "New order just happened!"
Your agent: "Let me process it NOW"
```

**[HOW WEBHOOKS WORK - 3 min]**

Here's the flow:

```
External Service          Your Agent
     │                         │
     │  1. Event happens       │
     │  "New order!"           │
     │───────POST─────────────→│
     │                         │  2. Process event
     │                         │  3. Take action
     │                         │
```

**Webhook payload:**
```json
{
  "event": "order.created",
  "timestamp": "2026-02-13T10:30:00Z",
  "data": {
    "order_id": "ord_123",
    "customer": "john@example.com",
    "amount": 9900
  }
}
```

**[SETTING UP WEBHOOKS - 3 min]**

Let's set up a Stripe webhook.

**Step 1: Create endpoint**

```yaml
webhooks:
  stripe:
    endpoint: "/webhooks/stripe"
    description: "Receive Stripe events"
    
    events:
      - "order.created"
      - "order.completed"
      - "customer.subscription.created"
      - "customer.subscription.deleted"
      
    security:
      verify_signature: true
      secret: "${STRIPE_WEBHOOK_SECRET}"
```

**Step 2: Handle events**

```yaml
webhook_handlers:
  stripe:
    order.created:
      action: "process_new_order"
      steps:
        - "extract_order_details"
        - "update_database"
        - "send_confirmation"
        - "notify_sales_team"
        
    customer.subscription.created:
      action: "activate_subscription"
      steps:
        - "verify_payment"
        - "add_to_authorized_users"
        - "send_welcome_email"
```

**Step 3: Verify signature**

```yaml
security:
  stripe:
    verification:
      enabled: true
      header: "Stripe-Signature"
      secret: "${STRIPE_WEBHOOK_SECRET}"
```

**[PRACTICAL USE CASES - 2 min]**

**1. New Lead Notifications**
```yaml
webhook:
  provider: "Typeform"
  event: "form_response"
  
  action: "process_lead"
  steps:
    - "extract_answers"
    - "add_to_crm"
    - "send_intro_sequence"
```

**2. Social Media Mentions**
```yaml
webhook:
  provider: "Twitter"
  event: "mention"
  
  action: "process_mention"
  steps:
    - "analyze_sentiment"
    - "respond_if_positive"
    - "flag_for_review_if_negative"
```

**3. GitHub Activity**
```yaml
webhook:
  provider: "GitHub"
  events:
    - "issues.opened"
    - "pull_request.merged"
    
  action: "notify_team"
```

**[TESTING WEBHOOKS - 1 min]**

Use a webhook testing service during development:

```yaml
dev_webhook:
  provider: "Webhook.site"
  url: "https://webhook.site/xxx"
  
  # See all incoming requests
  # Test without affecting production
```

**[OUTRO - 1 min]]

Next: Building agent memory that persists.

---

### Lesson 4.4: Agent Memory & Context (10 minutes)

**[INTRO - 1 min]**

This is crucial for building smart agents. You'll learn how to give your agents memory.

By the end:
- How agent memory works
- Short-term vs long-term memory
- Build a memory system

Let's go.

**[THE MEMORY PROBLEM - 2 min]**

Without memory:

```
User: "My name is John"
Agent: "Nice to meet you, John!"

[Conversation restarts]

User: "What's my name?"
Agent: "I don't know!"
```

Agents forget everything between conversations.

With memory:

```
User: "My name is John"
Agent: "Nice to meet you, John!"

[Conversation restarts]

User: "What's my name?"
Agent: "Your name is John!"
```

**[TYPES OF MEMORY - 3 min]**

**1. Short-Term (Context)**
- Current conversation
- Temporary variables
- Cleared after session

**2. Long-Term (Persistent)**
- User preferences
- Past interactions
- Business data
- Never forgotten

**3. Working (Session)**
- Current task progress
- Intermediate results
- Cleared after task

```yaml
memory:
  short_term:
    # Available during conversation
    - "current_topic"
    - "pending_questions"
    - "conversation_context"
    
  long_term:
    # Persists forever
    - "user_profiles"
    - "business_data"
    - "preferences"
    - "history"
    
  working:
    # Task-specific
    - "task_progress"
    - "partial_results"
```

**[BUILDING MEMORY SYSTEM - 3 min]**

Let's build a user memory system.

**Step 1: Define what to remember**

```yaml
user_memory:
  fields:
    - name: "user_id"
      type: "string"
      required: true
      
    - name: "name"
      type: "string"
      learn_from: "my name is {name}"
      
    - name: "preferences"
      type: "object"
      learn_from: "I prefer {preference}"
      
    - name: "interaction_count"
      type: "number"
      auto_increment: true
      
    - name: "last_interaction"
      type: "timestamp"
      auto_update: true
      
    - name: "notes"
      type: "array"
      learn_from: "remember that {note}"
```

**Step 2: Store memory**

```yaml
memory_storage:
  type: "database"
  backend: "sqlite"  # or postgres, etc.
  
  tables:
    users:
      fields: "user_memory fields"
      
    interactions:
      fields:
        - "user_id"
        - "timestamp"
        - "message"
        - "agent_response"
        - "sentiment"
```

**Step 3: Use in agent**

```yaml
agent:
  memory:
    on_start:
      - "load_user_profile"
      - "load_recent_history"
      
    during_conversation:
      - "update_context"
      - "extract_new_facts"
      
    on_end:
      - "save_to_history"
      - "update_profile"
```

**[PRACTICAL EXAMPLE - 2 min]**

```
User: "Hey, my name is John and I run a SaaS company"

Agent: [Learns and stores]
{
  "name": "John",
  "business_type": "SaaS"
}

[Later conversation]

User: "What do you know about me?"

Agent: "You told me your name is John and you run a SaaS company!"
```

**Configuration:**

```yaml
learning:
  enabled: true
  
  extract_from:
    - "user messages"
    - "explicit statements"
    - "implied preferences"
    
  ignore:
    - "casual conversation"
    - "questions"
    - "greetings"
```

**[MEMORY BEST PRACTICES - 1 min]**

**Do:**
- Ask permission to remember sensitive info
- Allow users to delete their data
- Encrypt personal information
- Back up regularly

**Don't:**
- Remember everything indiscriminately
- Store passwords or payment info
- Share memory across users
- Forget to implement deletion

```yaml
privacy:
  pii_handling:
    - "Don't store without consent"
    - "Encrypt sensitive data"
    - "Allow data export/deletion"
```

**[OUTRO - 1 min]**

Next: Putting it all together with advanced workflows.

---

### Lesson 4.5: Advanced Workflows & Automation (11 minutes)

**[INTRO - 1 min]**

Let's put everything together. You'll build complex automation workflows.

**[COMPLEX WORKFLOW EXAMPLE - 4 min]**

Here's a production workflow combining everything:

**Lead Capture → Qualification → Nurture → Sale**

```yaml
lead_automation_workflow:
  name: "Complete Lead System"
  
  # TRIGGER: New form submission
  trigger:
    source: "webhook"
    event: "form_submission"
    
  # STAGE 1: Capture & Store
  stage_1:
    name: "Capture Lead"
    
    steps:
      - extract_data:
          fields: ["name", "email", "company", "budget", "timeline"]
          
      - create_lead:
          system: "hubspot"
          data: "{extracted_data}"
          
      - analyze_fit:
          criteria:
            budget: "> 1000"
            timeline: "< 90 days"
          output: "fit_score"
          
  # STAGE 2: Research
  stage_2:
    name: "Research Lead"
    condition: "fit_score >= 7"
    
    parallel_tasks:
      - research_company:
          action: "web_search"
          query: "{company} company news"
          
      - find_decision_maker:
          action: "linkedin_search"
          company: "{company}"
          
      - find_common_connections:
          action: "find_connections"
          company: "{company}"
          
  # STAGE 3: Personalize Outreach
  stage_3:
    name: "Personalized Outreach"
    
    steps:
      - generate_email:
          template: "outreach_sequence"
          personalization:
            - "company_research"
            - "common_connections"
            - "specific_need"
            
      - send_email:
          system: "hubspot"
          template: "cold_outreach"
          
  # STAGE 4: Follow-up & Close
  stage_4:
    name: "Follow-up Sequence"
    
    schedule:
      - "day 1": "Initial outreach"
      - "day 3": "Follow-up if no response"
      - "day 7": "Value add (article)"
      - "day 14": "Last attempt"
      
    conditions:
      - if "replied": "move_to_deals"
      - if "opened": "increase_engagement_score"
      - if "not_opened": "try_different_approach"
```

**[WORKFLOW DESIGN PRINCIPLES - 3 min]**

**1. Single Responsibility**
Each step does one thing well.

**2. Error Handling**
Every step has a fallback.

```yaml
error_handling:
  step: "create_lead"
  on_failure:
    - retry: 3
    - alert: "admin"
    - fallback: "log_to_spreadsheet"
```

**3. Logging**
Track everything for debugging.

```yaml
logging:
  every_step: true
  include:
    - "input_data"
    - "output_data"
    - "execution_time"
    - "errors"
    
  retention: 90 days
```

**4. Monitoring**
Know when things break.

```yaml
monitoring:
  alerts:
    - "workflow_fails"
    - "execution_time > 5 min"
    - "error_rate > 10%"
    
  dashboards:
    - "success_rate"
    - "avg_execution_time"
    - "leads_converted"
```

**[BUILDING CONDITIONAL LOGIC - 2 min]**

Use conditions to make workflows smart:

```yaml
conditions:
  # Simple
  - if: "budget > 10000"
    then: "route_to_enterprise_team"
    
  # Compound
  - if: "budget > 10000 AND timeline < 30"
    then: "priority_queue"
    
  # Complex
  - if: "fit_score > 8 AND (referral OR organic_source)"
    then: "fast_track"
    else: "standard_nurture"
```

**[REAL-TIME ADAPTATION - 2 min]**

Workflows can adapt based on results:

```yaml
adaptive_workflow:
  name: "Learning Content System"
  
  stages:
    - generate_content:
        output: "content_draft"
        
    - test_content:
        variant_a: "{content_draft}"
        
    - measure_engagement:
        metrics: ["opens", "clicks", "replies"]
        
    - adapt:
        if_engagement > 20%:
          - "scale_distribution"
        if_engagement < 5%:
          - "regenerate_with_feedback"
        else:
          - "try_different_angle"
```

**[OUTRO - 1 min]**

That wraps Module 4!

**RECAP:**
- Custom skills
- API integrations
- Webhooks
- Agent memory
- Advanced workflows

**Next: Module 5 - Monetization**

You'll learn how to turn your AI skills into income.

---

## Module 4 Summary (2 minutes)

**[RECAP]**

This module covered:

1. **Custom Skills** - Adding specialized capabilities to agents

2. **API Integrations** - Connecting to external services (Stripe, HubSpot, etc.)

3. **Webhooks** - Real-time event handling

4. **Agent Memory** - Persistent storage of user data and context

5. **Advanced Workflows** - Complex automation combining everything

**[PREVIEW]**

Module 5 is where the money comes in:
- Finding clients
- Pricing your services
- Building recurring revenue
- Scaling your business

**[CALL TO ACTION]**

Pick ONE technique from this module and implement it this week.

See you in Module 5!
