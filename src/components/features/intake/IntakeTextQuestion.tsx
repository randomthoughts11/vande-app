import { StyleSheet, Text, TextInput, View } from 'react-native';
import {
  INTAKE_COLORS,
  INTAKE_CONFIDENTIAL_LABEL,
  INTAKE_FONTS,
  INTAKE_HIPAA,
  INTAKE_SPACING,
} from '@/constants/intake-mock';

interface IntakeTextQuestionProps {
  confidential?: boolean;
  question: string;
  instruction: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function IntakeTextQuestion({
  confidential,
  question,
  instruction,
  placeholder,
  value,
  onChangeText,
}: IntakeTextQuestionProps) {
  return (
    <View style={styles.container}>
      {confidential ? <Text style={styles.confidential}>{INTAKE_CONFIDENTIAL_LABEL}</Text> : null}
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.instruction}>{instruction}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={INTAKE_COLORS.textLight}
        style={styles.input}
        multiline
        textAlignVertical="top"
      />
      <Text style={styles.hipaa}>{INTAKE_HIPAA}</Text>
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
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
    color: INTAKE_COLORS.primaryGreen,
    fontFamily: INTAKE_FONTS.serif,
  },
  instruction: {
    fontSize: 15,
    lineHeight: 22,
    color: INTAKE_COLORS.textMuted,
    fontFamily: INTAKE_FONTS.sans,
  },
  input: {
    borderWidth: 1,
    borderColor: INTAKE_COLORS.inputBorder,
    borderRadius: INTAKE_SPACING.inputRadius,
    padding: 14,
    minHeight: 140,
    fontSize: 15,
    color: INTAKE_COLORS.textPrimary,
    fontFamily: INTAKE_FONTS.sans,
    marginTop: 4,
  },
  hipaa: {
    fontSize: 12,
    color: INTAKE_COLORS.textLight,
    fontFamily: INTAKE_FONTS.sans,
    marginTop: 8,
  },
});
