import { StyleSheet, Text, View } from 'react-native';
import type { Practitioner } from '@/types/domain';
import { formatDate } from '@/lib/dates';
import { colors, radii, spacing, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface PractitionerCardProps {
  practitioner: Practitioner;
  onBook?: () => void;
}

export function PractitionerCard({ practitioner, onBook }: PractitionerCardProps) {
  const initials = `${practitioner.firstName[0]}${practitioner.lastName[0]}`;

  return (
    <Card variant="elevated">
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>
            {practitioner.firstName} {practitioner.lastName}
          </Text>
          <Text style={styles.credentials}>{practitioner.credentials}</Text>
          <Text style={styles.specialty}>{practitioner.specialty}</Text>
        </View>
      </View>
      <View style={styles.meta}>
        <Text style={styles.location}>{practitioner.location}</Text>
        {practitioner.nextAvailable ? (
          <Text style={styles.available}>
            Next: {formatDate(practitioner.nextAvailable)}
          </Text>
        ) : null}
      </View>
      {practitioner.bio ? (
        <Text style={styles.bio} numberOfLines={2}>{practitioner.bio}</Text>
      ) : null}
      {onBook ? (
        <Button
          title="Book appointment"
          onPress={onBook}
          fullWidth
          style={styles.button}
          accessibilityLabel={`Book with ${practitioner.firstName}`}
        />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', gap: spacing.md },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.lightGold,
  },
  avatarText: { ...typography.label, color: colors.deepGreen },
  info: { flex: 1 },
  name: { ...typography.h3, color: colors.ink },
  credentials: { ...typography.caption, color: colors.gold, marginTop: 2, fontWeight: '600' },
  specialty: { ...typography.bodySmall, color: colors.mutedText, marginTop: 2 },
  meta: { marginTop: spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  location: { ...typography.caption, color: colors.mutedText },
  available: { ...typography.caption, color: colors.primaryGreen, marginTop: 4, fontWeight: '600' },
  bio: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.sm, lineHeight: 20 },
  button: { marginTop: spacing.md },
});
