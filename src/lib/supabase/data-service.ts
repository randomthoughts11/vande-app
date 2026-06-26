import type {
  Appointment,
  BookAppointmentInput,
  Event,
  MembershipPlan,
  Practitioner,
  Product,
  Service,
  WellnessScores,
} from '@/types/domain';
import type { ConsentForm, IntakeForm } from '../validators';
import { supabase } from '../supabase';
import {
  mapAppointmentFromDb,
  mapConsentFromDb,
  mapEventFromDb,
  mapMembershipFromDb,
  mapPractitionerFromDb,
  mapProductFromDb,
  mapServiceFromDb,
} from './mappers';
import { fetchProfileByAuthUserId } from './profile-service';

function requireClient() {
  if (!supabase) throw new Error('Supabase is not configured');
  return supabase;
}

async function getAuthMemberId(): Promise<string> {
  const client = requireClient();
  const { data: { user }, error } = await client.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error('Not authenticated');
  const profile = await fetchProfileByAuthUserId(user.id);
  if (!profile) throw new Error('Profile not found');
  return profile.id;
}

export async function dbGetServices(): Promise<Service[]> {
  const { data, error } = await requireClient()
    .from('services')
    .select('*')
    .eq('active', true)
    .order('price_cents', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapServiceFromDb);
}

export async function dbGetPractitioners(): Promise<Practitioner[]> {
  const { data, error } = await requireClient().from('practitioners').select('*');
  if (error) throw error;
  return (data ?? []).map(mapPractitionerFromDb);
}

export async function dbGetProducts(): Promise<Product[]> {
  const { data, error } = await requireClient().from('products').select('*');
  if (error) throw error;
  return (data ?? []).map(mapProductFromDb);
}

export async function dbGetMembershipPlans(): Promise<MembershipPlan[]> {
  const client = requireClient();
  const { data: plans, error } = await client
    .from('memberships')
    .select('*')
    .eq('active', true);
  if (error) throw error;

  const { data: entitlements, error: entError } = await client
    .from('membership_entitlements')
    .select('*');
  if (entError) throw entError;

  return (plans ?? []).map((plan) => {
    const planEntitlements = (entitlements ?? [])
      .filter((e) => e.membership_id === plan.id)
      .map((e) => ({
        id: e.id as string,
        key: e.key as string,
        label: e.label as string,
        value: e.value as string | number | boolean,
      }));
    return mapMembershipFromDb(plan, planEntitlements);
  });
}

export async function dbGetEvents(): Promise<Event[]> {
  const client = requireClient();
  const memberId = await getAuthMemberId().catch(() => null);

  const { data: events, error } = await client
    .from('events')
    .select('*')
    .gte('starts_at', new Date().toISOString())
    .order('starts_at', { ascending: true });
  if (error) throw error;

  let registeredIds = new Set<string>();
  if (memberId) {
    const { data: regs } = await client
      .from('event_registrations')
      .select('event_id')
      .eq('member_id', memberId);
    registeredIds = new Set((regs ?? []).map((r) => r.event_id as string));
  }

  return (events ?? []).map((row) => mapEventFromDb(row, registeredIds.has(row.id as string)));
}

export async function dbGetAppointments(): Promise<Appointment[]> {
  const memberId = await getAuthMemberId();
  const client = requireClient();
  const { data, error } = await client
    .from('appointments')
    .select('*')
    .eq('member_id', memberId)
    .order('starts_at', { ascending: true });
  if (error) throw error;

  const practitioners = await dbGetPractitioners();
  const services = await dbGetServices();
  const pracMap = new Map(practitioners.map((p) => [p.id, p]));
  const svcMap = new Map(services.map((s) => [s.id, s]));

  return (data ?? []).map((row) =>
    mapAppointmentFromDb(
      row,
      pracMap.get(row.practitioner_id as string),
      svcMap.get(row.service_id as string),
    ),
  );
}

export async function dbBookAppointment(input: BookAppointmentInput): Promise<Appointment> {
  const memberId = await getAuthMemberId();
  const client = requireClient();
  const services = await dbGetServices();
  const practitioners = await dbGetPractitioners();
  const service = services.find((s) => s.id === input.serviceId);
  const practitioner = practitioners.find((p) => p.id === input.practitionerId);
  const durationMs = (service?.durationMinutes ?? 60) * 60_000;
  const startsAt = new Date(input.startsAt);
  const endsAt = new Date(startsAt.getTime() + durationMs);

  const { data, error } = await client
    .from('appointments')
    .insert({
      member_id: memberId,
      practitioner_id: input.practitionerId,
      service_id: input.serviceId,
      appointment_type: input.appointmentType,
      status: 'scheduled',
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      meeting_url:
        input.appointmentType === 'virtual'
          ? 'https://zoom.us/j/placeholder-vande-wellness'
          : null,
      payment_status: service?.priceCents === 0 ? 'included' : 'pending',
      reason_for_visit: input.reasonForVisit,
    })
    .select()
    .single();
  if (error) throw error;
  return mapAppointmentFromDb(data, practitioner, service);
}

export async function dbSaveConsents(consents: ConsentForm, memberId: string) {
  const client = requireClient();
  const now = new Date().toISOString();
  const rows = [
    { type: 'privacy_policy', accepted: consents.privacyPolicy },
    { type: 'wellness_disclaimer', accepted: consents.wellnessDisclaimer },
    { type: 'supplement_safety', accepted: consents.supplementSafety },
    { type: 'telehealth_communication', accepted: consents.telehealthConsent },
  ]
    .filter((c) => c.accepted)
    .map((c) => ({
      member_id: memberId,
      consent_type: c.type,
      version: '1.0',
      accepted_at: now,
    }));

  const { data, error } = await client.from('consents').insert(rows).select();
  if (error) throw error;
  return (data ?? []).map(mapConsentFromDb);
}

export async function dbSubmitIntake(
  memberId: string,
  intake: IntakeForm,
  wellnessScores: WellnessScores,
) {
  const client = requireClient();
  const { data, error } = await client
    .from('intake_responses')
    .insert({
      member_id: memberId,
      goals: intake.goals,
      symptoms: intake.symptoms,
      responses_json: intake,
      wellness_scores: wellnessScores,
    })
    .select()
    .single();
  if (error) throw error;

  await client
    .from('profiles')
    .update({ onboarding_complete: true })
    .eq('id', memberId);

  return data;
}

export async function dbRegisterForEvent(eventId: string): Promise<Event> {
  const memberId = await getAuthMemberId();
  const client = requireClient();
  const { error } = await client.from('event_registrations').insert({
    event_id: eventId,
    member_id: memberId,
    status: 'registered',
  });
  if (error) throw error;

  const events = await dbGetEvents();
  const event = events.find((e) => e.id === eventId);
  if (!event) throw new Error('Event not found');
  return { ...event, registered: true };
}

export async function dbRequestDataDeletion(): Promise<{ ticketId: string }> {
  const memberId = await getAuthMemberId();
  const { data, error } = await requireClient()
    .from('support_tickets')
    .insert({ member_id: memberId, type: 'data_deletion', status: 'open' })
    .select('id')
    .single();
  if (error) throw error;
  return { ticketId: data.id as string };
}
