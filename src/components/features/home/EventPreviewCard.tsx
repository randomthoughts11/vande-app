import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { HOME_COLORS, HOME_EVENT } from '@/constants/home-mock';

interface EventPreviewCardProps {
  title?: string;
  dateTime?: string;
  location?: string;
  imageUri?: string;
  onPress?: () => void;
}

export function EventPreviewCard({
  title = HOME_EVENT.title,
  dateTime = HOME_EVENT.dateTime,
  location = HOME_EVENT.location,
  imageUri = HOME_EVENT.imageUri,
  onPress,
}: EventPreviewCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.metaRow}>
          <Calendar size={14} color={HOME_COLORS.textBody} strokeWidth={2} />
          <Text style={styles.metaText}>{dateTime}</Text>
        </View>
        <View style={styles.metaRow}>
          <MapPin size={14} color={HOME_COLORS.textBody} strokeWidth={2} />
          <Text style={styles.metaText} numberOfLines={1}>
            {location}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: HOME_COLORS.cardWhite,
    borderRadius: 16,
    padding: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: { opacity: 0.95 },
  image: {
    width: 88,
    height: 88,
    borderRadius: 12,
    backgroundColor: '#EEE',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: HOME_COLORS.textPrimary,
    lineHeight: 22,
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: HOME_COLORS.textBody,
    flex: 1,
  },
});
