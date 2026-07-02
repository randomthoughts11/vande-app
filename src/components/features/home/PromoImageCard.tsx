import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { HOME_COLORS } from '@/constants/home-mock';
import { CircleArrowButton } from './CircleArrowButton';

interface PromoImageCardProps {
  title: string;
  description: string;
  actionLabel: string;
  imageUri: string;
  onPress?: () => void;
}

export function PromoImageCard({ title, description, actionLabel, imageUri, onPress }: PromoImageCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
    >
      <ImageBackground source={{ uri: imageUri }} style={styles.image} imageStyle={styles.imageRadius}>
        <View style={styles.overlay}>
          <View style={styles.textBlock}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.actionRow}>
            <Text style={styles.actionLabel}>{actionLabel}</Text>
            <CircleArrowButton />
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.95 },
  image: {
    width: '100%',
    height: 160,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 16,
  },
  overlay: {
    padding: 16,
    paddingTop: 48,
    backgroundColor: 'rgba(0,0,0,0.42)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  textBlock: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
});
