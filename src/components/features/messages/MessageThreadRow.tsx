import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { MessageThread } from '@/constants/messages-mock';
import { MESSAGES_COLORS, MESSAGES_FONTS, MESSAGES_SPACING } from '@/constants/messages-mock';

interface MessageThreadRowProps {
  thread: MessageThread;
  onPress?: () => void;
  isLast?: boolean;
}

export function MessageThreadRow({ thread, onPress, isLast }: MessageThreadRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Message from ${thread.sender}`}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.topRow}>
        <Text style={styles.sender} numberOfLines={1}>
          {thread.sender}
        </Text>
        <Text style={styles.timestamp}>{thread.timestamp}</Text>
      </View>
      <Text style={styles.subject} numberOfLines={1}>
        {thread.subject}
      </Text>
      <Text style={styles.preview} numberOfLines={2}>
        {thread.preview}
      </Text>
      {!isLast ? <View style={styles.divider} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: MESSAGES_SPACING.itemPaddingY,
    paddingHorizontal: MESSAGES_SPACING.screenX,
    backgroundColor: MESSAGES_COLORS.background,
  },
  pressed: { opacity: 0.95 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    gap: 12,
  },
  sender: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: MESSAGES_COLORS.textSecondary,
    fontFamily: MESSAGES_FONTS.sans,
  },
  timestamp: {
    fontSize: 12,
    color: MESSAGES_COLORS.textTimestamp,
    fontFamily: MESSAGES_FONTS.sans,
  },
  subject: {
    fontSize: 16,
    fontWeight: '700',
    color: MESSAGES_COLORS.textPrimary,
    marginBottom: 6,
    fontFamily: MESSAGES_FONTS.sans,
  },
  preview: {
    fontSize: 14,
    lineHeight: 20,
    color: MESSAGES_COLORS.textBody,
    fontFamily: MESSAGES_FONTS.sans,
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: MESSAGES_SPACING.screenX,
    right: MESSAGES_SPACING.screenX,
    height: 1,
    backgroundColor: MESSAGES_COLORS.divider,
  },
});
