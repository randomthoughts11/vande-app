import { StyleSheet, Text, View } from 'react-native';
import type { MembershipPlan } from '@/types/domain';
import { colors, spacing, typography } from '@/lib/theme';
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
    <Card variant={plan.featured ? 'sage' : 'elevated'} style={plan.featured ? styles.featured : undefined}>
      {plan.featured ? <Badge label="Popular" variant="gold" /> : null}
      <Text style={styles.name}>{plan.name}</Text>
      <Text style={styles.price}>
        ${price}
        <Text style={styles.period}>{period}</Text>
      </Text>
      <Text style={styles.description}>{plan.description}</Text>
      <View style={styles.entitlements}>
        {plan.entitlements.map((e) => (
          <Text key={e.id} style={styles.entitlement}>
            • {e.label}: {String(e.value)}
          </Text>
        ))}
      </View>
      {onSelect ? (
        <Button
          title="Choose plan"
          onPress={onSelect}
          loading={loading}
          fullWidth
          style={styles.button}
          accessibilityLabel={`Select ${plan.name}`}
        />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  featured: { borderColor: colors.gold, borderWidth: 2 },
  name: { ...typography.h3, color: colors.deepGreen, marginTop: spacing.sm },
  price: { ...typography.h1, color: colors.ink, marginTop: spacing.xs },
  period: { ...typography.bodySmall, color: colors.mutedText },
  description: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.sm },
  entitlements: { marginTop: spacing.md },
  entitlement: { ...typography.bodySmall, color: colors.ink, marginBottom: 4 },
  button: { marginTop: spacing.md },
});
