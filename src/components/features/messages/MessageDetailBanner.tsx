import { StyleSheet, Text, View } from 'react-native';
import { MESSAGES_COLORS, MESSAGES_FONTS } from '@/constants/messages-mock';

interface MessageDetailBannerProps {
  subject: string;
}

export function MessageDetailBanner({ subject }: MessageDetailBannerProps) {
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>{subject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: MESSAGES_COLORS.bannerGreen,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: MESSAGES_COLORS.divider,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: MESSAGES_COLORS.textPrimary,
    fontFamily: MESSAGES_FONTS.sans,
  },
});
