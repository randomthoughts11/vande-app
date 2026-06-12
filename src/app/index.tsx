import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function Index() {
  const { isAuthenticated, consentComplete, onboardingComplete } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/(auth)/welcome" />;
  if (!consentComplete) return <Redirect href="/(auth)/consent" />;
  if (!onboardingComplete) return <Redirect href="/(auth)/onboarding" />;
  return <Redirect href="/(tabs)/today" />;
}
