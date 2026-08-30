import { create } from 'zustand';
import { LLMProvider } from '@/types/api-key';

interface AiModelStoreState {
  activeProvider: LLMProvider;
  isModelModalOpen: boolean;

  // Actions
  setActiveProvider: (provider: LLMProvider) => void;
  openModelModal: () => void;
  closeModelModal: () => void;
}

export const useApiKeyStore = create<AiModelStoreState>((set) => ({
  activeProvider: 'gemini', // Default to Gemini
  isModelModalOpen: false,

  setActiveProvider: (provider: LLMProvider) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('texforge_selected_provider', provider);
    }
    set({ activeProvider: provider, isModelModalOpen: false });
  },

  openModelModal: () => set({ isModelModalOpen: true }),
  closeModelModal: () => set({ isModelModalOpen: false }),
}));
