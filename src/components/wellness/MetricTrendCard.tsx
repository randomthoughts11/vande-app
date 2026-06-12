import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { ProgressRing } from '@/components/ui/ProgressRing';

interface MetricTrendCardProps {
  label: string;
  value: number;
  unit?: string;
  trend?: string;
}

export function MetricTrendCard({ label, value, unit, trend }: MetricTrendCardProps) {
  return (
    <Card style={styles.card}>
      <ProgressRing progress={value} size={56} label={`${label}: ${value}%`} />
      <Text style={styles.label}>{label}</Text>
      {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      {trend ? <Text style={styles.trend}>{trend}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', flex: 1, minWidth: 100 },
  label: { ...typography.caption, color: colors.ink, marginTop: spacing.sm, textAlign: 'center' },
  unit: { ...typography.caption, color: colors.mutedText },
  trend: { ...typography.caption, color: colors.success, marginTop: 2 },
});
