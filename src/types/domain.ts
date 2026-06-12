export type UserRole = 'member' | 'practitioner' | 'admin';

export interface UserProfile {
  id: string;
  authUserId: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob?: string;
  timezone: string;
  country: string;
  emergencyContact?: string;
  pushToken?: string;
  onboardingComplete: boolean;
  createdAt: string;
}

export interface FamilyMember {
  id: string;
  memberId: string;
  firstName: string;
  lastName: string;
  relationship: string;
  dob?: string;
}

export interface Practitioner {
  id: string;
  firstName: string;
  lastName: string;
  credentials: string;
  specialty: string;
  location: string;
  bio?: string;
  avatarUrl?: string;
  nextAvailable?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceCents: number;
  type: 'virtual' | 'in_person' | 'both';
  category: string;
}

export interface Entitlement {
  id: string;
  key: string;
  label: string;
  value: string | number | boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  billingPeriod: 'monthly' | 'annual';
  entitlements: Entitlement[];
  stripePriceId?: string;
  featured?: boolean;
}

export interface IntakeResponse {
  id: string;
  memberId: string;
  goals: string[];
  symptoms: string[];
  sleepStress: Record<string, unknown>;
  digestion: Record<string, unknown>;
  mobility: Record<string, unknown>;
  dietPreferences: string[];
  medications: string[];
  supplements: string[];
  allergies: string[];
  preferredConsultation: string;
  wellnessScores: WellnessScores;
  createdAt: string;
}

export interface WellnessScores {
  sleep: number;
  stress: number;
  digestion: number;
  mobility: number;
  energy: number;
}

export type CarePlanItemType =
  | 'supplement'
  | 'yoga'
  | 'nutrition'
  | 'lifestyle'
  | 'detox'
  | 'progress';

export type CarePlanItemStatus = 'pending' | 'completed' | 'skipped';

export interface CarePlanItem {
  id: string;
  carePlanId: string;
  type: CarePlanItemType;
  title: string;
  instructions: string;
  schedule: string;
  scheduleJson?: Record<string, unknown>;
  rationale?: string;
  safetyNote?: string;
  mediaUrl?: string;
  productUrl?: string;
  sortOrder: number;
  status: CarePlanItemStatus;
  completedAt?: string;
}

export interface CarePlan {
  id: string;
  memberId: string;
  practitionerId: string;
  practitioner?: Practitioner;
  status: 'draft' | 'active' | 'archived';
  title: string;
  summary: string;
  goal: string;
  startDate: string;
  nextReviewDate: string;
  items: CarePlanItem[];
  progressSummary?: string;
}

export interface TodayPlan {
  greeting: string;
  items: CarePlanItem[];
  tip: string;
  upcomingAppointment?: Appointment;
  messagePreview?: string;
  recommendedProduct?: Product;
}

export interface CheckIn {
  id: string;
  memberId: string;
  mood: string;
  stressLevel?: number;
  sleepQuality?: number;
  digestionScore?: number;
  painScore?: number;
  energyLevel?: number;
  notes?: string;
  createdAt: string;
}

export interface Metric {
  id: string;
  memberId: string;
  type: string;
  value: number;
  unit?: string;
  recordedAt: string;
}

export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export interface Appointment {
  id: string;
  memberId: string;
  practitionerId: string;
  practitioner?: Practitioner;
  serviceId: string;
  service?: Service;
  locationId?: string;
  appointmentType: 'virtual' | 'in_person';
  status: AppointmentStatus;
  startsAt: string;
  endsAt: string;
  meetingUrl?: string;
  paymentStatus: 'pending' | 'paid' | 'included' | 'refunded';
  notes?: string;
  reasonForVisit?: string;
}

export interface ChatThread {
  id: string;
  memberId: string;
  category: string;
  subject: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  body: string;
  attachmentUrl?: string;
  visibility: 'member' | 'internal';
  createdAt: string;
  readAt?: string;
  isOwn: boolean;
}

export type ContentType = 'article' | 'video' | 'course' | 'event' | 'webinar';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  category: string;
  durationMinutes?: number;
  mediaUrl?: string;
  thumbnailUrl?: string;
  progress?: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'live_yoga' | 'meditation' | 'webinar' | 'retreat' | 'workshop';
  startsAt: string;
  endsAt: string;
  location?: string;
  isVirtual: boolean;
  registered?: boolean;
  spotsRemaining?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  suggestedUse: string;
  safetyNote: string;
  imageUrl?: string;
  sku: string;
  productUrl: string;
  practitionerRecommended?: boolean;
  priceCents?: number;
}

export interface ConsentRecord {
  id: string;
  memberId: string;
  type: string;
  version: string;
  acceptedAt: string;
}

export interface BookAppointmentInput {
  serviceId: string;
  practitionerId: string;
  appointmentType: 'virtual' | 'in_person';
  startsAt: string;
  reasonForVisit: string;
}
