import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { getContentItem } from '@/lib/api';
import { colors, spacing, typography } from '@/lib/theme';

export default function ContentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: content, isLoading } = useQuery({
    queryKey: ['content', id],
    queryFn: () => getContentItem(id!),
    enabled: !!id,
  });

  if (isLoading || !content) {
    return <ActivityIndicator size="large" color={colors.primaryGreen} style={styles.loading} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Card variant="elevated">
        <Badge label={content.type} />
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.category}>{content.category}</Text>
        {content.durationMinutes ? (
          <Text style={styles.duration}>{content.durationMinutes} minutes</Text>
        ) : null}
        <Text style={styles.description}>{content.description}</Text>
        {content.progress != null && content.progress > 0 ? (
          <View style={styles.progress}>
            <ProgressRing progress={content.progress} />
            <Text style={styles.progressLabel}>Your progress</Text>
          </View>
        ) : null}
      </Card>
      <Text style={styles.note}>
        Full course playback and paid content checkout will be available in a future release.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  loading: { flex: 1, marginTop: 100 },
  scroll: { padding: spacing.md },
  title: { ...typography.h2, color: colors.ink, marginTop: spacing.sm },
  category: { ...typography.caption, color: colors.gold },
  duration: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.xs },
  description: { ...typography.body, color: colors.ink, marginTop: spacing.md },
  progress: { alignItems: 'center', marginTop: spacing.lg },
  progressLabel: { ...typography.caption, color: colors.mutedText, marginTop: spacing.sm },
  note: { ...typography.caption, color: colors.mutedText, marginTop: spacing.lg, fontStyle: 'italic' },
});
