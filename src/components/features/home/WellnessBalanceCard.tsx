import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { HOME_COLORS, HOME_WELLNESS_BALANCE } from '@/constants/home-mock';
import { CircleArrowButton } from './CircleArrowButton';

interface WellnessBalanceCardProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  imageUri?: string;
  onPress?: () => void;
}

export function WellnessBalanceCard({
  title = HOME_WELLNESS_BALANCE.title,
  description = HOME_WELLNESS_BALANCE.description,
  actionLabel = HOME_WELLNESS_BALANCE.actionLabel,
  imageUri = HOME_WELLNESS_BALANCE.imageUri,
  onPress,
}: WellnessBalanceCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          style={styles.actionRow}
        >
          <Text style={styles.actionLabel}>{actionLabel}</Text>
          <CircleArrowButton />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: HOME_COLORS.cardCream,
    borderRadius: 16,
    padding: 16,
    gap: 14,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E8E8E8',
  },
  content: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: HOME_COLORS.textPrimary,
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    color: HOME_COLORS.textBody,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: HOME_COLORS.linkGreen,
    flex: 1,
  },
});
