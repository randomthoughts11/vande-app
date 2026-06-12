import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { signIn } from '@/lib/api';
import { loginSchema, type LoginForm } from '@/lib/validators';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing, typography } from '@/lib/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { setAuthenticated, setProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Log in to your Vande Wellness account</Text>

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

      <Button title="Log in" onPress={handleSubmit(onSubmit)} loading={loading} fullWidth />

      <View style={styles.social}>
        <Pressable style={styles.socialBtn} disabled accessibilityLabel="Sign in with Apple, coming soon">
          <Text style={styles.socialText}>Apple — Coming soon</Text>
        </Pressable>
        <Pressable style={styles.socialBtn} disabled accessibilityLabel="Sign in with Google, coming soon">
          <Text style={styles.socialText}>Google — Coming soon</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => router.push('/(auth)/register')} accessibilityRole="link">
        <Text style={styles.link}>Don&apos;t have an account? Sign up</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream, padding: spacing.lg },
  title: { ...typography.h1, color: colors.deepGreen },
  subtitle: { ...typography.bodySmall, color: colors.mutedText, marginBottom: spacing.lg },
  social: { marginTop: spacing.lg, gap: spacing.sm },
  socialBtn: {
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    opacity: 0.6,
  },
  socialText: { ...typography.bodySmall, color: colors.mutedText },
  link: { ...typography.bodySmall, color: colors.primaryGreen, textAlign: 'center', marginTop: spacing.lg },
});
