import {
    CONSULT_INTRO,
    INTAKE_COLORS,
    INTAKE_FONTS,
} from "@/constants/intake-mock";
import { getFirstStepId, intakeStepHref } from "@/lib/intake-navigation";
import { useRouter } from "expo-router";
import {
    Calendar,
    HandHeart,
    Laptop,
    MousePointerClick,
    Video
} from "lucide-react-native";
import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FEATURE_ICONS = [Video, Laptop, HandHeart];
const TIMELINE_ICONS = [MousePointerClick, Calendar, HandHeart];

/** VANDE consult intro — free consultation landing */
export default function ConsultIntroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={INTAKE_COLORS.consultHeader}
      />

      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.mascot}>🌿</Text>
        <Text style={styles.headerTitle}>{CONSULT_INTRO.title}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <View style={styles.featureRow}>
          {CONSULT_INTRO.features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i] ?? Video;
            return (
              <View key={feature.id} style={styles.featureCard}>
                <Icon
                  size={24}
                  color={INTAKE_COLORS.primaryGreen}
                  strokeWidth={2}
                />
                <Text style={styles.featureText}>{feature.label}</Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Here's how it works</Text>

        <View style={styles.timeline}>
          {CONSULT_INTRO.timeline.map((step, i) => {
            const Icon = TIMELINE_ICONS[i] ?? Calendar;
            const isLast = i === CONSULT_INTRO.timeline.length - 1;
            return (
              <View key={step.id} style={styles.timelineRow}>
                <View style={styles.timelineLeft}>
                  <View style={styles.timelineIcon}>
                    <Icon
                      size={18}
                      color={INTAKE_COLORS.primaryGreen}
                      strokeWidth={2}
                    />
                  </View>
                  {!isLast ? <View style={styles.timelineLine} /> : null}
                </View>
                <Text style={styles.timelineLabel}>{step.label}</Text>
              </View>
            );
          })}
        </View>

        <Pressable
          onPress={() => router.push(intakeStepHref(getFirstStepId()))}
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Text style={styles.ctaText}>{CONSULT_INTRO.cta}</Text>
        </Pressable>

        <Pressable accessibilityRole="button" style={styles.linkWrap}>
          <Text style={styles.link}>{CONSULT_INTRO.link}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: INTAKE_COLORS.card },
  header: {
    backgroundColor: INTAKE_COLORS.consultHeader,
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  mascot: { fontSize: 28, marginBottom: 12 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 36,
    fontFamily: INTAKE_FONTS.sans,
  },
  scroll: {
    paddingHorizontal: 20,
    marginTop: -32,
  },
  featureRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },
  featureCard: {
    flex: 1,
    backgroundColor: INTAKE_COLORS.card,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  featureText: {
    fontSize: 11,
    textAlign: "center",
    color: INTAKE_COLORS.primaryGreen,
    fontFamily: INTAKE_FONTS.sans,
    lineHeight: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: INTAKE_COLORS.textPrimary,
    marginBottom: 20,
    fontFamily: INTAKE_FONTS.sans,
  },
  timeline: { gap: 0, marginBottom: 28 },
  timelineRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
  },
  timelineLeft: { alignItems: "center", width: 40 },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: INTAKE_COLORS.timelineBg,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineLine: {
    width: 1,
    flex: 1,
    minHeight: 24,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: INTAKE_COLORS.border,
    marginVertical: 4,
  },
  timelineLabel: {
    flex: 1,
    fontSize: 15,
    color: INTAKE_COLORS.textPrimary,
    paddingTop: 10,
    paddingBottom: 20,
    fontFamily: INTAKE_FONTS.sans,
    lineHeight: 21,
  },
  cta: {
    backgroundColor: INTAKE_COLORS.consultHeader,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  pressed: { opacity: 0.9 },
  ctaText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: INTAKE_FONTS.sans,
  },
  linkWrap: { alignItems: "center" },
  link: {
    fontSize: 15,
    color: INTAKE_COLORS.textPrimary,
    textDecorationLine: "underline",
    fontFamily: INTAKE_FONTS.sans,
  },
});
