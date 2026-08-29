import { LLMProvider, ApiKeyConfig } from '@/types/api-key';

const STORAGE_KEY_PREFIX = 'texforge_api_key_';
const ACTIVE_PROVIDER_KEY = 'texforge_active_provider';

/**
 * Secure Client-Side Privacy Storage Manager
 * Ensures API keys are saved strictly in browser sessionStorage (zero disk/db persistence)
 */
export const ApiKeyStorage = {
  /**
   * Save API Key for a specific provider
   */
  saveKey(provider: LLMProvider, key: string): void {
    if (typeof window === 'undefined') return;
    const trimmedKey = key.trim();
    if (!trimmedKey) return;

    sessionStorage.setItem(`${STORAGE_KEY_PREFIX}${provider}`, trimmedKey);
    sessionStorage.setItem(ACTIVE_PROVIDER_KEY, provider);
  },

  /**
   * Retrieve API Key for a specific provider
   */
  getKey(provider: LLMProvider): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(`${STORAGE_KEY_PREFIX}${provider}`);
  },

  /**
   * Retrieve active selected provider
   */
  getActiveProvider(): LLMProvider {
    if (typeof window === 'undefined') return 'openai';
    const active = sessionStorage.getItem(ACTIVE_PROVIDER_KEY) as LLMProvider;
    return active || 'openai';
  },

  /**
   * Get active key configuration
   */
  getActiveKeyConfig(): ApiKeyConfig | null {
    const provider = this.getActiveProvider();
    const key = this.getKey(provider);
    if (!key) return null;

    return {
      provider,
      key,
      isValidated: true,
    };
  },

  /**
   * Clear API key for a provider
   */
  clearKey(provider: LLMProvider): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(`${STORAGE_KEY_PREFIX}${provider}`);
  },

  /**
   * Clear all API keys and session data
   */
  clearAll(): void {
    if (typeof window === 'undefined') return;
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith(STORAGE_KEY_PREFIX) || key === ACTIVE_PROVIDER_KEY) {
        sessionStorage.removeItem(key);
      }
    });
  },

  /**
   * Utility to mask API keys for safe UI display (e.g. "sk-pr...a8f")
   */
  maskKey(key: string): string {
    if (!key || key.length < 8) return '••••••••';
    const prefix = key.slice(0, 5);
    const suffix = key.slice(-4);
    return `${prefix}••••••••${suffix}`;
  },
};

