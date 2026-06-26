import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MESSAGES_COLORS, MESSAGES_FONTS, MESSAGES_SPACING } from '@/constants/messages-mock';

interface MessagesHeaderProps {
  title?: string;
  onBack?: () => void;
}

export function MessagesHeader({ title = 'Messages', onBack }: MessagesHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Pressable
        onPress={handleBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={12}
        style={styles.backBtn}
      >
        <ArrowLeft size={22} color={MESSAGES_COLORS.textPrimary} strokeWidth={2} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MESSAGES_COLORS.background,
    paddingHorizontal: MESSAGES_SPACING.screenX,
    paddingBottom: 12,
    gap: 8,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: MESSAGES_COLORS.textPrimary,
    fontFamily: MESSAGES_FONTS.sans,
  },
});
