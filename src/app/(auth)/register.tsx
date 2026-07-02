import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { signUp } from '@/lib/api';
import { registerSchema, type RegisterForm } from '@/lib/validators';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing, typography } from '@/lib/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const { setAuthenticated, setProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: 'Priya',
      lastName: 'Sharma',
      email: 'demo@vande.com',
      password: 'demo123',
      confirmPassword: 'demo123',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      const { profile, needsEmailConfirmation } = await signUp(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
      );

      if (needsEmailConfirmation) {
        Alert.alert(
          'Check your email',
          'We sent a confirmation link. Open it to verify your account, then log in.',
        );
        router.replace('/(auth)/login');
        return;
      }

      setProfile(profile);
      setAuthenticated(true);
      router.replace('/(auth)/consent');
    } catch (e) {
      Alert.alert('Registration failed', e instanceof Error ? e.message : 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join Vande Wellness"
      subtitle="Create your account to receive personalized Ayurvedic support."
      footer={
        <Button title="Create account" onPress={handleSubmit(onSubmit)} loading={loading} fullWidth />
      }
    >
      <View style={styles.nameRow}>
        <View style={styles.nameField}>
          <Controller control={control} name="firstName" render={({ field: { onChange, onBlur, value } }) => (
            <TextField label="First name" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.firstName?.message} />
          )} />
        </View>
        <View style={styles.nameField}>
          <Controller control={control} name="lastName" render={({ field: { onChange, onBlur, value } }) => (
            <TextField label="Last name" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.lastName?.message} />
          )} />
        </View>
      </View>
      <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => (
        <TextField label="Email" keyboardType="email-address" autoCapitalize="none" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.email?.message} />
      )} />
      <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => (
        <TextField label="Password" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} error={errors.password?.message} />
      )} />
      <Controller control={control} name="confirmPassword" render={({ field: { onChange, onBlur, value } }) => (
        <TextField label="Confirm password" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} error={errors.confirmPassword?.message} />
      )} />

      <Pressable onPress={() => router.push('/(auth)/login')} accessibilityRole="link" style={styles.linkWrap}>
        <Text style={styles.link}>Already have an account? <Text style={styles.linkBold}>Log in</Text></Text>
      </Pressable>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  nameRow: { flexDirection: 'row', gap: spacing.sm },
  nameField: { flex: 1 },
  linkWrap: { marginTop: spacing.lg, alignItems: 'center' },
  link: { ...typography.bodySmall, color: colors.mutedText },
  linkBold: { color: colors.primaryGreen, fontWeight: '700' },
});
