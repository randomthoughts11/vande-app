import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Leaf } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { APP_NAME } from '@/lib/constants';
import { colors, spacing, typography } from '@/lib/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoBlock}>
          <Leaf size={64} color={colors.gold} />
          <Text style={styles.appName}>{APP_NAME}</Text>
          <Text style={styles.tagline}>
            Personalized Ayurveda, Yoga, Nutrition & Wellness Support
          </Text>
        </View>
        <Text style={styles.subtitle}>
          Your Ayurvedic wellness plan, guided by Vande practitioners.
        </Text>
      </View>
      <View style={styles.actions}>
        <Button
          title="Create account"
          onPress={() => router.push('/(auth)/register')}
          fullWidth
          accessibilityLabel="Create account"
        />
        <Button
          title="Log in"
          variant="outline"
          onPress={() => router.push('/(auth)/login')}
          fullWidth
          style={styles.loginBtn}
          accessibilityLabel="Log in"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream, padding: spacing.lg },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoBlock: { alignItems: 'center', marginBottom: spacing.xl },
  appName: { ...typography.h1, color: colors.deepGreen, marginTop: spacing.md },
  tagline: {
    ...typography.body,
    color: colors.mutedText,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.ink,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  actions: { gap: spacing.sm, paddingBottom: spacing.lg },
  loginBtn: { marginTop: spacing.sm },
});
