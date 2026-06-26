import { categoryColors } from '@/lib/theme';

export const HOME_COLORS = {
  headerGreen: '#2D4627',
  accentOrange: '#B85C38',
  pageBackground: '#F8F8F8',
  cardWhite: '#FFFFFF',
  cardCream: '#FCF9F6',
  cardPeach: '#FFF5F0',
  textPrimary: '#000000',
  textBody: '#666666',
  textMuted: '#888888',
  viewAll: '#888888',
  border: '#E0E0E0',
  linkGreen: '#2D4627',
} as const;

export const HOME_SPACING = {
  screenX: 20,
  sectionGap: 28,
  cardPadding: 16,
  cardGap: 12,
  itemGap: 8,
} as const;

export const HOME_USER = {
  firstName: 'Snigdha',
  greeting: 'Hi Snigdha!',
} as const;

export const HOME_SCREENING = {
  title: 'Help Us Understand Your Condition',
  description:
    'Answer a few targeted questions about your condition for a more focused consultation.',
  ctaLabel: 'Start Holistic Health Screening',
} as const;

export const HOME_CONSULTATION = {
  title: 'Clinician Consultation',
  duration: '30 min - 250 mins',
  date: 'Tuesday, June 22, 2024',
  time: '09:30 AM IST',
  addToCalendarLabel: 'Add to Calendar',
  rescheduleLabel: 'Reschedule',
} as const;

export const HOME_EVENT = {
  title: 'Yoga for Stress Relief',
  dateTime: 'Sat, 28 Jun · 10:00 AM',
  location: 'Vande Center, Mumbai',
  imageUri:
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
} as const;

export const HOME_WELLNESS_BALANCE = {
  title: 'Thriving or just Surviving?',
  description:
    'Take a quick wellness assessment to understand where you are on your health journey.',
  actionLabel: 'Start Assessment',
  imageUri:
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
} as const;

export const HOME_MIND_BODY = {
  sectionTitle: 'Your Mind-Body Constitution',
  sectionDescription:
    'Discover your unique Ayurvedic constitution and get personalized wellness insights.',
  cardTitle: 'Know Your Dosha',
  cardDescription: 'Understand your mind-body type in minutes.',
  actionLabel: 'Get Started',
  imageUri:
    'https://images.unsplash.com/photo-1506126613405-07c6dec75130?w=600&h=300&fit=crop',
} as const;

export const HOME_CONNECT_APP = {
  sectionTitle: 'Connect Your Health App',
  sectionDescription:
    'Sync data from your favourite health apps for a complete picture of your wellness.',
  cardTitle: 'Apple Health & More',
  cardDescription: 'Bring your steps, sleep, and vitals into one place.',
  actionLabel: 'Connect Now',
  imageUri:
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=300&fit=crop',
} as const;

export const HOME_PROGRAMS = [
  { id: 'anxiety', label: 'Anxiety and Depression', color: categoryColors.anxiety, bg: '#FFF5F0', iconBg: '#F5E6D8' },
  { id: 'arthritis', label: 'Arthritis', color: categoryColors.arthritis, bg: '#FCF9F6', iconBg: '#E2E8DC' },
  { id: 'cholesterol', label: 'Cholesterol and Triglycerides', color: categoryColors.cholesterol, bg: '#FFF5F0', iconBg: '#F0DDD4' },
  { id: 'cancer', label: 'Cancer Care', color: categoryColors.cancer, bg: '#FCF9F6', iconBg: '#DCE4EF' },
  { id: 'diabetes', label: 'Diabetic Complications', color: categoryColors.diabetes, bg: '#FFF5F0', iconBg: '#EDD8DA' },
  { id: 'sleep', label: 'Sleep Quality', color: categoryColors.sleep, bg: '#FCF9F6', iconBg: '#E4EAD8' },
] as const;

export const HOME_FREE_CONSULT = {
  prompt: "Don't see what you're looking for?",
  cta: 'Book your first free consultation with a certified clinician.',
} as const;

export const HOME_FAQ = [
  {
    id: '1',
    question: 'What is holistic health screening?',
    answer:
      'A short questionnaire that helps our clinicians understand your health concerns before your consultation.',
  },
  {
    id: '2',
    question: 'How do I reschedule my appointment?',
    answer: 'Tap Reschedule on your consultation card or visit the Events tab to manage bookings.',
  },
  {
    id: '3',
    question: 'Is my health data secure?',
    answer: 'Yes. Your data is encrypted and only shared with your assigned care team.',
  },
] as const;

export const HOME_HELP = [
  {
    id: 'message',
    title: 'Message Us',
    description: 'Chat with our care team for quick support.',
    icon: 'message' as const,
  },
  {
    id: 'email',
    title: 'Email Support',
    description: 'Send us a detailed message anytime.',
    icon: 'mail' as const,
  },
  {
    id: 'faq',
    title: 'Browse FAQs',
    description: 'Find answers to common questions.',
    icon: 'help' as const,
  },
] as const;
