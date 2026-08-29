export type LLMProvider = 'openai' | 'anthropic' | 'gemini';

export interface ProviderConfig {
  id: LLMProvider;
  name: string;
  placeholder: string;
  keyPrefix: string;
  docsUrl: string;
  defaultModel: string;
}

export interface ApiKeyConfig {
  provider: LLMProvider;
  key: string;
  isValidated: boolean;
  lastUpdated?: number;
}

export const PROVIDER_CONFIGS: Record<LLMProvider, ProviderConfig> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    placeholder: 'sk-proj-...',
    keyPrefix: 'sk-',
    docsUrl: 'https://platform.openai.com/api-keys',
    defaultModel: 'gpt-4o',
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic Claude',
    placeholder: 'sk-ant-api...',
    keyPrefix: 'sk-ant-',
    docsUrl: 'https://console.anthropic.com/settings/keys',
    defaultModel: 'claude-3-5-sonnet-20240620',
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    placeholder: 'AIzaSy...',
    keyPrefix: 'AIza',
    docsUrl: 'https://aistudio.google.com/app/apikey',
    defaultModel: 'gemini-1.5-pro',
  },
};

