import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Activity,
  BarChart3,
  CalendarClock,
  ChevronRight,
  Crown,
  FileText,
  Leaf,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Users,
  type LucideIcon,
} from 'lucide-react-native';
import type { MenuItem } from '@/constants/menu-mock';
import { MENU_COLORS, MENU_FONTS, MENU_SPACING } from '@/constants/menu-mock';
import { MenuHealthIcon } from './MenuHealthIcon';

const ICON_MAP: Record<string, LucideIcon> = {
  'bar-chart': BarChart3,
  sliders: SlidersHorizontal,
  'shopping-cart': ShoppingCart,
  crown: Crown,
  activity: Activity,
  'calendar-clock': CalendarClock,
  users: Users,
  'shopping-bag': ShoppingBag,
  leaf: Leaf,
  'file-text': FileText,
};

interface MenuListItemProps {
  item: MenuItem;
  onPress?: () => void;
}

export function MenuListItem({ item, onPress }: MenuListItemProps) {
  const isHealthConnect = item.iconVariant === 'healthConnect';
  const Icon = ICON_MAP[item.icon] ?? FileText;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={item.label}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {isHealthConnect ? (
        <MenuHealthIcon />
      ) : (
        <View style={styles.iconWrap}>
          <Icon size={20} color={MENU_COLORS.iconGreen} strokeWidth={2} />
        </View>
      )}

      <Text style={styles.label}>{item.label}</Text>

      <ChevronRight size={18} color={MENU_COLORS.chevron} strokeWidth={2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MENU_COLORS.background,
    borderRadius: MENU_SPACING.itemRadius,
    borderWidth: 1,
    borderColor: MENU_COLORS.border,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 14,
  },
  pressed: { opacity: 0.95 },
  iconWrap: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: MENU_COLORS.textPrimary,
    fontFamily: MENU_FONTS.sans,
  },
});
