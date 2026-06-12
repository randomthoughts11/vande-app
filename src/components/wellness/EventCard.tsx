import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CalendarDays } from 'lucide-react-native';
import type { Event } from '@/types/domain';
import { formatDateTime } from '@/lib/dates';
import { colors, spacing, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export function EventCard({ event, onPress }: EventCardProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={event.title}>
      <Card variant="elevated">
        <View style={styles.header}>
          <CalendarDays size={18} color={colors.primaryGreen} />
          {event.registered ? <Badge label="Registered" variant="success" /> : null}
        </View>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.time}>{formatDateTime(event.startsAt)}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {event.description}
        </Text>
        {event.spotsRemaining != null ? (
          <Text style={styles.spots}>{event.spotsRemaining} spots remaining</Text>
        ) : null}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  title: { ...typography.label, color: colors.ink },
  time: { ...typography.caption, color: colors.gold, marginTop: 2 },
  description: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.xs },
  spots: { ...typography.caption, color: colors.primaryGreen, marginTop: spacing.sm },
});
