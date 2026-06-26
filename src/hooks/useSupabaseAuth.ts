import { useEffect } from 'react';
import { getCurrentProfile, syncAuthFlagsFromDb } from '@/lib/api';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

/** Keeps Zustand auth state in sync with Supabase session changes. */
export function useSupabaseAuth() {
  const { setAuthenticated, setProfile, setConsentComplete, setOnboardingComplete, reset } =
    useAuthStore();

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        await reset();
        return;
      }

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
        const profile = await getCurrentProfile();
        if (profile) {
          setProfile(profile);
          setAuthenticated(true);
          const flags = await syncAuthFlagsFromDb();
          if (flags.consentComplete) setConsentComplete(true);
          if (flags.onboardingComplete) setOnboardingComplete(true);
        }
      }
    });

    return () => subscription.subscription.unsubscribe();
  }, [reset, setAuthenticated, setConsentComplete, setOnboardingComplete, setProfile]);
}
