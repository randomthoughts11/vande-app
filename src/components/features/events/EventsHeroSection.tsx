import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import {
  EVENTS_COLORS,
  EVENTS_FONTS,
  EVENTS_HERO,
  EVENTS_STATS,
  EVENTS_SPACING,
} from '@/constants/events-mock';
import { EventsOverline } from './EventsOverline';
import { EventsSerifHeading } from './EventsSerifHeading';

interface EventsHeroSectionProps {
  onBrowsePress?: () => void;
}

export function EventsHeroSection({ onBrowsePress }: EventsHeroSectionProps) {
  return (
    <View style={styles.container}>
      <EventsOverline>{EVENTS_HERO.overline}</EventsOverline>

      <View style={styles.headingWrap}>
        <EventsSerifHeading
          before={EVENTS_HERO.titleBefore}
          highlight={EVENTS_HERO.titleHighlight}
          after={EVENTS_HERO.titleAfter}
        />
      </View>

      <Text style={styles.description}>{EVENTS_HERO.description}</Text>

      <Pressable
        onPress={onBrowsePress}
        accessibilityRole="button"
        accessibilityLabel={EVENTS_HERO.ctaLabel}
        style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
      >
        <Text style={styles.ctaText}>{EVENTS_HERO.ctaLabel}</Text>
        <ChevronRight size={18} color="#FFFFFF" strokeWidth={2.5} />
      </Pressable>

      <View style={styles.statsRow}>
        {EVENTS_STATS.map((stat) => (
          <View key={stat.label} style={styles.statCol}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Image source={{ uri: EVENTS_HERO.imageUri }} style={styles.heroImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  headingWrap: {
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: EVENTS_COLORS.textBody,
    textAlign: 'center',
    fontFamily: EVENTS_FONTS.sans,
    paddingHorizontal: 4,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: EVENTS_COLORS.primaryGreen,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 28,
    marginTop: 4,
  },
  ctaPressed: { opacity: 0.9 },
  ctaText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: EVENTS_FONTS.sans,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 48,
    marginTop: 8,
    marginBottom: 4,
  },
  statCol: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: EVENTS_COLORS.textPrimary,
    fontFamily: EVENTS_FONTS.sans,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: EVENTS_COLORS.textBody,
    fontFamily: EVENTS_FONTS.sans,
  },
  heroImage: {
    width: '100%',
    height: 180,
    borderRadius: EVENTS_SPACING.cardRadius,
    backgroundColor: '#E8E8E8',
    marginTop: 8,
  },
});
