import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MOOD_OPTIONS } from '@/constants';
import { colors, radii, spacing, typography } from '@/lib/theme';

interface MoodCheckInProps {
  selectedMood?: string | null;
  onSelect: (moodId: string) => void;
}

export function MoodCheckIn({ selectedMood, onSelect }: MoodCheckInProps) {
  return (
    <View>
      <Text style={styles.title}>How are you feeling today?</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {MOOD_OPTIONS.map((mood) => {
          const selected = selectedMood === mood.id;
          return (
            <Pressable
              key={mood.id}
              onPress={() => onSelect(mood.id)}
              accessibilityRole="button"
              accessibilityLabel={`Mood: ${mood.label}`}
              accessibilityState={{ selected }}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              <Text style={[styles.label, selected && styles.labelSelected]}>{mood.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.label, color: colors.ink, marginBottom: spacing.sm },
  scroll: { marginHorizontal: -4 },
  chip: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginHorizontal: 4,
    borderRadius: radii.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 80,
  },
  chipSelected: {
    backgroundColor: colors.sage,
    borderColor: colors.primaryGreen,
  },
  emoji: { fontSize: 24, marginBottom: 4 },
  label: { ...typography.caption, color: colors.mutedText, textAlign: 'center' },
  labelSelected: { color: colors.deepGreen, fontWeight: '600' },
});
