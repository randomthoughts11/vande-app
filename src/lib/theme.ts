export const colors = {
  primaryGreen: '#2F5D2E',
  deepGreen: '#1F3F24',
  sage: '#EAF3E2',
  warmCream: '#FFF9ED',
  card: '#FFFFFF',
  gold: '#B28A50',
  lightGold: '#E7D4A4',
  ink: '#243023',
  mutedText: '#65705F',
  border: '#E6E0D4',
  success: '#2E7D32',
  warning: '#B7791F',
  danger: '#B42318',
  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  label: { fontSize: 14, fontWeight: '600' as const, lineHeight: 18 },
};

export const shadows = {
  card: {
    shadowColor: '#243023',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
};

export const layout = {
  cardGap: 12,
  sectionGap: 20,
} as const;
