import * as Linking from 'expo-linking';
import { supabase } from './supabase';

/** URL Supabase should redirect to after email confirmation / magic links. */
export function getAuthRedirectUrl(): string {
  const siteUrl = process.env.EXPO_PUBLIC_APP_URL?.replace(/\/$/, '');
  if (siteUrl) return `${siteUrl}/auth/callback`;
  return Linking.createURL('auth/callback');
}

function parseAuthParams(url: string): { access_token?: string; refresh_token?: string } {
  const parsed = Linking.parse(url);
  const fromQuery = parsed.queryParams ?? {};
  let access_token = fromQuery.access_token as string | undefined;
  let refresh_token = fromQuery.refresh_token as string | undefined;

  if (typeof window !== 'undefined' && window.location.hash) {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    access_token = access_token ?? hash.get('access_token') ?? undefined;
    refresh_token = refresh_token ?? hash.get('refresh_token') ?? undefined;
  }

  return { access_token, refresh_token };
}

/** Exchange tokens from a Supabase auth redirect URL into a session. */
export async function createSessionFromAuthUrl(url: string) {
  if (!supabase) return null;

  const { access_token, refresh_token } = parseAuthParams(url);
  if (!access_token || !refresh_token) return null;

  const { data, error } = await supabase.auth.setSession({ access_token, refresh_token });
  if (error) throw error;
  return data.session;
}
