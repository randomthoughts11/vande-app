import { StyleSheet, Text, View } from 'react-native';
import { INTAKE_COLORS, INTAKE_FONTS } from '@/constants/intake-mock';

interface IntakeProgressBarProps {
  section: string;
  step: number;
  totalSteps: number;
  filledSegments: number;
  totalSegments: number;
}

export function IntakeProgressBar({
  section,
  step,
  totalSteps,
  filledSegments,
  totalSegments,
}: IntakeProgressBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.section}>{section}</Text>
      <View style={styles.bar}>
        {Array.from({ length: totalSegments }).map((_, i) => (
          <View
            key={i}
            style={[styles.segment, i < filledSegments ? styles.segmentFilled : styles.segmentEmpty]}
          />
        ))}
      </View>
      <Text style={styles.step}>
        Step {step} of {totalSteps}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: INTAKE_COLORS.background,
  },
  section: {
    fontSize: 13,
    fontWeight: '600',
    color: INTAKE_COLORS.primaryGreen,
    fontFamily: INTAKE_FONTS.sans,
    minWidth: 72,
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  segmentFilled: {
    backgroundColor: INTAKE_COLORS.primaryGreen,
  },
  segmentEmpty: {
    backgroundColor: INTAKE_COLORS.progressEmpty,
  },
  step: {
    fontSize: 12,
    color: INTAKE_COLORS.textMuted,
    fontFamily: INTAKE_FONTS.sans,
    minWidth: 88,
    textAlign: 'right',
  },
});
