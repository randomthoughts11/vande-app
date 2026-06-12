import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, Shield } from 'lucide-react-native';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { Button } from '@/components/ui/Button';
import { saveConsents } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { colors, radii, spacing, typography } from '@/lib/theme';

const CONSENT_ITEMS = [
  { key: 'privacyPolicy', label: 'Privacy Policy', desc: 'I acknowledge how my data is collected and used.' },
  { key: 'wellnessDisclaimer', label: 'Wellness disclaimer', desc: 'This app provides wellness support, not emergency medical care.' },
  { key: 'supplementSafety', label: 'Supplement safety', desc: 'Recommendations require practitioner review and may have contraindications.' },
  { key: 'telehealthConsent', label: 'Telehealth consent', desc: 'I consent to virtual communications with my Vande care team.' },
] as const;

type ConsentKey = (typeof CONSENT_ITEMS)[number]['key'];

export default function ConsentScreen() {
  const router = useRouter();
  const { setConsentComplete } = useAuthStore();
  const [checked, setChecked] = useState<Record<ConsentKey, boolean>>({
    privacyPolicy: false,
    wellnessDisclaimer: false,
    supplementSafety: false,
    telehealthConsent: false,
  });
  const [loading, setLoading] = useState(false);

  const allChecked = Object.values(checked).every(Boolean);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const toggle = (key: ConsentKey) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onContinue = async () => {
    if (!allChecked) {
      Alert.alert('Required', 'Please accept all consents to continue.');
      return;
    }
    setLoading(true);
    try {
      await saveConsents(checked);
      setConsentComplete(true);
      router.replace('/(auth)/onboarding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Your privacy & safety"
      subtitle="Review and accept each item before we personalize your wellness experience."
      showBack={false}
      footer={
        <>
          <Text style={styles.progress}>{checkedCount} of {CONSENT_ITEMS.length} accepted</Text>
          <Button title="Continue" onPress={onContinue} loading={loading} disabled={!allChecked} fullWidth />
        </>
      }
    >
      <View style={styles.infoCard}>
        <Shield size={20} color={colors.primaryGreen} />
        <Text style={styles.infoText}>Your health information is handled with care. You can review consents anytime in Profile.</Text>
      </View>

      {CONSENT_ITEMS.map((item) => (
        <Pressable
          key={item.key}
          onPress={() => toggle(item.key)}
          style={[styles.item, checked[item.key] && styles.itemChecked]}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: checked[item.key] }}
        >
          <View style={[styles.checkbox, checked[item.key] && styles.checkboxChecked]}>
            {checked[item.key] ? <Check size={14} color={colors.white} /> : null}
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>{item.label}</Text>
            <Text style={styles.itemDesc}>{item.desc}</Text>
          </View>
        </Pressable>
      ))}
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.sage,
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.lg,
    alignItems: 'flex-start',
  },
  infoText: { ...typography.bodySmall, color: colors.deepGreen, flex: 1, lineHeight: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  itemChecked: { borderColor: colors.primaryGreen, backgroundColor: colors.sage },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: { backgroundColor: colors.primaryGreen, borderColor: colors.primaryGreen },
  itemContent: { flex: 1 },
  itemTitle: { ...typography.label, color: colors.ink },
  itemDesc: { ...typography.bodySmall, color: colors.mutedText, marginTop: 4, lineHeight: 20 },
  progress: { ...typography.caption, color: colors.mutedText, textAlign: 'center', marginBottom: spacing.sm },
});
