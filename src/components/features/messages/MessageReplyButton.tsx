import { Pressable, StyleSheet, Text } from 'react-native';
import { Reply } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MESSAGES_COLORS, MESSAGES_FONTS } from '@/constants/messages-mock';

interface MessageReplyButtonProps {
  onPress?: () => void;
}

export function MessageReplyButton({ onPress }: MessageReplyButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Reply"
      style={({ pressed }) => [
        styles.button,
        { bottom: insets.bottom + 24 },
        pressed && styles.pressed,
      ]}
    >
      <Reply size={18} color="#FFFFFF" strokeWidth={2.5} />
      <Text style={styles.label}>Reply</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: MESSAGES_COLORS.replyGreen,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  pressed: { opacity: 0.9 },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: MESSAGES_FONTS.sans,
  },
});
