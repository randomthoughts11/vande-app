import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MessageCircle, Sparkles } from 'lucide-react-native';
import { MoodCheckIn } from '@/components/wellness/MoodCheckIn';
import { TodayPlanCard } from '@/components/wellness/TodayPlanCard';
import { AppointmentCard } from '@/components/wellness/AppointmentCard';
import { ProductCard } from '@/components/wellness/ProductCard';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { createCheckIn, getTodayPlan } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import { openVandeCart } from '@/lib/vandecart';
import { useAppStore } from '@/store/appStore';
import { colors, spacing, typography } from '@/lib/theme';

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

  if (isLoading || !data) {
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
          <Text style={styles.greeting}>{data.greeting}</Text>
          <Text style={styles.subheader}>Your Ayurvedic wellness plan for today</Text>
        </View>

        <Card variant="elevated" style={styles.section}>
          <MoodCheckIn selectedMood={selectedMood} onSelect={handleMoodSelect} />
        </Card>

        <SectionHeader title="Today's balance" subtitle="Your next practices" />
        <TodayPlanCard items={data.items} />

        {data.upcomingAppointment ? (
          <>
            <SectionHeader title="Upcoming appointment" />
            <AppointmentCard
              appointment={data.upcomingAppointment}
              onPress={() => router.push(`/appointment/${data.upcomingAppointment!.id}`)}
            />
          </>
        ) : null}

        {data.messagePreview ? (
          <Pressable onPress={() => router.push('/chat')} accessibilityRole="button">
            <Card variant="sage" style={styles.messageCard}>
              <View style={styles.messageRow}>
                <MessageCircle size={20} color={colors.primaryGreen} />
                <View style={styles.messageContent}>
                  <Text style={styles.messageTitle}>Ask your care team</Text>
                  <Text style={styles.messagePreview} numberOfLines={2}>{data.messagePreview}</Text>
                </View>
              </View>
            </Card>
          </Pressable>
        ) : null}

        <Card style={styles.tipCard}>
          <View style={styles.tipRow}>
            <Sparkles size={20} color={colors.gold} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>For your balance today</Text>
              <Text style={styles.tipText}>{data.tip}</Text>
            </View>
          </View>
        </Card>

        {data.recommendedProduct ? (
          <>
            <SectionHeader title="Recommended from VandeCart" />
            <ProductCard
              product={data.recommendedProduct}
              compact
              onPress={() => router.push(`/products/${data.recommendedProduct!.id}`)}
              onOpenCart={() => openVandeCart(data.recommendedProduct!.productUrl)}
            />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.warmCream },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: {
    backgroundColor: colors.deepGreen,
    marginHorizontal: -spacing.md,
    marginTop: -spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: { ...typography.h1, color: colors.warmCream, fontSize: 26 },
  subheader: { ...typography.bodySmall, color: colors.sage, marginTop: spacing.xs },
  section: { marginBottom: spacing.sm },
  messageCard: { marginTop: spacing.md },
  messageRow: { flexDirection: 'row', gap: spacing.sm },
  messageContent: { flex: 1 },
  messageTitle: { ...typography.label, color: colors.deepGreen },
  messagePreview: { ...typography.bodySmall, color: colors.mutedText, marginTop: 2 },
  tipCard: { marginTop: spacing.md },
  tipRow: { flexDirection: 'row', gap: spacing.sm },
  tipContent: { flex: 1 },
  tipTitle: { ...typography.label, color: colors.gold },
  tipText: { ...typography.bodySmall, color: colors.ink, marginTop: 4 },
});
