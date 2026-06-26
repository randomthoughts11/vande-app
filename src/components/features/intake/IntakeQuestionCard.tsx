import { StyleSheet, View, type ViewProps } from 'react-native';
import { INTAKE_COLORS, INTAKE_SPACING } from '@/constants/intake-mock';

export function IntakeQuestionCard({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: INTAKE_COLORS.card,
    borderRadius: INTAKE_SPACING.cardRadius,
    padding: INTAKE_SPACING.cardPadding,
    marginHorizontal: INTAKE_SPACING.screenX,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
});
