import { StyleSheet, View, type ViewProps } from 'react-native';
import { colors, radii, shadows, spacing } from '@/lib/theme';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'sage';
}

export function Card({ children, style, variant = 'default', ...props }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'elevated' && shadows.card,
        variant === 'sage' && styles.sage,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sage: {
    backgroundColor: colors.sage,
    borderColor: colors.sage,
  },
});
