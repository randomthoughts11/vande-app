import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { PractitionerCard } from '@/components/wellness/PractitionerCard';
import { AppointmentCard } from '@/components/wellness/AppointmentCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAppointments, getPractitioners, getServices } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { colors, spacing, typography } from '@/lib/theme';

export default function ConsultScreen() {
  const router = useRouter();

  const { data: services, isLoading: loadingServices } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  const { data: practitioners, isLoading: loadingPractitioners } = useQuery({
    queryKey: ['practitioners'],
    queryFn: getPractitioners,
  });

  const { data: appointments } = useQuery({
    queryKey: QUERY_KEYS.appointments,
    queryFn: getAppointments,
  });

  if (loadingServices || loadingPractitioners) {
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
          <Text style={styles.title}>Consult</Text>
          <Text style={styles.subtitle}>Book your next Ayurvedic consultation</Text>
        </View>

        <Button
          title="Book consultation"
          onPress={() => router.push('/appointment/book')}
          fullWidth
          accessibilityLabel="Book consultation"
        />

        <SectionHeader title="Consultation services" />
        {services?.map((service) => (
          <Card key={service.id} style={styles.serviceCard}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDesc}>{service.description}</Text>
            <Text style={styles.serviceMeta}>
              {service.durationMinutes} min · ${(service.priceCents / 100).toFixed(0)}
            </Text>
          </Card>
        ))}

        <SectionHeader title="Our practitioners" />
        {practitioners?.map((p) => (
          <PractitionerCard
            key={p.id}
            practitioner={p}
            onBook={() => router.push({ pathname: '/appointment/book', params: { practitionerId: p.id } })}
          />
        ))}

        {appointments && appointments.length > 0 ? (
          <>
            <SectionHeader title="Your appointments" />
            {appointments.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                onPress={() => router.push(`/appointment/${appt.id}`)}
              />
            ))}
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.sm },
  header: { marginBottom: spacing.md },
  title: { ...typography.h1, color: colors.deepGreen, fontSize: 24 },
  subtitle: { ...typography.bodySmall, color: colors.mutedText },
  serviceCard: { marginBottom: spacing.sm },
  serviceName: { ...typography.label, color: colors.ink },
  serviceDesc: { ...typography.bodySmall, color: colors.mutedText, marginTop: 4 },
  serviceMeta: { ...typography.caption, color: colors.gold, marginTop: spacing.xs },
});
