import { create } from 'zustand';

interface IntakeState {
  answers: Record<string, string | string[]>;
  setAnswer: (stepId: string, value: string | string[]) => void;
  getAnswer: (stepId: string) => string | string[] | undefined;
  reset: () => void;
}

export const useIntakeStore = create<IntakeState>((set, get) => ({
  answers: {},
  setAnswer: (stepId, value) =>
    set((state) => ({ answers: { ...state.answers, [stepId]: value } })),
  getAnswer: (stepId) => get().answers[stepId],
  reset: () => set({ answers: {} }),
}));
