# Supabase setup — Vande Wellness

This app uses **Supabase** for auth, Postgres, and Row Level Security. Without env vars it runs in **mock mode** for demos.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Open **Project Settings → API** and copy:
   - **Project URL** → `EXPO_PUBLIC_SUPABASE_URL`
   - **anon public key** → `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## 2. Configure the app

Create `.env` in the project root (never commit this file):

```env
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Restart Expo after changing env vars:

```bash
npx expo start --clear
```

## 3. Run database migrations

In the Supabase dashboard, open **SQL Editor** and run these files **in order**:

| Order | File |
|-------|------|
| 1 | `src/supabase/migrations/001_initial_schema.sql` |
| 2 | `src/supabase/migrations/002_auth_profile_trigger.sql` |
| 3 | `src/supabase/migrations/003_rls_policies.sql` |
| 4 | `src/supabase/migrations/004_seed_catalog.sql` |

Or paste each file’s contents and click **Run**.

### What each migration does

- **001** — Full schema (profiles, appointments, care plans, messaging, etc.)
- **002** — Auto-creates a `profiles` row when a user signs up via Auth
- **003** — RLS policies for member data + public catalog reads
- **004** — Seed services, practitioners, events, products, memberships

## 4. Auth settings (recommended for dev)

In **Authentication → Providers → Email**:

- Turn **off** “Confirm email” for faster local testing (optional).
- Enable email/password sign-in.

## 5. Verify it works

1. Open the app → **Create account** or **Log in**.
2. Complete consent + onboarding.
3. Check **Consult** tab — services and practitioners should load from Supabase.
4. In Supabase **Table Editor**, confirm rows appear in `profiles`, `consents`, `intake_responses` after onboarding.

## Architecture

```
Mobile app (Expo)
  └── src/lib/api.ts          ← single API used by all screens
        ├── mock mode         ← when env vars are empty
        └── Supabase mode     ← src/lib/supabase/*
              ├── profile-service.ts   auth + profiles
              └── data-service.ts      catalog + member writes
```

### Live vs mock (when Supabase is configured)

| Feature | Supabase |
|---------|----------|
| Sign up / sign in / sign out | Yes |
| Profile read & update | Yes |
| Consents | Yes |
| Intake + onboarding flag | Yes |
| Check-ins | Yes |
| Services, practitioners, events, products, memberships | Yes |
| Book appointments | Yes |
| Event registration | Yes |
| Data deletion request | Yes |
| Care plans, messaging, content, payments | Mock (next phase) |

## Security note

Current RLS policies are **development-friendly**. Before production with PHI:

- Sign a Supabase **BAA** (HIPAA)
- Replace permissive policies with strict `auth.uid()` scoping
- Review `docs/compliance-notes.md`

## Troubleshooting

| Issue | Fix |
|-------|-----|
| “Profile not found” after sign up | Re-run migration `002`; check **Database → Triggers** |
| Empty Consult tab | Run migration `004` seed |
| App still uses mock data | Confirm `.env` values and restart with `--clear` |
| RLS errors in logs | Re-run migration `003` |

## Next steps (backend roadmap)

1. Wire care plans + messaging to Supabase
2. Supabase Edge Function for Stripe `create-payment-intent`
3. Realtime subscriptions for chat
4. Supabase CLI + CI migrations
