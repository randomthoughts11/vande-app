import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EVENTS_COLORS, EVENTS_FONTS } from '@/constants/events-mock';

export function EventsScreenHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.title}>Events</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: EVENTS_COLORS.background,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: EVENTS_COLORS.textPrimary,
    fontFamily: EVENTS_FONTS.sans,
  },
});
