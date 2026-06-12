import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Paperclip, Send } from 'lucide-react-native';
import { getMessages, sendMessage } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { formatRelative } from '@/lib/dates';
import { colors, radii, spacing, typography } from '@/lib/theme';

export default function ChatDetailScreen() {
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const queryClient = useQueryClient();
  const [text, setText] = useState('');
  const listRef = useRef<FlatList>(null);

  const { data: messages, isLoading } = useQuery({
    queryKey: QUERY_KEYS.messages(threadId!),
    queryFn: () => getMessages(threadId!),
    enabled: !!threadId,
    refetchInterval: 5000,
  });

  const sendMutation = useMutation({
    mutationFn: (body: string) => sendMessage(threadId!, body),
    onSuccess: () => {
      setText('');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.messages(threadId!) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.threads });
    },
  });

  useEffect(() => {
    if (messages?.length) {
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages?.length]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Text style={styles.disclaimer}>
        This is not emergency support. For emergencies, call your local emergency number.
      </Text>

      <FlatList
        ref={listRef}
        style={styles.messages}
        contentContainerStyle={styles.messageList}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.isOwn ? styles.ownBubble : styles.theirBubble]}>
            {!item.isOwn ? <Text style={styles.sender}>{item.senderName}</Text> : null}
            <Text style={[styles.body, item.isOwn && styles.ownBody]}>{item.body}</Text>
            <Text style={[styles.time, item.isOwn && styles.ownTime]}>
              {formatRelative(item.createdAt)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          !isLoading ? <Text style={styles.empty}>Start a conversation with your care team.</Text> : null
        }
      />

      <View style={styles.inputRow}>
        <Pressable
          style={styles.attachBtn}
          accessibilityLabel="Attach file"
          accessibilityRole="button"
        >
          <Paperclip size={20} color={colors.mutedText} />
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={colors.mutedText}
          value={text}
          onChangeText={setText}
          multiline
          accessibilityLabel="Message input"
        />
        <Pressable
          onPress={() => text.trim() && sendMutation.mutate(text.trim())}
          style={styles.sendBtn}
          accessibilityLabel="Send message"
          accessibilityRole="button"
        >
          <Send size={20} color={colors.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  disclaimer: {
    ...typography.caption,
    color: colors.warning,
    backgroundColor: '#FFF3E0',
    padding: spacing.sm,
    textAlign: 'center',
  },
  messages: { flex: 1 },
  messageList: { padding: spacing.md },
  bubble: {
    maxWidth: '80%',
    padding: spacing.sm,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
  },
  ownBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primaryGreen,
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 4,
  },
  sender: { ...typography.caption, color: colors.gold, marginBottom: 2 },
  body: { ...typography.bodySmall, color: colors.ink },
  ownBody: { color: colors.white },
  time: { ...typography.caption, color: colors.mutedText, marginTop: 4, fontSize: 10 },
  ownTime: { color: colors.sage },
  empty: { ...typography.bodySmall, color: colors.mutedText, textAlign: 'center', marginTop: spacing.xl },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
    gap: spacing.sm,
  },
  attachBtn: { padding: spacing.sm },
  input: {
    flex: 1,
    ...typography.body,
    maxHeight: 100,
    paddingVertical: spacing.sm,
    color: colors.ink,
  },
  sendBtn: {
    backgroundColor: colors.primaryGreen,
    padding: spacing.sm,
    borderRadius: radii.full,
  },
});
