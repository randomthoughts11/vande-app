import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Send } from 'lucide-react-native';
import {
  AiChatBubble,
  AiConsultHeader,
  AiRecommendationCard,
  VoiceInputButton,
} from '@/components/features/ai-consult';
import {
  AI_CHAT_MESSAGES,
  AI_CONSULT_COLORS,
  AI_CONSULT_DISCLAIMER,
  AI_CONSULT_FONTS,
  AI_CONSULT_SESSIONS,
  AI_NEW_SESSION_ID,
  AI_RECOMMENDATIONS,
  AI_SUGGESTED_PROMPTS,
  type AiChatMessage,
} from '@/constants/ai-consult-mock';

/** AI health consultation chat — placeholder */
export default function AiChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const resolvedId = sessionId ?? AI_NEW_SESSION_ID;

  const session = AI_CONSULT_SESSIONS.find((s) => s.id === resolvedId);
  const title = session?.title ?? 'New AI consultation';

  const initialMessages = useMemo(
    () => AI_CHAT_MESSAGES[resolvedId] ?? AI_CHAT_MESSAGES['ai-session-new']!,
    [resolvedId],
  );

  const [messages, setMessages] = useState<AiChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [isListening, setIsListening] = useState(false);

  const recommendations = AI_RECOMMENDATIONS[resolvedId] ?? [];

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: AiChatMessage = {
      id: `local-${Date.now()}`,
      sessionId: resolvedId,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    const assistantMsg: AiChatMessage = {
      id: `local-${Date.now()}-ai`,
      sessionId: resolvedId,
      role: 'assistant',
      content:
        "Thanks for sharing. I'll reflect on that with your care context — a full AI response will connect here soon. For now, consider noting this for your next clinician visit.",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setDraft('');
  };

  const handleVoicePress = () => {
    if (isListening) {
      setIsListening(false);
      sendMessage('I have been feeling more tired in the afternoons lately.');
      return;
    }
    setIsListening(true);
    Alert.alert(
      'Voice input (placeholder)',
      'Voice capture will connect to speech-to-text in a future release. Tap again to simulate a voice message.',
    );
  };

  return (
    <View style={styles.root}>
      <AiConsultHeader title={title} onBack={() => router.back()} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AiChatBubble message={item} />}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.disclaimer}>{AI_CONSULT_DISCLAIMER}</Text>
              {recommendations.length > 0 ? (
                <View style={styles.recommendations}>
                  <Text style={styles.recTitle}>Personalized for you</Text>
                  {recommendations.map((rec) => (
                    <AiRecommendationCard
                      key={rec.id}
                      recommendation={rec}
                      onAction={() =>
                        Alert.alert(rec.title, 'Action wiring coming soon.')
                      }
                    />
                  ))}
                </View>
              ) : null}
              {messages.length <= 1 ? (
                <View style={styles.prompts}>
                  {AI_SUGGESTED_PROMPTS.map((prompt) => (
                    <Pressable
                      key={prompt}
                      onPress={() => sendMessage(prompt)}
                      style={({ pressed }) => [styles.promptChip, pressed && styles.pressed]}
                    >
                      <Text style={styles.promptText}>{prompt}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </View>
          }
        />

        <View style={[styles.composer, { paddingBottom: insets.bottom + 8 }]}>
          <VoiceInputButton onPress={handleVoicePress} isListening={isListening} />
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Ask about symptoms, habits, or your care plan..."
            placeholderTextColor={AI_CONSULT_COLORS.textMuted}
            style={styles.input}
            multiline
            maxLength={500}
          />
          <Pressable
            onPress={() => sendMessage(draft)}
            style={({ pressed }) => [styles.sendBtn, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Send message"
          >
            <Send size={20} color="#FFFFFF" strokeWidth={2} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AI_CONSULT_COLORS.background,
  },
  flex: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  listHeader: {
    gap: 16,
    marginBottom: 8,
  },
  disclaimer: {
    fontSize: 11,
    color: AI_CONSULT_COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  recommendations: {
    gap: 10,
  },
  recTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: AI_CONSULT_COLORS.primaryGreen,
    fontFamily: AI_CONSULT_FONTS.serif,
  },
  prompts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  promptChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AI_CONSULT_COLORS.border,
    backgroundColor: AI_CONSULT_COLORS.card,
  },
  promptText: {
    fontSize: 13,
    color: AI_CONSULT_COLORS.textSecondary,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: AI_CONSULT_COLORS.border,
    backgroundColor: AI_CONSULT_COLORS.card,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: AI_CONSULT_COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: AI_CONSULT_COLORS.textPrimary,
    backgroundColor: AI_CONSULT_COLORS.background,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AI_CONSULT_COLORS.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.88,
  },
});
