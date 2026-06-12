import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ShoppingBag } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getProduct } from '@/lib/api';
import { openVandeCart } from '@/lib/vandecart';
import { colors, spacing, typography } from '@/lib/theme';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
  });

  if (isLoading || !product) {
    return <ActivityIndicator size="large" color={colors.primaryGreen} style={styles.loading} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Card variant="elevated">
        <View style={styles.imagePlaceholder}>
          <ShoppingBag size={48} color={colors.gold} />
        </View>
        {product.practitionerRecommended ? (
          <Badge label="Recommended by your Vande practitioner" variant="gold" />
        ) : null}
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        {product.priceCents ? (
          <Text style={styles.price}>${(product.priceCents / 100).toFixed(2)}</Text>
        ) : null}
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested use</Text>
          <Text style={styles.sectionText}>{product.suggestedUse}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety note</Text>
          <Text style={styles.safetyText}>{product.safetyNote}</Text>
        </View>
      </Card>

      <Button
        title="Open in VandeCart"
        onPress={() => openVandeCart(product.productUrl)}
        fullWidth
        style={styles.cartBtn}
        accessibilityLabel="Open product in VandeCart"
      />

      <Text style={styles.disclaimer}>
        Product purchases are completed on VandeCart. Always follow your practitioner&apos;s guidance.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  loading: { flex: 1, marginTop: 100 },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  imagePlaceholder: {
    height: 160,
    backgroundColor: colors.sage,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: { ...typography.h2, color: colors.ink, marginTop: spacing.sm },
  category: { ...typography.caption, color: colors.gold },
  price: { ...typography.h3, color: colors.primaryGreen, marginTop: spacing.xs },
  description: { ...typography.body, color: colors.mutedText, marginTop: spacing.md },
  section: { marginTop: spacing.md },
  sectionTitle: { ...typography.label, color: colors.ink },
  sectionText: { ...typography.bodySmall, color: colors.mutedText, marginTop: 4 },
  safetyText: { ...typography.bodySmall, color: colors.warning, marginTop: 4 },
  cartBtn: { marginTop: spacing.lg },
  disclaimer: { ...typography.caption, color: colors.mutedText, marginTop: spacing.md, textAlign: 'center' },
});
