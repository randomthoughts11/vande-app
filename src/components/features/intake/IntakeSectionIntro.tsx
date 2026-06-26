import { StyleSheet, Text, View } from 'react-native';
import type { IntakeSectionIntroConfig } from '@/constants/intake-mock';
import { INTAKE_COLORS, INTAKE_FONTS, INTAKE_SPACING } from '@/constants/intake-mock';

interface IntakeSectionIntroProps {
  config: IntakeSectionIntroConfig;
}

export function IntakeSectionIntro({ config }: IntakeSectionIntroProps) {
  return (
    <View style={styles.card}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${config.progressFill * 100}%` }]} />
      </View>

      <View style={styles.topRow}>
        {config.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{config.badge}</Text>
          </View>
        ) : null}
        <Text style={styles.sectionNumber}>{config.sectionNumber}</Text>
      </View>

      <Text style={styles.heading}>
        {config.headingBefore}
        <Text style={styles.headingBold}>{config.headingBold}</Text>
        {config.headingAfter ?? ''}
      </Text>

      <Text style={styles.description}>{config.description}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>{config.infoTitle}</Text>
        {config.bullets.map((bullet) => (
          <View key={bullet.title} style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <View style={styles.bulletText}>
              <Text style={styles.bulletTitle}>{bullet.title}</Text>
              <Text style={styles.bulletDesc}>{bullet.description}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.infoFooter}>{config.footerMeta}</Text>
      </View>

      <Text style={styles.confidential}>*Everything you share is confidential</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: INTAKE_COLORS.card,
    borderRadius: INTAKE_SPACING.cardRadius,
    padding: INTAKE_SPACING.cardPadding,
    marginHorizontal: INTAKE_SPACING.screenX,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  progressTrack: {
    height: 4,
    backgroundColor: INTAKE_COLORS.progressEmpty,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: INTAKE_COLORS.primaryGreen,
    borderRadius: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: INTAKE_COLORS.badgeGreenBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: INTAKE_COLORS.badgeGreen,
    fontFamily: INTAKE_FONTS.sans,
  },
  sectionNumber: {
    fontSize: 36,
    color: INTAKE_COLORS.sectionNumber,
    fontFamily: INTAKE_FONTS.serif,
    fontWeight: '700',
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
    color: INTAKE_COLORS.textPrimary,
    fontFamily: INTAKE_FONTS.serif,
  },
  headingBold: {
    fontWeight: '700',
    fontFamily: INTAKE_FONTS.serif,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: INTAKE_COLORS.textSecondary,
    fontFamily: INTAKE_FONTS.sans,
  },
  infoBox: {
    backgroundColor: INTAKE_COLORS.infoBoxBg,
    borderRadius: 16,
    padding: 20,
    gap: 14,
  },
  infoTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: INTAKE_COLORS.textMuted,
    fontFamily: INTAKE_FONTS.sans,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: INTAKE_COLORS.primaryGreen,
    marginTop: 6,
  },
  bulletText: { flex: 1, gap: 2 },
  bulletTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: INTAKE_COLORS.textPrimary,
    fontFamily: INTAKE_FONTS.sans,
  },
  bulletDesc: {
    fontSize: 13,
    color: INTAKE_COLORS.textMuted,
    fontFamily: INTAKE_FONTS.sans,
  },
  infoFooter: {
    fontSize: 12,
    color: INTAKE_COLORS.textMuted,
    fontFamily: INTAKE_FONTS.sans,
    marginTop: 4,
  },
  confidential: {
    fontSize: 12,
    color: INTAKE_COLORS.textLight,
    fontFamily: INTAKE_FONTS.sans,
  },
});
