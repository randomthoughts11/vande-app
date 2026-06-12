import { create } from 'zustand';
import type { UserProfile } from '@/types/domain';
import { appStorage } from '@/lib/secure-storage';

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
    if (value) void appStorage.setItem(CONSENT_KEY, 'true');
  },
  setOnboardingComplete: (value) => {
    set({ onboardingComplete: value });
    if (value) void appStorage.setItem(ONBOARDING_KEY, 'true');
  },
  setLoading: (value) => set({ isLoading: value }),

  hydrate: async () => {
    try {
      const [onboarding, consent] = await Promise.all([
        appStorage.getItem(ONBOARDING_KEY),
        appStorage.getItem(CONSENT_KEY),
      ]);
      set({
        onboardingComplete: onboarding === 'true',
        consentComplete: consent === 'true',
      });
    } catch {
      // Web / storage unavailable — start fresh
    } finally {
      set({ isLoading: false });
    }
  },

  reset: async () => {
    await Promise.all([
      appStorage.removeItem(ONBOARDING_KEY),
      appStorage.removeItem(CONSENT_KEY),
    ]);
    set({
      profile: null,
      isAuthenticated: false,
      consentComplete: false,
      onboardingComplete: false,
    });
  },
}));
