import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Bot, ChevronRight } from 'lucide-react-native';
import type { AiConsultSession } from '@/constants/ai-consult-mock';
import { AI_CONSULT_COLORS, AI_CONSULT_FONTS } from '@/constants/ai-consult-mock';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

interface ConsultationHistoryRowProps {
  session: AiConsultSession;
  onPress?: () => void;
}

export function ConsultationHistoryRow({ session, onPress }: ConsultationHistoryRowProps) {
  const isActive = session.status === 'active';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Open consultation: ${session.title}`}
    >
      <View style={styles.icon}>
        <Bot size={20} color={AI_CONSULT_COLORS.primaryGreen} strokeWidth={2} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {session.title}
          </Text>
          {isActive ? (
            <View style={styles.activeBadge}>
              <Text style={styles.activeText}>Active</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.summary} numberOfLines={2}>
          {session.summary}
        </Text>
        <Text style={styles.meta}>
          {formatDate(session.startedAt)} · {session.messageCount} messages
        </Text>
      </View>

      <ChevronRight size={18} color={AI_CONSULT_COLORS.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: AI_CONSULT_COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: AI_CONSULT_COLORS.border,
  },
  pressed: {
    backgroundColor: '#FAFAFA',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AI_CONSULT_COLORS.accentMint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: AI_CONSULT_COLORS.textPrimary,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  activeBadge: {
    backgroundColor: AI_CONSULT_COLORS.accentMint,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activeText: {
    fontSize: 11,
    fontWeight: '700',
    color: AI_CONSULT_COLORS.primaryGreen,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  summary: {
    fontSize: 13,
    lineHeight: 18,
    color: AI_CONSULT_COLORS.textSecondary,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  meta: {
    fontSize: 12,
    color: AI_CONSULT_COLORS.textMuted,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
});
