import { z } from 'zod';
import type { WellnessScores } from '@/types/domain';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = loginSchema.extend({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const consentSchema = z.object({
  privacyPolicy: z.boolean().refine((v) => v === true, { message: 'Required' }),
  wellnessDisclaimer: z.boolean().refine((v) => v === true, { message: 'Required' }),
  supplementSafety: z.boolean().refine((v) => v === true, { message: 'Required' }),
  telehealthConsent: z.boolean().refine((v) => v === true, { message: 'Required' }),
});

export const intakeSchema = z.object({
  goals: z.array(z.string()).min(1, 'Select at least one goal'),
  symptoms: z.array(z.string()),
  sleepHours: z.string(),
  stressLevel: z.string(),
  digestionIssues: z.string(),
  mobilityPain: z.string(),
  dietPreferences: z.array(z.string()),
  medications: z.string(),
  supplements: z.string(),
  allergies: z.string(),
  preferredConsultation: z.string().min(1, 'Select a consultation type'),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type ConsentForm = z.infer<typeof consentSchema>;
export type IntakeForm = z.infer<typeof intakeSchema>;

export function computeWellnessScores(intake: IntakeForm): WellnessScores {
  const sleepMap: Record<string, number> = { poor: 30, fair: 50, good: 75, excellent: 90 };
  const stressMap: Record<string, number> = { low: 85, moderate: 60, high: 35, severe: 20 };
  const digestionMap: Record<string, number> = { none: 90, mild: 65, moderate: 45, significant: 25 };
  const mobilityMap: Record<string, number> = { none: 90, mild: 70, moderate: 50, significant: 30 };

  const sleep = sleepMap[intake.sleepHours] ?? 50;
  const stress = stressMap[intake.stressLevel] ?? 50;
  const digestion = digestionMap[intake.digestionIssues] ?? 50;
  const mobility = mobilityMap[intake.mobilityPain] ?? 50;
  const energy = Math.round((sleep + (100 - stress) + digestion + mobility) / 4);

  return { sleep, stress, digestion, mobility, energy };
}
