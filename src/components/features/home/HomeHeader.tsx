import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Bell, Leaf } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HOME_COLORS } from '@/constants/home-mock';
import { useAuthStore } from '@/store/authStore';

interface HomeHeaderProps {
  userName?: string;
  onNotificationPress?: () => void;
}

export function HomeHeader({ userName, onNotificationPress }: HomeHeaderProps) {
  const insets = useSafeAreaInsets();
  const profileFirstName = useAuthStore((state) => state.profile?.firstName);
  const displayName = userName ?? profileFirstName ?? 'there';

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.row}>
        <View style={styles.greeting}>
          <View style={styles.leafWrap}>
            <Leaf size={14} color="#A8D5A2" fill="#A8D5A2" strokeWidth={1.5} />
          </View>
          <Text style={styles.greetingText}>Hi {displayName}!</Text>
        </View>

        <Pressable
          onPress={onNotificationPress}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          hitSlop={12}
          style={styles.bellWrap}
        >
          <Bell size={22} color="#FFFFFF" strokeWidth={2} />
          <View style={styles.notificationDot} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: HOME_COLORS.headerGreen,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leafWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  bellWrap: {
    position: 'relative',
    padding: 4,
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
    borderWidth: 1.5,
    borderColor: HOME_COLORS.headerGreen,
  },
});
