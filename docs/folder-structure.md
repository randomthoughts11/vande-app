# Folder Structure

Production-ready Expo Router layout for the Vande Wellness app. Application code lives under `src/`; static assets at project root.

```
Mobile App/
├── assets/                      # Static assets (Expo bundler)
│   ├── fonts/                   # Inter, Playfair Display
│   ├── icons/                   # Tab & UI icon sets
│   └── images/
│       ├── brand/               # Logo, mascot, splash
│       ├── onboarding/          # Auth & intro illustrations
│       ├── health-categories/   # 3D concern icons (screens 7–8)
│       ├── events/              # Event hero & card imagery
│       └── placeholders/        # Fallback avatars & empty states
│
├── references/                  # Design reference screenshots (not bundled)
│
└── src/
    ├── app/                     # Expo Router — thin route files only
    │   ├── (auth)/              # Welcome, login, consent, onboarding
    │   ├── (tabs)/              # Home, Plan, Consult, Learn, Profile
    │   ├── appointment/
    │   ├── chat/
    │   ├── events/
    │   └── _layout.tsx
    │
    ├── screens/                 # Screen compositions & business UI
    │   ├── home/                # VANDE screen 1 — Today dashboard
    │   ├── events/              # VANDE screen 2 — Events list & detail
    │   ├── profile/             # VANDE screen 3 — Menu / settings
    │   ├── messages/            # VANDE screens 4–5 — Inbox & threads
    │   ├── consult/             # VANDE screens 6, 7–9 — Booking flow
    │   ├── wellness/            # VANDE screens 10–12 — Assessment & intake
    │   ├── auth/
    │   ├── appointment/
    │   ├── care-plan/
    │   ├── content/
    │   └── membership/
    │
    ├── components/
    │   ├── ui/                  # Design system primitives (Button, Card…)
    │   ├── layout/              # Screen shell, headers, auth layout
    │   └── features/            # Domain-specific building blocks
    │       └── wellness/        # Cards, check-ins, plan widgets
    │
    ├── hooks/                   # Shared React hooks
    │   ├── useAuth.ts
    │   ├── useTodayPlan.ts
    │   └── useAppNavigation.ts
    │
    ├── constants/               # App config, routes, static data
    │   ├── routes.ts            # Typed Expo Router paths
    │   ├── health-concerns.ts   # Onboarding grid data
    │   ├── query-keys.ts
    │   └── tabs.ts
    │
    ├── lib/                     # Services & integrations (no UI)
    │   ├── api.ts
    │   ├── theme/
    │   └── supabase.ts
    │
    ├── store/                   # Zustand client state
    └── types/                   # Domain TypeScript types
```

## Layer rules

| Layer         | Responsibility                         | Imports from                                  |
| ------------- | -------------------------------------- | --------------------------------------------- |
| `app/`        | Route definition, layouts, guards      | `screens/`, `components/`, `hooks/`           |
| `screens/`    | Page logic, data fetching, composition | `components/`, `hooks/`, `constants/`, `lib/` |
| `components/` | Reusable UI, no route awareness        | `lib/theme`, `constants`                      |
| `hooks/`      | Stateful logic shared across screens   | `lib/`, `store/`, `constants/`                |
| `constants/`  | Static values, no runtime deps on UI   | `lib/theme` (tokens only)                     |
| `lib/`        | API, auth, third-party adapters        | `types/`, `constants/`                        |

## Route → screen mapping (VANDE references)

| Reference                | Route                | Screen module                         |
| ------------------------ | -------------------- | ------------------------------------- |
| Screen 1 — Home          | `/(tabs)/today`      | `screens/home/TodayScreen`            |
| Screen 2 — Events        | `/(tabs)/learn`      | `screens/events/` (migrate)           |
| Screen 3 — Menu          | `/(tabs)/profile`    | `screens/profile/` (migrate)          |
| Screens 4–5 — Messages   | `/chat`              | `screens/messages/` (migrate)         |
| Screen 6 — Consult intro | `/(tabs)/consult`    | `screens/consult/` (migrate)          |
| Screens 7–8 — Concerns   | onboarding flow      | `screens/consult/ConcernSelectScreen` |
| Screen 9 — Scheduling    | `/appointment/book`  | `screens/appointment/` (migrate)      |
| Screen 10 — Confirmation | post-booking         | `screens/consult/` (add)              |
| Screens 11–12 — Intake   | `/(auth)/onboarding` | `screens/wellness/` (migrate)         |

## Adding a new screen

1. Create `src/screens/<feature>/MyScreen.tsx`
2. Add a one-line route: `export { default } from '@/screens/<feature>/MyScreen';`
3. Register path in `constants/routes.ts` if navigated programmatically

## Assets

Place bundled images in `assets/images/`. Reference in code:

```tsx
import mascot from "@/assets/images/brand/mascot.png";
```

Add path alias in `tsconfig.json` if using `@/assets` imports.
