import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { MessageTab } from '@/constants/messages-mock';
import { MESSAGES_COLORS, MESSAGES_FONTS, MESSAGES_SPACING } from '@/constants/messages-mock';

interface MessagesTabBarProps {
  activeTab: MessageTab;
  onTabChange: (tab: MessageTab) => void;
  generalBadgeCount?: number;
}

export function MessagesTabBar({
  activeTab,
  onTabChange,
  generalBadgeCount = 2,
}: MessagesTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.tabs}>
        <Pressable
          onPress={() => onTabChange('messages')}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'messages' }}
          style={styles.tab}
        >
          <Text style={[styles.tabLabel, activeTab === 'messages' && styles.tabLabelActive]}>
            Messages
          </Text>
          {activeTab === 'messages' ? <View style={styles.underline} /> : null}
        </Pressable>

        <Pressable
          onPress={() => onTabChange('general')}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'general' }}
          style={styles.tab}
        >
          <View style={styles.tabLabelRow}>
            <Text style={[styles.tabLabel, activeTab === 'general' && styles.tabLabelActive]}>
              General
            </Text>
            {generalBadgeCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{generalBadgeCount}</Text>
              </View>
            ) : null}
          </View>
          {activeTab === 'general' ? <View style={styles.underline} /> : null}
        </Pressable>
      </View>
      <View style={styles.border} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: MESSAGES_COLORS.background,
  },
  tabs: {
    flexDirection: 'row',
    height: MESSAGES_SPACING.tabHeight,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: MESSAGES_COLORS.textMuted,
    fontFamily: MESSAGES_FONTS.sans,
  },
  tabLabelActive: {
    fontWeight: '600',
    color: MESSAGES_COLORS.textPrimary,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: MESSAGES_COLORS.tabActiveUnderline,
    borderRadius: 1.5,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: MESSAGES_COLORS.badgeRed,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: MESSAGES_FONTS.sans,
  },
  border: {
    height: 1,
    backgroundColor: MESSAGES_COLORS.border,
  },
});
