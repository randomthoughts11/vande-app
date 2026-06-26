import { Platform } from 'react-native';

export const MESSAGES_COLORS = {
  background: '#FFFFFF',
  primaryGreen: '#2D3E1E',
  tabActiveUnderline: '#2D4F1E',
  textPrimary: '#000000',
  textSecondary: '#4A4A4A',
  textBody: '#555555',
  textMuted: '#9E9E9E',
  textTimestamp: '#888888',
  border: '#E0E0E0',
  divider: '#EEEEEE',
  badgeRed: '#D32F2F',
  unreadDot: '#D32F2F',
  bannerGreen: '#F1F8EB',
  replyGreen: '#2D351E',
  sendGreen: '#3B4626',
  sheetBackground: '#F5F5F5',
  uploadBackground: '#F0F4F0',
  placeholder: '#9E9E9E',
} as const;

export const MESSAGES_SPACING = {
  screenX: 16,
  tabHeight: 48,
  searchHeight: 44,
  itemPaddingY: 16,
  fabSize: 56,
  fabMargin: 20,
  sheetRadius: 20,
} as const;

export const MESSAGES_FONTS = {
  sans: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
} as const;

export type MessageTab = 'messages' | 'general';

export interface MessageThread {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
}

export interface GeneralNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  unread: boolean;
  showViewButton: boolean;
  threadId?: string;
}

export const MESSAGE_THREADS: MessageThread[] = [
  {
    id: 'thread-1',
    sender: 'Sriman NARAYANAN',
    subject: 'Greetings from Vande Wellness',
    preview:
      "Hi Ms.Snigdha, I also noticed that you're based in India (IST timezone). Our consultation programs are structured in USD...",
    timestamp: '1h 44m ago',
  },
  {
    id: 'thread-2',
    sender: 'Sriman NARAYANAN ...3',
    subject: 'Follow-up on your wellness plan',
    preview: 'Thank you for sharing your health history. I wanted to follow up on the recommendations we discussed...',
    timestamp: '2d ago',
  },
  {
    id: 'thread-3',
    sender: 'Care Team',
    subject: 'Your appointment confirmation',
    preview: 'Your video consultation has been confirmed. Please join 5 minutes before your scheduled time.',
    timestamp: '3d ago',
  },
];

export const GENERAL_NOTIFICATIONS: GeneralNotification[] = [
  {
    id: 'n1',
    title: 'New message from Sriman NARAYANAN',
    body: "You've received a new message on the Vande Wellness app. Tap to read and reply!",
    timestamp: '1h 44m ago',
    unread: true,
    showViewButton: true,
    threadId: 'thread-1',
  },
  {
    id: 'n2',
    title: 'Ready for tomorrow?',
    body: 'Your consultation is set for 06:30 PM PST—get ready to prioritize your health',
    timestamp: '4h 21m ago',
    unread: true,
    showViewButton: false,
  },
  {
    id: 'n3',
    title: 'New message from Sriman NARAYANAN',
    body: "You've received a new message on the Vande Wellness app. Tap to read and reply!",
    timestamp: '23h 19m ago',
    unread: false,
    showViewButton: true,
    threadId: 'thread-1',
  },
];

export const MESSAGE_DETAIL = {
  threadId: 'thread-1',
  subject: 'Greetings from Vande Wellness',
  sender: 'Sriman NARAYANAN',
  role: 'Health Expert @ Vande Wellness',
  timestamp: 'Jun 23, 2026 | 10:38 AM (3 hours ago)',
  body: `Hi Ms.Snigdha,

I also noticed that you're based in India (IST timezone). Our consultation programs are structured in USD for clients in the US, and we apply the same fee structure for clients in India as well.

Please let me know if you have any questions about scheduling or payment before our session.

Warm regards,
Sriman Narayanan
Health Expert
Vande Wellness`,
};
