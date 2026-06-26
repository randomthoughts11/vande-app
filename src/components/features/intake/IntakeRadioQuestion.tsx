import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Circle } from 'lucide-react-native';
import { INTAKE_COLORS, INTAKE_FONTS } from '@/constants/intake-mock';

interface IntakeRadioQuestionProps {
  question: string;
  instruction: string;
  options: string[];
  selected: string | null;
  onSelect: (option: string) => void;
}

export function IntakeRadioQuestion({
  question,
  instruction,
  options,
  selected,
  onSelect,
}: IntakeRadioQuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.instruction}>{instruction}</Text>
      <View style={styles.list}>
        {options.map((option) => {
          const isSelected = selected === option;
          return (
            <Pressable
              key={option}
              onPress={() => onSelect(option)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              style={[styles.row, isSelected && styles.rowSelected]}
            >
              <Circle
                size={20}
                color={isSelected ? INTAKE_COLORS.primaryGreen : INTAKE_COLORS.border}
                fill={isSelected ? INTAKE_COLORS.primaryGreen : 'transparent'}
                strokeWidth={2}
              />
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 14 },
  question: {
    fontSize: 24,
    lineHeight: 32,
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
  list: { gap: 12, marginTop: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: INTAKE_COLORS.border,
    backgroundColor: INTAKE_COLORS.card,
  },
  rowSelected: {
    borderColor: INTAKE_COLORS.primaryGreen,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: INTAKE_COLORS.textSecondary,
    fontFamily: INTAKE_FONTS.sans,
    lineHeight: 21,
  },
});
