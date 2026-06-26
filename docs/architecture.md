# Vande Wellness — Architecture

## Overview

Vande Wellness is a React Native mobile app built with Expo and TypeScript. It delivers Ayurvedic wellness support: intake, care plans, consultations, messaging, learning content, and VandeCart product recommendations.

The MVP uses a **mock-to-live API abstraction** (`src/lib/api.ts`) so screens never import mock data directly. When Supabase credentials are configured, auth and data operations use Supabase; otherwise the app runs on in-memory mock state for demos.

## Mobile layers

```
src/app/          Expo Router routes (thin re-exports)
src/screens/      Screen compositions & page logic
src/components/   ui/, layout/, features/ — reusable UI
src/hooks/        Shared React hooks
src/constants/    Routes, query keys, static config
src/lib/          API, theme, validators, integrations
src/store/        Zustand auth and app state
src/types/        Domain TypeScript types
assets/           Fonts, icons, bundled images
```

See `docs/folder-structure.md` for the full production layout and VANDE screen mapping.

Previously:

```
src/app/          Expo Router screens (auth, tabs, stacks)
src/components/   Reusable UI and wellness components
src/lib/          API, theme, validators, integrations
src/store/        Zustand auth and app state
src/types/        Domain TypeScript types
```

- **Navigation:** Expo Router file-based routing under `src/app/`
- **Server state:** TanStack Query
- **Client state:** Zustand + Expo Secure Store (consent/onboarding flags)
- **Forms:** React Hook Form + Zod

## Future backend services

| Service           | Responsibility                                 |
| ----------------- | ---------------------------------------------- |
| Member/Profile    | User profiles, family members                  |
| Intake/Assessment | Wellness questionnaires, non-diagnostic scores |
| Care Plan         | Practitioner-authored plans and item logs      |
| Appointment       | Booking, video links, payments                 |
| Messaging         | Care-team chat, realtime, audit                |
| Content/Event     | Courses, webinars, retreats                    |
| Product           | VandeCart metadata and recommendations         |
| Billing           | Stripe memberships and service payments        |
| Notification      | Generic push (no PHI in previews)              |
| Audit/Compliance  | Consent, audit logs, data deletion             |

## Data model

See `src/supabase/migrations/001_initial_schema.sql` for the full Postgres schema. Core entities: `profiles`, `care_plans`, `care_plan_items`, `appointments`, `messages`, `checkins`, `products`, `memberships`, `consents`, `audit_logs`.

## Security model

- Supabase Auth for email/password
- RLS enabled on sensitive tables (dev policies must be replaced before production)
- Expo Secure Store for session-related flags
- Push notification bodies are generic
- No PHI in logs

## Integrations

| Integration        | MVP                                   | Production                            |
| ------------------ | ------------------------------------- | ------------------------------------- |
| VandeCart          | Deep links via `expo-web-browser`     | Catalog sync API                      |
| Stripe             | PaymentSheet for services/memberships | Edge Function `create-payment-intent` |
| Video              | External Zoom URLs                    | Zoom/Twilio/Agora SDK                 |
| Email/SMS/WhatsApp | Not wired                             | Backend notifications                 |
| Calendar           | Not wired                             | Optional calendar sync                |

## MVP vs production

**MVP (current):** Full UI, mock fallback, Supabase schema ready, Stripe hooks, external VandeCart checkout, placeholder video links.

**Production:** HIPAA/BAA review, tightened RLS, real Supabase project, Edge Functions, Apple/Google OAuth, app store health declarations, practitioner web portal.
