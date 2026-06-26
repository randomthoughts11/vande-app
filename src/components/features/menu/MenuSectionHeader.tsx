import { StyleSheet, Text, View } from 'react-native';
import { MENU_COLORS, MENU_FONTS } from '@/constants/menu-mock';

interface MenuSectionHeaderProps {
  title: string;
}

export function MenuSectionHeader({ title }: MenuSectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: MENU_COLORS.textPrimary,
    fontFamily: MENU_FONTS.sans,
    letterSpacing: -0.2,
  },
});
