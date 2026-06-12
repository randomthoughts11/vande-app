import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { Card } from './Card';
import { colors, radii, spacing, typography } from '@/lib/theme';

interface SelectableCardProps {
  title: string;
  subtitle?: string;
  meta?: string;
  selected?: boolean;
  onPress?: () => void;
}

export function SelectableCard({ title, subtitle, meta, selected, onPress }: SelectableCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={styles.pressable}
    >
      <Card
        variant={selected ? 'sage' : 'elevated'}
        style={[styles.card, selected && styles.cardSelected]}
      >
        <View style={styles.row}>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            {meta ? <Text style={styles.meta}>{meta}</Text> : null}
          </View>
          <View style={[styles.radio, selected && styles.radioSelected]}>
            {selected ? <Check size={14} color={colors.white} /> : null}
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: { marginBottom: spacing.sm },
  card: { marginBottom: 0 },
  cardSelected: { borderColor: colors.primaryGreen, borderWidth: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  content: { flex: 1 },
  title: { ...typography.label, color: colors.ink },
  subtitle: { ...typography.bodySmall, color: colors.mutedText, marginTop: 4 },
  meta: { ...typography.caption, color: colors.gold, marginTop: spacing.xs, fontWeight: '600' },
  radio: {
    width: 24,
    height: 24,
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { backgroundColor: colors.primaryGreen, borderColor: colors.primaryGreen },
});
