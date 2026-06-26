import { Platform, ViewStyle, TextStyle } from 'react-native';
import { colors } from './colors';
import { spacing, layout } from './spacing';
import { typography } from './typography';
import { radii } from './radii';
import { shadows } from './shadows';

/**
 * Navigation patterns — bottom tabs, headers, segmented controls
 * Derived from screens 1–5 (tabs), 4–5 (messages tabs), 3 (menu)
 */

export const navigation = {
  /** Bottom tab bar — 4 items: Home, Events, Shop/Blog, More/Menu */
  tabBar: {
    style: {
      backgroundColor: colors.card,
      borderTopColor: colors.border,
      borderTopWidth: 1,
      height: Platform.OS === 'ios' ? 88 : 64,
      paddingTop: 6,
      paddingBottom: Platform.OS === 'ios' ? 24 : 8,
      ...shadows.none,
    } satisfies ViewStyle,
    activeTintColor: colors.primary,
    inactiveTintColor: colors.textMuted,
    labelStyle: {
      ...typography.tabLabel,
      marginTop: 2,
    } satisfies TextStyle,
    iconSize: 24,
  },

  /** Dark green header — home screen greeting area */
  headerDark: {
    container: {
      backgroundColor: colors.headerGreen,
      paddingHorizontal: layout.screenPaddingX,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
    } satisfies ViewStyle,
    title: {
      ...typography.h2,
      color: colors.textOnDark,
    } satisfies TextStyle,
    subtitle: {
      ...typography.body,
      color: colors.textOnDark,
      opacity: 0.9,
    } satisfies TextStyle,
    statusBar: 'light' as const,
  },

  /** Standard stack header — back arrow + title */
  headerLight: {
    container: {
      backgroundColor: colors.card,
      height: layout.headerHeight,
      paddingHorizontal: layout.screenPaddingXCompact,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    } satisfies ViewStyle,
    title: {
      ...typography.h3,
      color: colors.text,
      flex: 1,
    } satisfies TextStyle,
    statusBar: 'dark' as const,
  },

  /** Cream hero header — events, wellness assessment */
  headerCream: {
    container: {
      backgroundColor: colors.backgroundCream,
      paddingHorizontal: layout.screenPaddingX,
      paddingVertical: spacing.lg,
    } satisfies ViewStyle,
    title: {
      ...typography.h3,
      color: colors.text,
      textAlign: 'center',
    } satisfies TextStyle,
    statusBar: 'dark' as const,
  },

  /**
   * Segmented top tabs — Messages / General
   * Active: bold text + 3px primary bottom border
   */
  segmentedControl: {
    container: {
      flexDirection: 'row',
      height: layout.segmentedTabHeight,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    } satisfies ViewStyle,
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.md,
    } satisfies ViewStyle,
    tabActive: {
      borderBottomWidth: 3,
      borderBottomColor: colors.primary,
    } satisfies ViewStyle,
    label: {
      ...typography.body,
      color: colors.textMuted,
    } satisfies TextStyle,
    labelActive: {
      ...typography.body,
      fontWeight: typography.label.fontWeight,
      color: colors.text,
    } satisfies TextStyle,
    badge: {
      backgroundColor: colors.notification,
      borderRadius: radii.full,
      minWidth: 20,
      height: 20,
      paddingHorizontal: spacing.xs,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: spacing.xs,
    } satisfies ViewStyle,
    badgeText: {
      ...typography.caption,
      color: colors.textOnPrimary,
      fontWeight: typography.tag.fontWeight,
    } satisfies TextStyle,
  },

  /** Search bar — pill shape, border or shadow */
  searchBar: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      marginHorizontal: layout.screenPaddingX,
      ...shadows.md,
    } satisfies ViewStyle,
    placeholder: {
      ...typography.body,
      color: colors.textMuted,
      flex: 1,
    } satisfies TextStyle,
    iconSize: 20,
  },

  /** FAB positioning — bottom-right on messages */
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
  } satisfies ViewStyle,

  /** Icon list row — Need Help?, menu items */
  listRow: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.lg,
      paddingHorizontal: layout.screenPaddingX,
      gap: spacing.lg,
    } satisfies ViewStyle,
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: radii.full,
      backgroundColor: colors.sage,
      alignItems: 'center',
      justifyContent: 'center',
    } satisfies ViewStyle,
    label: {
      ...typography.label,
      color: colors.text,
      flex: 1,
    } satisfies TextStyle,
    subtitle: {
      ...typography.caption,
      color: colors.textMuted,
    } satisfies TextStyle,
    chevronSize: 20,
  },

  /** Vertical step indicator — How it Works flows */
  stepIndicator: {
    connector: {
      width: 1,
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: colors.border,
      flex: 1,
      marginVertical: spacing.xs,
    } satisfies ViewStyle,
    dot: {
      width: layout.avatarMd,
      height: layout.avatarMd,
      borderRadius: radii.full,
      backgroundColor: colors.sageMuted,
      alignItems: 'center',
      justifyContent: 'center',
    } satisfies ViewStyle,
    dotActive: {
      backgroundColor: colors.sage,
      borderWidth: 1,
      borderColor: colors.borderSage,
    } satisfies ViewStyle,
    stepLabel: {
      ...typography.overline,
      color: colors.primary,
    } satisfies TextStyle,
    stepTitle: {
      ...typography.label,
      color: colors.text,
    } satisfies TextStyle,
    stepDescription: {
      ...typography.bodySmall,
      color: colors.textSecondary,
    } satisfies TextStyle,
  },
} as const;
