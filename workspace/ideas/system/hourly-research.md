# Hourly SaaS + iOS Ideas System

## Overview
Automated hourly research that scans trends and posts business/app ideas to #ideas channel.

## Current Status
- Cron job: Every hour (hourly)
- Research sources: Web search (Brave), Google Trends, Reddit, Hacker News
- Output: 2 SaaS business ideas + 1 iOS app idea per hour

## Requirements
- Brave Search API key for real-time web searches
- Alternative: Mac mini with browser for App Store scraping

## Cron Job Config
- Job ID: 8282c3f5-26f0-4878-94b6-1e0fb5b4ff94
- Channel: #ideas (1471824941925142589)
- Schedule: Every 1 hour

## Research Prompt
```
1. WEB SEARCH: Search for 'trending iOS apps this week', 'top App Store keywords 2026', 'rising mobile app trends', 'most downloaded iOS apps this month'

2. GOOGLE TRENDS: Check trending searches in categories: Mobile, Business, Productivity, AI apps, Finance

3. REDDIT: Scan r/startups, r/iOSProgramming, r/AppStore for problems devs/Users complain about

4. HACKER NEWS: Check front page for mobile/AI opportunities

Post to #ideas with:
- 2 SaaS business ideas (Problem, Solution, Target)
- 1 iOS app idea with App Store positioning (Problem, App Solution, Target, Keyword opportunities)
- Mention trending keywords if found

Keep concise but specific.
```

## History
- Created: 2026-02-13
- Updated: 2026-02-13
