import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, ChevronRight, MessageCircle, Sparkles } from 'lucide-react-native';
import { MoodCheckIn } from '@/components/wellness/MoodCheckIn';
import { TodayPlanCard } from '@/components/wellness/TodayPlanCard';
import { AppointmentCard } from '@/components/wellness/AppointmentCard';
import { ProductCard } from '@/components/wellness/ProductCard';
import { Card } from '@/components/ui/Card';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { PageHeader } from '@/components/ui/PageHeader';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { createCheckIn, getTodayPlan } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { openVandeCart } from '@/lib/vandecart';
import { useAppStore } from '@/store/appStore';
import { colors, layout, spacing, typography } from '@/lib/theme';

export default function TodayScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { selectedMood, setSelectedMood } = useAppStore();

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.todayPlan,
    queryFn: getTodayPlan,
  });

  const checkInMutation = useMutation({
    mutationFn: (mood: string) => createCheckIn(mood),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todayPlan }),
  });

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    checkInMutation.mutate(moodId);
  };

  if (isLoading || !data) return <LoadingScreen />;

  const completedToday = data.items.filter((i) => i.status === 'completed').length;

  return (
    <Screen>
      <PageHeader
        title={data.greeting}
        subtitle="Your Ayurvedic wellness plan for today"
      />

      <Card variant="elevated" style={styles.block}>
        <MoodCheckIn selectedMood={selectedMood} onSelect={handleMoodSelect} />
        {selectedMood ? (
          <Text style={styles.moodSaved}>Check-in saved — thank you for sharing</Text>
        ) : null}
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{data.items.length}</Text>
          <Text style={styles.statLabel}>Practices today</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{completedToday}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </Card>
      </View>

      <SectionHeader title="Today's balance" subtitle="Your next practices" />
      <TodayPlanCard items={data.items} />

      {data.upcomingAppointment ? (
        <View style={styles.block}>
          <SectionHeader
            title="Upcoming appointment"
            actionLabel="View all"
            onAction={() => router.push('/(tabs)/consult')}
          />
          <AppointmentCard
            appointment={data.upcomingAppointment}
            onPress={() => router.push(`/appointment/${data.upcomingAppointment!.id}`)}
          />
        </View>
      ) : (
        <Card variant="sage" style={styles.block}>
          <View style={styles.emptyAppt}>
            <Calendar size={22} color={colors.primaryGreen} />
            <View style={styles.emptyApptText}>
              <Text style={styles.emptyApptTitle}>No upcoming visits</Text>
              <Text style={styles.emptyApptDesc}>Book a consultation with your practitioner</Text>
            </View>
            <Pressable onPress={() => router.push('/appointment/book')}>
              <Badge label="Book" variant="gold" />
            </Pressable>
          </View>
        </Card>
      )}

      {data.messagePreview ? (
        <Pressable onPress={() => router.push('/chat')} style={styles.block} accessibilityRole="button">
          <Card variant="sage">
            <View style={styles.messageRow}>
              <View style={styles.messageIcon}>
                <MessageCircle size={20} color={colors.primaryGreen} />
              </View>
              <View style={styles.messageContent}>
                <Text style={styles.messageTitle}>Ask your care team</Text>
                <Text style={styles.messagePreview} numberOfLines={2}>{data.messagePreview}</Text>
              </View>
              <ChevronRight size={20} color={colors.mutedText} />
            </View>
          </Card>
        </Pressable>
      ) : null}

      <Card variant="elevated" style={styles.block}>
        <View style={styles.tipRow}>
          <View style={styles.tipIcon}>
            <Sparkles size={20} color={colors.gold} />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>For your balance today</Text>
            <Text style={styles.tipText}>{data.tip}</Text>
          </View>
        </View>
      </Card>

      {data.recommendedProduct ? (
        <View style={styles.block}>
          <SectionHeader title="Recommended from VandeCart" subtitle="Practitioner-guided wellness" />
          <ProductCard
            product={data.recommendedProduct}
            compact
            onPress={() => router.push(`/products/${data.recommendedProduct!.id}`)}
            onOpenCart={() => openVandeCart(data.recommendedProduct!.productUrl)}
          />
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: layout.sectionGap },
  moodSaved: { ...typography.caption, color: colors.success, marginTop: spacing.sm, textAlign: 'center' },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: layout.sectionGap },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: spacing.md },
  statValue: { ...typography.h2, color: colors.primaryGreen },
  statLabel: { ...typography.caption, color: colors.mutedText, marginTop: 2 },
  emptyAppt: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  emptyApptText: { flex: 1 },
  emptyApptTitle: { ...typography.label, color: colors.deepGreen },
  emptyApptDesc: { ...typography.caption, color: colors.mutedText },
  messageRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  messageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContent: { flex: 1 },
  messageTitle: { ...typography.label, color: colors.deepGreen },
  messagePreview: { ...typography.bodySmall, color: colors.mutedText, marginTop: 2 },
  tipRow: { flexDirection: 'row', gap: spacing.md },
  tipIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipContent: { flex: 1 },
  tipTitle: { ...typography.label, color: colors.gold },
  tipText: { ...typography.bodySmall, color: colors.ink, marginTop: 4, lineHeight: 20 },
});
