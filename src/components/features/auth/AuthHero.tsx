import { Platform, StyleSheet, Text, View } from 'react-native';
import { Leaf } from 'lucide-react-native';
import { colors, spacing } from '@/lib/theme';

const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' });

interface AuthHeroProps {
  title: string;
  subtitle?: string;
}

export function AuthHero({ title, subtitle }: AuthHeroProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <View style={styles.logoRing}>
          <Leaf size={28} color={colors.gold} fill={colors.lightGold} strokeWidth={1.5} />
        </View>
        <Text style={styles.brand}>Vande Wellness</Text>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.primaryGreen,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: spacing.md,
    paddingBottom: 36,
    marginBottom: -20,
  },
  inner: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brand: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    fontFamily: serif,
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
});
