import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useStripePayment } from '@/lib/use-stripe';
import { useQuery } from '@tanstack/react-query';
import { Crown } from 'lucide-react-native';
import { MembershipCard } from '@/components/features/wellness/MembershipCard';
import { Card } from '@/components/ui/Card';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { getMembershipPlans } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import type { MembershipPlan } from '@/types/domain';
import { colors, layout, spacing, typography } from '@/lib/theme';
import { processPayment } from '@/lib/stripe';

export default function MembershipScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripePayment();
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

  if (isLoading) return <LoadingScreen message="Loading membership plans..." />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <Card variant="sage" style={styles.hero}>
        <View style={styles.heroRow}>
          <Crown size={28} color={colors.gold} />
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Vande Membership</Text>
            <Text style={styles.heroDesc}>
              Virtual consultations, direct messaging, webinars, and member discounts on VandeCart.
            </Text>
          </View>
        </View>
      </Card>

      {plans?.map((plan) => (
        <View key={plan.id} style={styles.planWrap}>
          <MembershipCard
            plan={plan}
            onSelect={() => handleSelect(plan)}
            loading={loadingPlanId === plan.id}
          />
        </View>
      ))}

      <Text style={styles.note}>
        Digital course purchases may require separate app store review. Services and memberships use secure checkout.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  hero: { marginBottom: layout.sectionGap },
  heroRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  heroText: { flex: 1 },
  heroTitle: { ...typography.h3, color: colors.deepGreen },
  heroDesc: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.xs, lineHeight: 20 },
  planWrap: { marginBottom: layout.cardGap },
  note: { ...typography.caption, color: colors.mutedText, fontStyle: 'italic', textAlign: 'center', lineHeight: 18 },
});
