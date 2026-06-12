export const APP_NAME = 'Vande Wellness';

export const MOOD_OPTIONS = [
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'stressed', label: 'Stressed', emoji: '😣' },
  { id: 'anxious', label: 'Anxious', emoji: '😰' },
  { id: 'sad', label: 'Sad', emoji: '😢' },
  { id: 'tired', label: 'Tired', emoji: '😴' },
  { id: 'pain', label: 'Pain', emoji: '🤕' },
  { id: 'digestive', label: 'Digestive discomfort', emoji: '🤢' },
] as const;

export const CARE_PLAN_SECTIONS = [
  'supplement',
  'yoga',
  'nutrition',
  'lifestyle',
  'detox',
  'progress',
] as const;

export const CONSENT_TYPES = [
  'privacy_policy',
  'wellness_disclaimer',
  'supplement_safety',
  'telehealth_communication',
] as const;

export const CHAT_CATEGORIES = [
  'care_plan',
  'supplement',
  'appointment',
  'billing',
  'technical',
] as const;

export const VANDECART_BASE_URL =
  process.env.EXPO_PUBLIC_VANDECART_BASE_URL ?? 'https://vandecart.com';

export const QUERY_KEYS = {
  profile: ['profile'] as const,
  todayPlan: ['todayPlan'] as const,
  carePlan: ['carePlan'] as const,
  appointments: ['appointments'] as const,
  threads: ['threads'] as const,
  messages: (threadId: string) => ['messages', threadId] as const,
  content: ['content'] as const,
  events: ['events'] as const,
  products: ['products'] as const,
  memberships: ['memberships'] as const,
};
