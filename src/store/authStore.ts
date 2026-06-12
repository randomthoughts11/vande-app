import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import type { UserProfile } from '@/types/domain';

const ONBOARDING_KEY = 'vande_onboarding_complete';
const CONSENT_KEY = 'vande_consent_complete';

interface AuthState {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  consentComplete: boolean;
  onboardingComplete: boolean;
  isLoading: boolean;
  setProfile: (profile: UserProfile | null) => void;
  setAuthenticated: (value: boolean) => void;
  setConsentComplete: (value: boolean) => void;
  setOnboardingComplete: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  hydrate: () => Promise<void>;
  reset: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  isAuthenticated: false,
  consentComplete: false,
  onboardingComplete: false,
  isLoading: true,

  setProfile: (profile) => set({ profile }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setConsentComplete: (value) => {
    set({ consentComplete: value });
    if (value) SecureStore.setItemAsync(CONSENT_KEY, 'true');
  },
  setOnboardingComplete: (value) => {
    set({ onboardingComplete: value });
    if (value) SecureStore.setItemAsync(ONBOARDING_KEY, 'true');
  },
  setLoading: (value) => set({ isLoading: value }),

  hydrate: async () => {
    const [onboarding, consent] = await Promise.all([
      SecureStore.getItemAsync(ONBOARDING_KEY),
      SecureStore.getItemAsync(CONSENT_KEY),
    ]);
    set({
      onboardingComplete: onboarding === 'true',
      consentComplete: consent === 'true',
      isLoading: false,
    });
  },

  reset: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(ONBOARDING_KEY),
      SecureStore.deleteItemAsync(CONSENT_KEY),
    ]);
    set({
      profile: null,
      isAuthenticated: false,
      consentComplete: false,
      onboardingComplete: false,
    });
  },
}));
