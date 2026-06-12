import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      const profile = await signUp(data.email, data.password, data.firstName, data.lastName);
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Join Vande Wellness</Text>
      <Text style={styles.subtitle}>Create your account to begin your wellness journey</Text>

      <Controller control={control} name="firstName" render={({ field: { onChange, onBlur, value } }) => (
        <TextField label="First name" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.firstName?.message} />
      )} />
      <Controller control={control} name="lastName" render={({ field: { onChange, onBlur, value } }) => (
        <TextField label="Last name" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.lastName?.message} />
      )} />
      <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => (
        <TextField label="Email" keyboardType="email-address" autoCapitalize="none" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.email?.message} />
      )} />
      <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => (
        <TextField label="Password" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} error={errors.password?.message} />
      )} />
      <Controller control={control} name="confirmPassword" render={({ field: { onChange, onBlur, value } }) => (
        <TextField label="Confirm password" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} error={errors.confirmPassword?.message} />
      )} />

      <Button title="Create account" onPress={handleSubmit(onSubmit)} loading={loading} fullWidth />

      <Pressable onPress={() => router.push('/(auth)/login')} accessibilityRole="link">
        <Text style={styles.link}>Already have an account? Log in</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream, padding: spacing.lg },
  title: { ...typography.h1, color: colors.deepGreen },
  subtitle: { ...typography.bodySmall, color: colors.mutedText, marginBottom: spacing.lg },
  link: { ...typography.bodySmall, color: colors.primaryGreen, textAlign: 'center', marginTop: spacing.lg },
});
