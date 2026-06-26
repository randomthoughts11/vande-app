/**
 * Spacing system — 4px base grid
 * Screens consistently use 16–20px horizontal padding
 */
export const spacing = {
  /** 4px */
  xs: 4,
  /** 8px — tight element gaps */
  sm: 8,
  /** 16px — card padding, standard gaps */
  md: 16,
  /** 24px — section gaps, list item spacing */
  lg: 24,
  /** 32px — major section breaks */
  xl: 32,
  /** 48px — large vertical rhythm */
  xxl: 48,

  // Extended scale (design-system reference)
  /** 12px */
  space3: 12,
  /** 20px — standard screen horizontal padding */
  space5: 20,
  /** 40px — hero section spacing */
  space10: 40,
  /** 60px — events hero bottom margin */
  space15: 60,
} as const;

/** Layout presets derived from screenshot patterns */
export const layout = {
  /** Standard horizontal screen inset */
  screenPaddingX: spacing.space5,
  /** Compact screens (messages) */
  screenPaddingXCompact: spacing.md,
  /** Vertical gap between sections on scroll screens */
  sectionGap: spacing.xl,
  /** Gap between cards in a list */
  cardGap: spacing.space3,
  /** Internal card padding */
  cardPadding: spacing.md,
  /** Grid gap for 2-column selection cards */
  gridGap: spacing.md,
  /** Bottom safe area above tab bar */
  tabBarOffset: spacing.xxl,
  /** Standard header height */
  headerHeight: 56,
  /** Segmented tab bar height */
  segmentedTabHeight: 48,
  /** Primary button height */
  buttonHeight: 56,
  /** FAB size */
  fabSize: 56,
  /** Avatar sizes */
  avatarSm: 40,
  avatarMd: 60,
  avatarLg: 80,
} as const;
