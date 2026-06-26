import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { GeneralNotification } from '@/constants/messages-mock';
import { MESSAGES_COLORS, MESSAGES_FONTS, MESSAGES_SPACING } from '@/constants/messages-mock';

interface GeneralNotificationRowProps {
  notification: GeneralNotification;
  onPress?: () => void;
  onViewMessage?: () => void;
  isLast?: boolean;
}

export function GeneralNotificationRow({
  notification,
  onPress,
  onViewMessage,
  isLast,
}: GeneralNotificationRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={2}>
          {notification.title}
        </Text>
        <View style={styles.rightCol}>
          <Text style={styles.timestamp}>{notification.timestamp}</Text>
          {notification.unread ? <View style={styles.unreadDot} /> : null}
        </View>
      </View>

      <Text style={styles.body}>{notification.body}</Text>

      {notification.showViewButton ? (
        <Pressable
          onPress={onViewMessage}
          accessibilityRole="button"
          accessibilityLabel="View message"
          style={({ pressed }) => [styles.viewBtn, pressed && styles.viewBtnPressed]}
        >
          <Text style={styles.viewBtnText}>View Message</Text>
        </Pressable>
      ) : null}

      {!isLast ? <View style={styles.divider} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: MESSAGES_SPACING.screenX,
    backgroundColor: MESSAGES_COLORS.background,
  },
  pressed: { opacity: 0.95 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: MESSAGES_COLORS.textPrimary,
    lineHeight: 22,
    fontFamily: MESSAGES_FONTS.sans,
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 6,
    minWidth: 72,
  },
  timestamp: {
    fontSize: 12,
    color: MESSAGES_COLORS.textTimestamp,
    fontFamily: MESSAGES_FONTS.sans,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: MESSAGES_COLORS.unreadDot,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    color: MESSAGES_COLORS.textBody,
    fontFamily: MESSAGES_FONTS.sans,
    marginBottom: 12,
  },
  viewBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: MESSAGES_COLORS.textPrimary,
  },
  viewBtnPressed: { opacity: 0.85 },
  viewBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: MESSAGES_COLORS.textPrimary,
    fontFamily: MESSAGES_FONTS.sans,
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: MESSAGES_COLORS.divider,
  },
});
