import type {
  Appointment,
  ChatThread,
  ConsentRecord,
  Event,
  MembershipPlan,
  Practitioner,
  Product,
  Service,
  UserProfile,
} from '@/types/domain';

export function mapProfileFromDb(data: Record<string, unknown>): UserProfile {
  return {
    id: data.id as string,
    authUserId: data.auth_user_id as string,
    role: (data.role as UserProfile['role']) ?? 'member',
    firstName: data.first_name as string,
    lastName: data.last_name as string,
    email: data.email as string,
    phone: data.phone as string | undefined,
    dob: data.dob as string | undefined,
    timezone: (data.timezone as string) ?? 'America/New_York',
    country: (data.country as string) ?? 'US',
    emergencyContact: data.emergency_contact as string | undefined,
    pushToken: data.push_token as string | undefined,
    onboardingComplete: (data.onboarding_complete as boolean) ?? false,
    createdAt: data.created_at as string,
  };
}

export function mapServiceFromDb(row: Record<string, unknown>): Service {
  const serviceType = (row.service_type as string) ?? 'virtual';
  return {
    id: row.id as string,
    name: row.name as string,
    description: (row.description as string) ?? '',
    durationMinutes: row.duration_minutes as number,
    priceCents: row.price_cents as number,
    type: serviceType as Service['type'],
    category: (row.category as string) ?? 'consultation',
  };
}

export function mapPractitionerFromDb(row: Record<string, unknown>): Practitioner {
  const firstName = (row.first_name as string) ?? '';
  const lastName = (row.last_name as string) ?? '';
  return {
    id: row.id as string,
    firstName,
    lastName,
    credentials: row.credentials as string,
    specialty: row.specialty as string,
    location: (row.location as string) ?? 'Virtual',
    bio: row.bio as string | undefined,
    avatarUrl: row.avatar_url as string | undefined,
  };
}

export function mapEventFromDb(
  row: Record<string, unknown>,
  registered = false,
): Event {
  const eventType = (row.event_type as string) ?? 'workshop';
  return {
    id: row.id as string,
    title: row.title as string,
    description: (row.description as string) ?? '',
    type: eventType as Event['type'],
    startsAt: row.starts_at as string,
    endsAt: row.ends_at as string,
    location: row.location as string | undefined,
    isVirtual: (row.is_virtual as boolean) ?? true,
    registered,
    spotsRemaining: row.max_spots as number | undefined,
  };
}

export function mapProductFromDb(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    category: (row.category as string) ?? '',
    description: (row.description as string) ?? '',
    suggestedUse: (row.suggested_use as string) ?? '',
    safetyNote: (row.safety_note as string) ?? '',
    imageUrl: row.image_url as string | undefined,
    sku: (row.sku as string) ?? '',
    productUrl: (row.product_url as string) ?? '',
    practitionerRecommended: (row.practitioner_recommended as boolean) ?? false,
    priceCents: row.price_cents as number | undefined,
  };
}

export function mapMembershipFromDb(
  row: Record<string, unknown>,
  entitlements: MembershipPlan['entitlements'],
): MembershipPlan {
  return {
    id: row.id as string,
    name: row.name as string,
    description: (row.description as string) ?? '',
    priceCents: row.price_cents as number,
    billingPeriod: row.billing_period as MembershipPlan['billingPeriod'],
    entitlements,
    stripePriceId: row.stripe_price_id as string | undefined,
    featured: (row.featured as boolean) ?? false,
  };
}

export function mapAppointmentFromDb(
  row: Record<string, unknown>,
  practitioner?: Practitioner,
  service?: Service,
): Appointment {
  return {
    id: row.id as string,
    memberId: row.member_id as string,
    practitionerId: row.practitioner_id as string,
    practitioner,
    serviceId: row.service_id as string,
    service,
    appointmentType: row.appointment_type as Appointment['appointmentType'],
    status: row.status as Appointment['status'],
    startsAt: row.starts_at as string,
    endsAt: row.ends_at as string,
    meetingUrl: row.meeting_url as string | undefined,
    paymentStatus: row.payment_status as Appointment['paymentStatus'],
    reasonForVisit: row.reason_for_visit as string | undefined,
    notes: row.notes as string | undefined,
  };
}

export function mapConsentFromDb(row: Record<string, unknown>): ConsentRecord {
  return {
    id: row.id as string,
    memberId: row.member_id as string,
    type: row.consent_type as string,
    version: row.version as string,
    acceptedAt: row.accepted_at as string,
  };
}

export function mapThreadFromDb(
  row: Record<string, unknown>,
  lastMessage?: string,
): ChatThread {
  return {
    id: row.id as string,
    memberId: row.member_id as string,
    category: row.category as string,
    subject: row.subject as string,
    lastMessage,
    lastMessageAt: row.updated_at as string | undefined,
    unreadCount: 0,
  };
}
