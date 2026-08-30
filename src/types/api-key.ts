export type LLMProvider = 'gemini' | 'openai' | 'anthropic';

export interface ProviderConfig {
  id: LLMProvider;
  name: string;
  badge: string;
  description: string;
  defaultModel: string;
}

export const PROVIDER_CONFIGS: Record<LLMProvider, ProviderConfig> = {
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    badge: 'Recommended / Fast',
    description: 'Gemini 1.5 Flash & Pro — Lightning-fast LaTeX formatting and smart section placement.',
    defaultModel: 'gemini-1.5-flash',
  },
  openai: {
    id: 'openai',
    name: 'OpenAI GPT-4o',
    badge: 'High Precision',
    description: 'GPT-4o — Industry benchmark for complex LaTeX macro handling and style preservation.',
    defaultModel: 'gpt-4o',
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic Claude',
    badge: 'Creative & Concise',
    description: 'Claude 3.5 Sonnet — Exceptional natural language phrasing and bullet trimming.',
    defaultModel: 'claude-3-5-sonnet-20240620',
  },
};
