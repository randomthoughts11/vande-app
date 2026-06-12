import { StyleSheet, Text, View } from 'react-native';
import type { CarePlanItem } from '@/types/domain';
import { colors, radii, spacing, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const TYPE_LABELS: Record<string, string> = {
  supplement: 'Herbal',
  yoga: 'Yoga',
  nutrition: 'Nutrition',
  lifestyle: 'Lifestyle',
  detox: 'Detox',
  progress: 'Progress',
};

interface CarePlanItemCardProps {
  item: CarePlanItem;
  onComplete?: () => void;
  onSkip?: () => void;
  onAskTeam?: () => void;
  loading?: boolean;
}

export function CarePlanItemCard({
  item,
  onComplete,
  onSkip,
  onAskTeam,
  loading,
}: CarePlanItemCardProps) {
  const isDone = item.status === 'completed' || item.status === 'skipped';

  return (
    <Card variant="elevated" style={isDone ? styles.completed : undefined}>
      <View style={styles.header}>
        <Badge
          label={item.status === 'completed' ? 'Completed' : item.status === 'skipped' ? 'Skipped' : TYPE_LABELS[item.type] ?? item.type}
          variant={item.status === 'completed' ? 'success' : item.status === 'skipped' ? 'warning' : 'default'}
        />
        <Text style={styles.schedule}>{item.schedule}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.instructions}>{item.instructions}</Text>
      {item.rationale ? (
        <View style={styles.rationale}>
          <Text style={styles.rationaleLabel}>Know why</Text>
          <Text style={styles.rationaleText}>{item.rationale}</Text>
        </View>
      ) : null}
      {item.safetyNote ? (
        <View style={styles.safetyBox}>
          <Text style={styles.safety}>{item.safetyNote}</Text>
        </View>
      ) : null}
      {item.status === 'pending' && (
        <View style={styles.actions}>
          <Button title="Complete" onPress={onComplete} loading={loading} style={styles.actionBtn} />
          <View style={styles.secondaryActions}>
            <Button title="Skip" variant="outline" onPress={onSkip} style={styles.halfBtn} />
            <Button title="Ask team" variant="ghost" onPress={onAskTeam} style={styles.halfBtn} />
          </View>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  completed: { opacity: 0.8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  schedule: { ...typography.caption, color: colors.gold, fontWeight: '600' },
  title: { ...typography.h3, color: colors.ink, marginTop: spacing.sm },
  instructions: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.xs, lineHeight: 20 },
  rationale: {
    backgroundColor: colors.sage,
    padding: spacing.md,
    borderRadius: radii.md,
    marginTop: spacing.md,
  },
  rationaleLabel: { ...typography.caption, fontWeight: '700', color: colors.deepGreen, textTransform: 'uppercase', letterSpacing: 0.5 },
  rationaleText: { ...typography.bodySmall, color: colors.ink, marginTop: 4, lineHeight: 20 },
  safetyBox: {
    backgroundColor: '#FFF8E7',
    padding: spacing.sm,
    borderRadius: radii.sm,
    marginTop: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.warning,
  },
  safety: { ...typography.caption, color: colors.warning, lineHeight: 18 },
  actions: { marginTop: spacing.md, gap: spacing.sm },
  actionBtn: {},
  secondaryActions: { flexDirection: 'row', gap: spacing.sm },
  halfBtn: { flex: 1 },
});
