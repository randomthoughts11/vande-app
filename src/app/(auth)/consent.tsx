import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { saveConsents } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { colors, radii, spacing, typography } from '@/lib/theme';

const CONSENT_ITEMS = [
  { key: 'privacyPolicy', label: 'I acknowledge the Privacy Policy and how my data is used.' },
  { key: 'wellnessDisclaimer', label: 'I understand this app provides wellness support, not emergency medical care.' },
  { key: 'supplementSafety', label: 'I understand supplement recommendations require practitioner review and may have contraindications.' },
  { key: 'telehealthConsent', label: 'I consent to telehealth communications with my Vande care team.' },
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Your privacy & safety</Text>
        <Text style={styles.subtitle}>
          Before we begin, please review and accept the following.
        </Text>

        {CONSENT_ITEMS.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => toggle(item.key)}
            style={[styles.item, checked[item.key] && styles.itemChecked]}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: checked[item.key] }}
            accessibilityLabel={item.label}
          >
            <View style={[styles.checkbox, checked[item.key] && styles.checkboxChecked]}>
              {checked[item.key] ? <Check size={14} color={colors.white} /> : null}
            </View>
            <Text style={styles.itemText}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Button
        title="Continue"
        onPress={onContinue}
        loading={loading}
        disabled={!allChecked}
        fullWidth
        style={styles.button}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  scroll: { padding: spacing.lg },
  title: { ...typography.h1, color: colors.deepGreen },
  subtitle: { ...typography.bodySmall, color: colors.mutedText, marginBottom: spacing.lg },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  itemChecked: { borderColor: colors.primaryGreen, backgroundColor: colors.sage },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: { backgroundColor: colors.primaryGreen, borderColor: colors.primaryGreen },
  itemText: { ...typography.bodySmall, color: colors.ink, flex: 1 },
  button: { margin: spacing.lg },
});
