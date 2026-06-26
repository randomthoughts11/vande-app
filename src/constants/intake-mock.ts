import { Platform } from 'react-native';

export const INTAKE_COLORS = {
  background: '#FAF9F6',
  backgroundAlt: '#F9F7F2',
  card: '#FFFFFF',
  primaryGreen: '#2D3E24',
  primaryDark: '#1B2E1A',
  primaryButton: '#1B2613',
  textPrimary: '#1A1A1A',
  textSecondary: '#4A4A4A',
  textMuted: '#6B6B6B',
  textLight: '#9E9E9E',
  border: '#E0E0E0',
  inputBorder: '#DEDEDE',
  accentTerracotta: '#A34D32',
  badgeGreen: '#4CAF50',
  badgeGreenBg: '#E8F5E9',
  infoBoxBg: '#FDF6E3',
  infoBoxBgAlt: '#F5F0E1',
  expandBg: '#FDF8E9',
  innerAnswerBg: '#F5F3EF',
  progressEmpty: '#E0E0E0',
  sectionNumber: '#D3D3D3',
  headerMint: '#F0F7F0',
  successGreen: '#4CAF50',
  iconCircleBg: '#E8F5E9',
  timelineBg: '#F1F5F0',
  consultHeader: '#2D3E24',
} as const;

export const INTAKE_SPACING = {
  screenX: 20,
  cardPadding: 24,
  cardRadius: 24,
  inputRadius: 12,
  chipRadius: 20,
  sectionGap: 16,
} as const;

export const INTAKE_FONTS = {
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
  sans: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
} as const;

export const INTAKE_HIPAA =
  '*All information will remain confidential according to HIPAA compliance standards';

export const INTAKE_CONFIDENTIAL_LABEL = 'CONFIDENTIAL';

export interface IntakeBulletItem {
  title: string;
  description: string;
}

export interface IntakeSectionIntroConfig {
  type: 'section_intro';
  id: string;
  sectionNumber: string;
  badge?: string;
  progressFill: number;
  headingBefore: string;
  headingBold: string;
  headingAfter?: string;
  description: string;
  infoTitle: string;
  bullets: IntakeBulletItem[];
  footerMeta: string;
  nextLabel?: string;
}

export interface IntakeTextConfig {
  type: 'text';
  id: string;
  section: string;
  step: number;
  totalSteps: number;
  progressFilled: number;
  progressTotal: number;
  confidential?: boolean;
  question: string;
  instruction: string;
  placeholder: string;
  showBrandHeader?: boolean;
}

export interface IntakeChipsConfig {
  type: 'chips';
  id: string;
  section: string;
  step: number;
  totalSteps: number;
  progressFilled: number;
  progressTotal: number;
  question: string;
  instruction: string;
  options: string[];
  multiSelect: boolean;
  showWhyAsk?: boolean;
  showBrandHeader?: boolean;
}

export interface IntakeRadioConfig {
  type: 'radio';
  id: string;
  section: string;
  step: number;
  totalSteps: number;
  progressFilled: number;
  progressTotal: number;
  question: string;
  instruction: string;
  options: string[];
  showBrandHeader?: boolean;
}

export interface IntakeChecklistConfig {
  type: 'checklist';
  id: string;
  section: string;
  step: number;
  totalSteps: number;
  progressFilled: number;
  progressTotal: number;
  confidential?: boolean;
  question: string;
  instruction: string;
  showWhyAsk?: boolean;
  showBrandHeader?: boolean;
  options: { id: string; title: string; subtitle: string }[];
}

export type IntakeStepConfig =
  | IntakeSectionIntroConfig
  | IntakeTextConfig
  | IntakeChipsConfig
  | IntakeRadioConfig
  | IntakeChecklistConfig;

export const INTAKE_STEP_ORDER: string[] = [
  'section-2-intro',
  'family-history',
  'menstrual-cycles',
  'food-intolerances',
  'section-3-intro',
  'eating-day',
  'movement',
  'work',
  'consumption',
  'home-family',
  'stress',
];

export const INTAKE_STEPS: Record<string, IntakeStepConfig> = {
  'section-2-intro': {
    type: 'section_intro',
    id: 'section-2-intro',
    sectionNumber: '02',
    badge: 'Section 1 complete',
    progressFill: 0.33,
    headingBefore: 'Now, a bit about ',
    headingBold: 'your story.',
    description:
      "This helps your specialist understand the full picture — not just what's happening now, but what you've been through before.",
    infoTitle: "WHAT'S IN THIS SECTION",
    bullets: [
      { title: 'Previous diagnoses', description: "Anything you've been told before" },
      { title: "What you've already tried", description: 'Doctors, tests, supplements, diets' },
      { title: 'Family health history', description: 'Parents, siblings, grandparents' },
    ],
    footerMeta: '~3 min · 5 questions',
    nextLabel: 'Continue',
  },
  'family-history': {
    type: 'chips',
    id: 'family-history',
    section: 'History',
    step: 7,
    totalSteps: 17,
    progressFilled: 2,
    progressTotal: 3,
    question: 'Does any of this run in your family?',
    instruction: 'Think parents, siblings, grandparents. Select everything that applies.',
    options: [
      'Diabetes',
      'Heart disease',
      'Cancer',
      'Autoimmune conditions',
      'Mental health conditions',
      'Thyroid disorders',
      'Kidney disease',
    ],
    multiSelect: true,
    showWhyAsk: true,
    showBrandHeader: true,
  },
  'menstrual-cycles': {
    type: 'radio',
    id: 'menstrual-cycles',
    section: 'History',
    step: 8,
    totalSteps: 17,
    progressFilled: 2,
    progressTotal: 3,
    question: 'How have your menstrual cycles been lately?',
    instruction: "Pick the option that fits best. Completely fine to skip if it doesn't apply.",
    options: [
      'Regular and predictable',
      'Regular because I use hormonal contraception',
      'Mostly regular — occasionally off due to stress or travel',
    ],
    showBrandHeader: true,
  },
  'food-intolerances': {
    type: 'chips',
    id: 'food-intolerances',
    section: 'History',
    step: 9,
    totalSteps: 17,
    progressFilled: 2,
    progressTotal: 3,
    question: "Any foods that don't agree with you?",
    instruction:
      "Allergies, intolerances, or things that reliably make you feel off - select all that apply.",
    options: [
      'Dairy or lactose',
      'Gluten or wheat',
      'Soy',
      'Eggs',
      'Tree nuts',
      'Peanuts',
      'Shellfish',
      'Fish',
      'Corn',
      'Fructose or fruit sugars',
      'Caffeine',
      'Red meat',
    ],
    multiSelect: true,
    showBrandHeader: true,
  },
  'section-3-intro': {
    type: 'section_intro',
    id: 'section-3-intro',
    sectionNumber: '03',
    badge: 'Almost there',
    progressFill: 0.66,
    headingBefore: 'Last section — ',
    headingBold: 'daily life.',
    description:
      'Sleep, stress, diet, and movement. Often where the root cause becomes clearest.',
    infoTitle: "WHAT'S IN THIS SECTION",
    bullets: [
      { title: 'Sleep patterns', description: 'Quality, duration, and any issues' },
      { title: 'Stress levels', description: 'Work, relationships, life changes' },
      { title: 'Diet & movement', description: 'What you eat and how you move' },
    ],
    footerMeta: '~3 min · 5 questions',
    nextLabel: 'Continue',
  },
  'eating-day': {
    type: 'text',
    id: 'eating-day',
    section: 'Daily Life',
    step: 11,
    totalSteps: 17,
    progressFilled: 3,
    progressTotal: 4,
    question: 'What does a typical day of eating look like?',
    instruction:
      'Meals, timing, snacks, dietary preference - and any concerns you already have about your diet.',
    placeholder:
      "e.g. I'm Vegan, Skip breakfast most days. Lunch around noon - usually a salad or sandwich. Dinner varies a lot and I snack late at night",
  },
  movement: {
    type: 'text',
    id: 'movement',
    section: 'Daily Life',
    step: 12,
    totalSteps: 17,
    progressFilled: 3,
    progressTotal: 4,
    question: 'How do you like to move your body?',
    instruction: 'Type of activity, how often, and whether your health gets in the way of it.',
    placeholder:
      "e.g. Walk most mornings, about 30 minutes. Used to do yoga twice a week but haven't managed lately.",
  },
  work: {
    type: 'text',
    id: 'work',
    section: 'Daily Life',
    step: 13,
    totalSteps: 17,
    progressFilled: 3,
    progressTotal: 4,
    question: 'What do you do for work?',
    instruction:
      'Your role, how active or desk-bound it is, and what a typical day actually feels like.',
    placeholder:
      'e.g. Director at a tech company, mostly desk-based. Mentally drained by 5pm most days.',
  },
  consumption: {
    type: 'checklist',
    id: 'consumption',
    section: 'Daily Life',
    step: 14,
    totalSteps: 17,
    progressFilled: 3,
    progressTotal: 4,
    confidential: true,
    question: "Anything you consume regularly that you'd like to mention?",
    instruction: 'This stays completely between you and your care team.',
    showWhyAsk: true,
    options: [
      { id: 'alcohol', title: 'Alcohol', subtitle: 'A few drinks per week or more' },
      { id: 'tobacco', title: 'Tobacco or nicotine', subtitle: 'Cigarettes, vaping, or other forms' },
      { id: 'cannabis', title: 'Cannabis', subtitle: 'Recreational or medicinal use' },
    ],
  },
  'home-family': {
    type: 'text',
    id: 'home-family',
    section: 'Daily Life',
    step: 15,
    totalSteps: 17,
    progressFilled: 3,
    progressTotal: 4,
    question: 'Tell us a little about your home and family life.',
    instruction:
      'Who you live with, your role at home - anything that shapes how your days actually feel.',
    placeholder:
      'e.g. Married with two teenagers at home. I do most of the cooking and take care of my parents too.',
  },
  stress: {
    type: 'text',
    id: 'stress',
    section: 'Daily Life',
    step: 16,
    totalSteps: 17,
    progressFilled: 3,
    progressTotal: 4,
    confidential: true,
    question:
      "Honestly how's your stress level? Any significant events that still affect how you feel today?",
    instruction:
      "Accidents, big losses, long stretches of stress. Share only what you're comfortable with.",
    placeholder:
      "e.g. I have been quite stressed due to a lay off, Also, lost my father in 2020 and haven't quite felt like myself since.",
  },
};

export const INTAKE_REVIEW_SECTIONS = [
  {
    id: 'demographics',
    label: 'SECTION 1',
    title: 'Demographics',
    questions: [{ question: 'What is your preferred gender?', answer: 'female' }],
  },
];

export const BOOKING_CONFIRMATION = {
  title: "You're All set!",
  subtitle: 'Booking confirmed, intake submitted — your specialist will arrive prepared.',
  detailsTitle: "Here's your consultation details",
  consultationTitle: 'Clinician Consultation',
  date: 'Tuesday, June 23 2026',
  time: '06:30 PM PST • 60 mins',
  intakeSubmitted: 'Intake Form Submitted',
};

export const SESSION_PREP = {
  title: "You're All set!",
  subtitle: 'Your video consultation is scheduled.',
  sectionTitle: 'To ensure a smooth session',
  items: [
    { id: 'wifi', label: 'Find a quiet, well-lit space with stable internet' },
    { id: 'reports', label: 'Upload any relevant medical reports ahead of the session' },
    { id: 'meds', label: 'Have a list of your current medications ready (if any)' },
  ],
};

export const CONSULT_INTRO = {
  title: 'Start with your first consultation at no cost',
  cta: 'Book my free consultation',
  link: 'Just Looking Around?',
  timeline: [
    { id: '1', label: 'Pick your top health concern' },
    { id: '2', label: 'Select a date and time for your consultation' },
    { id: '3', label: 'Get clear next steps to guide your care' },
  ],
  features: [
    { id: '1', label: '60 mins virtual consultation' },
    { id: '2', label: '1:1 with a Holistic Health Physician' },
    { id: '3', label: 'Personalized care plan built around you' },
  ],
};
