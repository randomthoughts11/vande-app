import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HOME_COLORS, HOME_FREE_CONSULT } from '@/constants/home-mock';
import { CircleArrowButton } from './CircleArrowButton';

interface FreeConsultCtaProps {
  onPress?: () => void;
}

export function FreeConsultCta({ onPress }: FreeConsultCtaProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{HOME_FREE_CONSULT.prompt}</Text>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        <Text style={styles.cta}>
          {HOME_FREE_CONSULT.cta}
          <Text style={styles.ctaHighlight}> Book now.</Text>
        </Text>
        <CircleArrowButton onPress={onPress} accessibilityLabel="Book free consultation" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 4,
  },
  prompt: {
    fontSize: 14,
    color: HOME_COLORS.textBody,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HOME_COLORS.cardCream,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4D9',
    padding: 16,
    gap: 12,
  },
  pressed: { opacity: 0.95 },
  cta: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: HOME_COLORS.textPrimary,
    lineHeight: 20,
  },
  ctaHighlight: {
    color: HOME_COLORS.accentOrange,
    fontWeight: '600',
  },
});
