import { TextStyle } from 'react-native';

/**
 * Typography scale — Vande design system
 *
 * Recommended fonts (load via expo-font):
 *   Sans:  Inter (body, UI, buttons)
 *   Serif: Playfair Display (events hero, editorial headings)
 */
export const fontFamilies = {
  sans: 'Inter',
  sansMedium: 'Inter-Medium',
  sansSemiBold: 'Inter-SemiBold',
  sansBold: 'Inter-Bold',
  serif: 'PlayfairDisplay',
  serifMedium: 'PlayfairDisplay-Medium',
  serifSemiBold: 'PlayfairDisplay-SemiBold',
  serifBold: 'PlayfairDisplay-Bold',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 22,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
} as const;

export const lineHeight = {
  xs: 16,
  sm: 20,
  md: 22,
  lg: 24,
  xl: 28,
  '2xl': 32,
  '3xl': 36,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

type TypographyStyle = Pick<
  TextStyle,
  'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing' | 'textTransform' | 'fontFamily' | 'textDecorationLine'
>;

export const typography = {
  /** Events hero — serif, centered */
  display: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight['2xl'],
    fontFamily: fontFamilies.serifBold,
  } satisfies TypographyStyle,

  /** Screen titles, section heroes */
  h1: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight['3xl'],
    fontFamily: fontFamilies.sansBold,
  } satisfies TypographyStyle,

  /** Section headings */
  h2: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.xl,
    fontFamily: fontFamilies.sansSemiBold,
  } satisfies TypographyStyle,

  /** Card titles, sub-sections */
  h3: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.lg,
    fontFamily: fontFamilies.sansSemiBold,
  } satisfies TypographyStyle,

  /** Card titles on events (serif accent) */
  h3Serif: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.md,
    fontFamily: fontFamilies.serifMedium,
  } satisfies TypographyStyle,

  /** Default body */
  body: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.md,
    fontFamily: fontFamilies.sans,
  } satisfies TypographyStyle,

  /** Secondary body, list descriptions */
  bodySmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.sm,
    fontFamily: fontFamilies.sans,
  } satisfies TypographyStyle,

  /** Timestamps, metadata, tab labels */
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.xs,
    fontFamily: fontFamilies.sans,
  } satisfies TypographyStyle,

  /** Form labels, menu items, chip text */
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.sm,
    fontFamily: fontFamilies.sansSemiBold,
  } satisfies TypographyStyle,

  /** Primary & outline buttons */
  button: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.md,
    fontFamily: fontFamilies.sansSemiBold,
  } satisfies TypographyStyle,

  /** Small pill tags — "IN PERSON", "New" */
  tag: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.xs,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontFamily: fontFamilies.sansBold,
  } satisfies TypographyStyle,

  /** "VANDE EVENTS", "EXPLORE" overlines */
  overline: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.xs,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: fontFamilies.sansSemiBold,
  } satisfies TypographyStyle,

  /** Underlined skip / log-out links */
  link: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.md,
    textDecorationLine: 'underline' as const,
    fontFamily: fontFamilies.sansMedium,
  } satisfies TypographyStyle,

  /** Bottom tab bar labels */
  tabLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.xs,
    fontFamily: fontFamilies.sansSemiBold,
  } satisfies TypographyStyle,

  /** Message subject lines */
  messageSubject: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.md,
    fontFamily: fontFamilies.sansBold,
  } satisfies TypographyStyle,

  /** Sender name in message list */
  messageSender: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.sm,
    fontFamily: fontFamilies.sansBold,
  } satisfies TypographyStyle,
} as const;
