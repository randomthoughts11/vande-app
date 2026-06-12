import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/lib/theme';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.container} accessibilityRole="text">
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {actionLabel && onAction ? (
        <Button title={actionLabel} onPress={onAction} variant="outline" style={styles.button} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: { ...typography.h3, color: colors.ink, textAlign: 'center' },
  description: {
    ...typography.bodySmall,
    color: colors.mutedText,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  button: { marginTop: spacing.lg },
});
