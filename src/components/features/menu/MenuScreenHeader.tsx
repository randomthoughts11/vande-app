import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MENU_COLORS, MENU_FONTS, MENU_SPACING } from '@/constants/menu-mock';

export function MenuScreenHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <Text style={styles.title}>Menu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MENU_COLORS.background,
    paddingHorizontal: MENU_SPACING.screenX,
    paddingBottom: MENU_SPACING.headerBottom,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: MENU_COLORS.textPrimary,
    fontFamily: MENU_FONTS.sans,
    letterSpacing: -0.3,
  },
});
