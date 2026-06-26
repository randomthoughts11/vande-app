import { StyleSheet, View } from 'react-native';
import { Activity } from 'lucide-react-native';
import { MENU_COLORS, MENU_SPACING } from '@/constants/menu-mock';

export function MenuHealthIcon() {
  return (
    <View style={styles.wrap}>
      <Activity size={18} color="#FFFFFF" strokeWidth={2.5} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 32,
    height: 32,
    borderRadius: MENU_SPACING.healthIconRadius,
    backgroundColor: MENU_COLORS.iconGreenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
