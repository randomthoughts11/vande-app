import { useQuery } from '@tanstack/react-query';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { BookOpen, Clock, Play } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { getContentItem } from '@/lib/api';
import { colors, layout, radii, spacing, typography } from '@/lib/theme';

export default function ContentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: content, isLoading } = useQuery({
    queryKey: ['content', id],
    queryFn: () => getContentItem(id!),
    enabled: !!id,
  });

  if (isLoading || !content) {
    return <LoadingScreen message="Loading content..." />;
  }

  const Icon = content.type === 'video' || content.type === 'webinar' ? Play : BookOpen;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <View style={styles.hero}>
        <Icon size={48} color={colors.gold} />
        <Badge label={content.type} variant="gold" />
      </View>

      <Card variant="elevated">
        <Text style={styles.category}>{content.category}</Text>
        <Text style={styles.title}>{content.title}</Text>
        {content.durationMinutes ? (
          <View style={styles.durationRow}>
            <Clock size={14} color={colors.mutedText} />
            <Text style={styles.duration}>{content.durationMinutes} minutes</Text>
          </View>
        ) : null}
        <Text style={styles.description}>{content.description}</Text>

        {content.progress != null && content.progress > 0 ? (
          <View style={styles.progressSection}>
            <ProgressRing progress={content.progress} size={64} />
            <View>
              <Text style={styles.progressLabel}>Your progress</Text>
              <Text style={styles.progressValue}>{content.progress}% complete</Text>
            </View>
          </View>
        ) : null}
      </Card>

      <Button title="Continue learning" variant="secondary" fullWidth style={styles.cta} />
      <Text style={styles.note}>
        Full playback and paid content checkout will be available in a future release.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  hero: {
    height: 140,
    backgroundColor: colors.sage,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: layout.cardGap,
    borderWidth: 1,
    borderColor: colors.lightGold,
  },
  category: { ...typography.caption, color: colors.gold, fontWeight: '600', textTransform: 'uppercase' },
  title: { ...typography.h2, color: colors.ink, marginTop: spacing.xs },
  durationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.sm },
  duration: { ...typography.bodySmall, color: colors.mutedText },
  description: { ...typography.body, color: colors.mutedText, marginTop: spacing.md, lineHeight: 22 },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  progressLabel: { ...typography.label, color: colors.ink },
  progressValue: { ...typography.caption, color: colors.primaryGreen, marginTop: 2 },
  cta: { marginTop: layout.sectionGap },
  note: { ...typography.caption, color: colors.mutedText, marginTop: spacing.md, textAlign: 'center', lineHeight: 18 },
});
