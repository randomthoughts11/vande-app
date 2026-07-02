import { StyleSheet, Text, View } from 'react-native';
import type { AiChatMessage } from '@/constants/ai-consult-mock';
import { AI_CONSULT_COLORS, AI_CONSULT_FONTS } from '@/constants/ai-consult-mock';

interface AiChatBubbleProps {
  message: AiChatMessage;
}

export function AiChatBubble({ message }: AiChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.wrap, isUser ? styles.userWrap : styles.assistantWrap]}>
      {!isUser ? <Text style={styles.agentLabel}>Vande AI</Text> : null}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.assistantText]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 12,
    maxWidth: '88%',
  },
  userWrap: {
    alignSelf: 'flex-end',
  },
  assistantWrap: {
    alignSelf: 'flex-start',
  },
  agentLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: AI_CONSULT_COLORS.textMuted,
    marginBottom: 4,
    marginLeft: 4,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  bubble: {
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  userBubble: {
    backgroundColor: AI_CONSULT_COLORS.userBubble,
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: AI_CONSULT_COLORS.assistantBubble,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: AI_CONSULT_COLORS.border,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  userText: {
    color: '#FFFFFF',
  },
  assistantText: {
    color: AI_CONSULT_COLORS.textPrimary,
  },
});
