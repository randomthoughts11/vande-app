import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { signIn } from '@/lib/api';
import { loginSchema, type LoginForm } from '@/lib/validators';
import { useAuthStore } from '@/store/authStore';
import { colors, radii, spacing, typography } from '@/lib/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { setAuthenticated, setProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
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
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue your Ayurvedic wellness journey."
      footer={
        <Button title="Log in" onPress={handleSubmit(onSubmit)} loading={loading} fullWidth />
      }
    >
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
          />
        )}
      />

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.social}>
        <Pressable style={styles.socialBtn} disabled accessibilityLabel="Sign in with Apple, coming soon">
          <Text style={styles.socialText}> Apple</Text>
        </Pressable>
        <Pressable style={styles.socialBtn} disabled accessibilityLabel="Sign in with Google, coming soon">
          <Text style={styles.socialText}> Google</Text>
        </Pressable>
      </View>
      <Text style={styles.comingSoon}>Social sign-in coming soon</Text>

      <Pressable onPress={() => router.push('/(auth)/register')} accessibilityRole="link" style={styles.linkWrap}>
        <Text style={styles.link}>Don&apos;t have an account? <Text style={styles.linkBold}>Sign up</Text></Text>
      </Pressable>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg, gap: spacing.sm },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { ...typography.caption, color: colors.mutedText },
  social: { flexDirection: 'row', gap: spacing.sm },
  socialBtn: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.card,
    opacity: 0.55,
  },
  socialText: { ...typography.label, color: colors.mutedText },
  comingSoon: { ...typography.caption, color: colors.mutedText, textAlign: 'center', marginTop: spacing.xs },
  linkWrap: { marginTop: spacing.xl, alignItems: 'center' },
  link: { ...typography.bodySmall, color: colors.mutedText },
  linkBold: { color: colors.primaryGreen, fontWeight: '700' },
});
