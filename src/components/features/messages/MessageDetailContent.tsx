import { StyleSheet, Text, View } from 'react-native';
import { MESSAGES_COLORS, MESSAGES_FONTS } from '@/constants/messages-mock';

interface MessageDetailContentProps {
  sender: string;
  role: string;
  timestamp: string;
  body: string;
}

export function MessageDetailContent({ sender, role, timestamp, body }: MessageDetailContentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sender}>{sender}</Text>
      <Text style={styles.role}>{role}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
    gap: 6,
  },
  sender: {
    fontSize: 18,
    fontWeight: '700',
    color: MESSAGES_COLORS.textPrimary,
    fontFamily: MESSAGES_FONTS.sans,
  },
  role: {
    fontSize: 14,
    color: MESSAGES_COLORS.textPrimary,
    fontFamily: MESSAGES_FONTS.sans,
  },
  timestamp: {
    fontSize: 12,
    color: '#757575',
    fontFamily: MESSAGES_FONTS.sans,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    fontFamily: MESSAGES_FONTS.sans,
  },
});
