import { StyleSheet, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { EVENTS_COLORS, EVENTS_FONTS, EVENTS_SEARCH } from '@/constants/events-mock';
import { EventsSerifHeading } from './EventsSerifHeading';

interface EventsSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function EventsSearchBar({ value, onChangeText }: EventsSearchBarProps) {
  return (
    <View style={styles.container}>
      <EventsSerifHeading size="md">{EVENTS_SEARCH.title}</EventsSerifHeading>
      <View style={styles.inputWrap}>
        <Search size={18} color={EVENTS_COLORS.searchPlaceholder} strokeWidth={2} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={EVENTS_SEARCH.placeholder}
          placeholderTextColor={EVENTS_COLORS.searchPlaceholder}
          style={styles.input}
          returnKeyType="search"
          accessibilityLabel="Search events"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    alignItems: 'center',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: EVENTS_COLORS.cardWhite,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: EVENTS_COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: EVENTS_COLORS.textPrimary,
    fontFamily: EVENTS_FONTS.sans,
    padding: 0,
  },
});
