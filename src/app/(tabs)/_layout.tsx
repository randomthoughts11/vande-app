import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { CalendarDays, Home, Menu, Store } from 'lucide-react-native';
import { EVENTS_COLORS } from '@/constants/events-mock';
import { MENU_COLORS } from '@/constants/menu-mock';
import { colors, typography } from '@/lib/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryGreen,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Events',
          tabBarActiveTintColor: EVENTS_COLORS.accentPink,
          tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="consult"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => <Store color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Menu',
          tabBarActiveTintColor: MENU_COLORS.textPrimary,
          tabBarIcon: ({ color, size }) => <Menu color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 88 : 64,
    paddingTop: 6,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },
  tabLabel: {
    ...typography.caption,
    fontWeight: '600',
    marginTop: 2,
    fontSize: 11,
  },
});
