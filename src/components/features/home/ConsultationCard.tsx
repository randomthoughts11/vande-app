import { StyleSheet, Text, View } from 'react-native';
import { Calendar, Clock, Video } from 'lucide-react-native';
import { HOME_COLORS, HOME_CONSULTATION } from '@/constants/home-mock';
import { OutlinePillButton } from './OutlinePillButton';

interface ConsultationCardProps {
  onAddToCalendar?: () => void;
  onReschedule?: () => void;
}

export function ConsultationCard({ onAddToCalendar, onReschedule }: ConsultationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.videoIcon}>
          <Video size={18} color={HOME_COLORS.textPrimary} strokeWidth={2} />
        </View>
        <View style={styles.durationRow}>
          <Clock size={14} color={HOME_COLORS.accentOrange} strokeWidth={2} />
          <Text style={styles.duration}>{HOME_CONSULTATION.duration}</Text>
        </View>
      </View>

      <Text style={styles.title}>{HOME_CONSULTATION.title}</Text>

      <View style={styles.detailRow}>
        <Calendar size={16} color={HOME_COLORS.textBody} strokeWidth={2} />
        <Text style={styles.detailText}>{HOME_CONSULTATION.date}</Text>
      </View>
      <View style={styles.detailRow}>
        <Clock size={16} color={HOME_COLORS.textBody} strokeWidth={2} />
        <Text style={styles.detailText}>{HOME_CONSULTATION.time}</Text>
      </View>

      <View style={styles.actions}>
        <OutlinePillButton
          label={HOME_CONSULTATION.addToCalendarLabel}
          icon={Calendar}
          onPress={onAddToCalendar}
          style={styles.actionButton}
        />
        <OutlinePillButton
          label={HOME_CONSULTATION.rescheduleLabel}
          onPress={onReschedule}
          style={styles.actionButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: HOME_COLORS.cardWhite,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: HOME_COLORS.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  videoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontSize: 13,
    fontWeight: '600',
    color: HOME_COLORS.accentOrange,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: HOME_COLORS.textPrimary,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: HOME_COLORS.textBody,
    flex: 1,
  },
  actions: {
    marginTop: 12,
    gap: 10,
  },
  actionButton: {
    width: '100%',
  },
});
