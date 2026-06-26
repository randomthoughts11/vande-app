import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar, Video } from 'lucide-react-native';
import type { Appointment } from '@/types/domain';
import { formatDateTime } from '@/lib/dates';
import { colors, spacing, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress?: () => void;
}

export function AppointmentCard({ appointment, onPress }: AppointmentCardProps) {
  const content = (
  <Card variant="elevated">
      <View style={styles.row}>
        {appointment.appointmentType === 'virtual' ? (
          <Video size={20} color={colors.primaryGreen} />
        ) : (
          <Calendar size={20} color={colors.primaryGreen} />
        )}
        <View style={styles.info}>
          <Text style={styles.service}>{appointment.service?.name ?? 'Consultation'}</Text>
          <Text style={styles.practitioner}>
            {appointment.practitioner?.firstName} {appointment.practitioner?.lastName}
          </Text>
          <Text style={styles.time}>{formatDateTime(appointment.startsAt)}</Text>
        </View>
        <Badge label={appointment.status} variant="gold" />
      </View>
    </Card>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="View appointment">
        {content}
      </Pressable>
    );
  }
  return content;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  info: { flex: 1 },
  service: { ...typography.label, color: colors.ink },
  practitioner: { ...typography.bodySmall, color: colors.mutedText },
  time: { ...typography.caption, color: colors.gold, marginTop: 4 },
});
