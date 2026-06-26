import { StyleSheet, Text, View } from 'react-native';
import { HOME_COLORS } from '@/constants/home-mock';

interface TodoBadgeProps {
  label?: string;
}

export function TodoBadge({ label = 'To-do' }: TodoBadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: HOME_COLORS.accentOrange,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
