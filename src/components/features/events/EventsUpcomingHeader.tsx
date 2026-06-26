import { StyleSheet, Text, View } from 'react-native';
import { EVENTS_COLORS, EVENTS_FONTS, EVENTS_UPCOMING } from '@/constants/events-mock';
import { EventsOverline } from './EventsOverline';
import { EventsSerifHeading } from './EventsSerifHeading';

export function EventsUpcomingHeader() {
  return (
    <View style={styles.container}>
      <EventsOverline>{EVENTS_UPCOMING.overline}</EventsOverline>
      <EventsSerifHeading
        before={EVENTS_UPCOMING.titleBefore}
        highlight={EVENTS_UPCOMING.titleHighlight}
        after=""
      />
      <Text style={styles.description}>{EVENTS_UPCOMING.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
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
