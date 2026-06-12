import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { EventCard } from '@/components/wellness/EventCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getContentItems, getEvents } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { colors, spacing, typography } from '@/lib/theme';

const CATEGORIES = [
  'Courses',
  'Webinars',
  'Yoga videos',
  'Ayurveda basics',
  'Nutrition and recipes',
  'Events and retreats',
];

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
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primaryGreen} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Learn</Text>
          <Text style={styles.subtitle}>Courses, webinars, and wellness education</Text>
        </View>

        {CATEGORIES.filter((c) => c !== 'Events and retreats').map((category) => {
          const items = content?.filter((c) => c.category === category) ?? [];
          if (items.length === 0) return null;
          return (
            <View key={category}>
              <SectionHeader title={category} />
              {items.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => router.push(`/content/${item.id}`)}
                  accessibilityRole="button"
                >
                  <Card style={styles.contentCard}>
                    <View style={styles.contentHeader}>
                      <Badge label={item.type} />
                      {item.progress != null && item.progress > 0 ? (
                        <Text style={styles.progress}>{item.progress}% complete</Text>
                      ) : null}
                    </View>
                    <Text style={styles.contentTitle}>{item.title}</Text>
                    <Text style={styles.contentDesc} numberOfLines={2}>{item.description}</Text>
                    {item.durationMinutes ? (
                      <Text style={styles.duration}>{item.durationMinutes} min</Text>
                    ) : null}
                  </Card>
                </Pressable>
              ))}
            </View>
          );
        })}

        <SectionHeader title="Events and retreats" />
        {events?.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => router.push(`/events/${event.id}`)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.md },
  title: { ...typography.h1, color: colors.deepGreen, fontSize: 24 },
  subtitle: { ...typography.bodySmall, color: colors.mutedText },
  contentCard: { marginBottom: spacing.sm },
  contentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  contentTitle: { ...typography.label, color: colors.ink, marginTop: spacing.xs },
  contentDesc: { ...typography.bodySmall, color: colors.mutedText, marginTop: 4 },
  duration: { ...typography.caption, color: colors.gold, marginTop: spacing.xs },
  progress: { ...typography.caption, color: colors.primaryGreen },
});
