/**
 * Typed route paths for Expo Router navigation.
 * Maps to VANDE reference screen flows.
 */
export const ROUTES = {
  // Auth & onboarding
  welcome: "/(auth)/welcome",
  login: "/(auth)/login",
  register: "/(auth)/register",
  consent: "/(auth)/consent",
  onboarding: "/(auth)/onboarding",

  // Main tabs (VANDE: Home, Events, Shop/Blog, Menu)
  today: "/(tabs)/today",
  plan: "/(tabs)/plan",
  consult: "/(tabs)/consult",
  learn: "/(tabs)/learn",
  profile: "/(tabs)/profile",

  // Stacks
  chat: "/chat",
  chatThread: (threadId: string) => `/chat/${threadId}` as const,
  bookAppointment: "/appointment/book",
  appointment: (id: string) => `/appointment/${id}` as const,
  event: (id: string) => `/events/${id}` as const,
  content: (id: string) => `/content/${id}` as const,
  product: (id: string) => `/products/${id}` as const,
  carePlan: (id: string) => `/care-plan/${id}` as const,
  membership: "/membership",

  // Intake flow (VANDE consult + health intake)
  consultIntro: "/intake/consult-intro",
  intakeStep: (stepId: string) => `/intake/${stepId}` as const,
  intakeReview: "/intake/review",
  bookingConfirmed: "/intake/booking-confirmed",
  sessionPrep: "/intake/session-prep",
} as const;
