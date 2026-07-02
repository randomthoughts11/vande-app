# Supabase setup — Vande Wellness

This app uses **Supabase** for auth, Postgres, and Row Level Security. Without env vars it runs in **mock mode** for demos.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Open **Project Settings → API** and copy:
   - **Project URL** → `EXPO_PUBLIC_SUPABASE_URL`
   - **anon public key** → `EXPO_PUBLIC_SUPABASE_ANON_KEY` (or `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`)

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

- For fastest local testing, turn **off** “Confirm email”.
- Enable email/password sign-in.

If **Confirm email** is on, configure redirect URLs so the confirmation link loads:

1. **Authentication → URL Configuration**
   - **Site URL:** your deployed web URL (e.g. `https://vande-wellness.vercel.app`) or `http://localhost:8081` for local web
   - **Redirect URLs** — add each URL you use:
     - `http://localhost:8081/auth/callback`
     - `https://YOUR_VERCEL_DOMAIN/auth/callback`
     - `vandewellness://auth/callback` (mobile deep link)
     - `exp://**` (Expo Go dev — wildcard)

2. Optional `.env` for production web redirects:

```env
EXPO_PUBLIC_APP_URL=https://YOUR_VERCEL_DOMAIN
```

3. After signup, users must open the email link. The app route `/auth/callback` completes verification.

**Email link not loading?** The redirect URL in the email is not in Supabase’s allow list, or Site URL points to a server that isn’t running. Either add the correct URL above or disable email confirmation for dev.

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
| App still uses mock data | Confirm `.env` has URL **and** anon/publishable key; restart with `--clear` |
| Logged in but no `profiles` row | App was in mock mode (wrong key env name) or migration `002` not run |
| Email confirm link blank / won’t load | Add `/auth/callback` URLs in Supabase → URL Configuration (see §4) |
| RLS errors in logs | Re-run migration `003` |

## Next steps (backend roadmap)

1. Wire care plans + messaging to Supabase
2. Supabase Edge Function for Stripe `create-payment-intent`
3. Realtime subscriptions for chat
4. Supabase CLI + CI migrations
