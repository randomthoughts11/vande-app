import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { CarePlanItemCard } from '@/components/features/wellness/CarePlanItemCard';
import { MetricTrendCard } from '@/components/features/wellness/MetricTrendCard';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { completeCarePlanItem, getCarePlan, skipCarePlanItem } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { formatDate } from '@/lib/dates';
import type { CarePlanItemType } from '@/types/domain';
import { colors, layout, spacing, typography } from '@/lib/theme';

const SECTIONS: { key: CarePlanItemType | 'progress'; label: string; emoji: string }[] = [
  { key: 'supplement', label: 'Supplements / Herbal', emoji: '🌿' },
  { key: 'yoga', label: 'Yoga Therapy', emoji: '🧘' },
  { key: 'nutrition', label: 'Nutrition', emoji: '🥗' },
  { key: 'lifestyle', label: 'Lifestyle', emoji: '☀️' },
  { key: 'detox', label: 'Detox / Panchakarma', emoji: '✨' },
  { key: 'progress', label: 'Progress', emoji: '📈' },
];

export default function PlanScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: plan, isLoading } = useQuery({
    queryKey: QUERY_KEYS.carePlan,
    queryFn: getCarePlan,
  });

  const completeMutation = useMutation({
    mutationFn: completeCarePlanItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.carePlan }),
  });

  const skipMutation = useMutation({
    mutationFn: skipCarePlanItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.carePlan }),
  });

  if (isLoading) return <LoadingScreen message="Loading your care plan..." />;

  if (!plan) {
    return (
      <Screen scroll={false}>
        <EmptyState
          title="No active care plan"
          description="Book a consultation to receive your personalized Ayurvedic wellness plan."
          actionLabel="Book consultation"
          onAction={() => router.push('/(tabs)/consult')}
        />
      </Screen>
    );
  }

  const completedCount = plan.items.filter((i) => i.status === 'completed').length;
  const adherence = plan.items.length > 0 ? (completedCount / plan.items.length) * 100 : 0;

  return (
    <Screen>
      <PageHeader title="Your wellness plan" subtitle={plan.goal} />

      <Card variant="elevated" style={styles.overviewCard}>
        <View style={styles.overview}>
          <ProgressRing progress={adherence} size={72} />
          <View style={styles.overviewInfo}>
            <Badge label={plan.status} variant="success" />
            <Text style={styles.practitionerLabel}>Assigned practitioner</Text>
            <Text style={styles.practitionerName}>
              {plan.practitioner?.firstName} {plan.practitioner?.lastName}
            </Text>
            <Text style={styles.practitionerCred}>{plan.practitioner?.credentials}</Text>
            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>Next review</Text>
              <Text style={styles.reviewDate}>{formatDate(plan.nextReviewDate)}</Text>
            </View>
          </View>
        </View>
        {plan.progressSummary ? (
          <Text style={styles.progressSummary}>{plan.progressSummary}</Text>
        ) : null}
      </Card>

      {SECTIONS.map((section) => {
        if (section.key === 'progress') {
          return (
            <View key={section.key} style={styles.section}>
              <SectionHeader title={`${section.emoji} ${section.label}`} />
              <View style={styles.metrics}>
                <MetricTrendCard label="Sleep" value={75} trend="↑ Improving" />
                <MetricTrendCard label="Stress" value={60} trend="→ Stable" />
                <MetricTrendCard label="Digestion" value={80} trend="↑ Improving" />
              </View>
              <Text style={styles.disclaimer}>
                Based on your self-reported check-ins. Not a medical diagnosis.
              </Text>
            </View>
          );
        }

        const items = plan.items.filter((i) => i.type === section.key);
        if (items.length === 0) return null;

        return (
          <View key={section.key} style={styles.section}>
            <SectionHeader
              title={`${section.emoji} ${section.label}`}
              subtitle={`${items.length} item${items.length > 1 ? 's' : ''}`}
            />
            {items.map((item) => (
              <View key={item.id} style={styles.itemWrap}>
                <CarePlanItemCard
                  item={item}
                  loading={completeMutation.isPending || skipMutation.isPending}
                  onComplete={() => completeMutation.mutate(item.id)}
                  onSkip={() => skipMutation.mutate(item.id)}
                  onAskTeam={() => router.push('/chat/thread-001')}
                />
              </View>
            ))}
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  overviewCard: { marginBottom: layout.sectionGap },
  overview: { flexDirection: 'row', gap: spacing.lg, alignItems: 'flex-start' },
  overviewInfo: { flex: 1 },
  practitionerLabel: { ...typography.caption, color: colors.mutedText, marginTop: spacing.sm },
  practitionerName: { ...typography.h3, color: colors.ink },
  practitionerCred: { ...typography.caption, color: colors.gold },
  reviewRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  reviewLabel: { ...typography.caption, color: colors.mutedText },
  reviewDate: { ...typography.label, color: colors.primaryGreen },
  progressSummary: {
    ...typography.bodySmall,
    color: colors.primaryGreen,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    lineHeight: 20,
  },
  section: { marginBottom: layout.sectionGap },
  itemWrap: { marginBottom: layout.cardGap },
  metrics: { flexDirection: 'row', gap: spacing.sm },
  disclaimer: { ...typography.caption, color: colors.mutedText, fontStyle: 'italic', marginTop: spacing.sm },
});
