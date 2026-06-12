import { ActivityIndicator, Pressable, StyleSheet, Text, type PressableProps, type ViewStyle, type StyleProp } from 'react-native';
import { colors, radii, typography } from '@/lib/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      style={({ pressed }) =>
        StyleSheet.flatten([
          styles.base,
          styles[variant],
          fullWidth && styles.fullWidth,
          pressed && !isDisabled && styles.pressed,
          isDisabled && styles.disabled,
          style,
        ])
      }
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? colors.primaryGreen : colors.white}
        />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text` as keyof typeof styles]]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  fullWidth: { width: '100%' },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.5 },
  primary: { backgroundColor: colors.primaryGreen },
  secondary: { backgroundColor: colors.gold },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primaryGreen,
  },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: colors.danger },
  text: { ...typography.label },
  primaryText: { color: colors.white },
  secondaryText: { color: colors.white },
  outlineText: { color: colors.primaryGreen },
  ghostText: { color: colors.primaryGreen },
  dangerText: { color: colors.white },
});
