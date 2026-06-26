import { Platform } from 'react-native';

export const MENU_COLORS = {
  background: '#FFFFFF',
  profileCard: '#F2F2F2',
  textPrimary: '#000000',
  textSecondary: '#555555',
  textMuted: '#757575',
  border: '#E0E0E0',
  iconGreen: '#2D3E21',
  iconGreenBg: '#2D4A27',
  chevron: '#AAAAAA',
} as const;

export const MENU_SPACING = {
  screenX: 20,
  sectionGap: 24,
  itemGap: 8,
  headerBottom: 16,
  profileRadius: 12,
  itemRadius: 10,
  healthIconRadius: 6,
} as const;

export const MENU_FONTS = {
  sans: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
} as const;

export const MENU_USER = {
  name: 'Snigdha DS',
  email: 'snigdhads.007@gmail.com',
} as const;

export const MENU_APP_VERSION = 'V1.1.1555';

export type MenuIconVariant =
  | 'default'
  | 'healthConnect';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  iconVariant?: MenuIconVariant;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'health',
    title: 'Your Health',
    items: [
      { id: 'medical-reports', label: 'Medical Reports', icon: 'bar-chart' },
      { id: 'preferences', label: 'Preferences', icon: 'sliders' },
      { id: 'order-history', label: 'Order History', icon: 'shopping-cart' },
      { id: 'my-plan', label: 'My Plan', icon: 'crown' },
      { id: 'health-connect', label: 'Google Health Connect', icon: 'activity', iconVariant: 'healthConnect' },
      { id: 'sense', label: 'Sense', icon: 'activity', iconVariant: 'healthConnect' },
    ],
  },
  {
    id: 'general',
    title: 'General',
    items: [
      { id: 'events', label: 'Events', icon: 'calendar-clock' },
      { id: 'community', label: 'Community', icon: 'users' },
      { id: 'shop', label: 'Shop', icon: 'shopping-bag' },
      { id: 'wellness-assessment', label: 'Wellness Assessment', icon: 'leaf' },
      { id: 'nuggets', label: 'Nuggets', icon: 'file-text' },
    ],
  },
];
