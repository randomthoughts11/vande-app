import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Leaf, Lock, Mail } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { signIn } from '@/lib/api';
import { loginSchema, type LoginForm } from '@/lib/validators';
import { useAuthStore } from '@/store/authStore';
import { colors, radii, shadows, spacing, typography } from '@/lib/theme';

const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' });

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setAuthenticated, setProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'demo@vande.com', password: 'demo123' },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const profile = await signIn(data.email, data.password);
      setProfile(profile);
      setAuthenticated(true);
      router.replace('/(auth)/consent');
    } catch (e) {
      Alert.alert('Login failed', e instanceof Error ? e.message : 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={20} color={colors.white} strokeWidth={2} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <View style={styles.hero}>
          <View style={styles.logoRing}>
            <Leaf size={32} color={colors.gold} fill={colors.lightGold} strokeWidth={1.5} />
          </View>
          <Text style={styles.brand}>Vande Wellness</Text>
          <Text style={styles.heroTitle}>Welcome back</Text>
          <Text style={styles.heroSub}>
            Sign in to continue your personalized Ayurvedic care journey.
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign in to your account</Text>

            <View style={styles.demoBadge}>
              <Text style={styles.demoText}>Demo · demo@vande.com / demo123</Text>
            </View>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="Email"
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  style={styles.input}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="Password"
                  placeholder="••••••••"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  style={styles.input}
                />
              )}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <Pressable style={styles.socialBtn} disabled accessibilityLabel="Apple sign-in coming soon">
                <Text style={styles.socialLabel}> Apple</Text>
              </Pressable>
              <Pressable style={styles.socialBtn} disabled accessibilityLabel="Google sign-in coming soon">
                <Text style={styles.socialLabel}> Google</Text>
              </Pressable>
            </View>
            <Text style={styles.comingSoon}>Social sign-in coming soon</Text>

            <Pressable
              onPress={() => router.push('/(auth)/register')}
              accessibilityRole="link"
              style={styles.signUpWrap}
            >
              <Text style={styles.signUpText}>
                New here? <Text style={styles.signUpBold}>Create an account</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
          <Button
            title="Log in"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            fullWidth
            style={styles.cta}
          />
        </View>
      </KeyboardAvoidingView>
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
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingBottom: 28,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  backText: {
    ...typography.bodySmall,
    color: colors.white,
    fontWeight: '600',
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
  },
  logoRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brand: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
    fontFamily: serif,
    textAlign: 'center',
  },
  heroSub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  body: {
    flex: 1,
    marginTop: -16,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii['2xl'],
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderWarm,
    ...shadows.card,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.deepGreen,
    fontFamily: serif,
    marginBottom: spacing.md,
  },
  demoBadge: {
    backgroundColor: colors.sage,
    borderRadius: radii.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSage,
  },
  demoText: {
    ...typography.caption,
    color: colors.primaryGreen,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    borderRadius: radii.lg,
    backgroundColor: colors.backgroundAlt,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
    gap: spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.caption,
    color: colors.mutedText,
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  socialBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.card,
    opacity: 0.55,
  },
  socialLabel: {
    ...typography.label,
    color: colors.mutedText,
  },
  comingSoon: {
    ...typography.caption,
    color: colors.mutedText,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  signUpWrap: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  signUpText: {
    ...typography.bodySmall,
    color: colors.mutedText,
  },
  signUpBold: {
    color: colors.primaryGreen,
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.warmCream,
  },
  cta: {
    borderRadius: radii.pill,
  },
});
