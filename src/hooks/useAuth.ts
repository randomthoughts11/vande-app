import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const store = useAuthStore();
  return {
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    consentComplete: store.consentComplete,
    onboardingComplete: store.onboardingComplete,
    profile: store.profile,
    signOut: store.reset,
  };
}
