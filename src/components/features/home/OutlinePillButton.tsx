import { Pressable, StyleSheet, Text, type ViewStyle, type StyleProp } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { HOME_COLORS } from '@/constants/home-mock';

interface OutlinePillButtonProps {
  label: string;
  onPress?: () => void;
  icon?: LucideIcon;
  style?: StyleProp<ViewStyle>;
}

export function OutlinePillButton({ label, onPress, icon: Icon, style }: OutlinePillButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      {Icon ? <Icon size={16} color={HOME_COLORS.textPrimary} strokeWidth={2} /> : null}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: HOME_COLORS.border,
    backgroundColor: HOME_COLORS.cardWhite,
  },
  pressed: { opacity: 0.85 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: HOME_COLORS.textPrimary,
  },
});
