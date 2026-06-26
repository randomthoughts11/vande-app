import { ViewStyle } from 'react-native';
import { palette } from './colors';

type ShadowStyle = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

/** Shadow presets — cards use soft elevation; messages/confirmation are flat */
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } satisfies ShadowStyle,

  /** Menu list cards, subtle lift */
  sm: {
    shadowColor: palette.ink900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  } satisfies ShadowStyle,

  /** Home cards, event cards, practitioner cards */
  card: {
    shadowColor: palette.ink800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  } satisfies ShadowStyle,

  /** Search bar, elevated inputs */
  md: {
    shadowColor: palette.ink900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  } satisfies ShadowStyle,

  /** FAB on messages screen */
  fab: {
    shadowColor: palette.ink900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  } satisfies ShadowStyle,

  /** Warm selection cards (screen 7–8) */
  warmCard: {
    shadowColor: palette.ink900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  } satisfies ShadowStyle,
} as const;
