import { useQuery } from '@tanstack/react-query';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen, Clock, Play } from 'lucide-react-native';
import { EventCard } from '@/components/wellness/EventCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { PageHeader } from '@/components/ui/PageHeader';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getContentItems, getEvents } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import type { ContentType } from '@/types/domain';
import { colors, layout, radii, spacing, typography } from '@/lib/theme';

const CATEGORIES = [
  'Courses',
  'Webinars',
  'Yoga videos',
  'Ayurveda basics',
  'Nutrition and recipes',
];

const TYPE_ICONS: Record<ContentType, typeof BookOpen> = {
  article: BookOpen,
  video: Play,
  course: BookOpen,
  event: BookOpen,
  webinar: Play,
};

export default function LearnScreen() {
  const router = useRouter();

  const { data: content, isLoading: loadingContent } = useQuery({
    queryKey: QUERY_KEYS.content,
    queryFn: getContentItems,
  });

  const { data: events, isLoading: loadingEvents } = useQuery({
    queryKey: QUERY_KEYS.events,
    queryFn: getEvents,
  });

  if (loadingContent || loadingEvents) {
    return <LoadingScreen message="Loading courses and events..." />;
  }

  const inProgress = content?.filter((c) => (c.progress ?? 0) > 0) ?? [];

  return (
    <Screen>
      <PageHeader
        title="Learn"
        subtitle="Courses, webinars, and Ayurvedic education"
      />

      {inProgress.length > 0 ? (
        <View style={styles.section}>
          <SectionHeader title="Continue learning" />
          {inProgress.map((item) => (
            <ContentCard key={item.id} item={item} onPress={() => router.push(`/content/${item.id}`)} />
          ))}
        </View>
      ) : null}

      {CATEGORIES.map((category) => {
        const items = content?.filter((c) => c.category === category) ?? [];
        if (items.length === 0) return null;
        return (
          <View key={category} style={styles.section}>
            <SectionHeader title={category} subtitle={`${items.length} available`} />
            {items.map((item) => (
              <ContentCard key={item.id} item={item} onPress={() => router.push(`/content/${item.id}`)} />
            ))}
          </View>
        );
      })}

      <View style={styles.section}>
        <SectionHeader title="Events & retreats" subtitle="Live sessions and workshops" />
        {events?.map((event) => (
          <View key={event.id} style={styles.eventWrap}>
            <EventCard event={event} onPress={() => router.push(`/events/${event.id}`)} />
          </View>
        ))}
      </View>
    </Screen>
  );
}

function ContentCard({
  item,
  onPress,
}: {
  item: { id: string; title: string; description: string; type: ContentType; durationMinutes?: number; progress?: number };
  onPress: () => void;
}) {
  const Icon = TYPE_ICONS[item.type] ?? BookOpen;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={styles.contentWrap}>
      <Card variant="elevated">
        <View style={styles.contentRow}>
          <View style={styles.contentIcon}>
            <Icon size={20} color={colors.primaryGreen} />
          </View>
          <View style={styles.contentBody}>
            <View style={styles.contentHeader}>
              <Badge label={item.type} />
              {item.progress != null && item.progress > 0 ? (
                <Text style={styles.progress}>{item.progress}%</Text>
              ) : null}
            </View>
            <Text style={styles.contentTitle}>{item.title}</Text>
            <Text style={styles.contentDesc} numberOfLines={2}>{item.description}</Text>
            {item.durationMinutes ? (
              <View style={styles.durationRow}>
                <Clock size={12} color={colors.gold} />
                <Text style={styles.duration}>{item.durationMinutes} min</Text>
              </View>
            ) : null}
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: layout.sectionGap },
  contentWrap: { marginBottom: layout.cardGap },
  contentRow: { flexDirection: 'row', gap: spacing.md },
  contentIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBody: { flex: 1 },
  contentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  contentTitle: { ...typography.label, color: colors.ink, marginTop: spacing.xs },
  contentDesc: { ...typography.bodySmall, color: colors.mutedText, marginTop: 4, lineHeight: 20 },
  durationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.xs },
  duration: { ...typography.caption, color: colors.gold },
  progress: { ...typography.caption, color: colors.primaryGreen, fontWeight: '700' },
  eventWrap: { marginBottom: layout.cardGap },
});
