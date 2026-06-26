/**
 * Vande Wellness — color tokens
 * Extracted from reference screens 1–12
 */

/** Raw palette — use semantic `colors` in components */
export const palette = {
  // Forest greens (primary brand)
  forest900: '#1F2E1A',
  forest800: '#2D3A24',
  forest700: '#344028',
  forest600: '#3D5232',
  forest500: '#4CAF50',

  // Mint & sage surfaces
  mint50: '#EDF5ED',
  mint100: '#EAF2E5',
  mint150: '#EAF3E2',
  mint200: '#F1F5ED',

  // Warm neutrals
  cream50: '#FDFBF7',
  cream100: '#FCF9F2',
  cream200: '#FAF7F0',
  cream300: '#F9F6F0',
  gray50: '#F9F9F9',
  gray100: '#F8F8F8',
  gray200: '#EFEFEF',
  white: '#FFFFFF',

  // Accent
  terracotta: '#A65D3B',
  rose: '#C06E7A',
  mustard: '#D68F29',
  gold: '#D4A044',
  lightGold: '#E7D4A4',

  // Text
  ink900: '#000000',
  ink800: '#1A1A1A',
  ink700: '#243023',
  ink600: '#333333',
  ink500: '#4A4A4A',
  ink400: '#555555',
  ink300: '#666666',
  ink200: '#888888',
  ink100: '#8E8E8E',

  // Borders & dividers
  borderLight: '#EEEEEE',
  borderDefault: '#E0E0E0',
  borderWarm: '#E8E4D9',
  borderSage: '#D1D9CD',
  borderMuted: '#E6E0D4',

  // Semantic
  success: '#4CAF50',
  warning: '#B7791F',
  danger: '#D32F2F',
  info: '#6D8AB0',

  // Health-category accents (onboarding selection cards)
  categoryAnxiety: '#D2A679',
  categoryDiabetes: '#6B2D30',
  categoryCholesterol: '#9C5A3C',
  categoryCancer: '#6D8AB0',
  categoryArthritis: '#3D4A30',
  categorySleep: '#6B7A4F',
  categoryDigestion: '#A65A5A',
  categoryHeadaches: '#703030',
  categoryWomensHealth: '#D4A044',
} as const;

/** Semantic color tokens — primary API for components */
export const colors = {
  // Brand
  primary: palette.forest800,
  primaryDark: palette.forest900,
  primaryLight: palette.forest600,
  accent: palette.terracotta,
  accentRose: palette.rose,
  accentMustard: palette.mustard,

  // Backward-compatible aliases (existing codebase)
  primaryGreen: palette.forest800,
  deepGreen: palette.forest900,
  gold: palette.mustard,
  lightGold: palette.lightGold,

  // Backgrounds
  background: palette.gray100,
  backgroundAlt: palette.gray50,
  backgroundCream: palette.cream50,
  backgroundWarm: palette.cream100,
  warmCream: palette.cream50,

  // Surfaces
  card: palette.white,
  cardWarm: palette.cream200,
  cardWarmAlt: palette.cream300,
  sage: palette.mint100,
  sageMuted: palette.mint200,
  mint: palette.mint50,
  profileHeader: palette.gray200,
  headerGreen: palette.forest800,

  // Text
  text: palette.ink800,
  textPrimary: palette.ink800,
  textSecondary: palette.ink500,
  textMuted: palette.ink100,
  textOnPrimary: palette.white,
  textOnDark: palette.white,
  ink: palette.ink800,
  mutedText: palette.ink100,

  // Borders
  border: palette.borderDefault,
  borderWarm: palette.borderWarm,
  borderLight: palette.borderLight,
  divider: palette.borderDefault,
  borderSage: palette.borderSage,

  // Semantic
  success: palette.success,
  warning: palette.warning,
  danger: palette.danger,
  info: palette.info,
  notification: palette.danger,

  white: palette.white,
  transparent: 'transparent',
} as const;

/** Per-category label colors for health concern selection grids */
export const categoryColors = {
  anxiety: palette.categoryAnxiety,
  depression: palette.categoryAnxiety,
  diabetes: palette.categoryDiabetes,
  cholesterol: palette.categoryCholesterol,
  cancer: palette.categoryCancer,
  arthritis: palette.categoryArthritis,
  sleep: palette.categorySleep,
  digestion: palette.categoryDigestion,
  headaches: palette.categoryHeadaches,
  womensHealth: palette.categoryWomensHealth,
} as const;
