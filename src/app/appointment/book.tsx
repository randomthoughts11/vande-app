import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStripe } from '@stripe/stripe-react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Card } from '@/components/ui/Card';
import { bookAppointment, getPractitioners, getServices } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { processPayment } from '@/lib/stripe';
import { colors, radii, spacing, typography } from '@/lib/theme';

export default function BookAppointmentScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useLocalSearchParams<{ practitionerId?: string }>();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [serviceId, setServiceId] = useState('');
  const [practitionerId, setPractitionerId] = useState(params.practitionerId ?? '');
  const [appointmentType, setAppointmentType] = useState<'virtual' | 'in_person'>('virtual');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: services } = useQuery({ queryKey: ['services'], queryFn: getServices });
  const { data: practitioners } = useQuery({ queryKey: ['practitioners'], queryFn: getPractitioners });

  const selectedService = services?.find((s) => s.id === serviceId);

  const handleBook = async () => {
    if (!serviceId || !practitionerId || !reason.trim()) {
      Alert.alert('Missing information', 'Please complete all fields.');
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
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.label}>Select service</Text>
      {services?.map((s) => (
        <Pressable key={s.id} onPress={() => setServiceId(s.id)} accessibilityRole="radio" accessibilityState={{ selected: serviceId === s.id }}>
          <Card style={[styles.option, serviceId === s.id && styles.optionSelected]}>
            <Text style={styles.optionTitle}>{s.name}</Text>
            <Text style={styles.optionMeta}>
              ${(s.priceCents / 100).toFixed(0)} · {s.durationMinutes} min
            </Text>
          </Card>
        </Pressable>
      ))}

      <Text style={styles.label}>Virtual or in-person</Text>
      <View style={styles.row}>
        {(['virtual', 'in_person'] as const).map((t) => (
          <Button
            key={t}
            title={t === 'virtual' ? 'Virtual' : 'In-person'}
            variant={appointmentType === t ? 'primary' : 'outline'}
            onPress={() => setAppointmentType(t)}
            style={styles.typeBtn}
          />
        ))}
      </View>

      <Text style={styles.label}>Select practitioner</Text>
      {practitioners?.map((p) => (
        <Pressable key={p.id} onPress={() => setPractitionerId(p.id)} accessibilityRole="radio" accessibilityState={{ selected: practitionerId === p.id }}>
          <Card style={[styles.option, practitionerId === p.id && styles.optionSelected]}>
            <Text style={styles.optionTitle}>
              {p.firstName} {p.lastName}
            </Text>
            <Text style={styles.optionMeta}>{p.specialty}</Text>
          </Card>
        </Pressable>
      ))}

      <TextField
        label="Reason for visit"
        placeholder="Describe what you'd like to discuss"
        value={reason}
        onChangeText={setReason}
        multiline
      />

      <Button title="Confirm booking" onPress={handleBook} loading={loading} fullWidth />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  label: { ...typography.label, color: colors.ink, marginTop: spacing.md, marginBottom: spacing.sm },
  option: { marginBottom: spacing.sm },
  optionSelected: { borderColor: colors.primaryGreen, borderWidth: 2 },
  optionTitle: { ...typography.label, color: colors.ink },
  optionMeta: { ...typography.caption, color: colors.mutedText },
  row: { flexDirection: 'row', gap: spacing.sm },
  typeBtn: { flex: 1 },
});
