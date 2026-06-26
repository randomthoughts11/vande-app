import { StyleSheet, Text, View } from 'react-native';
import { EVENTS_COLORS, EVENTS_FONTS } from '@/constants/events-mock';

interface EventsSerifHeadingProps {
  before?: string;
  highlight?: string;
  after?: string;
  children?: string;
  centered?: boolean;
  size?: 'lg' | 'md';
}

export function EventsSerifHeading({
  before = '',
  highlight = '',
  after = '',
  children,
  centered = true,
  size = 'lg',
}: EventsSerifHeadingProps) {
  const textStyle = size === 'lg' ? styles.headingLg : styles.headingMd;

  if (children) {
    return (
      <Text style={[textStyle, centered && styles.centered]}>{children}</Text>
    );
  }

  return (
    <View style={centered && styles.centeredWrap}>
      <Text style={[textStyle, centered && styles.centered]}>
        {before}
        {highlight ? <Text style={styles.highlight}>{highlight}</Text> : null}
        {after}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredWrap: {
    alignItems: 'center',
  },
  centered: {
    textAlign: 'center',
  },
  headingLg: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: EVENTS_COLORS.textPrimary,
    fontFamily: EVENTS_FONTS.serif,
    letterSpacing: -0.5,
  },
  headingMd: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: EVENTS_COLORS.textPrimary,
    fontFamily: EVENTS_FONTS.serif,
    letterSpacing: -0.3,
  },
  highlight: {
    color: EVENTS_COLORS.accentPink,
    fontFamily: EVENTS_FONTS.serif,
    fontWeight: '700',
  },
});
