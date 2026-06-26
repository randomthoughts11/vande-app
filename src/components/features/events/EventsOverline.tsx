import { StyleSheet, Text, type TextStyle, type StyleProp } from 'react-native';
import { EVENTS_COLORS, EVENTS_FONTS } from '@/constants/events-mock';

interface EventsOverlineProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

export function EventsOverline({ children, style }: EventsOverlineProps) {
  return <Text style={[styles.overline, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  overline: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: EVENTS_COLORS.accentPink,
    textAlign: 'center',
    fontFamily: EVENTS_FONTS.sans,
  },
});
