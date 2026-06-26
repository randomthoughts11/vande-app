import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { HOME_COLORS } from '@/constants/home-mock';

interface CircleArrowButtonProps {
  onPress?: () => void;
  accessibilityLabel?: string;
}

export function CircleArrowButton({ onPress, accessibilityLabel = 'Continue' }: CircleArrowButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HOME_COLORS.linkGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
});
