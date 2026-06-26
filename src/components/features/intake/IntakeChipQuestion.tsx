import { Pressable, StyleSheet, Text, View } from 'react-native';
import { INTAKE_COLORS, INTAKE_FONTS, INTAKE_SPACING } from '@/constants/intake-mock';

interface IntakeChipSelectProps {
  options: string[];
  selected: string[];
  multiSelect: boolean;
  onToggle: (option: string) => void;
}

export function IntakeChipSelect({ options, selected, multiSelect, onToggle }: IntakeChipSelectProps) {
  return (
    <View style={styles.grid}>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <Pressable
            key={option}
            onPress={() => onToggle(option)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            style={[styles.chip, isSelected && styles.chipSelected]}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

interface IntakeChipQuestionProps {
  question: string;
  instruction: string;
  options: string[];
  selected: string[];
  multiSelect: boolean;
  onToggle: (option: string) => void;
  showWhyAsk?: boolean;
}

export function IntakeChipQuestion({
  question,
  instruction,
  options,
  selected,
  multiSelect,
  onToggle,
}: IntakeChipQuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.instruction}>{instruction}</Text>
      <IntakeChipSelect
        options={options}
        selected={selected}
        multiSelect={multiSelect}
        onToggle={onToggle}
      />
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: INTAKE_SPACING.chipRadius,
    borderWidth: 1,
    borderColor: INTAKE_COLORS.border,
    backgroundColor: INTAKE_COLORS.card,
  },
  chipSelected: {
    borderColor: INTAKE_COLORS.primaryGreen,
    backgroundColor: INTAKE_COLORS.badgeGreenBg,
  },
  chipText: {
    fontSize: 14,
    color: INTAKE_COLORS.textPrimary,
    fontFamily: INTAKE_FONTS.sans,
  },
  chipTextSelected: {
    fontWeight: '600',
    color: INTAKE_COLORS.primaryGreen,
  },
});
