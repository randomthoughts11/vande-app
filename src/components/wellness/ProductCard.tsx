import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ExternalLink, ShoppingBag } from 'lucide-react-native';
import type { Product } from '@/types/domain';
import { colors, spacing, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onOpenCart?: () => void;
  compact?: boolean;
}

export function ProductCard({ product, onPress, onOpenCart, compact }: ProductCardProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={product.name}>
      <Card variant={compact ? 'sage' : 'elevated'}>
        <View style={styles.header}>
          <ShoppingBag size={18} color={colors.gold} />
          {product.practitionerRecommended ? (
            <Badge label="Recommended by practitioner" variant="gold" />
          ) : null}
        </View>
        <Text style={styles.name}>{product.name}</Text>
        {!compact && <Text style={styles.category}>{product.category}</Text>}
        {!compact && (
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        )}
        {onOpenCart ? (
          <Pressable
            onPress={onOpenCart}
            style={styles.link}
            accessibilityRole="link"
            accessibilityLabel="Open in VandeCart"
          >
            <Text style={styles.linkText}>Open in VandeCart</Text>
            <ExternalLink size={14} color={colors.primaryGreen} />
          </Pressable>
        ) : null}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xs },
  name: { ...typography.label, color: colors.ink },
  category: { ...typography.caption, color: colors.gold },
  description: { ...typography.bodySmall, color: colors.mutedText, marginTop: 4 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.sm },
  linkText: { ...typography.bodySmall, color: colors.primaryGreen, fontWeight: '600' },
});
