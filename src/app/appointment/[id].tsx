import { useQuery } from '@tanstack/react-query';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Calendar, MapPin, Stethoscope, Video } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { getAppointment } from '@/lib/api';
import { formatDateTime } from '@/lib/dates';
import { colors, layout, radii, spacing, typography } from '@/lib/theme';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: appointment, isLoading } = useQuery({
    queryKey: ['appointment', id],
    queryFn: () => getAppointment(id!),
    enabled: !!id,
  });

  if (isLoading || !appointment) {
    return <LoadingScreen message="Loading appointment..." />;
  }

  const joinCall = () => {
    if (appointment.meetingUrl) WebBrowser.openBrowserAsync(appointment.meetingUrl);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Card variant="elevated">
        <View style={styles.statusRow}>
          <Badge label={appointment.status} variant="gold" />
          <Badge
            label={appointment.paymentStatus === 'included' ? 'Member included' : appointment.paymentStatus}
            variant="success"
          />
        </View>
        <Text style={styles.title}>{appointment.service?.name}</Text>
        <Text style={styles.practitioner}>
          with {appointment.practitioner?.firstName} {appointment.practitioner?.lastName}
        </Text>
        <Text style={styles.credentials}>{appointment.practitioner?.credentials}</Text>
      </Card>

      <Card variant="sage" style={styles.detailCard}>
        <View style={styles.detailRow}>
          <Calendar size={20} color={colors.primaryGreen} />
          <View>
            <Text style={styles.detailLabel}>Date & time</Text>
            <Text style={styles.detailValue}>{formatDateTime(appointment.startsAt)}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailRow}>
          {appointment.appointmentType === 'virtual' ? (
            <Video size={20} color={colors.primaryGreen} />
          ) : (
            <MapPin size={20} color={colors.primaryGreen} />
          )}
          <View>
            <Text style={styles.detailLabel}>Format</Text>
            <Text style={styles.detailValue}>
              {appointment.appointmentType === 'virtual' ? 'Virtual video call' : 'In-person visit'}
            </Text>
          </View>
        </View>
        {appointment.reasonForVisit ? (
          <>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Stethoscope size={20} color={colors.primaryGreen} />
              <View>
                <Text style={styles.detailLabel}>Reason for visit</Text>
                <Text style={styles.detailValue}>{appointment.reasonForVisit}</Text>
              </View>
            </View>
          </>
        ) : null}
      </Card>

      {appointment.appointmentType === 'virtual' && appointment.meetingUrl ? (
        <Button title="Join video call" onPress={joinCall} fullWidth style={styles.joinBtn} />
      ) : null}

      <Text style={styles.note}>
        Video calls open in your browser for this demo. Native in-app video is planned for production.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  statusRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  title: { ...typography.h2, color: colors.ink },
  practitioner: { ...typography.body, color: colors.mutedText, marginTop: spacing.xs },
  credentials: { ...typography.caption, color: colors.gold, marginTop: 2 },
  detailCard: { marginTop: layout.cardGap },
  detailRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  detailLabel: { ...typography.caption, color: colors.mutedText },
  detailValue: { ...typography.body, color: colors.ink, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  joinBtn: { marginTop: layout.sectionGap },
  note: { ...typography.caption, color: colors.mutedText, marginTop: spacing.md, textAlign: 'center', lineHeight: 18 },
});
