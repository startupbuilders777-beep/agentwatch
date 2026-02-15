# Revenue & Payments - Complete Guide

## How We Get Paid 💰

### Primary: Stripe Subscriptions

**Setup:**
```bash
# Stripe integration
- Product: "Mission Control"
- Prices: $199, $499, $1499/month
- Trial: 14 days free
- Annual: 17% discount
```

---

## Pricing Tiers

| Tier | Price | What Included |
|------|-------|--------------|
| **Starter** | $199/mo | 5 agents, dashboard, logs, alerts |
| **Business** | $499/mo | 25 agents, kill switch, RBAC, cost controls |
| **Enterprise** | $1499/mo | Unlimited agents, SLA, dedicated support |

---

## Additional Revenue Streams

### 1. Per-Agent Add-ons
```
$20/month per additional agent
5 extra agents = $100/mo extra
```

### 2. Add-ons
```
- Audit log exports: $99/mo
- Custom integrations: $5,000 one-time
- Dedicated support: $499/mo
- Extended retention: $199/mo
```

### 3. Enterprise
```
- Annual contract: 2 months free
- Multi-year: 30% discount
- Custom SLA: +$999/mo
- On-premise: $10k setup + $2k/mo
```

---

## Stripe Integration

### Products to Create

```typescript
// Stripe Products

{
  "name": "Mission Control - Starter",
  "price": "$199/month",
  "features": [
    "5 agents",
    "Live dashboard",
    "Basic logging",
    "Email alerts"
  ]
}

{
  "name": "Mission Control - Business", 
  "price": "$499/month",
  "features": [
    "25 agents",
    "Kill switch",
    "RBAC",
    "Cost controls",
    "Priority support"
  ]
}

{
  "name": "Mission Control - Enterprise",
  "price": "$1,499/month",
  "features": [
    "Unlimited agents",
    "Dedicated support",
    "Custom SLA",
    "On-premise option",
    "Audit exports"
  ]
}
```

---

## Revenue Scenarios

### Scenario 1: Bootstrapped

| Month | Customers | MRR |
|-------|-----------|-----|
| 1 | 2 starter | $398 |
| 3 | 10 starter | $1,990 |
| 6 | 20 starter + 3 business | $5,485 |
| 12 | 30 starter + 10 business + 2 enterprise | $18,478 |

**Year 1: ~$110k ARR**

---

### Scenario 2: Growth

| Month | Customers | MRR |
|-------|-----------|-----|
| 1 | 5 starter | $995 |
| 3 | 20 starter + 5 business | $11,475 |
| 6 | 50 starter + 15 business + 3 enterprise | $32,920 |
| 12 | 100 starter + 30 business + 10 enterprise | $78,440 |

**Year 1: ~$470k ARR**

---

### Scenario 3: Enterprise Focus

| Month | Customers | MRR |
|-------|-----------|-----|
| 1 | 1 enterprise | $1,499 |
| 3 | 3 enterprise + 5 business | $8,994 |
| 6 | 8 enterprise + 15 business | $26,982 |
| 12 | 20 enterprise + 30 business | $59,460 |

**Year 1: ~$350k ARR (but higher margin)**

---

## Cash Flow

### Month 1 Costs
| Item | Cost |
|------|------|
| Hosting (AWS) | $500 |
| Stripe fees | 2.9% |
| Support | $0 (founder) |
| **Total** | ~$500 |

### Break-even
- At 3 customers (Starter): ~$600 MRR covers hosting
- At 10 customers: profit

---

## Payment Flow

```
Customer: "I'll sign up"
    ↓
Stripe Checkout (14-day trial)
    ↓
Customer enters card
    ↓
Trial starts
    ↓
Day 14: Charge card
    ↓
Success: Access granted
    ↓
Failure: Downgrade to free + email
```

---

## Enterprise Sales

For $1499/mo customers:

1. **Sales call** - Understand needs
2. **Custom quote** - May adjust pricing
3. **Invoice** - Net-30 terms
4. **Wire/ACH** - No Stripe fees
5. **Contract** - Annual agreement
6. **Dedicated Slack** - White-glove service

---

## Metrics to Track

| Metric | Target |
|--------|--------|
| MRR | $10k by month 6 |
| Churn | <5% monthly |
| LTV | >$5,000 |
| CAC | <$500 |
| Payback | <6 months |

---

## Summary

| Source | Potential |
|--------|-----------|
| Subscriptions | 70% of revenue |
| Add-ons | 15% of revenue |
| Enterprise | 15% of revenue |

**Year 1 Target: $150k-500k ARR**

**Year 2 Target: $500k-1M ARR**
