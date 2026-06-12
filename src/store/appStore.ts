import { create } from 'zustand';

interface AppState {
  selectedMood: string | null;
  draftMessage: string;
  setSelectedMood: (mood: string | null) => void;
  setDraftMessage: (message: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedMood: null,
  draftMessage: '',
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  setDraftMessage: (message) => set({ draftMessage: message }),
}));
