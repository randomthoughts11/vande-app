import { StyleSheet, Text, View } from 'react-native';
import { CheckCircle2, Circle, Leaf } from 'lucide-react-native';
import type { CarePlanItem } from '@/types/domain';
import { colors, radii, spacing, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const TYPE_LABELS: Record<string, string> = {
  supplement: 'Herbal',
  yoga: 'Yoga',
  nutrition: 'Nutrition',
  lifestyle: 'Lifestyle',
  detox: 'Detox',
};

interface TodayPlanCardProps {
  items: CarePlanItem[];
}

export function TodayPlanCard({ items }: TodayPlanCardProps) {
  return (
    <Card variant="elevated">
      <View style={styles.header}>
        <Leaf size={20} color={colors.primaryGreen} />
        <Text style={styles.headerTitle}>Today&apos;s balance</Text>
      </View>
      {items.map((item, index) => {
        const done = item.status === 'completed';
        return (
          <View key={item.id} style={[styles.item, index > 0 && styles.itemBorder]}>
            <View style={styles.itemTop}>
              {done ? (
                <CheckCircle2 size={18} color={colors.success} />
              ) : (
                <Circle size={18} color={colors.border} />
              )}
              <View style={styles.itemContent}>
                <View style={styles.itemHeader}>
                  <Badge label={TYPE_LABELS[item.type] ?? item.type} variant="gold" />
                  <Text style={styles.schedule}>{item.schedule}</Text>
                </View>
                <Text style={[styles.itemTitle, done && styles.itemDone]}>{item.title}</Text>
                <Text style={styles.instructions} numberOfLines={2}>{item.instructions}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  headerTitle: { ...typography.h3, color: colors.deepGreen },
  item: { paddingVertical: spacing.sm },
  itemBorder: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: spacing.sm, paddingTop: spacing.md },
  itemTop: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  itemContent: { flex: 1 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  schedule: { ...typography.caption, color: colors.gold, fontWeight: '600' },
  itemTitle: { ...typography.label, color: colors.ink, marginTop: spacing.xs },
  itemDone: { textDecorationLine: 'line-through', color: colors.mutedText },
  instructions: { ...typography.bodySmall, color: colors.mutedText, marginTop: 4, lineHeight: 18 },
});
