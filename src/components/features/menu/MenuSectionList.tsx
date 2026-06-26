import { StyleSheet, View } from 'react-native';
import type { MenuSection } from '@/constants/menu-mock';
import { MENU_SPACING } from '@/constants/menu-mock';
import { MenuListItem } from './MenuListItem';
import { MenuSectionHeader } from './MenuSectionHeader';

interface MenuSectionListProps {
  section: MenuSection;
  onItemPress?: (sectionId: string, itemId: string) => void;
}

export function MenuSectionList({ section, onItemPress }: MenuSectionListProps) {
  return (
    <View style={styles.container}>
      <MenuSectionHeader title={section.title} />
      <View style={styles.list}>
        {section.items.map((item) => (
          <MenuListItem
            key={item.id}
            item={item}
            onPress={() => onItemPress?.(section.id, item.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  list: {
    gap: MENU_SPACING.itemGap,
  },
});
