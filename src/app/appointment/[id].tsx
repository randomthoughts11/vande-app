import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getAppointment } from '@/lib/api';
import { formatDateTime } from '@/lib/dates';
import { colors, spacing, typography } from '@/lib/theme';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: appointment, isLoading } = useQuery({
    queryKey: ['appointment', id],
    queryFn: () => getAppointment(id!),
    enabled: !!id,
  });

  if (isLoading || !appointment) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primaryGreen} />
      </View>
    );
  }

  const joinCall = () => {
    if (appointment.meetingUrl) {
      WebBrowser.openBrowserAsync(appointment.meetingUrl);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Card variant="elevated">
        <Badge label={appointment.status} variant="gold" />
        <Text style={styles.title}>{appointment.service?.name}</Text>
        <Text style={styles.practitioner}>
          with {appointment.practitioner?.firstName} {appointment.practitioner?.lastName}
        </Text>
        <Text style={styles.time}>{formatDateTime(appointment.startsAt)}</Text>
        <Text style={styles.type}>
          {appointment.appointmentType === 'virtual' ? 'Virtual' : 'In-person'}
        </Text>
        {appointment.reasonForVisit ? (
          <Text style={styles.reason}>Reason: {appointment.reasonForVisit}</Text>
        ) : null}
      </Card>

      {appointment.appointmentType === 'virtual' && appointment.meetingUrl ? (
        <Button
          title="Join video call"
          onPress={joinCall}
          fullWidth
          style={styles.joinBtn}
          accessibilityLabel="Join video call"
        />
      ) : null}

      <Text style={styles.note}>
        For MVP, video calls open an external meeting link. Native video coming in a future release.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scroll: { padding: spacing.md },
  title: { ...typography.h2, color: colors.ink, marginTop: spacing.sm },
  practitioner: { ...typography.body, color: colors.mutedText },
  time: { ...typography.label, color: colors.gold, marginTop: spacing.sm },
  type: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.xs },
  reason: { ...typography.bodySmall, color: colors.ink, marginTop: spacing.md },
  joinBtn: { marginTop: spacing.lg },
  note: { ...typography.caption, color: colors.mutedText, marginTop: spacing.md, fontStyle: 'italic' },
});
