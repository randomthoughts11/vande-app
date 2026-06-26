import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCheckIn, getTodayPlan } from '@/lib/api';
import { QUERY_KEYS } from '@/constants';

export function useTodayPlan() {
  return useQuery({
    queryKey: QUERY_KEYS.todayPlan,
    queryFn: getTodayPlan,
  });
}

export function useMoodCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mood: string) => createCheckIn(mood),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todayPlan }),
  });
}
