/**
 * Vande Design System — React Native Expo
 *
 * @example
 * import { colors, typography, buttonVariants, cardVariants, navigation } from '@/lib/theme';
 */

import { colors, palette, categoryColors } from './colors';
import { typography, fontFamilies, fontSize, lineHeight, fontWeight } from './typography';
import { spacing, layout } from './spacing';
import { radii } from './radii';
import { shadows } from './shadows';
import { buttonSizes, buttonVariants } from './buttons';
import { cardVariants } from './cards';
import { navigation } from './navigation';

export { palette, colors, categoryColors } from './colors';
export { fontFamilies, fontSize, lineHeight, fontWeight, typography } from './typography';
export { spacing, layout } from './spacing';
export { radii } from './radii';
export { shadows } from './shadows';
export { buttonSizes, buttonVariants, type ButtonVariant } from './buttons';
export { cardVariants, type CardVariant } from './cards';
export { navigation } from './navigation';

/** Unified theme object for context providers */
export const theme = {
  colors,
  palette,
  categoryColors,
  typography,
  fontFamilies,
  fontSize,
  lineHeight,
  fontWeight,
  spacing,
  layout,
  radii,
  shadows,
  buttonSizes,
  buttonVariants,
  cardVariants,
  navigation,
} as const;

export type Theme = typeof theme;
