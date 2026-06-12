import { StyleSheet, Text, View } from 'react-native';
import type { Practitioner } from '@/types/domain';
import { formatDate } from '@/lib/dates';
import { colors, spacing, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface PractitionerCardProps {
  practitioner: Practitioner;
  onBook?: () => void;
}

export function PractitionerCard({ practitioner, onBook }: PractitionerCardProps) {
  return (
    <Card variant="elevated">
      <Text style={styles.name}>
        {practitioner.firstName} {practitioner.lastName}
      </Text>
      <Text style={styles.credentials}>{practitioner.credentials}</Text>
      <Text style={styles.specialty}>{practitioner.specialty}</Text>
      <Text style={styles.location}>{practitioner.location}</Text>
      {practitioner.nextAvailable ? (
        <Text style={styles.available}>
          Next available: {formatDate(practitioner.nextAvailable)}
        </Text>
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
  name: { ...typography.h3, color: colors.ink },
  credentials: { ...typography.caption, color: colors.gold, marginTop: 2 },
  specialty: { ...typography.bodySmall, color: colors.mutedText, marginTop: spacing.xs },
  location: { ...typography.caption, color: colors.mutedText },
  available: { ...typography.caption, color: colors.primaryGreen, marginTop: spacing.sm },
  button: { marginTop: spacing.md },
});
