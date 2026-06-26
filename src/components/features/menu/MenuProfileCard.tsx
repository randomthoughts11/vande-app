import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, User } from 'lucide-react-native';
import { MENU_COLORS, MENU_FONTS, MENU_SPACING, MENU_USER } from '@/constants/menu-mock';

interface MenuProfileCardProps {
  name?: string;
  email?: string;
  onPress?: () => void;
}

export function MenuProfileCard({
  name = MENU_USER.name,
  email = MENU_USER.email,
  onPress,
}: MenuProfileCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Profile, ${name}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.avatar}>
        <User size={28} color="#FFFFFF" strokeWidth={2} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <ChevronRight size={20} color={MENU_COLORS.chevron} strokeWidth={2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MENU_COLORS.profileCard,
    borderRadius: MENU_SPACING.profileRadius,
    padding: 16,
    gap: 14,
  },
  pressed: { opacity: 0.95 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: MENU_COLORS.textPrimary,
    fontFamily: MENU_FONTS.sans,
  },
  email: {
    fontSize: 14,
    fontWeight: '400',
    color: MENU_COLORS.textSecondary,
    fontFamily: MENU_FONTS.sans,
  },
});
