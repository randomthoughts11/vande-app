import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MessageCircle } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getThreads } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { formatRelative } from '@/lib/dates';
import { colors, spacing, typography } from '@/lib/theme';

export default function ChatListScreen() {
  const router = useRouter();

  const { data: threads, isLoading } = useQuery({
    queryKey: QUERY_KEYS.threads,
    queryFn: getThreads,
  });

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primaryGreen} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.list}
      data={threads}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.disclaimer}>
          This is not emergency support. For emergencies, call your local emergency number.
        </Text>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/chat/${item.id}`)}
          accessibilityRole="button"
          accessibilityLabel={`Open chat: ${item.subject}`}
        >
          <Card style={styles.thread}>
            <View style={styles.threadHeader}>
              <MessageCircle size={20} color={colors.primaryGreen} />
              <Text style={styles.subject}>{item.subject}</Text>
              {item.unreadCount > 0 ? (
                <Badge label={`${item.unreadCount} new`} variant="gold" />
              ) : null}
            </View>
            {item.lastMessage ? (
              <Text style={styles.preview} numberOfLines={2}>{item.lastMessage}</Text>
            ) : null}
            {item.lastMessageAt ? (
              <Text style={styles.time}>{formatRelative(item.lastMessageAt)}</Text>
            ) : null}
          </Card>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: spacing.md },
  disclaimer: {
    ...typography.caption,
    color: colors.warning,
    backgroundColor: '#FFF3E0',
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  thread: { marginBottom: spacing.sm },
  threadHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  subject: { ...typography.label, color: colors.ink, flex: 1 },
  preview: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.xs },
  time: { ...typography.caption, color: colors.mutedText, marginTop: 4 },
});
