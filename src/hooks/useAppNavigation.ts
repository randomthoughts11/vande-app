import { useCallback } from 'react';
import { useRouter, type Href } from 'expo-router';
import { ROUTES } from '@/constants';

export function useAppNavigation() {
  const router = useRouter();

  return {
    goToToday: useCallback(() => router.push(ROUTES.today), [router]),
    goToLearn: useCallback(() => router.push(ROUTES.learn), [router]),
    goToConsult: useCallback(() => router.push(ROUTES.consult), [router]),
    goToChat: useCallback(() => router.push(ROUTES.chat), [router]),
    goToBookAppointment: useCallback(() => router.push(ROUTES.bookAppointment), [router]),
    goToConsultIntro: useCallback(() => router.push(ROUTES.consultIntro as Href), [router]),
    goToIntakeReview: useCallback(() => router.push(ROUTES.intakeReview as Href), [router]),
    goToAppointment: useCallback((id: string) => router.push(ROUTES.appointment(id)), [router]),
    goToEvent: useCallback((id: string) => router.push(ROUTES.event(id)), [router]),
    goToProduct: useCallback((id: string) => router.push(ROUTES.product(id)), [router]),
    goBack: useCallback(() => router.back(), [router]),
  };
}
