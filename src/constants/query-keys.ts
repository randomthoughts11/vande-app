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
} as const;
