import { ViewStyle } from 'react-native';
import { colors } from './colors';
import { radii } from './radii';
import { spacing, layout } from './spacing';
import { shadows } from './shadows';

type CardVariantStyles = ViewStyle;

/**
 * Card variant presets — patterns from all 12 reference screens
 *
 *   default      — white card, border, 16px radius (home, menu)
 *   elevated     — white + soft shadow (home programs, events)
 *   warm         — cream/beige flat card (health concern grid)
 *   warmElevated — warm card with subtle shadow (CTA bottom card)
 *   sage         — mint green tinted (date picker, success areas)
 *   flat         — no border/shadow, divider-separated (messages)
 *   bordered     — thin border, no shadow (menu list items)
 *   cta          — horizontal CTA with border (screen 8)
 *   grid         — 2-column selection card sizing
 *   horizontal   — image-left content-right (events, wellness balance)
 *   profile      — gray header card (menu screen)
 */
export const cardVariants = {
  default: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: layout.cardPadding,
    borderWidth: 1,
    borderColor: colors.border,
  } satisfies CardVariantStyles,

  elevated: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: layout.cardPadding,
    borderWidth: 0,
    ...shadows.card,
  } satisfies CardVariantStyles,

  warm: {
    backgroundColor: colors.cardWarm,
    borderRadius: radii.lg,
    padding: spacing.space5,
    borderWidth: 0,
  } satisfies CardVariantStyles,

  warmElevated: {
    backgroundColor: colors.cardWarm,
    borderRadius: radii.lg,
    padding: spacing.space5,
    borderWidth: 1,
    borderColor: colors.borderWarm,
    ...shadows.warmCard,
  } satisfies CardVariantStyles,

  sage: {
    backgroundColor: colors.sage,
    borderRadius: radii.lg,
    padding: layout.cardPadding,
    borderWidth: 0,
  } satisfies CardVariantStyles,

  mint: {
    backgroundColor: colors.mint,
    borderRadius: radii.xl,
    padding: layout.cardPadding,
    borderWidth: 0,
  } satisfies CardVariantStyles,

  flat: {
    backgroundColor: colors.transparent,
    borderRadius: 0,
    paddingVertical: spacing.xl,
    paddingHorizontal: layout.screenPaddingXCompact,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  } satisfies CardVariantStyles,

  bordered: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: layout.cardPadding,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  } satisfies CardVariantStyles,

  cta: {
    backgroundColor: colors.cardWarm,
    borderRadius: radii.lg,
    padding: spacing.space5,
    borderWidth: 1,
    borderColor: colors.borderWarm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } satisfies CardVariantStyles,

  grid: {
    backgroundColor: colors.cardWarm,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    aspectRatio: 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
  } satisfies CardVariantStyles,

  horizontal: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: layout.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    ...shadows.card,
  } satisfies CardVariantStyles,

  profile: {
    backgroundColor: colors.profileHeader,
    borderRadius: radii.lg,
    padding: layout.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  } satisfies CardVariantStyles,

  event: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    overflow: 'hidden',
    ...shadows.card,
  } satisfies CardVariantStyles,

  speechBubble: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: layout.cardPadding,
    borderWidth: 1,
    borderColor: colors.borderLight,
  } satisfies CardVariantStyles,
} as const;

export type CardVariant = keyof typeof cardVariants;
