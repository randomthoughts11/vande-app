import type { VANDEEventItem } from "@/constants/events-mock";
import {
    EVENTS_COLORS,
    EVENTS_FONTS,
    EVENTS_SPACING,
} from "@/constants/events-mock";
import { Calendar } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface VANDEEventListCardProps {
  event: VANDEEventItem;
  onPress?: () => void;
}

export function VANDEEventListCard({
  event,
  onPress,
}: VANDEEventListCardProps) {
  const isVirtual = event.tagVariant === "virtual";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={event.title}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: event.imageUri }} style={styles.image} />

      <View style={styles.body}>
        <View style={styles.contentRow}>
          <View style={styles.dateCol}>
            <Calendar
              size={14}
              color={EVENTS_COLORS.textBody}
              strokeWidth={2}
            />
            <Text style={styles.dayNumber}>{event.dayNumber}</Text>
            <Text style={styles.dayLabel}>{event.dayLabel}</Text>
          </View>

          <View style={styles.detailsCol}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.facilitator}>{event.facilitator}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={[styles.tag, isVirtual && styles.tagVirtual]}>
            <Text style={[styles.tagText, isVirtual && styles.tagTextVirtual]}>
              {event.tag}
            </Text>
          </View>
          <Text style={styles.price}>{event.price}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: EVENTS_COLORS.cardWhite,
    borderRadius: EVENTS_SPACING.cardRadius,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  pressed: { opacity: 0.97 },
  image: {
    width: "100%",
    height: 160,
    backgroundColor: "#E8E8E8",
  },
  body: {
    padding: 16,
    gap: 14,
  },
  contentRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
  },
  dateCol: {
    width: 56,
    alignItems: "center",
    gap: 4,
  },
  dayNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: EVENTS_COLORS.textPrimary,
    fontFamily: EVENTS_FONTS.sans,
    lineHeight: 32,
  },
  dayLabel: {
    fontSize: 11,
    color: EVENTS_COLORS.textBody,
    textAlign: "center",
    fontFamily: EVENTS_FONTS.sans,
    lineHeight: 14,
  },
  detailsCol: {
    flex: 1,
    gap: 4,
    paddingTop: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: EVENTS_COLORS.accentPink,
    fontFamily: EVENTS_FONTS.serif,
    lineHeight: 24,
  },
  facilitator: {
    fontSize: 13,
    color: EVENTS_COLORS.textBody,
    fontFamily: EVENTS_FONTS.sans,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tag: {
    backgroundColor: EVENTS_COLORS.accentPinkLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  tagVirtual: {
    backgroundColor: EVENTS_COLORS.accentPinkLight,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "700",
    color: EVENTS_COLORS.accentPink,
    fontFamily: EVENTS_FONTS.sans,
    letterSpacing: 0.3,
  },
  tagTextVirtual: {
    color: EVENTS_COLORS.accentPink,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: EVENTS_COLORS.textPrimary,
    fontFamily: EVENTS_FONTS.sans,
  },
});
