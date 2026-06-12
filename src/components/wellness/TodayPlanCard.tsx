import { StyleSheet, Text, View } from 'react-native';
import { Leaf } from 'lucide-react-native';
import type { CarePlanItem } from '@/types/domain';
import { colors, spacing, typography } from '@/lib/theme';
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
      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          <Badge label={TYPE_LABELS[item.type] ?? item.type} variant="gold" />
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.schedule}>{item.schedule}</Text>
          <Text style={styles.instructions} numberOfLines={2}>
            {item.instructions}
          </Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  headerTitle: { ...typography.h3, color: colors.deepGreen },
  item: {
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.sm,
  },
  itemTitle: { ...typography.label, color: colors.ink, marginTop: spacing.xs },
  schedule: { ...typography.caption, color: colors.gold, marginTop: 2 },
  instructions: { ...typography.bodySmall, color: colors.mutedText, marginTop: 4 },
});
