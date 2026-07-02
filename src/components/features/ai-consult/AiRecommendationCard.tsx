import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import type { AiRecommendation } from '@/constants/ai-consult-mock';
import { AI_CONSULT_COLORS, AI_CONSULT_FONTS } from '@/constants/ai-consult-mock';

const CATEGORY_LABELS: Record<AiRecommendation['category'], string> = {
  nutrition: 'Nutrition',
  movement: 'Movement',
  sleep: 'Sleep',
  supplement: 'Supplement',
  lifestyle: 'Lifestyle',
};

interface AiRecommendationCardProps {
  recommendation: AiRecommendation;
  onAction?: () => void;
}

/** Placeholder card for AI-generated wellness recommendations */
export function AiRecommendationCard({ recommendation, onAction }: AiRecommendationCardProps) {
  const priorityColor =
    recommendation.priority === 'high'
      ? AI_CONSULT_COLORS.highPriority
      : AI_CONSULT_COLORS.textMuted;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Sparkles size={16} color={AI_CONSULT_COLORS.primaryGreen} strokeWidth={2} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.overline}>AI RECOMMENDATION</Text>
          <Text style={styles.category}>{CATEGORY_LABELS[recommendation.category]}</Text>
        </View>
        <Text style={[styles.priority, { color: priorityColor }]}>
          {recommendation.priority.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.title}>{recommendation.title}</Text>
      <Text style={styles.description}>{recommendation.description}</Text>

      {recommendation.actionLabel ? (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Text style={styles.actionText}>{recommendation.actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AI_CONSULT_COLORS.recommendationBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: AI_CONSULT_COLORS.border,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AI_CONSULT_COLORS.accentMint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  overline: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: AI_CONSULT_COLORS.textMuted,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: AI_CONSULT_COLORS.primaryGreen,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  priority: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: AI_CONSULT_COLORS.textPrimary,
    fontFamily: AI_CONSULT_FONTS.serif,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: AI_CONSULT_COLORS.textSecondary,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  action: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: AI_CONSULT_COLORS.primaryGreen,
  },
  pressed: {
    opacity: 0.9,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: AI_CONSULT_FONTS.sans,
  },
});
