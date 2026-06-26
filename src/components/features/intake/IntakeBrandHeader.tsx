import { INTAKE_COLORS, INTAKE_FONTS } from "@/constants/intake-mock";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface IntakeBrandHeaderProps {
  onSaveExit?: () => void;
}

export function IntakeBrandHeader({ onSaveExit }: IntakeBrandHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>VANDE</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>Health Intake</Text>
        <Text style={styles.tagline}>Vande Wellness</Text>
      </View>
      <Pressable onPress={onSaveExit} accessibilityRole="button" hitSlop={8}>
        <Text style={styles.saveExit}>Save & exit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: INTAKE_COLORS.background,
    gap: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: INTAKE_COLORS.primaryGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 9,
    fontWeight: "700",
    color: INTAKE_COLORS.primaryGreen,
    fontFamily: INTAKE_FONTS.sans,
  },
  center: { flex: 1, alignItems: "center" },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: INTAKE_COLORS.primaryGreen,
    fontFamily: INTAKE_FONTS.serif,
  },
  tagline: {
    fontSize: 12,
    fontStyle: "italic",
    color: INTAKE_COLORS.textMuted,
    fontFamily: INTAKE_FONTS.serif,
    marginTop: 2,
  },
  saveExit: {
    fontSize: 13,
    color: INTAKE_COLORS.textMuted,
    fontFamily: INTAKE_FONTS.sans,
  },
});
