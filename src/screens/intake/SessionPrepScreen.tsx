import {
    ConfirmationHeader,
    PrepInstructionList,
} from "@/components/features/intake";
import {
    INTAKE_COLORS,
    INTAKE_FONTS,
    SESSION_PREP,
} from "@/constants/intake-mock";
import { useRouter } from "expo-router";
import { CalendarPlus, X } from "lucide-react-native";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** VANDE session prep — post-booking checklist */
export default function SessionPrepScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [toastVisible, setToastVisible] = useState(false);

  const handleAddToCalendar = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        <ConfirmationHeader
          title={SESSION_PREP.title}
          subtitle={SESSION_PREP.subtitle}
        />
        <PrepInstructionList
          sectionTitle={SESSION_PREP.sectionTitle}
          items={SESSION_PREP.items}
        />

        <Pressable
          onPress={handleAddToCalendar}
          style={({ pressed }) => [
            styles.calendarBtn,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
        >
          <CalendarPlus
            size={18}
            color={INTAKE_COLORS.textPrimary}
            strokeWidth={2}
          />
          <Text style={styles.calendarText}>Add to Calendar</Text>
        </Pressable>
      </ScrollView>

      {toastVisible ? (
        <View style={[styles.toast, { bottom: insets.bottom + 88 }]}>
          <Text style={styles.toastText}>Event added to calendar</Text>
          <Pressable onPress={() => setToastVisible(false)} hitSlop={8}>
            <X size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      ) : null}

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable
          onPress={() => router.replace("/(tabs)/today")}
          style={({ pressed }) => [styles.nextBtn, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Text style={styles.nextText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: INTAKE_COLORS.card },
  calendarBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 32,
    marginHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: INTAKE_COLORS.textPrimary,
  },
  calendarText: {
    fontSize: 15,
    fontWeight: "600",
    color: INTAKE_COLORS.textPrimary,
    fontFamily: INTAKE_FONTS.sans,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: INTAKE_COLORS.card,
  },
  nextBtn: {
    backgroundColor: INTAKE_COLORS.primaryGreen,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
  },
  pressed: { opacity: 0.9 },
  nextText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: INTAKE_FONTS.sans,
  },
  toast: {
    position: "absolute",
    left: 20,
    right: 20,
    backgroundColor: "#333333",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: INTAKE_FONTS.sans,
  },
});
