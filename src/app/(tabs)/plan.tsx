import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CarePlanItemCard } from '@/components/wellness/CarePlanItemCard';
import { MetricTrendCard } from '@/components/wellness/MetricTrendCard';
import { Card } from '@/components/ui/Card';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { completeCarePlanItem, getCarePlan, skipCarePlanItem } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { formatDate } from '@/lib/dates';
import type { CarePlanItemType } from '@/types/domain';
import { colors, spacing, typography } from '@/lib/theme';

const SECTIONS: { key: CarePlanItemType | 'progress'; label: string }[] = [
  { key: 'supplement', label: 'Supplements / Herbal Products' },
  { key: 'yoga', label: 'Yoga Therapy' },
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'detox', label: 'Detox / Panchakarma' },
  { key: 'progress', label: 'Progress' },
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

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primaryGreen} />
      </View>
    );
  }

  if (!plan) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          title="No active care plan"
          description="Book a consultation to receive your personalized Ayurvedic wellness plan."
          actionLabel="Book consultation"
          onAction={() => router.push('/(tabs)/consult')}
        />
      </SafeAreaView>
    );
  }

  const completedCount = plan.items.filter((i) => i.status === 'completed').length;
  const adherence = plan.items.length > 0 ? (completedCount / plan.items.length) * 100 : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Ayurvedic wellness plan</Text>
          <Text style={styles.goal}>{plan.goal}</Text>
        </View>

        <Card variant="elevated">
          <View style={styles.overview}>
            <ProgressRing progress={adherence} label={`${Math.round(adherence)}% adherence`} />
            <View style={styles.overviewInfo}>
              <Text style={styles.overviewLabel}>Assigned practitioner</Text>
              <Text style={styles.overviewValue}>
                {plan.practitioner?.firstName} {plan.practitioner?.lastName}
              </Text>
              <Text style={styles.overviewLabel}>Next review</Text>
              <Text style={styles.overviewValue}>{formatDate(plan.nextReviewDate)}</Text>
              {plan.progressSummary ? (
                <Text style={styles.progressSummary}>{plan.progressSummary}</Text>
              ) : null}
            </View>
          </View>
        </Card>

        {SECTIONS.map((section) => {
          if (section.key === 'progress') {
            return (
              <View key={section.key}>
                <SectionHeader title={section.label} />
                <View style={styles.metrics}>
                  <MetricTrendCard label="Sleep" value={75} trend="Improving" />
                  <MetricTrendCard label="Stress" value={60} trend="Stable" />
                  <MetricTrendCard label="Digestion" value={80} trend="Improving" />
                </View>
                <Text style={styles.disclaimer}>
                  Trends are based on your self-reported check-ins. Not a medical diagnosis.
                </Text>
              </View>
            );
          }

          const items = plan.items.filter((i) => i.type === section.key);
          if (items.length === 0) return null;

          return (
            <View key={section.key}>
              <SectionHeader title={section.label} />
              {items.map((item) => (
                <CarePlanItemCard
                  key={item.id}
                  item={item}
                  loading={completeMutation.isPending || skipMutation.isPending}
                  onComplete={() => completeMutation.mutate(item.id)}
                  onSkip={() => skipMutation.mutate(item.id)}
                  onAskTeam={() => router.push('/chat/thread-001')}
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.md },
  title: { ...typography.h1, color: colors.deepGreen, fontSize: 24 },
  goal: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.xs },
  overview: { flexDirection: 'row', gap: spacing.lg, alignItems: 'center' },
  overviewInfo: { flex: 1 },
  overviewLabel: { ...typography.caption, color: colors.mutedText, marginTop: spacing.sm },
  overviewValue: { ...typography.label, color: colors.ink },
  progressSummary: { ...typography.bodySmall, color: colors.primaryGreen, marginTop: spacing.sm },
  metrics: { flexDirection: 'row', gap: spacing.sm },
  disclaimer: { ...typography.caption, color: colors.mutedText, fontStyle: 'italic', marginTop: spacing.sm },
});
