import { StyleSheet, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { INTAKE_COLORS, INTAKE_FONTS } from '@/constants/intake-mock';

interface ConfirmationHeaderProps {
  title: string;
  subtitle: string;
}

/** Curved mint header with success checkmark */
export function ConfirmationHeader({ title, subtitle }: ConfirmationHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.curve}>
        <View style={styles.iconCircle}>
          <Check size={28} color="#FFFFFF" strokeWidth={3} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: INTAKE_COLORS.headerMint,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    overflow: 'hidden',
    paddingBottom: 32,
  },
  curve: {
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: INTAKE_COLORS.successGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: INTAKE_COLORS.textPrimary,
    textAlign: 'center',
    fontFamily: INTAKE_FONTS.sans,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: INTAKE_COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: INTAKE_FONTS.sans,
    paddingHorizontal: 16,
  },
});
