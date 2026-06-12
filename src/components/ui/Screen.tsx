import { ScrollView, StyleSheet, View, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/lib/theme';

interface ScreenProps extends ScrollViewProps {
  children: React.ReactNode;
  padded?: boolean;
  scroll?: boolean;
}

export function Screen({ children, padded = true, scroll = true, contentContainerStyle, ...props }: ScreenProps) {
  const paddingStyle = padded ? styles.padded : undefined;

  if (!scroll) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={[styles.flex, paddingStyle]}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={[styles.scroll, paddingStyle, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.warmCream },
  flex: { flex: 1 },
  scroll: { paddingBottom: spacing.xxl },
  padded: { paddingHorizontal: spacing.md },
});
