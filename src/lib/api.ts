import type {
  Appointment,
  BookAppointmentInput,
  CarePlan,
  CarePlanItem,
  ChatThread,
  ConsentRecord,
  ContentItem,
  Event,
  FamilyMember,
  IntakeResponse,
  MembershipPlan,
  Message,
  Practitioner,
  Product,
  Service,
  TodayPlan,
  UserProfile,
} from '@/types/domain';
import {
  mockAppointments,
  mockBalanceTip,
  mockCarePlan,
  mockContent,
  mockEvents,
  mockFamilyMembers,
  mockMembershipPlans,
  mockMessages,
  mockPractitioners,
  mockProducts,
  mockProfile,
  mockServices,
  mockThreads,
  MOCK_MEMBER_ID,
} from './mockData';
import { getAuthRedirectUrl } from './auth-redirect';
import { isSupabaseConfigured, supabase } from './supabase';
import {
  dbBookAppointment,
  dbGetAppointments,
  dbGetEvents,
  dbGetMembershipPlans,
  dbGetPractitioners,
  dbGetProducts,
  dbGetServices,
  dbRegisterForEvent,
  dbRequestDataDeletion,
  dbSaveConsents,
  dbSubmitIntake,
} from './supabase/data-service';
import {
  ensureMemberProfile,
  fetchProfileByAuthUserId,
  memberHasConsents,
} from './supabase/profile-service';
import { mapProfileFromDb } from './supabase/mappers';
import { computeWellnessScores, type ConsentForm, type IntakeForm } from './validators';

// In-memory state for mock mode
let mockProfileState: UserProfile | null = null;
let mockCarePlanState: CarePlan = JSON.parse(JSON.stringify(mockCarePlan));
let mockAppointmentsState = [...mockAppointments];
let mockMessagesState: Record<string, Message[]> = JSON.parse(JSON.stringify(mockMessages));
let mockThreadsState = [...mockThreads];
let mockEventsState = [...mockEvents];
let mockCheckIns: { id: string; mood: string; createdAt: string }[] = [];

function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export type SignUpResult = {
  profile: UserProfile;
  needsEmailConfirmation: boolean;
};

// Auth
export async function signIn(email: string, password: string): Promise<UserProfile> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (!data.user) throw new Error('Sign in failed');
    const profile =
      (await fetchProfileByAuthUserId(data.user.id)) ?? (await ensureMemberProfile(data.user));
    return profile;
  }
  await delay();
  if (!email || password.length < 6) throw new Error('Invalid credentials');
  mockProfileState = { ...mockProfile, email, onboardingComplete: false };
  return mockProfileState;
}

export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<SignUpResult> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
        emailRedirectTo: getAuthRedirectUrl(),
      },
    });
    if (error) throw error;
    if (!data.user) throw new Error('Sign up failed');
    await new Promise((resolve) => setTimeout(resolve, 400));
    const profile =
      (await fetchProfileByAuthUserId(data.user.id)) ?? (await ensureMemberProfile(data.user));
    return {
      profile,
      needsEmailConfirmation: !data.session,
    };
  }
  await delay();
  mockProfileState = {
    ...mockProfile,
    id: generateId('member'),
    authUserId: generateId('auth'),
    firstName,
    lastName,
    email,
    onboardingComplete: false,
  };
  return { profile: mockProfileState, needsEmailConfirmation: false };
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut();
    return;
  }
  await delay();
  mockProfileState = null;
}

export async function getCurrentProfile(): Promise<UserProfile | null> {
  if (isSupabaseConfigured && supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    return fetchProfileByAuthUserId(user.id);
  }
  await delay(100);
  return mockProfileState;
}

export async function updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
  if (isSupabaseConfigured && supabase) {
    const profile = await getCurrentProfile();
    if (!profile) throw new Error('Not authenticated');
    const { data, error } = await supabase
      .from('profiles')
      .update({
        first_name: updates.firstName,
        last_name: updates.lastName,
        phone: updates.phone,
        timezone: updates.timezone,
        country: updates.country,
        emergency_contact: updates.emergencyContact,
        push_token: updates.pushToken,
        onboarding_complete: updates.onboardingComplete,
      })
      .eq('id', profile.id)
      .select()
      .single();
    if (error) throw error;
    return mapProfileFromDb(data);
  }
  await delay();
  if (!mockProfileState) throw new Error('Not authenticated');
  mockProfileState = { ...mockProfileState, ...updates };
  return mockProfileState;
}

export async function saveConsents(consents: ConsentForm): Promise<ConsentRecord[]> {
  if (isSupabaseConfigured && supabase) {
    const profile = await getCurrentProfile();
    if (!profile) throw new Error('Not authenticated');
    return dbSaveConsents(consents, profile.id);
  }
  await delay();
  const now = new Date().toISOString();
  const types = [
    { type: 'privacy_policy', accepted: consents.privacyPolicy },
    { type: 'wellness_disclaimer', accepted: consents.wellnessDisclaimer },
    { type: 'supplement_safety', accepted: consents.supplementSafety },
    { type: 'telehealth_communication', accepted: consents.telehealthConsent },
  ];
  return types
    .filter((c) => c.accepted)
    .map((c) => ({
      id: generateId('consent'),
      memberId: mockProfileState?.id ?? MOCK_MEMBER_ID,
      type: c.type,
      version: '1.0',
      acceptedAt: now,
    }));
}

export async function submitIntake(intake: IntakeForm): Promise<IntakeResponse> {
  const wellnessScores = computeWellnessScores(intake);
  const memberId = mockProfileState?.id ?? MOCK_MEMBER_ID;
  const response: IntakeResponse = {
    id: generateId('intake'),
    memberId,
    goals: intake.goals,
    symptoms: intake.symptoms,
    sleepStress: { sleepHours: intake.sleepHours, stressLevel: intake.stressLevel },
    digestion: { issues: intake.digestionIssues },
    mobility: { pain: intake.mobilityPain },
    dietPreferences: intake.dietPreferences,
    medications: intake.medications ? intake.medications.split(',').map((s) => s.trim()) : [],
    supplements: intake.supplements ? intake.supplements.split(',').map((s) => s.trim()) : [],
    allergies: intake.allergies ? intake.allergies.split(',').map((s) => s.trim()) : [],
    preferredConsultation: intake.preferredConsultation,
    wellnessScores,
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const profile = await getCurrentProfile();
    if (profile) {
      await dbSubmitIntake(profile.id, intake, wellnessScores);
      return { ...response, memberId: profile.id, id: generateId('intake') };
    }
  }

  await delay();
  if (mockProfileState) {
    mockProfileState = { ...mockProfileState, onboardingComplete: true };
  }
  return response;
}

export async function getTodayPlan(): Promise<TodayPlan> {
  await delay(100);
  const plan = mockCarePlanState;
  const firstName = mockProfileState?.firstName ?? 'Friend';
  const pendingItems = plan.items.filter((i) => i.status !== 'completed').slice(0, 5);
  return {
    greeting: `Namaste, ${firstName}`,
    items: pendingItems.length > 0 ? pendingItems : plan.items.slice(0, 5),
    tip: mockBalanceTip,
    upcomingAppointment: mockAppointmentsState.find(
      (a) => a.status === 'confirmed' || a.status === 'scheduled',
    ),
    messagePreview: mockThreadsState[0]?.lastMessage,
    recommendedProduct: mockProducts[0],
  };
}

export async function getCarePlan(): Promise<CarePlan | null> {
  await delay(100);
  return mockCarePlanState;
}

export async function completeCarePlanItem(itemId: string): Promise<CarePlanItem> {
  await delay();
  const item = mockCarePlanState.items.find((i) => i.id === itemId);
  if (!item) throw new Error('Item not found');
  item.status = 'completed';
  item.completedAt = new Date().toISOString();
  return item;
}

export async function skipCarePlanItem(itemId: string): Promise<CarePlanItem> {
  await delay();
  const item = mockCarePlanState.items.find((i) => i.id === itemId);
  if (!item) throw new Error('Item not found');
  item.status = 'skipped';
  return item;
}

export async function createCheckIn(mood: string, notes?: string): Promise<{ id: string; mood: string }> {
  await delay();
  const checkIn = { id: generateId('checkin'), mood, createdAt: new Date().toISOString() };
  mockCheckIns.push(checkIn);

  if (isSupabaseConfigured && supabase) {
    const profile = await getCurrentProfile();
    if (profile) {
      await supabase.from('checkins').insert({
        member_id: profile.id,
        mood,
        notes,
      });
    }
  }
  return checkIn;
}

export async function getPractitioners(): Promise<Practitioner[]> {
  if (isSupabaseConfigured && supabase) return dbGetPractitioners();
  await delay(100);
  return mockPractitioners;
}

export async function getServices(): Promise<Service[]> {
  if (isSupabaseConfigured && supabase) return dbGetServices();
  await delay(100);
  return mockServices;
}

export async function getAppointments(): Promise<Appointment[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      return await dbGetAppointments();
    } catch {
      return [];
    }
  }
  await delay(100);
  return mockAppointmentsState;
}

export async function getAppointment(id: string): Promise<Appointment | null> {
  await delay(100);
  return mockAppointmentsState.find((a) => a.id === id) ?? null;
}

export async function bookAppointment(input: BookAppointmentInput): Promise<Appointment> {
  if (isSupabaseConfigured && supabase) return dbBookAppointment(input);
  await delay();
  const service = mockServices.find((s) => s.id === input.serviceId);
  const practitioner = mockPractitioners.find((p) => p.id === input.practitionerId);
  const duration = (service?.durationMinutes ?? 60) * 60000;
  const appointment: Appointment = {
    id: generateId('appt'),
    memberId: MOCK_MEMBER_ID,
    practitionerId: input.practitionerId,
    practitioner,
    serviceId: input.serviceId,
    service,
    appointmentType: input.appointmentType,
    status: 'scheduled',
    startsAt: input.startsAt,
    endsAt: new Date(new Date(input.startsAt).getTime() + duration).toISOString(),
    meetingUrl:
      input.appointmentType === 'virtual'
        ? 'https://zoom.us/j/placeholder-vande-wellness'
        : undefined,
    paymentStatus: service?.priceCents === 0 ? 'included' : 'pending',
    reasonForVisit: input.reasonForVisit,
  };
  mockAppointmentsState.push(appointment);
  return appointment;
}

export async function getThreads(): Promise<ChatThread[]> {
  await delay(100);
  return mockThreadsState;
}

export async function getMessages(threadId: string): Promise<Message[]> {
  await delay(100);
  return mockMessagesState[threadId] ?? [];
}

export async function sendMessage(threadId: string, body: string): Promise<Message> {
  await delay();
  const profile = mockProfileState ?? mockProfile;
  const message: Message = {
    id: generateId('msg'),
    threadId,
    senderId: profile.id,
    senderName: `${profile.firstName} ${profile.lastName}`,
    body,
    visibility: 'member',
    createdAt: new Date().toISOString(),
    isOwn: true,
  };
  if (!mockMessagesState[threadId]) mockMessagesState[threadId] = [];
  mockMessagesState[threadId].push(message);

  const thread = mockThreadsState.find((t) => t.id === threadId);
  if (thread) {
    thread.lastMessage = body;
    thread.lastMessageAt = message.createdAt;
  }
  return message;
}

export async function getContentItems(): Promise<ContentItem[]> {
  await delay(100);
  return mockContent;
}

export async function getContentItem(id: string): Promise<ContentItem | null> {
  await delay(100);
  return mockContent.find((c) => c.id === id) ?? null;
}

export async function getEvents(): Promise<Event[]> {
  if (isSupabaseConfigured && supabase) return dbGetEvents();
  await delay(100);
  return mockEventsState;
}

export async function getEvent(id: string): Promise<Event | null> {
  await delay(100);
  return mockEventsState.find((e) => e.id === id) ?? null;
}

export async function registerForEvent(eventId: string): Promise<Event> {
  if (isSupabaseConfigured && supabase) return dbRegisterForEvent(eventId);
  await delay();
  const event = mockEventsState.find((e) => e.id === eventId);
  if (!event) throw new Error('Event not found');
  event.registered = true;
  if (event.spotsRemaining) event.spotsRemaining -= 1;
  return event;
}

export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) return dbGetProducts();
  await delay(100);
  return mockProducts;
}

export async function getProduct(id: string): Promise<Product | null> {
  await delay(100);
  return mockProducts.find((p) => p.id === id) ?? null;
}

export async function getMembershipPlans(): Promise<MembershipPlan[]> {
  if (isSupabaseConfigured && supabase) return dbGetMembershipPlans();
  await delay(100);
  return mockMembershipPlans;
}

export async function getFamilyMembers(): Promise<FamilyMember[]> {
  await delay(100);
  return mockFamilyMembers;
}

export async function requestDataDeletion(): Promise<{ ticketId: string }> {
  if (isSupabaseConfigured && supabase) return dbRequestDataDeletion();
  await delay();
  return { ticketId: generateId('ticket') };
}

export async function createPaymentIntent(
  amountCents: number,
  metadata?: Record<string, string>,
): Promise<{ clientSecret: string; paymentIntentId: string }> {
  await delay();
  // Mock payment intent for dev; production uses Supabase Edge Function
  return {
    clientSecret: `pi_mock_secret_${amountCents}`,
    paymentIntentId: generateId('pi'),
  };
}

export async function registerPushToken(token: string): Promise<void> {
  await updateProfile({ pushToken: token });
}

/** Sync consent + onboarding flags from Supabase after login. */
export async function syncAuthFlagsFromDb(): Promise<{
  consentComplete: boolean;
  onboardingComplete: boolean;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return { consentComplete: false, onboardingComplete: false };
  }
  const profile = await getCurrentProfile();
  if (!profile) return { consentComplete: false, onboardingComplete: false };
  const consentComplete = await memberHasConsents(profile.id);
  return {
    consentComplete,
    onboardingComplete: profile.onboardingComplete,
  };
}
