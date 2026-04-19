# SelfieGym n8n Automation Plan
**Date:** February 2, 2026

---

## Overview

n8n will be the automation backbone connecting:
- Website/App → Subscriber management
- Stripe → Payment processing
- Google Sheets → Data storage & reporting
- Slack → Team notifications (for business plans)
- WhatsApp/Email → User communication
- AI → Personalized responses

---

## Automation Workflows

### 1. New Subscriber Onboarding

**Trigger:** Webhook from website signup form

```
[Website Form] → [Webhook]
       ↓
[Add to Google Sheets "Subscribers"]
       ↓
[Send Welcome Email]
       ↓
[Create Stripe Customer]
       ↓
[If paid plan → Grant Access]
       ↓
[Send WhatsApp Welcome]
       ↓
[Trigger AI → Generate first workout plan]
       ↓
[Save plan to user's Google Sheet tab]
```

**Google Sheets Structure:**
| Name | Email | Phone | Plan | Signup Date | Status | Stripe ID |
|------|-------|-------|------|-------------|--------|-----------|

---

### 2. Payment Processing

**Trigger:** Stripe webhook

```
[Stripe Webhook] → [n8n]
       ↓
[Switch: Event Type]
       ↓
├── payment_success:
│   ├── Update Sheets (Status = Active)
│   ├── Send confirmation email
│   └── Grant app access
│
├── payment_failed:
│   ├── Update Sheets (Status = Payment Failed)
│   ├── Send retry email
│   └── Notify admin Slack
│
├── subscription_cancelled:
│   ├── Update Sheets (Status = Cancelled)
│   ├── Send feedback request
│   └── Revoke access after period
│
└── trial_ending:
    ├── Send reminder email
    └── WhatsApp nudge
```

---

### 3. Daily Workout Reminder

**Trigger:** n8n Cron (7:00 AM user's timezone)

```
[Cron 7:00 AM] → [Get Active Users from Sheets]
       ↓
[For Each User]
       ↓
[Check: Is today a workout day?]
       ↓
├── YES:
│   ├── Get today's workout from Sheets
│   ├── Send WhatsApp: "Ready for [Workout Name]? 💪"
│   └── Include workout preview
│
└── NO (Rest day):
    └── Send: "Rest day! Stay hydrated 💧"
```

---

### 4. Workout Completion Tracking

**Trigger:** Webhook from app (workout marked complete)

```
[App Webhook: Workout Complete] → [n8n]
       ↓
[Update Google Sheets "Progress" tab]
       ↓
[Calculate streak]
       ↓
[If milestone (7 days, 30 days, etc.)]
       ↓
├── Send congratulations message
└── Update achievements in Sheets
       ↓
[Update weekly summary stats]
```

---

### 5. Weekly Progress Report

**Trigger:** n8n Cron (Sunday 8:00 PM)

```
[Cron Sunday 8PM] → [Get All Active Users]
       ↓
[For Each User]
       ↓
[Calculate Weekly Stats from Sheets]:
- Workouts completed
- Streak count
- Estimated calories burned
- Progress vs last week
       ↓
[Generate Report via AI]
       ↓
[Send via Email + WhatsApp]
```

---

### 6. AI Coach Chat Response

**Trigger:** Webhook from chat interface

```
[User Message] → [Webhook]
       ↓
[Get User Context from Sheets]:
- Current program
- Recent workouts
- Goals
- Fitness level
       ↓
[Send to OpenAI with context]
       ↓
[Get AI Response]
       ↓
[Log conversation to Sheets]
       ↓
[Return response to user]
```

---

### 7. Business/Trainer Plan - Slack Integration

**Trigger:** Various events

```
[New Client Signs Up] → [Create Slack Channel #client-name]
       ↓
[Add trainer + client]
       ↓
[Post welcome message with client info]

---

[Client Completes Workout] → [Post to Slack channel]
       ↓
"✅ Ahmed completed Upper Body - 45 mins"

---

[Client Misses 3 Days] → [Alert Slack]
       ↓
"⚠️ Ahmed hasn't worked out in 3 days"
```

---

### 8. Lead Nurturing (Free Users)

**Trigger:** Cron (Day 3, 7, 14 after signup)

```
[Check Free Users in Sheets]
       ↓
[Filter: Not converted to paid]
       ↓
[Day 3]: Send success stories email
[Day 7]: Send limited-time offer
[Day 14]: Send "We miss you" + discount
       ↓
[Track in Sheets: Nurture Stage]
```

---

## Google Sheets Structure

### Sheet 1: Subscribers
| Column | Description |
|--------|-------------|
| ID | Unique user ID |
| Name | Full name |
| Email | Email address |
| Phone | WhatsApp number |
| Plan | free/pro/premium |
| Status | active/cancelled/trial |
| Signup Date | When they joined |
| Stripe ID | Stripe customer ID |
| Goals | Weight loss/muscle/general |
| Fitness Level | beginner/intermediate/advanced |

### Sheet 2: Progress
| Column | Description |
|--------|-------------|
| User ID | Link to subscriber |
| Date | Workout date |
| Workout Name | What they did |
| Duration | Minutes |
| Completed | yes/no |
| Notes | User notes |

### Sheet 3: Conversations
| Column | Description |
|--------|-------------|
| User ID | Link to subscriber |
| Timestamp | When message sent |
| Role | user/assistant |
| Message | Content |

### Sheet 4: Payments
| Column | Description |
|--------|-------------|
| User ID | Link to subscriber |
| Date | Payment date |
| Amount | USD |
| Status | success/failed |
| Stripe Event ID | Reference |

---

## Implementation Priority

### Phase 1 (Week 1):
- [ ] Set up n8n (self-hosted or cloud)
- [ ] Create Google Sheets template
- [ ] Webhook: New subscriber → Sheets

### Phase 2 (Week 2):
- [ ] Stripe integration
- [ ] Payment webhooks
- [ ] Email notifications (Resend/SendGrid)

### Phase 3 (Week 3):
- [ ] WhatsApp integration
- [ ] Daily reminders
- [ ] Workout completion tracking

### Phase 4 (Week 4):
- [ ] AI chat integration
- [ ] Weekly reports
- [ ] Slack integration (business plan)

---

## n8n Credentials Needed

| Service | What to Get |
|---------|-------------|
| Google Sheets | OAuth or Service Account |
| Stripe | API Key + Webhook Secret |
| OpenAI | API Key |
| SendGrid/Resend | API Key |
| Twilio/WhatsApp | Account SID + Auth Token |
| Slack | Bot Token + Webhook URL |

---

## Estimated Costs

| Service | Free Tier | Paid |
|---------|-----------|------|
| n8n | Self-hosted free | Cloud $20/mo |
| Google Sheets | Free | Free |
| Stripe | 2.9% + 30¢ per txn | Same |
| OpenAI | $0 | ~$0.01-0.03 per chat |
| SendGrid | 100/day free | $15/mo for 50K |
| Twilio WhatsApp | ~$0.005/msg | Same |

**Total for 1000 users/month:** ~$50-100/mo

---

*This automation will allow SelfieGym to operate with minimal manual work while providing premium coaching experience.*
