# SelfieGym.com - Technical Requirements

## 🏗️ Recommended Tech Stack

### Frontend (Website/App)
| Option | Pros | Cons |
|--------|------|------|
| **Next.js + React** | Fast, SEO-friendly, easy to deploy | Needs developer knowledge |
| **Framer/Webflow** | No-code, fast prototyping | Limited customization |
| **Flutter** | One codebase for web + mobile | Learning curve |

**Recommendation:** Start with **Framer** for landing page, then **Next.js** for full app

### Backend
| Option | Pros | Cons |
|--------|------|------|
| **Supabase** | Easy, includes auth + database | Limited AI features |
| **Firebase** | Scalable, real-time | Google lock-in |
| **Custom (Node.js)** | Full control | More work |

**Recommendation:** **Supabase** for MVP (fast setup)

### AI/LLM
| Option | Pros | Cons |
|--------|------|------|
| **OpenAI GPT-4** | Best quality, easy API | Cost per token |
| **Claude (Anthropic)** | Great for conversation | Less fitness training data |
| **Fine-tuned model** | Specialized for fitness | Expensive to train |

**Recommendation:** **OpenAI GPT-4** with custom prompts for fitness persona

### Integrations
- **Slack API** - Send daily workout plans
- **Google Sheets API** - Export training logs
- **Stripe** - Payments
- **SendGrid/Resend** - Emails

---

## 📱 Platform Strategy

### Phase 1: Web App (MVP)
- Responsive website works on all devices
- PWA (Progressive Web App) for mobile-like experience
- Faster to build, easier to iterate

### Phase 2: Mobile Apps
- iOS app (App Store)
- Android app (Play Store)
- Use React Native or Flutter for both

---

## 💾 Database Schema (Simplified)

```
Users
├── id
├── email
├── name
├── goals (lose_weight, build_muscle, etc.)
├── fitness_level
├── available_equipment
└── subscription_tier

Workouts
├── id
├── user_id
├── date
├── exercises[]
├── completed
└── ai_feedback

Exercises
├── id
├── name
├── muscle_group
├── equipment_needed
├── image_url
├── video_url
└── instructions

MealPlans
├── id
├── user_id
├── date
├── meals[]
├── calories
└── macros
```

---

## 🔐 Security Considerations
- User authentication (email + social login)
- Secure payment processing (Stripe)
- GDPR compliance for EU users
- Health data privacy

---

## 💵 Estimated Costs (Monthly)

| Service | Cost |
|---------|------|
| Hosting (Vercel) | $0-20 |
| Database (Supabase) | $0-25 |
| OpenAI API | $50-200 (scales with users) |
| Domain (selfigym.com) | Already owned ✅ |
| Stripe fees | 2.9% + $0.30 per transaction |

**MVP Total:** ~$50-100/month to start

---

## 🗓️ Development Timeline (Estimated)

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Design | 1-2 weeks | UI/UX mockups |
| Landing Page | 1 week | Marketing site |
| Core App | 4-6 weeks | AI trainer + workouts |
| Diet Feature | 2 weeks | Meal planning |
| Integrations | 2 weeks | Slack, Sheets |
| Testing | 1-2 weeks | Bug fixes |

**Total:** 10-14 weeks for full MVP

---

*Technical spec: Feb 1, 2025*
