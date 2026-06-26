import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MENU_APP_VERSION, MENU_COLORS, MENU_FONTS } from '@/constants/menu-mock';

interface MenuFooterProps {
  onLogout?: () => void;
  version?: string;
}

export function MenuFooter({ onLogout, version = MENU_APP_VERSION }: MenuFooterProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onLogout}
        accessibilityRole="button"
        accessibilityLabel="Log out"
        hitSlop={8}
      >
        <Text style={styles.logout}>Log Out</Text>
      </Pressable>
      <Text style={styles.version}>App Version: {version}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  logout: {
    fontSize: 16,
    fontWeight: '500',
    color: MENU_COLORS.textPrimary,
    textDecorationLine: 'underline',
    fontFamily: MENU_FONTS.sans,
  },
  version: {
    fontSize: 12,
    fontWeight: '400',
    color: MENU_COLORS.textMuted,
    fontFamily: MENU_FONTS.sans,
  },
});
