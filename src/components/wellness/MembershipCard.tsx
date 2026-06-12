import { StyleSheet, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import type { MembershipPlan } from '@/types/domain';
import { colors, radii, spacing, typography, shadows } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface MembershipCardProps {
  plan: MembershipPlan;
  onSelect?: () => void;
  loading?: boolean;
}

export function MembershipCard({ plan, onSelect, loading }: MembershipCardProps) {
  const price = (plan.priceCents / 100).toFixed(0);
  const period = plan.billingPeriod === 'annual' ? '/year' : '/month';

  return (
    <Card
      variant={plan.featured ? 'sage' : 'elevated'}
      style={[plan.featured && styles.featured, shadows.card]}
    >
      {plan.featured ? <Badge label="Most popular" variant="gold" /> : null}
      <Text style={styles.name}>{plan.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.period}>{period}</Text>
      </View>
      <Text style={styles.description}>{plan.description}</Text>
      <View style={styles.entitlements}>
        {plan.entitlements.map((e) => (
          <View key={e.id} style={styles.entitlementRow}>
            <Check size={14} color={colors.primaryGreen} />
            <Text style={styles.entitlement}>
              {e.label}: <Text style={styles.entitlementValue}>{String(e.value)}</Text>
            </Text>
          </View>
        ))}
      </View>
      {onSelect ? (
        <Button
          title="Choose plan"
          variant={plan.featured ? 'primary' : 'outline'}
          onPress={onSelect}
          loading={loading}
          fullWidth
          style={styles.button}
        />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  featured: { borderColor: colors.gold, borderWidth: 2 },
  name: { ...typography.h3, color: colors.deepGreen, marginTop: spacing.sm },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: spacing.xs },
  price: { ...typography.h1, color: colors.ink, fontSize: 32 },
  period: { ...typography.bodySmall, color: colors.mutedText, marginLeft: 4 },
  description: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.sm, lineHeight: 20 },
  entitlements: { marginTop: spacing.md, gap: spacing.sm },
  entitlementRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  entitlement: { ...typography.bodySmall, color: colors.ink, flex: 1 },
  entitlementValue: { fontWeight: '700', color: colors.primaryGreen },
  button: { marginTop: spacing.lg },
});
