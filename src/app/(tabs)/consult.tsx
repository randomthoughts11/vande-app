import { useQuery } from '@tanstack/react-query';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Sparkles, Video } from 'lucide-react-native';
import { aiConsultHref } from '@/lib/ai-consult-navigation';
import { PractitionerCard } from '@/components/features/wellness/PractitionerCard';
import { AppointmentCard } from '@/components/features/wellness/AppointmentCard';
import { Card } from '@/components/ui/Card';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { PageHeader } from '@/components/ui/PageHeader';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { getAppointments, getPractitioners, getServices } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { colors, layout, radii, spacing, typography } from '@/lib/theme';

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
    return <LoadingScreen message="Loading consultations..." />;
  }

  return (
    <Screen>
      <PageHeader
        title="Consult"
        subtitle="Book virtual or in-person Ayurvedic consultations"
      />

      <Pressable
        onPress={() => router.push(aiConsultHref())}
        accessibilityRole="button"
        style={styles.heroCta}
      >
        <Card variant="elevated" style={styles.aiCard}>
          <View style={styles.heroContent}>
            <View style={[styles.heroIcon, styles.aiIcon]}>
              <Sparkles size={24} color={colors.gold} />
            </View>
            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>AI health consultation</Text>
              <Text style={styles.heroDesc}>Chat with your wellness guide — voice or text</Text>
            </View>
            <Text style={styles.heroArrow}>→</Text>
          </View>
        </Card>
      </Pressable>

      <Pressable
        onPress={() => router.push('/appointment/book')}
        accessibilityRole="button"
        style={styles.heroCta}
      >
        <Card variant="sage" style={styles.heroCard}>
          <View style={styles.heroContent}>
            <View style={styles.heroIcon}>
              <Video size={24} color={colors.primaryGreen} />
            </View>
            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>Book a consultation</Text>
              <Text style={styles.heroDesc}>Same-week virtual appointments available</Text>
            </View>
            <Text style={styles.heroArrow}>→</Text>
          </View>
        </Card>
      </Pressable>

      <SectionHeader title="Consultation services" subtitle="Choose what fits your needs" />
      {services?.map((service) => (
        <Pressable
          key={service.id}
          onPress={() => router.push({ pathname: '/appointment/book', params: { serviceId: service.id } })}
          style={styles.serviceWrap}
        >
          <Card variant="elevated">
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Badge
                label={service.priceCents === 0 ? 'Included' : `$${(service.priceCents / 100).toFixed(0)}`}
                variant={service.priceCents === 0 ? 'success' : 'gold'}
              />
            </View>
            <Text style={styles.serviceDesc}>{service.description}</Text>
            <View style={styles.serviceMeta}>
              <Clock size={14} color={colors.mutedText} />
              <Text style={styles.serviceMetaText}>{service.durationMinutes} minutes</Text>
              <Text style={styles.serviceDot}>·</Text>
              <Text style={styles.serviceMetaText}>
                {service.type === 'both' ? 'Virtual or in-person' : service.type === 'virtual' ? 'Virtual' : 'In-person'}
              </Text>
            </View>
          </Card>
        </Pressable>
      ))}

      <SectionHeader title="Our practitioners" subtitle="BAMS, MD Ayurveda & wellness experts" />
      {practitioners?.map((p) => (
        <View key={p.id} style={styles.practitionerWrap}>
          <PractitionerCard
            practitioner={p}
            onBook={() => router.push({ pathname: '/appointment/book', params: { practitionerId: p.id } })}
          />
        </View>
      ))}

      <SectionHeader
        title="Your appointments"
        subtitle={appointments?.length ? `${appointments.length} scheduled` : 'None yet'}
      />
      {appointments && appointments.length > 0 ? (
        appointments.map((appt) => (
          <View key={appt.id} style={styles.apptWrap}>
            <AppointmentCard
              appointment={appt}
              onPress={() => router.push(`/appointment/${appt.id}`)}
            />
          </View>
        ))
      ) : (
        <Card style={styles.emptyAppt}>
          <Text style={styles.emptyText}>No appointments yet. Book your first consultation above.</Text>
        </Card>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCta: { marginBottom: layout.sectionGap },
  aiCard: { borderColor: colors.gold, borderWidth: 1 },
  aiIcon: { backgroundColor: colors.warmCream },
  heroCard: { borderColor: colors.primaryGreen, borderWidth: 1 },
  heroContent: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: { flex: 1 },
  heroTitle: { ...typography.h3, color: colors.deepGreen },
  heroDesc: { ...typography.caption, color: colors.mutedText, marginTop: 2 },
  heroArrow: { ...typography.h2, color: colors.primaryGreen },
  serviceWrap: { marginBottom: layout.cardGap },
  serviceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.sm },
  serviceName: { ...typography.label, color: colors.ink, flex: 1 },
  serviceDesc: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.xs, lineHeight: 20 },
  serviceMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.sm },
  serviceMetaText: { ...typography.caption, color: colors.mutedText },
  serviceDot: { color: colors.mutedText },
  practitionerWrap: { marginBottom: layout.cardGap },
  apptWrap: { marginBottom: layout.cardGap },
  emptyAppt: { alignItems: 'center', paddingVertical: spacing.lg },
  emptyText: { ...typography.bodySmall, color: colors.mutedText, textAlign: 'center' },
});
