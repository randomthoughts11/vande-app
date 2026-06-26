import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  IntakeBrandHeader,
  IntakeChecklistQuestion,
  IntakeChipQuestion,
  IntakeExpandable,
  IntakeFooterNav,
  IntakeHeader,
  IntakeProgressBar,
  IntakeQuestionCard,
  IntakeRadioQuestion,
  IntakeSectionIntro,
  IntakeTextQuestion,
} from '@/components/features/intake';
import { INTAKE_COLORS } from '@/constants/intake-mock';
import { getNextStepId, getPrevStepId, getStepConfig, intakeHref, intakeStepHref } from '@/lib/intake-navigation';
import { useIntakeStore } from '@/store/intakeStore';

/** Dynamic intake step renderer */
export default function IntakeStepScreen() {
  const router = useRouter();
  const { stepId } = useLocalSearchParams<{ stepId: string }>();
  const config = getStepConfig(stepId ?? '');
  const { setAnswer, getAnswer } = useIntakeStore();

  if (!config) {
    return null;
  }

  const navigateNext = () => {
    const next = getNextStepId(config.id);
    if (next === 'review') {
      router.push(intakeHref('/intake/review'));
    } else if (next) {
      router.push(intakeStepHref(next));
    }
  };

  const navigateBack = () => {
    const prev = getPrevStepId(config.id);
    if (prev) {
      router.push(intakeStepHref(prev));
    } else {
      router.back();
    }
  };

  if (config.type === 'section_intro') {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <IntakeHeader />
        <ScrollView contentContainerStyle={styles.scroll}>
          <IntakeSectionIntro config={config} />
        </ScrollView>
        <IntakeFooterNav
          onBack={navigateBack}
          onNext={navigateNext}
          nextLabel={`${config.nextLabel ?? 'Continue'} →`}
        />
      </View>
    );
  }

  const chipAnswer = (getAnswer(config.id) as string[]) ?? [];
  const textAnswer = (getAnswer(config.id) as string) ?? '';
  const radioAnswer = (getAnswer(config.id) as string) ?? null;
  const checklistAnswer = (getAnswer(config.id) as string[]) ?? [];

  const toggleChip = (option: string) => {
    if (config.type !== 'chips') return;
    if (config.multiSelect) {
      const next = chipAnswer.includes(option)
        ? chipAnswer.filter((o) => o !== option)
        : [...chipAnswer, option];
      setAnswer(config.id, next);
    } else {
      setAnswer(config.id, [option]);
    }
  };

  const toggleChecklist = (id: string) => {
    const next = checklistAnswer.includes(id)
      ? checklistAnswer.filter((o) => o !== id)
      : [...checklistAnswer, id];
    setAnswer(config.id, next);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <IntakeHeader />
      {'showBrandHeader' in config && config.showBrandHeader ? (
        <IntakeBrandHeader onSaveExit={() => router.back()} />
      ) : null}
      {'section' in config ? (
        <IntakeProgressBar
          section={config.section}
          step={config.step}
          totalSteps={config.totalSteps}
          filledSegments={config.progressFilled}
          totalSegments={config.progressTotal}
        />
      ) : null}

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <IntakeQuestionCard>
          {config.type === 'chips' && config.showWhyAsk ? <IntakeExpandable /> : null}
          {config.type === 'checklist' && config.showWhyAsk ? <IntakeExpandable /> : null}

          {config.type === 'text' ? (
            <IntakeTextQuestion
              confidential={config.confidential}
              question={config.question}
              instruction={config.instruction}
              placeholder={config.placeholder}
              value={textAnswer}
              onChangeText={(t) => setAnswer(config.id, t)}
            />
          ) : null}

          {config.type === 'chips' ? (
            <IntakeChipQuestion
              question={config.question}
              instruction={config.instruction}
              options={config.options}
              selected={chipAnswer}
              multiSelect={config.multiSelect}
              onToggle={toggleChip}
            />
          ) : null}

          {config.type === 'radio' ? (
            <IntakeRadioQuestion
              question={config.question}
              instruction={config.instruction}
              options={config.options}
              selected={radioAnswer}
              onSelect={(o) => setAnswer(config.id, o)}
            />
          ) : null}

          {config.type === 'checklist' ? (
            <IntakeChecklistQuestion
              confidential={config.confidential}
              question={config.question}
              instruction={config.instruction}
              options={config.options}
              selected={checklistAnswer}
              onToggle={toggleChecklist}
            />
          ) : null}
        </IntakeQuestionCard>
      </ScrollView>

      <IntakeFooterNav onBack={navigateBack} onNext={navigateNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: INTAKE_COLORS.background,
  },
  scroll: {
    paddingVertical: 16,
    paddingBottom: 24,
  },
});
