import { Platform } from "react-native";

export const EVENTS_COLORS = {
  background: "#FDFBF7",
  accentPink: "#C05C67",
  accentPinkDark: "#D16B7A",
  accentPinkLight: "#F9E6E9",
  primaryGreen: "#3E4E35",
  textPrimary: "#1A1A1A",
  textBody: "#666666",
  textMuted: "#888888",
  cardWhite: "#FFFFFF",
  border: "#E8E8E8",
  searchPlaceholder: "#999999",
} as const;

export const EVENTS_SPACING = {
  screenX: 20,
  sectionGap: 36,
  cardGap: 20,
  cardRadius: 16,
} as const;

export const EVENTS_FONTS = {
  serif: Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "Georgia",
  }),
  sans: Platform.select({
    ios: "System",
    android: "sans-serif",
    default: "System",
  }),
} as const;

export const EVENTS_HERO = {
  overline: "VANDE EVENTS",
  titleBefore: "Be Part of the ",
  titleHighlight: "VANDE",
  titleAfter: " Experience",
  description:
    "Explore expert-led, evidence-based therapeutic sessions and workshops designed to support your holistic wellness journey.",
  ctaLabel: "Browse Events",
  imageUri:
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=400&fit=crop",
} as const;

export const EVENTS_STATS = [
  { value: "30+", label: "WORKSHOPS" },
  { value: "10+", label: "EXPERT FACILITATORS" },
] as const;

export const EVENTS_SEARCH = {
  title: "Find Your Next Session",
  placeholder: "Search by event name, date etc.",
} as const;

export const EVENTS_UPCOMING = {
  overline: "EXPLORE",
  titleBefore: "Upcoming ",
  titleHighlight: "Events",
  description:
    "Join evidence-based sessions led by certified practitioners — from yoga therapy to mindfulness workshops.",
} as const;

export const EVENTS_YOGA_THERAPY = {
  overline: "YOGA THERAPY",
  titleBefore: "Experience Yoga Therapy at the ",
  titleHighlight: "VANDE Center",
  description:
    "Personalised yoga therapy sessions that integrate breathwork, movement, and mindfulness to restore balance and vitality.",
} as const;

export interface VANDEEventItem {
  id: string;
  title: string;
  facilitator: string;
  dayNumber: string;
  dayLabel: string;
  price: string;
  tag: string;
  tagVariant: "offline" | "virtual";
  imageUri: string;
}

export const VANDE_EVENTS: VANDEEventItem[] = [
  {
    id: "1",
    title: "Inner-child Hatha Yoga",
    facilitator: "With Lakshman",
    dayNumber: "16",
    dayLabel: "Sat Oct 21",
    price: "₹ 1500.00",
    tag: "Offline",
    tagVariant: "offline",
    imageUri:
      "https://images.unsplash.com/photo-1506126613405-07c6dec75130?w=600&h=340&fit=crop",
  },
  {
    id: "2",
    title: "Meditation & Art",
    facilitator: "With Lakshman",
    dayNumber: "18",
    dayLabel: "Sat Oct 21",
    price: "Free",
    tag: "Offline",
    tagVariant: "offline",
    imageUri:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=340&fit=crop",
  },
  {
    id: "3",
    title: "Breathwork for Anxiety",
    facilitator: "With Priya Sharma",
    dayNumber: "22",
    dayLabel: "Wed Oct 25",
    price: "₹ 1200.00",
    tag: "Virtual",
    tagVariant: "virtual",
    imageUri:
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d4?w=600&h=340&fit=crop",
  },
  {
    id: "4",
    title: "Ayurvedic Nutrition Workshop",
    facilitator: "With Dr. Meera Patel",
    dayNumber: "28",
    dayLabel: "Tue Oct 31",
    price: "₹ 2000.00",
    tag: "Offline",
    tagVariant: "offline",
    imageUri:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=340&fit=crop",
  },
];
