# Vande Wellness — Compliance Notes

> This document is guidance for development and launch planning. It is not legal advice.

## Wellness positioning

- The app provides **wellness support**, not emergency medical care.
- Users must be directed to emergency services for urgent medical needs.
- The app does **not** provide automated diagnosis or treatment plans.
- All personalized supplement and care recommendations require **practitioner review**.

## Health data

- Do not collect real PHI in demo/mock mode.
- Before storing production patient/member health data, complete **HIPAA/BAA** review with your infrastructure provider (e.g., Supabase or a BAA-covered stack).
- This repository's SQL migration is **not** production HIPAA-compliant as shipped.

## App store requirements

### Google Play
- Complete **Data Safety** and **Health Apps** declarations.
- Request only data types you need; justify each health data type.
- Provide a privacy policy URL matching declared practices.

### Apple App Store
- Health and fitness data is especially sensitive.
- Do not use health data for advertising, marketing, or data mining.
- Do not store health data in iCloud as personal health information.
- Sign in with Apple may be required if other social logins are offered.

## Regulatory considerations

| Regulation | Relevance |
|------------|-----------|
| HIPAA | Applies if app handles PHI on behalf of covered entities |
| FTC Health Breach Notification Rule | May apply to breaches of unsecured PHR information |
| FDA | Review needed if app becomes diagnostic, clinical decision support, or medical-device software |
| COPPA | Applies if targeting children under 13 |

## Technical guardrails

- Do not log PHI in analytics or crash reports.
- Push notification previews must be **generic** (e.g., "You have a new Vande Wellness message").
- Implement a **data deletion request** workflow (support ticket stub in Profile).
- Maintain consent records with version and timestamp.
- Audit-log messaging and care plan changes in production.

## Payments

- Stripe is used for **services and memberships** where app-store policy permits.
- **Digital courses** may require in-app purchase (IAP) review on iOS/Android before external checkout.

## Privacy policy

A production privacy policy URL must be published before store submission, covering:
- Data collected and purpose
- Third-party processors (Supabase, Stripe, Expo push)
- Retention and deletion
- User rights and contact
