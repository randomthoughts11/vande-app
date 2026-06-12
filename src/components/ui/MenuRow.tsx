import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, type LucideIcon } from 'lucide-react-native';
import { Card } from './Card';
import { colors, spacing, typography } from '@/lib/theme';

interface MenuRowProps {
  label: string;
  subtitle?: string;
  icon?: LucideIcon;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}

export function MenuRow({ label, subtitle, icon: Icon, onPress, rightElement, showChevron = true }: MenuRowProps) {
  const content = (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.row}>
        {Icon ? (
          <View style={styles.iconWrap}>
            <Icon size={18} color={colors.primaryGreen} />
          </View>
        ) : null}
        <View style={styles.textBlock}>
          <Text style={styles.label}>{label}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {rightElement ?? (showChevron && onPress ? <ChevronRight size={20} color={colors.mutedText} /> : null)}
      </View>
    </Card>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} style={styles.pressable}>
        {content}
      </Pressable>
    );
  }
  return <View style={styles.pressable}>{content}</View>;
}

const styles = StyleSheet.create({
  pressable: { marginBottom: spacing.sm },
  card: { marginBottom: 0 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: { flex: 1 },
  label: { ...typography.label, color: colors.ink },
  subtitle: { ...typography.caption, color: colors.mutedText, marginTop: 2 },
});
