import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, typography } from '@/lib/theme';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ProgressRing({
  progress,
  size = 64,
  strokeWidth = 6,
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <View
      style={[styles.container, { width: size, height: size }]}
      accessibilityLabel={label ?? `${clamped}% complete`}
    >
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primaryGreen}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text style={styles.text}>{Math.round(clamped)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  text: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primaryGreen,
    position: 'absolute',
  },
});
