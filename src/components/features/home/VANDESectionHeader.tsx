import { HOME_COLORS } from "@/constants/home-mock";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface VANDESectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function VANDESectionHeader({
  title,
  actionLabel = "View All",
  onAction,
}: VANDESectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onAction ? (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          hitSlop={8}
        >
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: HOME_COLORS.textPrimary,
    letterSpacing: -0.3,
    flex: 1,
  },
  action: {
    fontSize: 13,
    fontWeight: "500",
    color: HOME_COLORS.viewAll,
    marginLeft: 12,
  },
});
