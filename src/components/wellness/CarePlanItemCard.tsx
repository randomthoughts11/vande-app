import { StyleSheet, Text, View } from 'react-native';
import type { CarePlanItem } from '@/types/domain';
import { colors, spacing, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

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
  return (
    <Card style={item.status === 'completed' ? styles.completed : undefined}>
      <View style={styles.header}>
        <Badge
          label={item.status === 'completed' ? 'Completed' : item.type}
          variant={item.status === 'completed' ? 'success' : 'default'}
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
        <Text style={styles.safety}>⚠ {item.safetyNote}</Text>
      ) : null}
      {item.status === 'pending' && (
        <View style={styles.actions}>
          <Button title="Complete" onPress={onComplete} loading={loading} style={styles.actionBtn} />
          <Button title="Skip" variant="outline" onPress={onSkip} style={styles.actionBtn} />
          <Button title="Ask care team" variant="ghost" onPress={onAskTeam} style={styles.actionBtn} />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  completed: { opacity: 0.75 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  schedule: { ...typography.caption, color: colors.gold },
  title: { ...typography.h3, color: colors.ink, marginTop: spacing.sm },
  instructions: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.xs },
  rationale: {
    backgroundColor: colors.sage,
    padding: spacing.sm,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  rationaleLabel: { ...typography.caption, fontWeight: '700', color: colors.deepGreen },
  rationaleText: { ...typography.bodySmall, color: colors.ink, marginTop: 2 },
  safety: { ...typography.caption, color: colors.warning, marginTop: spacing.sm },
  actions: { marginTop: spacing.md, gap: spacing.sm },
  actionBtn: { marginTop: 4 },
});
