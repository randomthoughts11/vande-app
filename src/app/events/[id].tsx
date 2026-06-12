import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Calendar, MapPin, Users } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { getEvent, registerForEvent } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { formatDateTime } from '@/lib/dates';
import { colors, layout, spacing, typography } from '@/lib/theme';

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
    return <LoadingScreen message="Loading event..." />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Card variant="elevated">
        <View style={styles.badgeRow}>
          <Badge label={event.type.replace('_', ' ')} />
          {event.registered ? <Badge label="Registered" variant="success" /> : null}
        </View>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>{event.description}</Text>
      </Card>

      <Card variant="sage" style={styles.details}>
        <View style={styles.detailRow}>
          <Calendar size={20} color={colors.primaryGreen} />
          <View>
            <Text style={styles.detailLabel}>When</Text>
            <Text style={styles.detailValue}>{formatDateTime(event.startsAt)}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          {event.isVirtual ? (
            <MapPin size={20} color={colors.primaryGreen} />
          ) : (
            <MapPin size={20} color={colors.primaryGreen} />
          )}
          <View>
            <Text style={styles.detailLabel}>Where</Text>
            <Text style={styles.detailValue}>
              {event.isVirtual ? 'Virtual — link sent after registration' : event.location ?? 'TBD'}
            </Text>
          </View>
        </View>
        {event.spotsRemaining != null ? (
          <View style={styles.detailRow}>
            <Users size={20} color={colors.primaryGreen} />
            <View>
              <Text style={styles.detailLabel}>Availability</Text>
              <Text style={styles.detailValue}>{event.spotsRemaining} spots remaining</Text>
            </View>
          </View>
        ) : null}
      </Card>

      {!event.registered ? (
        <Button
          title="Register for event"
          onPress={() => registerMutation.mutate()}
          loading={registerMutation.isPending}
          fullWidth
          style={styles.registerBtn}
        />
      ) : (
        <Card variant="sage" style={styles.registeredCard}>
          <Text style={styles.registeredText}>You&apos;re registered! We&apos;ll send you a reminder before the event.</Text>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  badgeRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  title: { ...typography.h2, color: colors.ink },
  description: { ...typography.body, color: colors.mutedText, marginTop: spacing.md, lineHeight: 22 },
  details: { marginTop: layout.cardGap, gap: spacing.md },
  detailRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  detailLabel: { ...typography.caption, color: colors.mutedText },
  detailValue: { ...typography.body, color: colors.ink, marginTop: 2 },
  registerBtn: { marginTop: layout.sectionGap },
  registeredCard: { marginTop: layout.sectionGap, alignItems: 'center' },
  registeredText: { ...typography.bodySmall, color: colors.deepGreen, textAlign: 'center', lineHeight: 20 },
});
