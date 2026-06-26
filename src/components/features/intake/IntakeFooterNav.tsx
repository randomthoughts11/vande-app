import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { INTAKE_COLORS, INTAKE_FONTS } from '@/constants/intake-mock';

interface IntakeFooterNavProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
}

export function IntakeFooterNav({
  onBack,
  onNext,
  nextLabel = 'Next',
  backLabel = '← Back',
}: IntakeFooterNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      <Pressable onPress={onBack} accessibilityRole="button" hitSlop={8}>
        <Text style={styles.back}>{backLabel}</Text>
      </Pressable>
      <Pressable
        onPress={onNext}
        accessibilityRole="button"
        style={({ pressed }) => [styles.nextBtn, pressed && styles.pressed]}
      >
        <Text style={styles.nextText}>{nextLabel}</Text>
        {nextLabel !== 'Submit intake →' ? (
          <ChevronRight size={18} color="#FFFFFF" strokeWidth={2.5} />
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: INTAKE_COLORS.background,
  },
  back: {
    fontSize: 15,
    color: INTAKE_COLORS.textSecondary,
    fontFamily: INTAKE_FONTS.sans,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: INTAKE_COLORS.primaryButton,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 28,
  },
  pressed: { opacity: 0.9 },
  nextText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: INTAKE_FONTS.sans,
  },
});
