# AgentCloud IAAS - Specification Document

## 1. Project Overview

- **Project Name**: AgentCloud IAAS
- **Type**: Next.js Single-Page Application (Landing/Pricing Page)
- **Core Functionality**: AI infrastructure pricing calculator and showcase for developers
- **Target Users**: Developers and businesses looking for AI infrastructure solutions

---

## 2. UI/UX Specification

### Layout Structure

- **Header**: Fixed navigation with logo, nav links (Features, Pricing, Get Started)
- **Hero Section**: Full-width hero with headline, subheadline, CTA button
- **Pricing Calculator Section**: Interactive calculator with all options
- **Feature Comparison Section**: Table comparing plan features
- **Signup Form Section**: "Get Started" form (UI only)
- **Footer**: Simple footer with copyright

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

#### Color Palette
- **Background Dark**: `#0a0a0f` (deep space black)
- **Background Card**: `#12121a` (elevated surface)
- **Primary**: `#6366f1` (indigo-500)
- **Primary Hover**: `#818cf8` (indigo-400)
- **Accent**: `#22d3ee` (cyan-400)
- **Text Primary**: `#f8fafc` (slate-50)
- **Text Secondary**: `#94a3b8` (slate-400)
- **Border**: `#1e293b` (slate-800)
- **Success**: `#10b981` (emerald-500)

#### Typography
- **Font Family**: `"Outfit", sans-serif` (Google Fonts)
- **Hero Title**: 56px, font-weight 700, line-height 1.1
- **Section Titles**: 36px, font-weight 600
- **Body**: 16px, font-weight 400
- **Small/Labels**: 14px, font-weight 500

#### Spacing System
- Section padding: 80px vertical, 24px horizontal
- Card padding: 24px
- Element gaps: 16px (small), 24px (medium), 48px (large)

#### Visual Effects
- Cards: subtle border with `border: 1px solid #1e293b`, border-radius 16px
- Buttons: gradient backgrounds, hover scale transform (1.02)
- Calculator: glowing effect on active selections
- Smooth transitions: 200ms ease-out

### Components

#### Header
- Logo text "AgentCloud" with gradient (indigo to cyan)
- Nav links with hover underline animation
- "Get Started" button (mobile: hidden, desktop: visible)

#### Hero Section
- Large headline: "AI Infrastructure for Developers"
- Subheadline: "Build, deploy, and scale your AI agents with enterprise-grade infrastructure"
- Two buttons: "Start Free Trial" (primary), "View Pricing" (outline)
- Animated gradient orbs in background

#### Pricing Calculator
- **Compute Options** (radio buttons):
  - Basic: $29/mo (2 vCPU, 4GB RAM)
  - GPU: $199/mo (1x NVIDIA T4, 16GB VRAM)
- **Tokens Included** (dropdown):
  - 100K tokens: +$0 included
  - 1M tokens: +$49/mo
  - 10M tokens: +$399/mo
- **Add-ons** (checkboxes):
  - Vector Database: +$25/mo
  - Additional Storage (100GB): +$10/mo
- **Total Display**: Large price display with breakdown
- Real-time calculation on any change

#### Feature Comparison Table
- 3 columns: Basic, GPU, Enterprise (add Enterprise as "Contact Us")
- Rows: Compute, Memory, GPU, Token Limit, API Calls, Support, Uptime
- Checkmarks/crosses for feature availability
- GPU column highlighted

#### Signup Form
- Fields: Name, Email, Company (optional), Plan preference
- Submit button: "Create Account"
- Form validation (client-side only, no actual submission)
- Success state animation on "submit"

#### Footer
- Copyright text
- Links: Privacy Policy, Terms of Service

---

## 3. Functionality Specification

### Core Features

1. **Pricing Calculator**
   - Compute selection (single choice)
   - Token tier selection (single choice)
   - Add-ons toggle (multiple choice)
   - Live total calculation
   - Formula: `Total = Compute + Tokens + Addons`

2. **Feature Comparison**
   - Static table with visual indicators
   - Responsive: horizontal scroll on mobile

3. **Signup Form**
   - Client-side validation
   - Visual feedback on validation errors
   - Success message on "submit" (no backend)

### User Interactions
- Hover states on all interactive elements
- Smooth scroll to sections from nav links
- Calculator updates instantly on any change

### Edge Cases
- Default selection: Basic compute, 100K tokens, no add-ons
- Form validates email format
- Form requires name and email minimum

---

## 4. Acceptance Criteria

- [ ] Page loads without errors
- [ ] All sections visible and properly styled
- [ ] Calculator computes correct totals
- [ ] Form validates inputs
- [ ] Responsive on mobile/tablet/desktop
- [ ] Animations are smooth
- [ ] Navigation smooth-scrolls to sections
- [ ] No console errors

---

## 5. Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: CSS Modules + CSS Variables
- **Fonts**: Google Fonts (Outfit)
- **No external dependencies beyond Next.js defaults**
