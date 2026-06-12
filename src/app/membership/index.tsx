import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useQuery } from '@tanstack/react-query';
import { MembershipCard } from '@/components/wellness/MembershipCard';
import { getMembershipPlans } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { processPayment } from '@/lib/stripe';
import type { MembershipPlan } from '@/types/domain';
import { colors, spacing, typography } from '@/lib/theme';

export default function MembershipScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const { data: plans, isLoading } = useQuery({
    queryKey: QUERY_KEYS.memberships,
    queryFn: getMembershipPlans,
  });

  const handleSelect = async (plan: MembershipPlan) => {
    setLoadingPlanId(plan.id);
    try {
      const paid = await processPayment(
        { initPaymentSheet, presentPaymentSheet },
        plan.priceCents,
        { planId: plan.id, type: 'membership' },
      );
      if (paid) {
        Alert.alert('Success', `You selected ${plan.name}. Your membership will be activated shortly.`);
      }
    } catch (e) {
      Alert.alert('Payment failed', e instanceof Error ? e.message : 'Please try again');
    } finally {
      setLoadingPlanId(null);
    }
  };

  if (isLoading) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.intro}>
        Choose a membership plan for virtual consultations, messaging, and member benefits.
      </Text>
      {plans?.map((plan) => (
        <MembershipCard
          key={plan.id}
          plan={plan}
          onSelect={() => handleSelect(plan)}
          loading={loadingPlanId === plan.id}
        />
      ))}
      <Text style={styles.note}>
        Digital courses may require separate app store payment review in a future release.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  intro: { ...typography.body, color: colors.mutedText, marginBottom: spacing.lg },
  note: { ...typography.caption, color: colors.mutedText, marginTop: spacing.md, fontStyle: 'italic' },
});
