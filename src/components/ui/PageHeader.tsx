import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/lib/theme';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

export function PageHeader({ title, subtitle, style }: PageHeaderProps) {
  return (
    <View style={[styles.header, style]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.deepGreen,
    marginHorizontal: -spacing.md,
    marginTop: -spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    marginBottom: spacing.lg,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  title: { ...typography.h1, color: colors.warmCream, fontSize: 26 },
  subtitle: { ...typography.bodySmall, color: colors.sage, marginTop: spacing.xs, lineHeight: 20 },
});
