import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { INTAKE_COLORS, INTAKE_FONTS } from '@/constants/intake-mock';

export function IntakeExpandable({ title = 'Why we ask this' }: { title?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Pressable
      onPress={() => setOpen(!open)}
      accessibilityRole="button"
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
      <Plus size={18} color={INTAKE_COLORS.textPrimary} strokeWidth={2} />
      {open ? (
        <Text style={styles.body}>
          This helps your care team understand patterns and tailor recommendations to your history.
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: INTAKE_COLORS.expandBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: INTAKE_COLORS.textPrimary,
    fontFamily: INTAKE_FONTS.sans,
    flex: 1,
  },
  body: {
    width: '100%',
    fontSize: 13,
    color: INTAKE_COLORS.textSecondary,
    marginTop: 10,
    lineHeight: 20,
    fontFamily: INTAKE_FONTS.sans,
  },
});
