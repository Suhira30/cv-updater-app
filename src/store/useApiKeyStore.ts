import { create } from 'zustand';
import { LLMProvider } from '@/types/api-key';
import { ApiKeyStorage } from '@/lib/storage/api-key-storage';

interface ApiKeyStoreState {
  activeProvider: LLMProvider;
  apiKey: string;
  isKeyModalOpen: boolean;
  isKeyConfigured: boolean;

  // Actions
  initializeStore: () => void;
  setActiveProvider: (provider: LLMProvider) => void;
  saveKey: (provider: LLMProvider, key: string) => void;
  clearKey: (provider: LLMProvider) => void;
  openKeyModal: () => void;
  closeKeyModal: () => void;
}

export const useApiKeyStore = create<ApiKeyStoreState>((set, get) => ({
  activeProvider: 'openai',
  apiKey: '',
  isKeyModalOpen: false,
  isKeyConfigured: false,

  initializeStore: () => {
    if (typeof window === 'undefined') return;
    const provider = ApiKeyStorage.getActiveProvider();
    const key = ApiKeyStorage.getKey(provider) || '';

    set({
      activeProvider: provider,
      apiKey: key,
      isKeyConfigured: Boolean(key),
    });
  },

  setActiveProvider: (provider: LLMProvider) => {
    const key = ApiKeyStorage.getKey(provider) || '';
    set({
      activeProvider: provider,
      apiKey: key,
      isKeyConfigured: Boolean(key),
    });
  },

  saveKey: (provider: LLMProvider, key: string) => {
    ApiKeyStorage.saveKey(provider, key);
    set({
      activeProvider: provider,
      apiKey: key,
      isKeyConfigured: true,
      isKeyModalOpen: false,
    });
  },

  clearKey: (provider: LLMProvider) => {
    ApiKeyStorage.clearKey(provider);
    const currentProvider = get().activeProvider;
    if (currentProvider === provider) {
      set({
        apiKey: '',
        isKeyConfigured: false,
      });
    }
  },

  openKeyModal: () => set({ isKeyModalOpen: true }),
  closeKeyModal: () => set({ isKeyModalOpen: false }),
}));

