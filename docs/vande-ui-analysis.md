# Vande UI Analysis & Design System

Design tokens extracted from 12 reference screenshots for the Vande Wellness app.

**Implementation:** `src/lib/theme/` — import via `@/lib/theme`.

---

## Screen Inventory

| Screen | Pattern |
|--------|---------|
| 1 — Home | Dark green header, white elevated cards, 2-col program grid, FAQ accordion |
| 2 — Events | Cream hero, serif headings, rose accent, event image cards, search pill |
| 3 — Menu | Profile gray card, bordered list rows, bottom tabs |
| 4–5 — Messages | Segmented tabs, flat divider list, FAB, outline action buttons |
| 6 — Consult intro | Green header, feature cards row, dashed step timeline |
| 7–8 — Health selection | Warm cream grid cards, category accent text, mascot speech bubble |
| 9 — Scheduling | Date picker mint container, time slot chips, accordion sections |
| 10 — Confirmation | Mint hero curve, icon checklist, pill CTAs |
| 11 — Intake transition | Progress pills, centered copy, primary + skip link |
| 12 — Wellness assessment | Cream hero with mustard circle, step timeline, sticky Continue |

---

## Color Palette

### Brand

| Token | Hex | Usage |
|-------|-----|-------|
| `colors.primary` | `#2D3A24` | CTAs, active tabs, FAB, icons |
| `colors.primaryDark` | `#1F2E1A` | Headers, deep accents |
| `colors.accent` | `#A65D3B` | "New" badges, terracotta links |
| `colors.accentRose` | `#C06E7A` | Event titles, IN PERSON tags |
| `colors.accentMustard` | `#D68F29` | Wellness hero decorative circle |

### Backgrounds

| Token | Hex | Usage |
|-------|-----|-------|
| `colors.background` | `#F8F8F8` | Default app canvas |
| `colors.backgroundCream` | `#FDFBF7` | Events, editorial screens |
| `colors.backgroundWarm` | `#FCF9F2` | Onboarding selection flows |
| `colors.sage` | `#EAF2E5` | Date picker, chip selected state |
| `colors.mint` | `#EDF5ED` | Confirmation hero sections |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `colors.text` | `#1A1A1A` | Headings, primary body |
| `colors.textSecondary` | `#4A4A4A` | Descriptions |
| `colors.textMuted` | `#8E8E8E` | Timestamps, placeholders |
| `colors.textOnPrimary` | `#FFFFFF` | Text on green buttons/headers |

### Semantic

| Token | Hex |
|-------|-----|
| `colors.success` | `#4CAF50` |
| `colors.danger` | `#D32F2F` |
| `colors.notification` | `#D32F2F` |

### Health Category Accents

Use `categoryColors` for onboarding grid labels:

`anxiety`, `diabetes`, `cholesterol`, `cancer`, `arthritis`, `sleep`, `digestion`, `headaches`, `womensHealth`

---

## Typography Scale

**Sans:** Inter (body, UI, buttons)  
**Serif:** Playfair Display (events hero, editorial card titles)

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `typography.display` | 24 | Bold serif | Events hero |
| `typography.h1` | 28 | Bold | Screen heroes |
| `typography.h2` | 22 | Semibold | Section headings |
| `typography.h3` | 18 | Semibold | Card titles |
| `typography.h3Serif` | 16 | Medium serif | Event card titles |
| `typography.body` | 16 | Regular | Default copy |
| `typography.bodySmall` | 14 | Regular | Secondary copy |
| `typography.caption` | 12 | Regular | Metadata, tabs |
| `typography.label` | 14 | Semibold | Menu items, chips |
| `typography.button` | 16 | Semibold | CTAs |
| `typography.tag` | 12 | Bold uppercase | Badges |
| `typography.overline` | 12 | Semibold uppercase | "VANDE EVENTS" |
| `typography.link` | 16 | Medium underline | Skip, Log out |

---

## Spacing System

4px base grid. Legacy keys preserved for existing components:

| Token | Value |
|-------|-------|
| `spacing.xs` | 4 |
| `spacing.sm` | 8 |
| `spacing.md` | 16 |
| `spacing.lg` | 24 |
| `spacing.xl` | 32 |
| `spacing.xxl` | 48 |

Layout presets: `layout.screenPaddingX` (20), `layout.sectionGap` (32), `layout.cardPadding` (16).

---

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `radii.xs` | 8 | Tags |
| `radii.md` | 12 | Speech bubbles, FAB |
| `radii.lg` | 16 | Cards |
| `radii.xl` | 20 | Date picker, large cards |
| `radii.2xl` | 24 | Hero images |
| `radii.pill` | 30 | Primary buttons |
| `radii.full` | 9999 | Avatars, badges |

---

## Shadows

| Token | Use |
|-------|-----|
| `shadows.none` | Flat screens (messages, confirmation) |
| `shadows.sm` | Menu list cards |
| `shadows.card` | Home & event cards |
| `shadows.md` | Search bar |
| `shadows.fab` | Messages FAB |
| `shadows.warmCard` | Selection grid CTA |

---

## Button Styles

Use `buttonVariants` — each provides `container`, `text`, `pressed`, `disabled`:

| Variant | Pattern |
|---------|---------|
| `primary` | Forest green pill, white text |
| `secondary` | Rose accent pill |
| `outline` | Green 1px border, transparent fill |
| `outlineDark` | Black border (message actions) |
| `ghost` | Text-only green |
| `link` | Underlined skip/log-out |
| `fab` | 56×56 rounded square, elevated |
| `chip` / `chipSelected` | Time slot pills |
| `tag` / `tagNew` | IN PERSON / New badges |

```tsx
import { buttonVariants } from '@/lib/theme';

<Pressable style={buttonVariants.primary.container}>
  <Text style={buttonVariants.primary.text}>Continue</Text>
</Pressable>
```

---

## Card Styles

Use `cardVariants`:

| Variant | Pattern |
|---------|---------|
| `default` | White + border |
| `elevated` | White + shadow |
| `warm` | Cream flat (selection grid) |
| `warmElevated` | Cream + border + shadow (bottom CTA) |
| `sage` / `mint` | Tinted containers |
| `flat` | Divider-separated list rows |
| `bordered` | Menu rows |
| `cta` | Horizontal text + circular action |
| `grid` | 2-column aspect-ratio card |
| `horizontal` | Image left, content right |
| `profile` | Gray profile header |
| `event` | Image-top event card shell |
| `speechBubble` | Mascot dialogue |

---

## Navigation Patterns

Use `navigation` presets:

| Pattern | Key | Description |
|---------|-----|-------------|
| Bottom tabs | `navigation.tabBar` | 4 tabs, white bar, green active |
| Dark header | `navigation.headerDark` | Green bg, white text (home) |
| Light header | `navigation.headerLight` | Back + title, bottom border |
| Cream header | `navigation.headerCream` | Events / assessment hero |
| Segmented tabs | `navigation.segmentedControl` | Messages/General with underline |
| Search bar | `navigation.searchBar` | Pill with border/shadow |
| List row | `navigation.listRow` | Icon + label + chevron |
| Step indicator | `navigation.stepIndicator` | Dashed vertical timeline |

```tsx
import { navigation } from '@/lib/theme';

<Tabs screenOptions={{
  tabBarActiveTintColor: navigation.tabBar.activeTintColor,
  tabBarStyle: navigation.tabBar.style,
}} />
```

---

## Font Loading (Expo)

```bash
npx expo install @expo-google-fonts/inter @expo-google-fonts/playfair-display expo-font
```

```tsx
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
```
