import type { User } from '@supabase/supabase-js';
import type { UserProfile } from '@/types/domain';
import { supabase } from '../supabase';
import { mapProfileFromDb } from './mappers';

function requireClient() {
  if (!supabase) throw new Error('Supabase is not configured');
  return supabase;
}

export async function fetchProfileByAuthUserId(authUserId: string): Promise<UserProfile | null> {
  const client = requireClient();
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('auth_user_id', authUserId)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProfileFromDb(data) : null;
}

/** Creates a profiles row when the auth trigger has not fired yet. */
export async function ensureMemberProfile(user: User): Promise<UserProfile> {
  const existing = await fetchProfileByAuthUserId(user.id);
  if (existing) return existing;

  const client = requireClient();
  const firstName = (user.user_metadata?.first_name as string) ?? 'Member';
  const lastName = (user.user_metadata?.last_name as string) ?? 'User';

  const { data, error } = await client
    .from('profiles')
    .insert({
      auth_user_id: user.id,
      first_name: firstName,
      last_name: lastName,
      email: user.email ?? '',
      role: 'member',
    })
    .select()
    .single();

  if (error) throw error;
  return mapProfileFromDb(data);
}

export async function memberHasConsents(memberId: string): Promise<boolean> {
  const client = requireClient();
  const { count, error } = await client
    .from('consents')
    .select('*', { count: 'exact', head: true })
    .eq('member_id', memberId);
  if (error) throw error;
  return (count ?? 0) >= 4;
}
