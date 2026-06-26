import {
    BookingDetailsCard,
    ConfirmationHeader,
} from "@/components/features/intake";
import {
    BOOKING_CONFIRMATION,
    INTAKE_COLORS,
    INTAKE_FONTS,
} from "@/constants/intake-mock";
import { intakeHref } from "@/lib/intake-navigation";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
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

/** VANDE booking confirmed with consultation details */
export default function BookingConfirmedScreen() {
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
          title={BOOKING_CONFIRMATION.title}
          subtitle={BOOKING_CONFIRMATION.subtitle}
        />
        <BookingDetailsCard
          onAddToCalendar={handleAddToCalendar}
          onViewForm={() => router.push(intakeHref("/intake/review"))}
        />
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
          onPress={() => router.push(intakeHref("/intake/session-prep"))}
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
