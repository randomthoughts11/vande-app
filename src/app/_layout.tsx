import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StripeProvider } from '@stripe/stripe-react-native';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { getCurrentProfile } from '@/lib/api';
import { colors } from '@/lib/theme';

const queryClient = new QueryClient();
const stripeKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';

function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const {
    isAuthenticated,
    consentComplete,
    onboardingComplete,
    isLoading,
    hydrate,
    setAuthenticated,
    setProfile,
    setOnboardingComplete,
  } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const profile = await getCurrentProfile();
        if (profile) {
          setProfile(profile);
          setAuthenticated(true);
          if (profile.onboardingComplete) setOnboardingComplete(true);
        }
      } catch {
        // mock mode always has profile after login
      }
    }
    if (!isLoading) checkAuth();
  }, [isLoading, setAuthenticated, setProfile, setOnboardingComplete]);

  useEffect(() => {
    if (isLoading) return;

    const segmentList = segments as string[];
    const inAuth = segmentList[0] === '(auth)';
    const authScreen = segmentList[1];

    if (!isAuthenticated && !inAuth) {
      router.replace('/(auth)/welcome');
    } else if (isAuthenticated && !consentComplete && authScreen !== 'consent') {
      router.replace('/(auth)/consent');
    } else if (isAuthenticated && consentComplete && !onboardingComplete && authScreen !== 'onboarding') {
      router.replace('/(auth)/onboarding');
    } else if (isAuthenticated && consentComplete && onboardingComplete && inAuth) {
      router.replace('/(tabs)/today');
    }
  }, [isAuthenticated, consentComplete, onboardingComplete, isLoading, segments, router]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primaryGreen} />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const content = (
    <QueryClientProvider client={queryClient}>
      <AuthGate>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.warmCream } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="appointment/book" options={{ headerShown: true, title: 'Book Consultation', headerTintColor: colors.primaryGreen }} />
          <Stack.Screen name="appointment/[id]" options={{ headerShown: true, title: 'Appointment', headerTintColor: colors.primaryGreen }} />
          <Stack.Screen name="care-plan/[id]" options={{ headerShown: true, title: 'Care Plan', headerTintColor: colors.primaryGreen }} />
          <Stack.Screen name="chat/index" options={{ headerShown: true, title: 'Messages', headerTintColor: colors.primaryGreen }} />
          <Stack.Screen name="chat/[threadId]" options={{ headerShown: true, title: 'Chat', headerTintColor: colors.primaryGreen }} />
          <Stack.Screen name="events/[id]" options={{ headerShown: true, title: 'Event', headerTintColor: colors.primaryGreen }} />
          <Stack.Screen name="content/[id]" options={{ headerShown: true, title: 'Content', headerTintColor: colors.primaryGreen }} />
          <Stack.Screen name="products/[id]" options={{ headerShown: true, title: 'Product', headerTintColor: colors.primaryGreen }} />
          <Stack.Screen name="membership/index" options={{ headerShown: true, title: 'Membership', headerTintColor: colors.primaryGreen }} />
        </Stack>
      </AuthGate>
    </QueryClientProvider>
  );

  return (
    <StripeProvider publishableKey={stripeKey || 'pk_test_placeholder'}>
      {content}
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.warmCream },
});
