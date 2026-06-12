import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Heart, Leaf, Sparkles, Sun } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { APP_NAME } from '@/lib/constants';
import { colors, radii, spacing, typography } from '@/lib/theme';

const FEATURES = [
  { icon: Leaf, label: 'Personalized care plans' },
  { icon: Heart, label: 'Expert consultations' },
  { icon: Sun, label: 'Daily balance rituals' },
  { icon: Sparkles, label: 'Ayurvedic guidance' },
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.logoCircle}>
          <Leaf size={48} color={colors.gold} />
        </View>
        <Text style={styles.appName}>{APP_NAME}</Text>
        <Text style={styles.tagline}>
          Personalized Ayurveda, Yoga, Nutrition & Wellness Support
        </Text>
      </View>

      <View style={styles.features}>
        {FEATURES.map(({ icon: Icon, label }) => (
          <View key={label} style={styles.featureChip}>
            <Icon size={16} color={colors.primaryGreen} />
            <Text style={styles.featureText}>{label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subtitle}>
        Your Ayurvedic wellness plan, guided by Vande practitioners.
      </Text>

      <View style={styles.actions}>
        <Button
          title="Create account"
          onPress={() => router.push('/(auth)/register')}
          fullWidth
        />
        <Button
          title="Log in"
          variant="outline"
          onPress={() => router.push('/(auth)/login')}
          fullWidth
        />
        <Text style={styles.demoHint}>Demo: use any email and a 6+ character password</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warmCream,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.lightGold,
  },
  appName: { ...typography.h1, color: colors.deepGreen, textAlign: 'center' },
  tagline: {
    ...typography.body,
    color: colors.mutedText,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    lineHeight: 24,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureText: { ...typography.caption, color: colors.ink, fontWeight: '600' },
  subtitle: {
    ...typography.bodySmall,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  actions: { gap: spacing.sm },
  demoHint: {
    ...typography.caption,
    color: colors.mutedText,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
});
