import { Platform } from 'react-native';

export const AI_CONSULT_COLORS = {
  background: '#FAF9F6',
  card: '#FFFFFF',
  primaryGreen: '#2D3E24',
  primaryDark: '#1B2E1A',
  accentMint: '#E8F5E9',
  accentGold: '#D4A044',
  textPrimary: '#1A1A1A',
  textSecondary: '#4A4A4A',
  textMuted: '#888888',
  border: '#E0E0E0',
  userBubble: '#2D3E24',
  assistantBubble: '#F5F3EF',
  voiceActive: '#4CAF50',
  recommendationBg: '#FDF8E9',
  highPriority: '#A34D32',
} as const;

export const AI_CONSULT_FONTS = {
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
  sans: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
} as const;

export type AiConsultStatus = 'active' | 'completed';
export type AiMessageRole = 'user' | 'assistant';
export type AiRecommendationCategory = 'nutrition' | 'movement' | 'sleep' | 'supplement' | 'lifestyle';
export type AiRecommendationPriority = 'high' | 'medium' | 'low';

export interface AiConsultSession {
  id: string;
  title: string;
  summary: string;
  startedAt: string;
  endedAt?: string;
  messageCount: number;
  status: AiConsultStatus;
}

export interface AiChatMessage {
  id: string;
  sessionId: string;
  role: AiMessageRole;
  content: string;
  timestamp: string;
}

export interface AiRecommendation {
  id: string;
  sessionId: string;
  category: AiRecommendationCategory;
  title: string;
  description: string;
  priority: AiRecommendationPriority;
  actionLabel?: string;
}

export const AI_CONSULT_DISCLAIMER =
  'AI guidance is for wellness support only — not a diagnosis or emergency care.';

export const AI_CONSULT_SESSIONS: AiConsultSession[] = [
  {
    id: 'ai-session-1',
    title: 'Afternoon fatigue & digestion',
    summary: 'Explored meal timing, Triphala support, and a gentler evening routine.',
    startedAt: '2026-06-22T14:30:00Z',
    endedAt: '2026-06-22T14:52:00Z',
    messageCount: 12,
    status: 'completed',
  },
  {
    id: 'ai-session-2',
    title: 'Sleep quality check-in',
    summary: 'Reviewed wind-down habits and suggested a 10-minute breath practice.',
    startedAt: '2026-06-18T21:00:00Z',
    endedAt: '2026-06-18T21:18:00Z',
    messageCount: 8,
    status: 'completed',
  },
  {
    id: 'ai-session-3',
    title: 'New consultation',
    summary: 'Ongoing — ask anything about your wellness plan.',
    startedAt: '2026-06-23T10:00:00Z',
    messageCount: 3,
    status: 'active',
  },
];

export const AI_CHAT_MESSAGES: Record<string, AiChatMessage[]> = {
  'ai-session-1': [
    {
      id: 'm1',
      sessionId: 'ai-session-1',
      role: 'assistant',
      content:
        "Hi Snigdha — I'm your Vande wellness guide. What would you like to explore today?",
      timestamp: '2026-06-22T14:30:00Z',
    },
    {
      id: 'm2',
      sessionId: 'ai-session-1',
      role: 'user',
      content:
        "I've been feeling tired after lunch most days, even when I sleep okay.",
      timestamp: '2026-06-22T14:31:00Z',
    },
    {
      id: 'm3',
      sessionId: 'ai-session-1',
      role: 'assistant',
      content:
        'That pattern often links to digestion load or blood sugar swings. Tell me what a typical lunch looks like — portion size, carbs, and how quickly you eat.',
      timestamp: '2026-06-22T14:31:30Z',
    },
    {
      id: 'm4',
      sessionId: 'ai-session-1',
      role: 'user',
      content:
        'Usually a big salad with chickpeas or a sandwich. I eat at my desk in about 10 minutes.',
      timestamp: '2026-06-22T14:33:00Z',
    },
    {
      id: 'm5',
      sessionId: 'ai-session-1',
      role: 'assistant',
      content:
        "Eating quickly while working can dampen digestive fire (Agni). I'd suggest a 15-minute screen-free lunch, warm water beforehand, and a lighter protein portion. I'll add a few personalized recommendations below.",
      timestamp: '2026-06-22T14:34:00Z',
    },
  ],
  'ai-session-2': [
    {
      id: 'm6',
      sessionId: 'ai-session-2',
      role: 'assistant',
      content: 'How has your sleep been this week — falling asleep, staying asleep, or waking rested?',
      timestamp: '2026-06-18T21:00:00Z',
    },
    {
      id: 'm7',
      sessionId: 'ai-session-2',
      role: 'user',
      content: 'I fall asleep fine but wake around 3am and scroll my phone.',
      timestamp: '2026-06-18T21:02:00Z',
    },
    {
      id: 'm8',
      sessionId: 'ai-session-2',
      role: 'assistant',
      content:
        'The 3am wake-up can reflect a Vata spike. Try keeping your phone in another room and a 4-7-8 breath practice if you wake. I have a wind-down routine suggestion for you below.',
      timestamp: '2026-06-18T21:04:00Z',
    },
  ],
  'ai-session-3': [
    {
      id: 'm9',
      sessionId: 'ai-session-3',
      role: 'assistant',
      content:
        "Welcome back. I'm here to help you reflect on symptoms, habits, and next steps — all grounded in your Vande care plan.",
      timestamp: '2026-06-23T10:00:00Z',
    },
    {
      id: 'm10',
      sessionId: 'ai-session-3',
      role: 'user',
      content: 'What should I focus on before my clinician call tomorrow?',
      timestamp: '2026-06-23T10:01:00Z',
    },
    {
      id: 'm11',
      sessionId: 'ai-session-3',
      role: 'assistant',
      content:
        'Great question. Jot down your top 3 concerns, any symptom changes this week, and medications or supplements you take. I can help you organize that now.',
      timestamp: '2026-06-23T10:01:30Z',
    },
  ],
  'ai-session-new': [
    {
      id: 'm-new-1',
      sessionId: 'ai-session-new',
      role: 'assistant',
      content:
        "Hi — I'm your Vande wellness guide. Share how you're feeling, ask about symptoms, or get help preparing for a clinician visit. This is a placeholder until the full AI agent connects.",
      timestamp: '2026-06-23T12:00:00Z',
    },
  ],
};

export const AI_RECOMMENDATIONS: Record<string, AiRecommendation[]> = {
  'ai-session-1': [
    {
      id: 'r1',
      sessionId: 'ai-session-1',
      category: 'nutrition',
      title: 'Mindful lunch ritual',
      description: 'Take 15 minutes away from screens. Sip warm water 10 minutes before eating.',
      priority: 'high',
      actionLabel: 'Add to care plan',
    },
    {
      id: 'r2',
      sessionId: 'ai-session-1',
      category: 'supplement',
      title: 'Triphala after dinner',
      description: 'Discuss with your practitioner — may support gentle evening digestion.',
      priority: 'medium',
      actionLabel: 'View product',
    },
  ],
  'ai-session-2': [
    {
      id: 'r3',
      sessionId: 'ai-session-2',
      category: 'sleep',
      title: '4-7-8 breath on waking',
      description: '4 sec inhale, 7 sec hold, 8 sec exhale — repeat 4 cycles without reaching for your phone.',
      priority: 'high',
      actionLabel: 'Set reminder',
    },
    {
      id: 'r4',
      sessionId: 'ai-session-2',
      category: 'lifestyle',
      title: 'Phone-free bedroom',
      description: 'Charge devices outside the bedroom to reduce midnight stimulation.',
      priority: 'medium',
    },
  ],
  'ai-session-3': [
    {
      id: 'r5',
      sessionId: 'ai-session-3',
      category: 'lifestyle',
      title: 'Pre-visit symptom log',
      description: 'Note energy, digestion, sleep, and mood for the past 7 days before your call.',
      priority: 'high',
      actionLabel: 'Start log',
    },
  ],
};

export const AI_SUGGESTED_PROMPTS = [
  'How can I improve my energy this week?',
  'What should I tell my clinician?',
  'Review my sleep habits',
  'Suggest a calming evening routine',
];

export const AI_NEW_SESSION_ID = 'ai-session-new';
