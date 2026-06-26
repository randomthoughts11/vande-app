import { StyleSheet, Text, View } from 'react-native';
import { EVENTS_COLORS, EVENTS_FONTS, EVENTS_YOGA_THERAPY } from '@/constants/events-mock';
import { EventsOverline } from './EventsOverline';
import { EventsSerifHeading } from './EventsSerifHeading';

export function YogaTherapySection() {
  return (
    <View style={styles.container}>
      <EventsOverline>{EVENTS_YOGA_THERAPY.overline}</EventsOverline>
      <EventsSerifHeading
        before={EVENTS_YOGA_THERAPY.titleBefore}
        highlight={EVENTS_YOGA_THERAPY.titleHighlight}
        after=""
        size="md"
      />
      <Text style={styles.description}>{EVENTS_YOGA_THERAPY.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: EVENTS_COLORS.textBody,
    textAlign: 'center',
    fontFamily: EVENTS_FONTS.sans,
    paddingHorizontal: 4,
  },
});
