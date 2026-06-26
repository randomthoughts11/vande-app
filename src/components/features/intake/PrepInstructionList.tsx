import { StyleSheet, Text, View } from 'react-native';
import { ClipboardList, Pill, Wifi } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { INTAKE_COLORS, INTAKE_FONTS } from '@/constants/intake-mock';

const ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  reports: ClipboardList,
  meds: Pill,
};

interface PrepInstructionListProps {
  sectionTitle: string;
  items: { id: string; label: string }[];
}

export function PrepInstructionList({ sectionTitle, items }: PrepInstructionListProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {items.map((item) => {
        const Icon = ICONS[item.id] ?? Wifi;
        return (
          <View key={item.id} style={styles.row}>
            <View style={styles.iconBg}>
              <Icon size={20} color={INTAKE_COLORS.primaryGreen} strokeWidth={2} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 24,
    paddingTop: 28,
    gap: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: INTAKE_COLORS.textPrimary,
    textAlign: 'center',
    fontFamily: INTAKE_FONTS.sans,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: INTAKE_COLORS.iconCircleBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: INTAKE_COLORS.textPrimary,
    fontFamily: INTAKE_FONTS.sans,
    paddingTop: 8,
  },
});
