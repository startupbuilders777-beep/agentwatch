# OpenClaw Lite - Specification

## Project Overview
- **Project Name**: OpenClaw Lite
- **Type**: Next.js Web Application (No-code AI Agent Builder)
- **Core Functionality**: A simple, visual interface for non-technical users to create and manage AI agents without writing code
- **Target Users**: Non-technical users who want to automate tasks using AI agents

---

## UI/UX Specification

### Design System

**Color Palette**
- Primary: `#6366F1` (Indigo-500) - main actions, buttons
- Primary Dark: `#4F46E5` (Indigo-600) - hover states
- Secondary: `#10B981` (Emerald-500) - success, active status
- Accent: `#F59E0B` (Amber-500) - warnings, highlights
- Background: `#0F172A` (Slate-900) - main background
- Surface: `#1E293B` (Slate-800) - cards, panels
- Surface Light: `#334155` (Slate-700) - borders, dividers
- Text Primary: `#F8FAFC` (Slate-50) - headings, primary text
- Text Secondary: `#94A3B8` (Slate-400) - secondary text
- Error: `#EF4444` (Red-500) - errors, delete actions

**Typography**
- Font Family: `"Outfit", sans-serif` (Google Fonts)
- Headings: 
  - H1: 48px, font-weight 700
  - H2: 32px, font-weight 600
  - H3: 24px, font-weight 600
- Body: 16px, font-weight 400
- Small: 14px, font-weight 400
- Caption: 12px, font-weight 500

**Spacing System**
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Border Radius**
- Small: 6px (buttons, inputs)
- Medium: 12px (cards)
- Large: 16px (modals, panels)
- Full: 9999px (pills, avatars)

### Layout Structure

**Responsive Breakpoints**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Navigation**
- Fixed sidebar on desktop (width: 260px)
- Bottom nav on mobile
- Logo at top of sidebar
- Navigation items: Dashboard, Templates, Connect, Settings
- User avatar and name at bottom of sidebar

### Pages

#### 1. Landing Page (`/`)
- Hero section with gradient background (subtle animated particles)
- Headline: "Build AI Agents Without Code"
- Subheadline: "Create powerful automation workflows in minutes. No programming required."
- CTA Button: "Get Started Free" → navigates to dashboard
- Feature cards showing:
  - "Visual Builder" - drag and drop interface
  - "Pre-built Templates" - start from examples
  - "Connect Anything" - email, Slack, APIs
- Animated illustration of agent workflow

#### 2. Dashboard (`/dashboard`)
- Header with page title "Your Agents" and "Create Agent" button
- Stats row: Total Agents, Active, Paused
- Agent cards in grid layout (responsive: 1/2/3 columns)
- Each card shows:
  - Agent icon (emoji)
  - Agent name
  - Task description (truncated)
  - Status badge (Active/Paused)
  - Last run time
  - Action buttons: Run, Edit, Delete

#### 3. Create Agent Modal/Page (`/dashboard/create`)
- Form fields:
  - Agent Name (text input, required)
  - Task Description (textarea, required)
  - Schedule (select: Manual, Hourly, Daily, Weekly)
  - Icon (emoji picker)
- Preview card showing how agent will look
- "Create Agent" and "Cancel" buttons

#### 4. Templates Page (`/templates`)
- Page title: "Start with a Template"
- Grid of template cards (6 templates)
- Each template shows:
  - Icon (emoji)
  - Template name
  - Description
  - "Use Template" button
- Templates:
  1. 📧 Email Summarizer - Summarize daily emails
  2. 📅 Calendar Assistant - Schedule meetings
  3. 💬 Slack Notifier - Alert team on events
  4. 📊 Data Collector - Gather web data
  5. 🤖 Customer Support - Auto-reply to customers
  6. 📝 Content Writer - Generate blog posts

#### 5. Connect Page (`/connect`)
- Page title: "Connect Your Tools"
- List of integration options as cards:
  - Email (Gmail, Outlook)
  - Slack
  - Google Calendar
  - Notion
  - Webhook
- Each card shows:
  - Service icon
  - Service name
  - Connection status (Not Connected / Connected)
  - "Connect" or "Disconnect" button
- Mock connection flow - clicking shows "Coming Soon" toast

### Components

**Button**
- Primary: Indigo background, white text
- Secondary: Transparent, border, white text
- Danger: Red background for delete actions
- States: default, hover (darken 10%), active (darken 15%), disabled (opacity 50%)

**Input**
- Dark background (#1E293B)
- Border on focus (indigo)
- Placeholder text in slate-500

**Card**
- Background: Surface (#1E293B)
- Border: 1px solid #334155
- Hover: slight scale (1.02) and glow

**Badge**
- Active: Emerald background
- Paused: Amber background
- Small rounded pill shape

**Modal**
- Centered overlay
- Dark backdrop (rgba(0,0,0,0.7))
- White/surface background
- Close button top-right

**Toast**
- Bottom-right notification
- Slide-in animation
- Auto-dismiss after 3 seconds

---

## Functionality Specification

### Mock Data
- 5 pre-created agents with varied statuses
- Use localStorage to persist created agents (session only)

### User Interactions
- Click "Create Agent" → open modal
- Fill form → click "Create" → agent appears in dashboard
- Click agent card → view details (future)
- Click "Run" → show "Agent started" toast
- Click "Delete" → confirm dialog → remove agent
- Click template → pre-fill create form
- Click "Connect" on integrations → show "Coming Soon" toast

### Navigation
- Client-side routing with Next.js App Router
- Sidebar highlights current page
- Mobile: bottom tab bar

---

## Acceptance Criteria

1. ✅ Landing page loads with hero, features, and CTA
2. ✅ Dashboard displays agent cards with mock data
3. ✅ Create agent form works and adds new agent
4. ✅ Agent can be deleted with confirmation
5. ✅ Templates page shows 6 pre-built templates
6. ✅ Connect page shows integration options
7. ✅ Responsive design works on mobile/tablet/desktop
8. ✅ All interactions show appropriate feedback (toasts)
9. ✅ No console errors on any page
10. ✅ Smooth animations and transitions throughout
