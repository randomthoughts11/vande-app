import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft, Bot } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AI_CONSULT_COLORS, AI_CONSULT_FONTS } from '@/constants/ai-consult-mock';

interface AiConsultHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
}

export function AiConsultHeader({
  title = 'AI Health Guide',
  subtitle = 'Wellness support · not medical diagnosis',
  onBack,
}: AiConsultHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={12} accessibilityRole="button" accessibilityLabel="Go back">
            <ArrowLeft size={22} color={AI_CONSULT_COLORS.textPrimary} strokeWidth={2} />
          </Pressable>
        ) : (
          <View style={styles.backSpacer} />
        )}

        <View style={styles.center}>
          <View style={styles.icon}>
            <Bot size={18} color={AI_CONSULT_COLORS.primaryGreen} strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>

        <View style={styles.backSpacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AI_CONSULT_COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: AI_CONSULT_COLORS.border,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backSpacer: {
    width: 28,
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AI_CONSULT_COLORS.accentMint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: AI_CONSULT_COLORS.textPrimary,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
  subtitle: {
    fontSize: 11,
    color: AI_CONSULT_COLORS.textMuted,
    fontFamily: AI_CONSULT_FONTS.sans,
  },
});
