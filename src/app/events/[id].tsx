import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getEvent, registerForEvent } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { formatDateTime } from '@/lib/dates';
import { colors, spacing, typography } from '@/lib/theme';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEvent(id!),
    enabled: !!id,
  });

  const registerMutation = useMutation({
    mutationFn: () => registerForEvent(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.events });
      queryClient.invalidateQueries({ queryKey: ['event', id] });
    },
  });

  if (isLoading || !event) {
    return <ActivityIndicator size="large" color={colors.primaryGreen} style={styles.loading} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Card variant="elevated">
        {event.registered ? <Badge label="Registered" variant="success" /> : null}
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.time}>{formatDateTime(event.startsAt)}</Text>
        <Text style={styles.type}>
          {event.isVirtual ? 'Virtual event' : `In person${event.location ? ` · ${event.location}` : ''}`}
        </Text>
        <Text style={styles.description}>{event.description}</Text>
        {event.spotsRemaining != null ? (
          <Text style={styles.spots}>{event.spotsRemaining} spots remaining</Text>
        ) : null}
      </Card>

      {!event.registered ? (
        <Button
          title="Register"
          onPress={() => registerMutation.mutate()}
          loading={registerMutation.isPending}
          fullWidth
          style={styles.registerBtn}
        />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  loading: { flex: 1, marginTop: 100 },
  scroll: { padding: spacing.md },
  title: { ...typography.h2, color: colors.ink, marginTop: spacing.sm },
  time: { ...typography.label, color: colors.gold, marginTop: spacing.sm },
  type: { ...typography.bodySmall, color: colors.mutedText },
  description: { ...typography.body, color: colors.ink, marginTop: spacing.md },
  spots: { ...typography.caption, color: colors.primaryGreen, marginTop: spacing.sm },
  registerBtn: { marginTop: spacing.lg },
});
