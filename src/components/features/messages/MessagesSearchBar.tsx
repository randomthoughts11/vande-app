import { StyleSheet, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { MESSAGES_COLORS, MESSAGES_FONTS, MESSAGES_SPACING } from '@/constants/messages-mock';

interface MessagesSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function MessagesSearchBar({ value, onChangeText }: MessagesSearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        placeholderTextColor={MESSAGES_COLORS.placeholder}
        style={styles.input}
        returnKeyType="search"
        accessibilityLabel="Search messages"
      />
      <Search size={20} color={MESSAGES_COLORS.textPrimary} strokeWidth={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: MESSAGES_SPACING.searchHeight,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: MESSAGES_COLORS.border,
    backgroundColor: MESSAGES_COLORS.background,
    paddingHorizontal: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: MESSAGES_COLORS.textPrimary,
    fontFamily: MESSAGES_FONTS.sans,
    padding: 0,
  },
});
