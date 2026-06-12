import { useQuery } from '@tanstack/react-query';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AlertTriangle, Leaf, ShoppingBag } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { getProduct } from '@/lib/api';
import { openVandeCart } from '@/lib/vandecart';
import { colors, layout, radii, spacing, typography } from '@/lib/theme';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
  });

  if (isLoading || !product) {
    return <LoadingScreen message="Loading product..." />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <View style={styles.imagePlaceholder}>
        <Leaf size={56} color={colors.gold} />
        <ShoppingBag size={24} color={colors.primaryGreen} style={styles.bagIcon} />
      </View>

      <Card variant="elevated">
        {product.practitionerRecommended ? (
          <Badge label="Recommended by your Vande practitioner" variant="gold" />
        ) : null}
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        {product.priceCents ? (
          <Text style={styles.price}>${(product.priceCents / 100).toFixed(2)}</Text>
        ) : null}
        <Text style={styles.description}>{product.description}</Text>
      </Card>

      <Card variant="sage" style={styles.section}>
        <Text style={styles.sectionTitle}>Suggested use</Text>
        <Text style={styles.sectionText}>{product.suggestedUse}</Text>
      </Card>

      <Card style={styles.safetyCard}>
        <View style={styles.safetyRow}>
          <AlertTriangle size={18} color={colors.warning} />
          <Text style={styles.safetyTitle}>Safety note</Text>
        </View>
        <Text style={styles.safetyText}>{product.safetyNote}</Text>
      </Card>

      <Button
        title="Open in VandeCart"
        onPress={() => openVandeCart(product.productUrl)}
        fullWidth
        style={styles.cartBtn}
      />
      <Text style={styles.disclaimer}>
        Purchases are completed on VandeCart. Follow your practitioner&apos;s guidance.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  imagePlaceholder: {
    height: 180,
    backgroundColor: colors.sage,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: layout.cardGap,
    borderWidth: 1,
    borderColor: colors.lightGold,
  },
  bagIcon: { position: 'absolute', bottom: 24, right: 24 },
  name: { ...typography.h2, color: colors.ink, marginTop: spacing.sm },
  category: { ...typography.caption, color: colors.gold, fontWeight: '600', marginTop: 4 },
  price: { ...typography.h3, color: colors.primaryGreen, marginTop: spacing.sm },
  description: { ...typography.body, color: colors.mutedText, marginTop: spacing.md, lineHeight: 22 },
  section: { marginTop: layout.cardGap },
  sectionTitle: { ...typography.label, color: colors.deepGreen },
  sectionText: { ...typography.bodySmall, color: colors.ink, marginTop: spacing.xs, lineHeight: 20 },
  safetyCard: {
    marginTop: layout.cardGap,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  safetyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  safetyTitle: { ...typography.label, color: colors.warning },
  safetyText: { ...typography.bodySmall, color: colors.ink, marginTop: spacing.sm, lineHeight: 20 },
  cartBtn: { marginTop: layout.sectionGap },
  disclaimer: { ...typography.caption, color: colors.mutedText, textAlign: 'center', marginTop: spacing.md },
});
