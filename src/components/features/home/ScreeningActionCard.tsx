import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ClipboardList } from 'lucide-react-native';
import { HOME_COLORS, HOME_SCREENING } from '@/constants/home-mock';
import { TodoBadge } from './TodoBadge';

interface ScreeningActionCardProps {
  onPress?: () => void;
}

export function ScreeningActionCard({ onPress }: ScreeningActionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconWrap}>
          <ClipboardList size={20} color={HOME_COLORS.accentOrange} strokeWidth={2} />
        </View>
        <TodoBadge />
      </View>

      <Text style={styles.title}>{HOME_SCREENING.title}</Text>
      <Text style={styles.description}>{HOME_SCREENING.description}</Text>

      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={HOME_SCREENING.ctaLabel}
        style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
      >
        <Text style={styles.ctaText}>{HOME_SCREENING.ctaLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: HOME_COLORS.cardWhite,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF5F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: HOME_COLORS.textPrimary,
    lineHeight: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: HOME_COLORS.textBody,
    lineHeight: 20,
    marginBottom: 16,
  },
  cta: {
    backgroundColor: HOME_COLORS.headerGreen,
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPressed: { opacity: 0.9 },
  ctaText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
