import {
    EventsHeroSection,
    EventsScreenHeader,
    EventsSearchBar,
    EventsUpcomingHeader,
    VANDEEventListCard,
    YogaTherapySection,
} from "@/components/features/events";
import {
    EVENTS_COLORS,
    EVENTS_SPACING,
    VANDE_EVENTS,
} from "@/constants/events-mock";
import { useAppNavigation } from "@/hooks";
import { useMemo, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** VANDE screen 2 — Events list */
export default function EventsListScreen() {
  const insets = useSafeAreaInsets();
  const { goToEvent } = useAppNavigation();
  const [query, setQuery] = useState("");

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return VANDE_EVENTS;
    return VANDE_EVENTS.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.facilitator.toLowerCase().includes(q) ||
        e.dayLabel.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={EVENTS_COLORS.background}
      />

      <EventsScreenHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 32 },
        ]}
      >
        <EventsHeroSection onBrowsePress={() => setQuery("")} />

        <View style={styles.section}>
          <EventsSearchBar value={query} onChangeText={setQuery} />
        </View>

        <View style={styles.section}>
          <EventsUpcomingHeader />
          <View style={styles.eventList}>
            {filteredEvents.map((event) => (
              <VANDEEventListCard
                key={event.id}
                event={event}
                onPress={() => goToEvent(event.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <YogaTherapySection />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EVENTS_COLORS.background,
  },
  scroll: {
    paddingHorizontal: EVENTS_SPACING.screenX,
    paddingTop: 8,
    gap: EVENTS_SPACING.sectionGap,
  },
  section: {
    gap: 0,
  },
  eventList: {
    gap: EVENTS_SPACING.cardGap,
  },
});
