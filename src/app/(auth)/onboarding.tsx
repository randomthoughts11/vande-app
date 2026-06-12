import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { submitIntake } from '@/lib/api';
import { intakeSchema, type IntakeForm } from '@/lib/validators';
import { useAuthStore } from '@/store/authStore';
import { colors, radii, spacing, typography } from '@/lib/theme';

const STEPS = ['Goals', 'Wellness', 'Lifestyle', 'Health', 'Consult'];
const GOALS = ['sleep', 'stress', 'digestion', 'weight', 'mobility', 'diabetes support', 'hair/scalp', 'detox', "women's wellness", 'general wellness'];
const DIET_OPTIONS = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'no restrictions'];
const CONSULT_TYPES = ['Virtual Individual', 'Ayurveda Wellness', 'Follow-up', 'Panchakarma Consultation'];

export default function OnboardingScreen() {
  const router = useRouter();
  const { setOnboardingComplete } = useAuthStore();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<IntakeForm>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      goals: [],
      symptoms: [],
      sleepHours: 'fair',
      stressLevel: 'moderate',
      digestionIssues: 'mild',
      mobilityPain: 'none',
      dietPreferences: [],
      medications: '',
      supplements: '',
      allergies: '',
      preferredConsultation: '',
    },
  });

  const goals = watch('goals');
  const dietPreferences = watch('dietPreferences');

  const toggleArray = (field: 'goals' | 'dietPreferences', value: string) => {
    const current = watch(field);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue(field, next, { shouldValidate: true });
  };

  const onSubmit = async (data: IntakeForm) => {
    setLoading(true);
    try {
      await submitIntake(data);
      setOnboardingComplete(true);
      router.replace('/(tabs)/today');
    } catch (e) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else handleSubmit(onSubmit)();
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.stepCount}>Step {step + 1} of {STEPS.length}</Text>
        <Text style={styles.stepTitle}>{STEPS[step]}</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {step === 0 && (
          <>
            <Text style={styles.question}>What are your primary wellness goals?</Text>
            <View style={styles.chips}>
              {GOALS.map((g) => (
                <Pressable
                  key={g}
                  onPress={() => toggleArray('goals', g)}
                  style={[styles.chip, goals.includes(g) && styles.chipSelected]}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: goals.includes(g) }}
                >
                  <Text style={[styles.chipText, goals.includes(g) && styles.chipTextSelected]}>{g}</Text>
                </Pressable>
              ))}
            </View>
            {errors.goals ? <Text style={styles.error}>{errors.goals.message}</Text> : null}
          </>
        )}

        {step === 1 && (
          <>
            <Text style={styles.question}>Sleep & stress</Text>
            {(['sleepHours', 'stressLevel'] as const).map((field) => (
              <View key={field}>
                <Text style={styles.fieldLabel}>{field === 'sleepHours' ? 'Sleep quality' : 'Stress level'}</Text>
                <View style={styles.chips}>
                  {(field === 'sleepHours'
                    ? ['poor', 'fair', 'good', 'excellent']
                    : ['low', 'moderate', 'high', 'severe']
                  ).map((opt) => (
                    <Controller
                      key={opt}
                      control={control}
                      name={field}
                      render={({ field: { value, onChange } }) => (
                        <Pressable
                          onPress={() => onChange(opt)}
                          style={[styles.chip, value === opt && styles.chipSelected]}
                        >
                          <Text style={[styles.chipText, value === opt && styles.chipTextSelected]}>{opt}</Text>
                        </Pressable>
                      )}
                    />
                  ))}
                </View>
              </View>
            ))}
            <Text style={styles.question}>Digestion & mobility</Text>
            {(['digestionIssues', 'mobilityPain'] as const).map((field) => (
              <View key={field}>
                <Text style={styles.fieldLabel}>{field === 'digestionIssues' ? 'Digestion' : 'Mobility/pain'}</Text>
                <View style={styles.chips}>
                  {['none', 'mild', 'moderate', 'significant'].map((opt) => (
                    <Controller
                      key={opt}
                      control={control}
                      name={field}
                      render={({ field: { value, onChange } }) => (
                        <Pressable
                          onPress={() => onChange(opt)}
                          style={[styles.chip, value === opt && styles.chipSelected]}
                        >
                          <Text style={[styles.chipText, value === opt && styles.chipTextSelected]}>{opt}</Text>
                        </Pressable>
                      )}
                    />
                  ))}
                </View>
              </View>
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.question}>Diet preferences</Text>
            <View style={styles.chips}>
              {DIET_OPTIONS.map((d) => (
                <Pressable
                  key={d}
                  onPress={() => toggleArray('dietPreferences', d)}
                  style={[styles.chip, dietPreferences.includes(d) && styles.chipSelected]}
                >
                  <Text style={[styles.chipText, dietPreferences.includes(d) && styles.chipTextSelected]}>{d}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <Controller control={control} name="medications" render={({ field }) => (
              <TextField label="Current medications" placeholder="List any medications" multiline {...field} onChangeText={field.onChange} />
            )} />
            <Controller control={control} name="supplements" render={({ field }) => (
              <TextField label="Current supplements" placeholder="List any supplements" multiline {...field} onChangeText={field.onChange} />
            )} />
            <Controller control={control} name="allergies" render={({ field }) => (
              <TextField label="Allergies & contraindications" placeholder="List any allergies" multiline {...field} onChangeText={field.onChange} />
            )} />
          </>
        )}

        {step === 4 && (
          <>
            <Text style={styles.question}>Preferred first consultation</Text>
            <View style={styles.chips}>
              {CONSULT_TYPES.map((c) => (
                <Controller
                  key={c}
                  control={control}
                  name="preferredConsultation"
                  render={({ field: { value, onChange } }) => (
                    <Pressable
                      onPress={() => onChange(c)}
                      style={[styles.chip, value === c && styles.chipSelected]}
                    >
                      <Text style={[styles.chipText, value === c && styles.chipTextSelected]}>{c}</Text>
                    </Pressable>
                  )}
                />
              ))}
            </View>
            {errors.preferredConsultation ? <Text style={styles.error}>{errors.preferredConsultation.message}</Text> : null}
            <Text style={styles.note}>
              Your responses help us prepare for your consultation. This is not a medical diagnosis.
            </Text>
          </>
        )}
      </ScrollView>

      <View style={styles.nav}>
        {step > 0 ? (
          <Button title="Back" variant="outline" onPress={() => setStep(step - 1)} style={styles.navBtn} />
        ) : (
          <View style={styles.navBtn} />
        )}
        <Button
          title={step === STEPS.length - 1 ? 'Complete intake' : 'Next'}
          onPress={next}
          loading={loading}
          style={styles.navBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.warmCream },
  topBar: {
    backgroundColor: colors.deepGreen,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  stepCount: { ...typography.caption, color: colors.sage, textTransform: 'uppercase', letterSpacing: 1 },
  stepTitle: { ...typography.h2, color: colors.warmCream, marginTop: spacing.xs },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 3 },
  scroll: { padding: spacing.lg },
  question: { ...typography.h3, color: colors.ink, marginBottom: spacing.md },
  fieldLabel: { ...typography.label, color: colors.mutedText, marginBottom: spacing.xs, marginTop: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  chipSelected: { backgroundColor: colors.sage, borderColor: colors.primaryGreen },
  chipText: { ...typography.bodySmall, color: colors.mutedText },
  chipTextSelected: { color: colors.deepGreen, fontWeight: '600' },
  error: { ...typography.caption, color: colors.danger },
  note: { ...typography.caption, color: colors.mutedText, marginTop: spacing.md, fontStyle: 'italic' },
  nav: { flexDirection: 'row', padding: spacing.lg, gap: spacing.sm },
  navBtn: { flex: 1 },
});
