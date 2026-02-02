# Payment Gateways for SelfieGym (Saudi Arabia)
*Date: 2026-02-02*

---

## 🏦 Overview

For a Saudi-based fitness app, you need payment gateways that:
1. ✅ Support Mada (Saudi debit cards)
2. ✅ Support Apple Pay & Samsung Pay
3. ✅ Accept Visa/Mastercard
4. ✅ Support STC Pay
5. ✅ Are SAMA (Saudi Central Bank) compliant
6. ✅ Easy integration (APIs, SDKs)
7. ✅ Reasonable fees

---

## 🥇 Recommended: Moyasar

### Overview
- **Website:** moyasar.com
- **Founded:** Saudi Arabia
- **License:** SAMA regulated
- **Best For:** Saudi startups, subscription businesses

### Supported Payment Methods
| Method | Supported |
|--------|-----------|
| Mada | ✅ |
| Visa | ✅ |
| Mastercard | ✅ |
| American Express | ✅ |
| Apple Pay | ✅ |
| Samsung Pay | ✅ |
| STC Pay | ✅ |

### Features
- ✅ Arabic dashboard
- ✅ Recurring billing (subscriptions)
- ✅ Invoice links (share via WhatsApp)
- ✅ Tokenization (save cards)
- ✅ Sandbox for testing
- ✅ REST API
- ✅ Mobile SDK (iOS/Android)
- ✅ PCI-DSS compliant

### Pricing
- Contact sales for rates
- Typically 2.5-3% per transaction
- No setup fees

### Integration
```
API Documentation: docs.moyasar.com
SDKs: iOS, Android, Web
Plugins: WooCommerce, Shopify, etc.
```

### Refund Policy
- Mada: 24 hours to 3 business days
- Credit cards: 7-14 business days

### Verdict
**⭐ RECOMMENDED for SelfieGym**
- Best for Saudi market
- Excellent Mada support
- Easy recurring billing for subscriptions

---

## 🥈 Alternative: HyperPay

### Overview
- **Website:** hyperpay.com
- **Founded:** Saudi Arabia (HQ Riyadh)
- **License:** SAMA licensed
- **Presence:** 9 countries in MENA

### Supported Payment Methods
| Method | Supported |
|--------|-----------|
| Mada | ✅ |
| Visa | ✅ |
| Mastercard | ✅ |
| American Express | ✅ |
| Apple Pay | ✅ |
| STC Pay | ✅ |

### Features
- ✅ Pre-authorization
- ✅ Recurring payments
- ✅ Anti-fraud management
- ✅ Smart routing
- ✅ Mobile app for merchants
- ✅ Data reporting
- ✅ PCI-DSS compliant
- ✅ ISO27001 certified

### Pricing
- Contact sales
- Enterprise-focused pricing
- May be higher than Moyasar for startups

### Verdict
**Good alternative, better for established businesses**

---

## 🥉 Alternative: Tap Payments

### Overview
- **Website:** tap.company
- **Founded:** Kuwait, operates in Saudi
- **Best For:** Multi-country MENA operations

### Supported Payment Methods
| Method | Supported |
|--------|-----------|
| Mada | ✅ |
| Visa | ✅ |
| Mastercard | ✅ |
| Apple Pay | ✅ |
| KNET (Kuwait) | ✅ |
| Benefit (Bahrain) | ✅ |

### Features
- ✅ goCollect app (send payment links)
- ✅ Multi-currency
- ✅ Subscription billing
- ✅ Developer-friendly API

### Verdict
**Good if expanding to other GCC countries**

---

## 💳 Payment Method Preferences (Saudi Arabia)

| Method | Usage | Priority |
|--------|-------|----------|
| Mada | 70%+ of transactions | ESSENTIAL |
| Apple Pay | Growing rapidly | HIGH |
| Visa/MC | 20% of transactions | HIGH |
| STC Pay | Popular with youth | MEDIUM |
| Samsung Pay | Smaller market | LOW |

---

## 🔧 Integration Recommendations

### For Web (React/Next.js)
```javascript
// Moyasar example
import { Moyasar } from '@moyasar/js';

const payment = new Moyasar({
  publishable_api_key: 'pk_test_xxx',
  amount: 9990, // 99.90 SAR in halalas
  currency: 'SAR',
  description: 'SelfieGym Pro Monthly',
  callback_url: 'https://selfigym.com/payment/callback'
});
```

### For Mobile (React Native)
- Use Moyasar Mobile SDK
- Native Mada support
- Apple Pay / Samsung Pay integration

### For Subscriptions
```
Recommended Flow:
1. User selects plan
2. Collect payment method (tokenize)
3. Charge immediately
4. Store token for recurring
5. Auto-charge monthly
6. Handle failed payments gracefully
```

---

## 📋 Setup Checklist

### To Activate Moyasar:
- [ ] Register at moyasar.com
- [ ] Submit business documents:
  - Commercial Registration (CR)
  - VAT Certificate
  - Bank account details (IBAN)
  - National ID of owner
- [ ] Website/App must show:
  - What you sell
  - Pricing
  - Refund policy
  - Contact information
- [ ] Test in Sandbox
- [ ] Go live

### Timeline
- Sandbox access: Immediate
- Production approval: 3-7 business days

---

## 💰 Cost Comparison

| Gateway | Transaction Fee | Monthly Fee | Setup |
|---------|-----------------|-------------|-------|
| Moyasar | ~2.5-3% | None | Free |
| HyperPay | ~2.5-3.5% | Varies | Free |
| Tap | ~2.5-3% | None | Free |
| Stripe* | 2.9% + 0.30 | None | Free |

*Stripe: Not officially in Saudi, but works via UAE

---

## ✅ Final Recommendation

### For SelfieGym:
1. **Primary:** Moyasar
   - Best Saudi support
   - Easy subscription billing
   - Excellent Mada integration

2. **Backup:** Keep HyperPay as alternative
   - In case of Moyasar issues

3. **Future:** Add Tap if expanding to GCC

### Payment Flow:
```
User → Select Plan → Moyasar Checkout → 
Tokenize Card → Charge → Subscription Active → 
Monthly Auto-Charge
```

---

*Next: See Facebook & Google Ads Setup (05-ADS-SETUP.md)*
