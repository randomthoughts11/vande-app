import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { getCurrentProfile } from '@/lib/api';
import { createSessionFromAuthUrl } from '@/lib/auth-redirect';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { colors, typography } from '@/lib/theme';

/** Handles Supabase email-confirm and auth deep-link redirects. */
export default function AuthCallbackScreen() {
  const router = useRouter();
  const { setAuthenticated, setProfile } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function finishAuth(url: string) {
      if (!isSupabaseConfigured) {
        setError('Supabase is not configured.');
        return;
      }

      try {
        const session = await createSessionFromAuthUrl(url);
        if (!session) {
          setError('Invalid or expired confirmation link. Try logging in.');
          return;
        }

        const profile = await getCurrentProfile();
        if (profile) {
          setProfile(profile);
          setAuthenticated(true);
          router.replace('/(auth)/consent');
        } else {
          setError('Account verified, but profile was not found. Try logging in.');
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not verify your email.');
      }
    }

    void Linking.getInitialURL().then((url) => {
      if (url) void finishAuth(url);
    });

    const sub = Linking.addEventListener('url', ({ url }) => void finishAuth(url));
    return () => sub.remove();
  }, [router, setAuthenticated, setProfile]);

  return (
    <View style={styles.root}>
      {error ? (
        <>
          <Text style={styles.title}>Verification issue</Text>
          <Text style={styles.message}>{error}</Text>
        </>
      ) : (
        <>
          <ActivityIndicator size="large" color={colors.primaryGreen} />
          <Text style={styles.message}>Confirming your email…</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.warmCream,
    gap: 16,
  },
  title: {
    ...typography.h3,
    color: colors.deepGreen,
    textAlign: 'center',
  },
  message: {
    ...typography.bodySmall,
    color: colors.mutedText,
    textAlign: 'center',
  },
});
