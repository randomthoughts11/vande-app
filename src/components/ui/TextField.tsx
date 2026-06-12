import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, radii, spacing, typography } from '@/lib/theme';

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function TextField({ label, error, style, ...props }: TextFieldProps) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        accessibilityLabel={label ?? props.placeholder}
        placeholderTextColor={colors.mutedText}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: { ...typography.label, color: colors.ink, marginBottom: spacing.xs },
  input: {
    ...typography.body,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    color: colors.ink,
  },
  inputError: { borderColor: colors.danger },
  error: { ...typography.caption, color: colors.danger, marginTop: spacing.xs },
});
