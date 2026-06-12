import { useQuery } from '@tanstack/react-query';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MessageCircle } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { getThreads } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { formatRelative } from '@/lib/dates';
import { colors, layout, radii, spacing, typography } from '@/lib/theme';

export default function ChatListScreen() {
  const router = useRouter();

  const { data: threads, isLoading } = useQuery({
    queryKey: QUERY_KEYS.threads,
    queryFn: getThreads,
  });

  if (isLoading) return <LoadingScreen message="Loading messages..." />;

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.list}
      data={threads}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>Not for emergencies</Text>
          <Text style={styles.disclaimerText}>
            For urgent medical needs, call your local emergency number immediately.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/chat/${item.id}`)} accessibilityRole="button">
        <Card variant="elevated" style={styles.thread}>
          <View style={styles.threadHeader}>
            <View style={styles.threadIcon}>
              <MessageCircle size={20} color={colors.primaryGreen} />
            </View>
            <View style={styles.threadInfo}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.category}>{item.category.replace('_', ' ')}</Text>
            </View>
            {item.unreadCount > 0 ? (
              <Badge label={`${item.unreadCount}`} variant="gold" />
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
  list: { padding: spacing.md, paddingBottom: spacing.xxl },
  disclaimer: {
    backgroundColor: '#FFF8E7',
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: layout.sectionGap,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  disclaimerTitle: { ...typography.label, color: colors.warning },
  disclaimerText: { ...typography.bodySmall, color: colors.ink, marginTop: 4, lineHeight: 20 },
  thread: { marginBottom: layout.cardGap },
  threadHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  threadIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  threadInfo: { flex: 1 },
  subject: { ...typography.label, color: colors.ink },
  category: { ...typography.caption, color: colors.mutedText, textTransform: 'capitalize' },
  preview: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.sm, lineHeight: 20 },
  time: { ...typography.caption, color: colors.gold, marginTop: spacing.xs },
});
