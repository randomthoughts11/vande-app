import { Pressable, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { MESSAGES_COLORS, MESSAGES_SPACING } from '@/constants/messages-mock';

interface MessagesFabProps {
  onPress?: () => void;
}

export function MessagesFab({ onPress }: MessagesFabProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="New message"
      style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
    >
      <Plus size={26} color="#FFFFFF" strokeWidth={2.5} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: MESSAGES_SPACING.fabMargin,
    bottom: MESSAGES_SPACING.fabMargin,
    width: MESSAGES_SPACING.fabSize,
    height: MESSAGES_SPACING.fabSize,
    borderRadius: 14,
    backgroundColor: MESSAGES_COLORS.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  pressed: { opacity: 0.9 },
});
