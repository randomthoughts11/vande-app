import { useState } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { HOME_COLORS, HOME_FAQ } from '@/constants/home-mock';

export function FaqSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <View style={styles.container}>
      {HOME_FAQ.map((item, index) => {
        const isExpanded = expandedId === item.id;
        const isLast = index === HOME_FAQ.length - 1;
        return (
          <View key={item.id}>
            <Pressable
              onPress={() => toggle(item.id)}
              accessibilityRole="button"
              accessibilityState={{ expanded: isExpanded }}
              style={styles.row}
            >
              <Text style={styles.question}>{item.question}</Text>
              <ChevronDown
                size={20}
                color={HOME_COLORS.textBody}
                style={isExpanded ? styles.chevronUp : undefined}
              />
            </Pressable>
            {isExpanded ? <Text style={styles.answer}>{item.answer}</Text> : null}
            {!isLast ? <View style={styles.divider} /> : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: HOME_COLORS.cardWhite,
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  question: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: HOME_COLORS.textPrimary,
    lineHeight: 21,
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
  answer: {
    fontSize: 14,
    color: HOME_COLORS.textBody,
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: -8,
  },
  divider: {
    height: 1,
    backgroundColor: HOME_COLORS.border,
    marginHorizontal: 16,
  },
});
