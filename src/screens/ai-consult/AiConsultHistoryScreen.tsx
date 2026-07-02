import { FlatList, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import {
  AiConsultHeader,
  ConsultationHistoryRow,
} from '@/components/features/ai-consult';
import { aiConsultSessionHref } from '@/lib/ai-consult-navigation';
import {
  AI_CONSULT_COLORS,
  AI_CONSULT_DISCLAIMER,
  AI_CONSULT_FONTS,
  AI_CONSULT_SESSIONS,
  AI_NEW_SESSION_ID,
} from '@/constants/ai-consult-mock';

/** AI consultation history — placeholder */
export default function AiConsultHistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <AiConsultHeader
        title="AI Consultations"
        subtitle="Your wellness conversation history"
        onBack={() => router.back()}
      />

      <View style={styles.banner}>
        <Text style={styles.bannerText}>{AI_CONSULT_DISCLAIMER}</Text>
      </View>

      <FlatList
        data={AI_CONSULT_SESSIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConsultationHistoryRow
            session={item}
            onPress={() => router.push(aiConsultSessionHref(item.id))}
          />
        )}
        contentContainerStyle={{ paddingBottom: insets.bottom + 88 }}
        ListHeaderComponent={
          <Text style={styles.sectionLabel}>Recent consultations</Text>
        }
      />

      <Pressable
        onPress={() => router.push(aiConsultSessionHref(AI_NEW_SESSION_ID))}
        style={({ pressed }) => [
          styles.fab,
          { bottom: insets.bottom + 20 },
          pressed && styles.fabPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Start new AI consultation"
      >
        <Plus size={22} color="#FFFFFF" strokeWidth={2.5} />
        <Text style={styles.fabText}>New consultation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AI_CONSULT_COLORS.background,
  },
  banner: {
    backgroundColor: AI_CONSULT_COLORS.accentMint,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: AI_CONSULT_COLORS.border,
  },
  bannerText: {
    fontSize: 12,
    lineHeight: 17,
    color: AI_CONSULT_COLORS.primaryGreen,
    textAlign: 'center',
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: AI_CONSULT_COLORS.textMuted,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  fab: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: AI_CONSULT_COLORS.primaryDark,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  fabPressed: {
    opacity: 0.92,
  },
  fabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: AI_CONSULT_FONTS.sans,
  },
});
