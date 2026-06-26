import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Square, CheckSquare } from 'lucide-react-native';
import { INTAKE_COLORS, INTAKE_CONFIDENTIAL_LABEL, INTAKE_FONTS } from '@/constants/intake-mock';

interface ChecklistOption {
  id: string;
  title: string;
  subtitle: string;
}

interface IntakeChecklistQuestionProps {
  confidential?: boolean;
  question: string;
  instruction: string;
  options: ChecklistOption[];
  selected: string[];
  onToggle: (id: string) => void;
}

export function IntakeChecklistQuestion({
  confidential,
  question,
  instruction,
  options,
  selected,
  onToggle,
}: IntakeChecklistQuestionProps) {
  return (
    <View style={styles.container}>
      {confidential ? <Text style={styles.confidential}>{INTAKE_CONFIDENTIAL_LABEL}</Text> : null}
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.instruction}>{instruction}</Text>
      <View style={styles.list}>
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <Pressable
              key={option.id}
              onPress={() => onToggle(option.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isSelected }}
              style={styles.row}
            >
              {isSelected ? (
                <CheckSquare size={22} color={INTAKE_COLORS.primaryGreen} strokeWidth={2} />
              ) : (
                <Square size={22} color={INTAKE_COLORS.border} strokeWidth={2} />
              )}
              <View style={styles.textBlock}>
                <Text style={styles.title}>{option.title}</Text>
                <Text style={styles.subtitle}>{option.subtitle}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  confidential: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: INTAKE_COLORS.accentTerracotta,
    fontFamily: INTAKE_FONTS.sans,
  },
  question: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: INTAKE_COLORS.primaryGreen,
    fontFamily: INTAKE_FONTS.serif,
  },
  instruction: {
    fontSize: 14,
    lineHeight: 21,
    color: INTAKE_COLORS.textSecondary,
    fontFamily: INTAKE_FONTS.sans,
  },
  list: { gap: 12, marginTop: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: INTAKE_COLORS.border,
    backgroundColor: INTAKE_COLORS.card,
  },
  textBlock: { flex: 1, gap: 4 },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: INTAKE_COLORS.textPrimary,
    fontFamily: INTAKE_FONTS.sans,
  },
  subtitle: {
    fontSize: 13,
    color: INTAKE_COLORS.textMuted,
    fontFamily: INTAKE_FONTS.sans,
  },
});
