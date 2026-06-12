import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStripePayment } from '@/lib/use-stripe';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Calendar, MapPin, Video } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { SelectableCard } from '@/components/ui/SelectableCard';
import { Card } from '@/components/ui/Card';
import { bookAppointment, getPractitioners, getServices } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { processPayment } from '@/lib/stripe';
import { colors, layout, spacing, typography } from '@/lib/theme';

export default function BookAppointmentScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useLocalSearchParams<{ practitionerId?: string; serviceId?: string }>();
  const { initPaymentSheet, presentPaymentSheet } = useStripePayment();

  const [serviceId, setServiceId] = useState(params.serviceId ?? '');
  const [practitionerId, setPractitionerId] = useState(params.practitionerId ?? '');
  const [appointmentType, setAppointmentType] = useState<'virtual' | 'in_person'>('virtual');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: services } = useQuery({ queryKey: ['services'], queryFn: getServices });
  const { data: practitioners } = useQuery({ queryKey: ['practitioners'], queryFn: getPractitioners });

  useEffect(() => {
    if (params.serviceId) setServiceId(params.serviceId);
    if (params.practitionerId) setPractitionerId(params.practitionerId);
  }, [params.serviceId, params.practitionerId]);

  const selectedService = services?.find((s) => s.id === serviceId);
  const selectedPractitioner = practitioners?.find((p) => p.id === practitionerId);
  const canBook = serviceId && practitionerId && reason.trim().length > 0;

  const handleBook = async () => {
    if (!canBook) {
      Alert.alert('Missing information', 'Please select a service, practitioner, and reason for visit.');
      return;
    }

    setLoading(true);
    try {
      if (selectedService && selectedService.priceCents > 0) {
        const paid = await processPayment(
          { initPaymentSheet, presentPaymentSheet },
          selectedService.priceCents,
          { serviceId, type: 'appointment' },
        );
        if (!paid) {
          setLoading(false);
          return;
        }
      }

      const startsAt = new Date(Date.now() + 3 * 86400000).toISOString();
      const appointment = await bookAppointment({
        serviceId,
        practitionerId,
        appointmentType,
        startsAt,
        reasonForVisit: reason,
      });

      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.appointments });
      Alert.alert('Booked!', 'Your consultation has been scheduled.', [
        { text: 'View', onPress: () => router.replace(`/appointment/${appointment.id}`) },
      ]);
    } catch (e) {
      Alert.alert('Booking failed', e instanceof Error ? e.message : 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <Card variant="sage" style={styles.summary}>
        <Text style={styles.summaryTitle}>Book your consultation</Text>
        <Text style={styles.summaryDesc}>Choose a service, practitioner, and share what you&apos;d like to discuss.</Text>
      </Card>

      <Text style={styles.sectionLabel}>1. Select service</Text>
      {services?.map((s) => (
        <SelectableCard
          key={s.id}
          title={s.name}
          subtitle={s.description}
          meta={`${s.durationMinutes} min · ${s.priceCents === 0 ? 'Included' : `$${(s.priceCents / 100).toFixed(0)}`}`}
          selected={serviceId === s.id}
          onPress={() => setServiceId(s.id)}
        />
      ))}

      <Text style={styles.sectionLabel}>2. Visit type</Text>
      <View style={styles.typeRow}>
        <SelectableCard
          title="Virtual"
          subtitle="Video consultation from home"
          selected={appointmentType === 'virtual'}
          onPress={() => setAppointmentType('virtual')}
        />
      </View>
      <View style={styles.typeRow}>
        <SelectableCard
          title="In-person"
          subtitle="Visit a Vande wellness center"
          selected={appointmentType === 'in_person'}
          onPress={() => setAppointmentType('in_person')}
        />
      </View>

      <Text style={styles.sectionLabel}>3. Select practitioner</Text>
      {practitioners?.map((p) => (
        <SelectableCard
          key={p.id}
          title={`${p.firstName} ${p.lastName}`}
          subtitle={p.specialty}
          meta={p.credentials}
          selected={practitionerId === p.id}
          onPress={() => setPractitionerId(p.id)}
        />
      ))}

      <Text style={styles.sectionLabel}>4. Reason for visit</Text>
      <TextField
        label="What would you like to discuss?"
        placeholder="e.g. sleep issues, digestion, stress management..."
        value={reason}
        onChangeText={setReason}
        multiline
      />

      {selectedService && selectedPractitioner ? (
        <Card variant="elevated" style={styles.confirmCard}>
          <Text style={styles.confirmTitle}>Booking summary</Text>
          <View style={styles.confirmRow}>
            <Calendar size={16} color={colors.primaryGreen} />
            <Text style={styles.confirmText}>{selectedService.name}</Text>
          </View>
          <View style={styles.confirmRow}>
            {appointmentType === 'virtual' ? (
              <Video size={16} color={colors.primaryGreen} />
            ) : (
              <MapPin size={16} color={colors.primaryGreen} />
            )}
            <Text style={styles.confirmText}>
              {appointmentType === 'virtual' ? 'Virtual' : 'In-person'} with {selectedPractitioner.firstName} {selectedPractitioner.lastName}
            </Text>
          </View>
        </Card>
      ) : null}

      <Button
        title={selectedService?.priceCents ? `Confirm · $${(selectedService.priceCents / 100).toFixed(0)}` : 'Confirm booking'}
        onPress={handleBook}
        loading={loading}
        disabled={!canBook}
        fullWidth
        style={styles.confirmBtn}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  summary: { marginBottom: layout.sectionGap, borderColor: colors.primaryGreen },
  summaryTitle: { ...typography.h3, color: colors.deepGreen },
  summaryDesc: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.xs, lineHeight: 20 },
  sectionLabel: { ...typography.label, color: colors.ink, marginBottom: spacing.sm, marginTop: spacing.md },
  typeRow: { marginBottom: 0 },
  confirmCard: { marginTop: spacing.md, marginBottom: spacing.md },
  confirmTitle: { ...typography.label, color: colors.gold, marginBottom: spacing.sm },
  confirmRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs },
  confirmText: { ...typography.bodySmall, color: colors.ink, flex: 1 },
  confirmBtn: { marginTop: spacing.sm },
});
