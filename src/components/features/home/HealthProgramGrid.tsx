import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { HOME_PROGRAMS, HOME_SPACING } from '@/constants/home-mock';

const GRID_GAP = 12;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH - HOME_SPACING.screenX * 2 - GRID_GAP) / 2;

interface HealthProgramGridProps {
  onProgramPress?: (id: string) => void;
}

export function HealthProgramGrid({ onProgramPress }: HealthProgramGridProps) {
  return (
    <View style={styles.grid}>
      {HOME_PROGRAMS.map((program) => (
          <Pressable
            key={program.id}
            onPress={() => onProgramPress?.(program.id)}
            accessibilityRole="button"
            accessibilityLabel={program.label}
            style={({ pressed }) => [
              styles.item,
              { backgroundColor: program.bg },
              pressed && styles.pressed,
            ]}
          >
            <View style={[styles.iconWrap, { backgroundColor: program.iconBg }]}>
              <View style={[styles.iconDot, { backgroundColor: program.color }]} />
            </View>
            <Text style={[styles.label, { color: program.color }]} numberOfLines={3}>
              {program.label}
            </Text>
          </Pressable>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  item: {
    width: ITEM_WIDTH,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 130,
    gap: 12,
  },
  pressed: { opacity: 0.9 },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
});
