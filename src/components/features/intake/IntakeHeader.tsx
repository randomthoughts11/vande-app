import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { INTAKE_COLORS, INTAKE_FONTS } from '@/constants/intake-mock';

interface IntakeHeaderProps {
  onBack?: () => void;
}

export function IntakeHeader({ onBack }: IntakeHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Pressable
        onPress={onBack ?? (() => router.back())}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={12}
      >
        <ArrowLeft size={22} color={INTAKE_COLORS.textPrimary} strokeWidth={2} />
      </Pressable>
      <Text style={styles.title}>Intake Form</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: INTAKE_COLORS.card,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: INTAKE_COLORS.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: INTAKE_COLORS.textPrimary,
    fontFamily: INTAKE_FONTS.sans,
  },
});
