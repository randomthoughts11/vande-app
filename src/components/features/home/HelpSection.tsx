import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, HelpCircle, Mail, MessageCircle } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { HOME_COLORS, HOME_HELP } from '@/constants/home-mock';

const HELP_ICONS: Record<string, LucideIcon> = {
  message: MessageCircle,
  mail: Mail,
  faq: HelpCircle,
};

interface HelpSectionProps {
  onItemPress?: (id: string) => void;
}

export function HelpSection({ onItemPress }: HelpSectionProps) {
  return (
    <View style={styles.list}>
      {HOME_HELP.map((item, index) => {
        const Icon = HELP_ICONS[item.icon] ?? HelpCircle;
        const isLast = index === HOME_HELP.length - 1;
        return (
          <Pressable
            key={item.id}
            onPress={() => onItemPress?.(item.id)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.card, pressed && styles.pressed, !isLast && styles.cardSpacing]}
          >
            <View style={styles.iconWrap}>
              <Icon size={20} color={HOME_COLORS.linkGreen} strokeWidth={2} />
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <ChevronRight size={20} color={HOME_COLORS.textMuted} strokeWidth={2} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HOME_COLORS.cardWhite,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: HOME_COLORS.border,
    padding: 16,
    gap: 14,
  },
  cardSpacing: {},
  pressed: { opacity: 0.95 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF5ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: HOME_COLORS.textPrimary,
  },
  description: {
    fontSize: 13,
    color: HOME_COLORS.textBody,
    lineHeight: 18,
  },
});
