import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { CarePlanItemCard } from '@/components/features/wellness/CarePlanItemCard';
import { getCarePlan } from '@/lib/api';
import { formatDate } from '@/lib/dates';
import { colors, spacing, typography } from '@/lib/theme';

export default function CarePlanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: plan, isLoading } = useQuery({
    queryKey: ['carePlan', id],
    queryFn: getCarePlan,
  });

  if (isLoading || !plan) {
    return <ActivityIndicator size="large" color={colors.primaryGreen} style={styles.loading} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>{plan.title}</Text>
      <Text style={styles.summary}>{plan.summary}</Text>
      <Text style={styles.meta}>
        Started {formatDate(plan.startDate)} · Review {formatDate(plan.nextReviewDate)}
      </Text>
      {plan.items.map((item) => (
        <CarePlanItemCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  loading: { flex: 1, marginTop: 100 },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  title: { ...typography.h2, color: colors.deepGreen },
  summary: { ...typography.body, color: colors.mutedText, marginTop: spacing.sm },
  meta: { ...typography.caption, color: colors.gold, marginBottom: spacing.lg },
});
