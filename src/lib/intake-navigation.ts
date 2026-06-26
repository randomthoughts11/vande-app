import { type Href } from 'expo-router';
import {
  INTAKE_STEP_ORDER,
  INTAKE_STEPS,
  type IntakeStepConfig,
} from '@/constants/intake-mock';

export function intakeHref(path: string): Href {
  return path as Href;
}

export function intakeStepHref(stepId: string): Href {
  return `/intake/${stepId}` as Href;
}

export function getStepConfig(stepId: string): IntakeStepConfig | undefined {
  return INTAKE_STEPS[stepId];
}

export function getNextStepId(currentId: string): string | 'review' | null {
  const idx = INTAKE_STEP_ORDER.indexOf(currentId);
  if (idx === -1) return null;
  if (idx === INTAKE_STEP_ORDER.length - 1) return 'review';
  return INTAKE_STEP_ORDER[idx + 1] ?? null;
}

export function getPrevStepId(currentId: string): string | null {
  const idx = INTAKE_STEP_ORDER.indexOf(currentId);
  if (idx <= 0) return null;
  return INTAKE_STEP_ORDER[idx - 1] ?? null;
}

export function getFirstStepId(): string {
  return INTAKE_STEP_ORDER[0]!;
}
