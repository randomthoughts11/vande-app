/**
 * Border radius scale
 * Vande favors large, friendly corners and pill-shaped CTAs
 */
export const radii = {
  /** Tags, small chips — "IN PERSON" */
  xs: 8,
  /** Inputs, small interactive elements */
  sm: 8,
  /** Search bars, speech bubbles */
  md: 12,
  /** Standard cards, grid selection cards */
  lg: 16,
  /** Event card images, date picker container */
  xl: 20,
  /** Hero images, large feature cards */
  '2xl': 24,
  /** Primary CTA buttons — pill shape */
  pill: 30,
  /** Fully rounded — badges, avatars */
  full: 9999,
} as const;
