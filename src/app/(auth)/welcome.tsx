import { useMemo } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
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
  { icon: Stethoscope, label: 'Holistic physicians' },
  { icon: Heart, label: 'Personalized care' },
  { icon: Sun, label: 'Daily rituals' },
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

function useWelcomeLayout() {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';

  return useMemo(() => {
    const laptop = isWeb && width >= 900;
    const tablet = isWeb && width >= 640 && width < 900;

    return {
      laptop,
      tablet,
      isWeb,
      contentMaxWidth: laptop ? 1040 : tablet ? 720 : undefined,
      footerMaxWidth: laptop ? 480 : tablet ? 420 : undefined,
      horizontalPad: laptop ? 48 : tablet ? 32 : spacing.lg,
      wordmarkSize: laptop ? 44 : tablet ? 40 : 36,
      cardTitleSize: laptop ? 32 : tablet ? 28 : 26,
      heroSize: laptop ? 19 : 17,
      pillarLabelSize: laptop ? 15 : 13,
      pillarIconSize: laptop ? 24 : 22,
      benefitTitleSize: laptop ? 18 : 17,
      benefitTextSize: laptop ? 16 : 15,
    };
  }, [width, isWeb]);
}

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const layout = useWelcomeLayout();

  const contentShell = layout.contentMaxWidth
    ? { maxWidth: layout.contentMaxWidth, width: '100%' as const, alignSelf: 'center' as const }
    : null;

  const footerShell = layout.footerMaxWidth
    ? { maxWidth: layout.footerMaxWidth, width: '100%' as const, alignSelf: 'center' as const }
    : null;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + (layout.laptop ? 180 : 160),
          flexGrow: 1,
        }}
      >
        <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
          <View style={styles.decorA} />
          <View style={styles.decorB} />

          <View style={[styles.brandLockup, contentShell, { paddingHorizontal: layout.horizontalPad }]}>
            <View style={[styles.logoOuter, layout.laptop && styles.logoOuterLaptop]}>
              <View style={[styles.logoInner, layout.laptop && styles.logoInnerLaptop]}>
                <Leaf
                  size={layout.laptop ? 46 : 40}
                  color={colors.gold}
                  fill={colors.lightGold}
                  strokeWidth={1.5}
                />
              </View>
              <Text style={styles.logoRingText}>VANDE WELLNESS</Text>
            </View>

            <Text style={[styles.wordmark, { fontSize: layout.wordmarkSize }]}>Vande Wellness</Text>
            <Text style={[styles.taglineItalic, layout.laptop && styles.taglineLaptop]}>
              Whole-person Ayurvedic care
            </Text>
            <Text
              style={[
                styles.heroLine,
                { fontSize: layout.heroSize, maxWidth: layout.laptop ? 560 : 420 },
              ]}
            >
              Consultations, care plans, and guidance — built around you.
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.scrollInner,
            contentShell,
            { paddingHorizontal: layout.horizontalPad },
          ]}
        >
          <View style={[styles.pillarRow, layout.laptop && styles.pillarRowLaptop]}>
            {PILLARS.map(({ icon: Icon, label }) => (
              <View
                key={label}
                style={[
                  styles.pillarCard,
                  layout.laptop && styles.pillarCardLaptop,
                  layout.tablet && styles.pillarCardTablet,
                ]}
              >
                <View style={[styles.pillarIcon, layout.laptop && styles.pillarIconLaptop]}>
                  <Icon size={layout.pillarIconSize} color={colors.primaryGreen} strokeWidth={2} />
                </View>
                <Text style={[styles.pillarLabel, { fontSize: layout.pillarLabelSize }]}>
                  {label}
                </Text>
              </View>
            ))}
          </View>

          <View style={[layout.laptop && styles.mainGrid]}>
            <View style={[styles.card, layout.laptop && styles.cardLaptop]}>
              <Text style={styles.overline}>WHY VANDE</Text>
              <Text style={[styles.cardTitle, { fontSize: layout.cardTitleSize }]}>
                Wellness that feels calm, clear, and personal
              </Text>

              <View style={[styles.benefitList, layout.laptop && styles.benefitListLaptop]}>
                {BENEFITS.map(({ icon: Icon, title, text }) => (
                  <View key={title} style={styles.benefitRow}>
                    <View style={styles.benefitIcon}>
                      <Icon size={layout.pillarIconSize} color={colors.primaryGreen} strokeWidth={2} />
                    </View>
                    <View style={styles.benefitCopy}>
                      <Text style={[styles.benefitTitle, { fontSize: layout.benefitTitleSize }]}>
                        {title}
                      </Text>
                      <Text style={[styles.benefitText, { fontSize: layout.benefitTextSize }]}>
                        {text}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={[layout.laptop && styles.sideColumn]}>
              <View style={[styles.quoteBox, layout.laptop && styles.quoteBoxLaptop]}>
                <Text style={[styles.quoteText, layout.laptop && styles.quoteTextLaptop]}>
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
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={[styles.footerInner, footerShell, { paddingHorizontal: layout.horizontalPad }]}>
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
            <ArrowRight size={18} color={colors.primaryGreen} strokeWidth={2.5} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.warmCream,
  },
  header: {
    backgroundColor: colors.primaryGreen,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 56,
    overflow: 'hidden',
    width: '100%',
  },
  decorA: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -90,
    right: -60,
  },
  decorB: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: 24,
    left: -60,
  },
  brandLockup: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  logoOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  logoOuterLaptop: {
    width: 132,
    height: 132,
    borderRadius: 66,
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInnerLaptop: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  logoRingText: {
    position: 'absolute',
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 2.2,
    width: 110,
    textAlign: 'center',
    fontFamily: sans,
  },
  wordmark: {
    fontWeight: '700',
    color: colors.white,
    fontFamily: serif,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  taglineItalic: {
    fontSize: 18,
    fontStyle: 'italic',
    color: colors.lightGold,
    fontFamily: serif,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  taglineLaptop: {
    fontSize: 20,
  },
  heroLine: {
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    lineHeight: 28,
    marginTop: spacing.md,
    fontFamily: sans,
  },
  scroll: {
    flex: 1,
  },
  scrollInner: {
    width: '100%',
    gap: spacing.xl,
    paddingTop: spacing.xs,
  },
  pillarRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: -32,
    width: '100%',
  },
  pillarRowLaptop: {
    gap: 20,
    marginTop: -40,
    justifyContent: 'center',
  },
  pillarCard: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minHeight: 120,
    ...shadows.card,
    borderWidth: 1,
    borderColor: colors.borderWarm,
  },
  pillarCardTablet: {
    minHeight: 130,
    paddingVertical: 22,
  },
  pillarCardLaptop: {
    flex: 0,
    flexBasis: 'auto',
    minWidth: 200,
    maxWidth: 280,
    minHeight: 148,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  pillarIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarIconLaptop: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  pillarLabel: {
    fontWeight: '700',
    color: colors.deepGreen,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: sans,
    width: '100%',
  },
  mainGrid: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'flex-start',
  },
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radii['2xl'],
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderWarm,
    ...shadows.card,
    gap: spacing.sm,
  },
  cardLaptop: {
    flex: 1.15,
    padding: spacing.xl + 8,
  },
  sideColumn: {
    flex: 0.85,
    gap: spacing.lg,
  },
  overline: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: colors.accent,
    fontFamily: sans,
  },
  cardTitle: {
    fontWeight: '700',
    color: colors.deepGreen,
    fontFamily: serif,
    lineHeight: 38,
    marginBottom: spacing.md,
  },
  benefitList: {
    gap: spacing.lg,
  },
  benefitListLaptop: {
    gap: spacing.xl,
  },
  benefitRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSage,
  },
  benefitCopy: {
    flex: 1,
    paddingTop: 4,
    gap: 4,
  },
  benefitTitle: {
    fontWeight: '700',
    color: colors.deepGreen,
    fontFamily: sans,
  },
  benefitText: {
    color: colors.mutedText,
    lineHeight: 24,
    fontFamily: sans,
  },
  quoteBox: {
    backgroundColor: colors.cardWarm,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.gold,
  },
  quoteBoxLaptop: {
    padding: spacing.xl,
    flex: 1,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    fontFamily: serif,
    fontStyle: 'italic',
  },
  quoteTextLaptop: {
    fontSize: 18,
    lineHeight: 28,
  },
  demoBadge: {
    backgroundColor: colors.sage,
    borderRadius: radii.lg,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderSage,
  },
  demoText: {
    ...typography.bodySmall,
    fontSize: 14,
    color: colors.primaryGreen,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: spacing.lg,
    backgroundColor: colors.warmCream,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.md,
  },
  footerInner: {
    gap: spacing.md,
    width: '100%',
  },
  primaryCta: {
    borderRadius: radii.pill,
    minHeight: 52,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    gap: 6,
  },
  loginText: {
    fontSize: 16,
    color: colors.mutedText,
    fontFamily: sans,
  },
  loginBold: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primaryGreen,
    fontFamily: sans,
  },
  pressed: {
    opacity: 0.85,
  },
});
