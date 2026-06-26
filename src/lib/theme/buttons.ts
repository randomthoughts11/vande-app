import { ViewStyle, TextStyle } from 'react-native';
import { colors } from './colors';
import { radii } from './radii';
import { spacing, layout } from './spacing';
import { typography } from './typography';
import { shadows } from './shadows';

type ButtonStyles = {
  container: ViewStyle;
  text: TextStyle;
  pressed?: ViewStyle;
  disabled?: ViewStyle;
};

/** Size presets */
export const buttonSizes = {
  sm: {
    minHeight: 40,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  md: {
    minHeight: 48,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  lg: {
    minHeight: layout.buttonHeight,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
} as const;

/**
 * Button variant styles — spread into StyleSheet or use with Pressable
 *
 * Patterns from screenshots:
 *   primary   — forest green pill CTA (screens 1, 6, 9–12)
 *   secondary — terracotta/rose accent
 *   outline   — 1px border, transparent fill (messages, confirmation)
 *   ghost     — text only
 *   link      — underlined text (Skip for Now, Log Out)
 *   fab       — rounded-square floating action (messages)
 *   chip      — time-slot / tag pills
 */
export const buttonVariants = {
  primary: {
    container: {
      backgroundColor: colors.primary,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
      ...buttonSizes.lg,
    },
    text: {
      ...typography.button,
      color: colors.textOnPrimary,
    },
    pressed: { opacity: 0.85 },
    disabled: { opacity: 0.5 },
  },

  secondary: {
    container: {
      backgroundColor: colors.accentRose,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
      ...buttonSizes.md,
    },
    text: {
      ...typography.button,
      color: colors.textOnPrimary,
    },
    pressed: { opacity: 0.85 },
    disabled: { opacity: 0.5 },
  },

  outline: {
    container: {
      backgroundColor: colors.transparent,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      ...buttonSizes.md,
    },
    text: {
      ...typography.button,
      color: colors.primary,
    },
    pressed: { opacity: 0.85 },
    disabled: { opacity: 0.5 },
  },

  outlineDark: {
    container: {
      backgroundColor: colors.transparent,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: colors.text,
      alignItems: 'center',
      justifyContent: 'center',
      ...buttonSizes.md,
    },
    text: {
      ...typography.button,
      color: colors.text,
    },
    pressed: { opacity: 0.85 },
    disabled: { opacity: 0.5 },
  },

  ghost: {
    container: {
      backgroundColor: colors.transparent,
      borderRadius: radii.md,
      alignItems: 'center',
      justifyContent: 'center',
      ...buttonSizes.md,
    },
    text: {
      ...typography.button,
      color: colors.primary,
    },
    pressed: { opacity: 0.7 },
    disabled: { opacity: 0.5 },
  },

  link: {
    container: {
      backgroundColor: colors.transparent,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
    },
    text: {
      ...typography.link,
      color: colors.primary,
    },
    pressed: { opacity: 0.7 },
    disabled: { opacity: 0.5 },
  },

  danger: {
    container: {
      backgroundColor: colors.danger,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
      ...buttonSizes.md,
    },
    text: {
      ...typography.button,
      color: colors.textOnPrimary,
    },
    pressed: { opacity: 0.85 },
    disabled: { opacity: 0.5 },
  },

  fab: {
    container: {
      width: layout.fabSize,
      height: layout.fabSize,
      borderRadius: radii.md,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      ...shadows.fab,
    },
    text: {
      ...typography.button,
      color: colors.textOnPrimary,
    },
    pressed: { opacity: 0.9 },
    disabled: { opacity: 0.5 },
  },

  chip: {
    container: {
      backgroundColor: colors.card,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      ...typography.bodySmall,
      color: colors.text,
    },
    pressed: { opacity: 0.85 },
    disabled: { opacity: 0.5 },
  },

  chipSelected: {
    container: {
      backgroundColor: colors.sage,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: colors.primary,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      ...typography.bodySmall,
      color: colors.text,
      fontWeight: typography.label.fontWeight,
    },
    pressed: { opacity: 0.85 },
    disabled: { opacity: 0.5 },
  },

  tag: {
    container: {
      backgroundColor: colors.accentRose,
      borderRadius: radii.full,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      alignSelf: 'flex-start',
    },
    text: {
      ...typography.tag,
      color: colors.textOnPrimary,
    },
    pressed: { opacity: 0.85 },
    disabled: { opacity: 0.5 },
  },

  tagNew: {
    container: {
      backgroundColor: colors.accent,
      borderRadius: radii.full,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      alignSelf: 'flex-start',
    },
    text: {
      ...typography.tag,
      color: colors.textOnPrimary,
    },
    pressed: { opacity: 0.85 },
    disabled: { opacity: 0.5 },
  },
} as const satisfies Record<string, ButtonStyles>;

export type ButtonVariant = keyof typeof buttonVariants;
