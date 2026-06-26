/**
 * VANDE screen 7–8 — health concern selection grid
 */
import { PageHeader } from "@/components/layout/PageHeader";
import { Screen } from "@/components/layout/Screen";
import { HEALTH_CONCERNS } from "@/constants";
import { cardVariants, layout, spacing, typography } from "@/lib/theme";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";

interface ConcernSelectScreenProps {
  onSelect?: (concernId: string) => void;
}

export default function ConcernSelectScreen({
  onSelect,
}: ConcernSelectScreenProps) {
  return (
    <Screen>
      <PageHeader
        title="What concern would you like to focus on?"
        subtitle="Choose the area you'd like support with"
      />
      <FlatList
        data={HEALTH_CONCERNS}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Pressable
            style={[cardVariants.grid, styles.card]}
            onPress={() => onSelect?.(item.id)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <Text style={[styles.label, { color: item.color }]}>
              {item.label}
            </Text>
          </Pressable>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { gap: layout.gridGap },
  row: { gap: layout.gridGap },
  card: { flex: 1 },
  label: {
    ...typography.label,
    textAlign: "center",
    paddingHorizontal: spacing.sm,
  },
});
