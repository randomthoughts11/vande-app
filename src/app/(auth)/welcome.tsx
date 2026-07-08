import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowRight,
  Heart,
  Leaf,
  Shield,
  Sparkles,
  Stethoscope,
  Sun,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { colors, radii, shadows, spacing, typography } from '@/lib/theme';

const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' });
const sans = Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' });

const PILLARS = [
  { icon: Stethoscope, label: 'Holistic\nphysicians' },
  { icon: Heart, label: 'Personalized\ncare' },
  { icon: Sun, label: 'Daily\nrituals' },
] as const;

const BENEFITS = [
  {
    icon: Leaf,
    title: 'Root-cause focus',
    text: 'Understand patterns across mind, body, and daily life.',
  },
  {
    icon: Sparkles,
    title: 'Ayurvedic wisdom',
    text: 'Modern care grounded in time-tested principles.',
  },
  {
    icon: Shield,
    title: 'Private & secure',
    text: 'Your health story stays between you and your care team.',
  },
] as const;

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 130 }}
      >
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <View style={styles.decorA} />
          <View style={styles.decorB} />

          <View style={styles.brandLockup}>
            <View style={styles.logoOuter}>
              <View style={styles.logoInner}>
                <Leaf size={34} color={colors.gold} fill={colors.lightGold} strokeWidth={1.5} />
              </View>
              <Text style={styles.logoRingText}>VANDE WELLNESS</Text>
            </View>

            <Text style={styles.wordmark}>Vande Wellness</Text>
            <Text style={styles.taglineItalic}>Whole-person Ayurvedic care</Text>
            <Text style={styles.heroLine}>
              Consultations, care plans, and guidance —{'\n'}built around you.
            </Text>
          </View>
        </View>

        <View style={styles.scrollInner}>
          <View style={styles.pillarRow}>
            {PILLARS.map(({ icon: Icon, label }) => (
              <View key={label} style={styles.pillarCard}>
                <View style={styles.pillarIcon}>
                  <Icon size={18} color={colors.primaryGreen} strokeWidth={2} />
                </View>
                <Text style={styles.pillarLabel} numberOfLines={2}>
                  {label}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.overline}>WHY VANDE</Text>
            <Text style={styles.cardTitle}>Wellness that feels calm, clear, and personal</Text>

            <View style={styles.benefitList}>
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <View key={title} style={styles.benefitRow}>
                  <View style={styles.benefitIcon}>
                    <Icon size={18} color={colors.primaryGreen} strokeWidth={2} />
                  </View>
                  <View style={styles.benefitCopy}>
                    <Text style={styles.benefitTitle}>{title}</Text>
                    <Text style={styles.benefitText}>{text}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.quoteBox}>
              <Text style={styles.quoteText}>
                &ldquo;Start with a free consultation — no pressure, just clarity on your next
                steps.&rdquo;
              </Text>
            </View>

            <View style={styles.demoBadge}>
              <Text style={styles.demoText}>
                Demo · use any email with a 6+ character password
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer CTAs */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button
          title="Create account"
          onPress={() => router.push('/(auth)/register')}
          fullWidth
          style={styles.primaryCta}
        />
        <Pressable
          onPress={() => router.push('/(auth)/login')}
          style={({ pressed }) => [styles.loginRow, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Log in to your account"
        >
          <Text style={styles.loginText}>Already with Vande? </Text>
          <Text style={styles.loginBold}>Log in</Text>
          <ArrowRight size={16} color={colors.primaryGreen} strokeWidth={2.5} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.warmCream,
    ...(Platform.OS === 'web'
      ? { maxWidth: 480, width: '100%' as const, alignSelf: 'center' as const }
      : null),
  },
  header: {
    backgroundColor: colors.primaryGreen,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingBottom: 48,
    overflow: 'hidden',
    width: '100%',
  },
  decorA: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -60,
    right: -50,
  },
  decorB: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: 20,
    left: -40,
  },
  brandLockup: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoOuter: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  logoInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRingText: {
    position: 'absolute',
    fontSize: 8,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 2,
    width: 100,
    textAlign: 'center',
    fontFamily: sans,
  },
  wordmark: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.white,
    fontFamily: serif,
    letterSpacing: -0.5,
  },
  taglineItalic: {
    fontSize: 15,
    fontStyle: 'italic',
    color: colors.lightGold,
    fontFamily: serif,
    marginTop: 4,
  },
  heroLine: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: spacing.md,
    fontFamily: sans,
  },
  scroll: {
    flex: 1,
  },
  scrollInner: {
    paddingHorizontal: spacing.lg,
    width: '100%',
  },
  pillarRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: -28,
    marginBottom: spacing.md,
    width: '100%',
  },
  pillarCard: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    ...shadows.card,
    borderWidth: 1,
    borderColor: colors.borderWarm,
  },
  pillarIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.deepGreen,
    textAlign: 'center',
    lineHeight: 14,
    fontFamily: sans,
    width: '100%',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii['2xl'],
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderWarm,
    ...shadows.card,
  },
  overline: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: colors.accent,
    marginBottom: spacing.xs,
    fontFamily: sans,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.deepGreen,
    fontFamily: serif,
    lineHeight: 30,
    marginBottom: spacing.lg,
  },
  benefitList: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  benefitRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  benefitIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSage,
  },
  benefitCopy: {
    flex: 1,
    paddingTop: 2,
  },
  benefitTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.deepGreen,
    marginBottom: 2,
    fontFamily: sans,
  },
  benefitText: {
    fontSize: 13,
    color: colors.mutedText,
    lineHeight: 18,
    fontFamily: sans,
  },
  quoteBox: {
    backgroundColor: colors.cardWarm,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
  },
  quoteText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    fontFamily: serif,
    fontStyle: 'italic',
  },
  demoBadge: {
    backgroundColor: colors.sage,
    borderRadius: radii.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSage,
  },
  demoText: {
    ...typography.caption,
    color: colors.primaryGreen,
    textAlign: 'center',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.warmCream,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.md,
  },
  primaryCta: {
    borderRadius: radii.pill,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    gap: 4,
  },
  loginText: {
    fontSize: 14,
    color: colors.mutedText,
    fontFamily: sans,
  },
  loginBold: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryGreen,
    fontFamily: sans,
  },
  pressed: {
    opacity: 0.85,
  },
});
