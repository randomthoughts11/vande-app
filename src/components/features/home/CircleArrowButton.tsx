import { Pressable, StyleSheet, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { HOME_COLORS } from '@/constants/home-mock';

interface CircleArrowButtonProps {
  onPress?: () => void;
  accessibilityLabel?: string;
  /**
   * When true, renders its own pressable button. Default is a decorative View,
   * because these cards nest the arrow inside a parent Pressable (nesting two
   * buttons breaks web hydration).
   */
  standalone?: boolean;
}

export function CircleArrowButton({
  onPress,
  accessibilityLabel = 'Continue',
  standalone = false,
}: CircleArrowButtonProps) {
  const icon = <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />;

  if (!standalone) {
    return <View style={styles.button}>{icon}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      {icon}
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
