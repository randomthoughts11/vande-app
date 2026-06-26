import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarPlus, Clock, FileEdit } from 'lucide-react-native';
import { BOOKING_CONFIRMATION, INTAKE_COLORS, INTAKE_FONTS } from '@/constants/intake-mock';

interface BookingDetailsCardProps {
  onAddToCalendar?: () => void;
  onViewForm?: () => void;
}

export function BookingDetailsCard({ onAddToCalendar, onViewForm }: BookingDetailsCardProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.detailsTitle}>{BOOKING_CONFIRMATION.detailsTitle}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{BOOKING_CONFIRMATION.consultationTitle}</Text>

        <View style={styles.row}>
          <Calendar size={18} color={INTAKE_COLORS.primaryGreen} strokeWidth={2} />
          <Text style={styles.rowText}>{BOOKING_CONFIRMATION.date}</Text>
        </View>

        <View style={styles.row}>
          <Clock size={18} color={INTAKE_COLORS.primaryGreen} strokeWidth={2} />
          <Text style={styles.rowText}>{BOOKING_CONFIRMATION.time}</Text>
        </View>

        <Pressable onPress={onAddToCalendar} style={styles.linkRow}>
          <CalendarPlus size={18} color={INTAKE_COLORS.primaryGreen} strokeWidth={2} />
          <Text style={styles.link}>Add to Calendar</Text>
        </Pressable>

        <View style={styles.divider} />

        <View style={styles.statusRow}>
          <View style={styles.statusLeft}>
            <FileEdit size={18} color={INTAKE_COLORS.primaryGreen} strokeWidth={2} />
            <Text style={styles.rowText}>{BOOKING_CONFIRMATION.intakeSubmitted}</Text>
          </View>
          <Pressable onPress={onViewForm}>
            <Text style={styles.link}>View Form</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: INTAKE_COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: INTAKE_FONTS.sans,
  },
  card: {
    backgroundColor: INTAKE_COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: INTAKE_COLORS.border,
    padding: 20,
    gap: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: INTAKE_COLORS.textPrimary,
    fontFamily: INTAKE_FONTS.sans,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowText: {
    fontSize: 14,
    color: INTAKE_COLORS.textSecondary,
    fontFamily: INTAKE_FONTS.sans,
    flex: 1,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: INTAKE_COLORS.primaryGreen,
    textDecorationLine: 'underline',
    fontFamily: INTAKE_FONTS.sans,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
});
