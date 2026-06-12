import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '@/lib/theme';

type BadgeVariant = 'default' | 'gold' | 'success' | 'warning';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant]]} accessibilityLabel={label}>
      <Text style={[styles.text, styles[`${variant}Text` as keyof typeof styles]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
  },
  default: { backgroundColor: colors.sage },
  gold: { backgroundColor: colors.lightGold },
  success: { backgroundColor: '#E8F5E9' },
  warning: { backgroundColor: '#FFF3E0' },
  text: { ...typography.caption, fontWeight: '600' },
  defaultText: { color: colors.deepGreen },
  goldText: { color: colors.gold },
  successText: { color: colors.success },
  warningText: { color: colors.warning },
});
