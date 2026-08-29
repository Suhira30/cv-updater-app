'use client';

import React, { useState, useEffect } from 'react';
import { useApiKeyStore } from '@/store/useApiKeyStore';
import { LLMProvider, PROVIDER_CONFIGS } from '@/types/api-key';
import { ApiKeyStorage } from '@/lib/storage/api-key-storage';
import { ShieldCheck, Eye, EyeOff, Key, ExternalLink, X, AlertCircle } from 'lucide-react';

export const ApiKeyModal: React.FC = () => {
  const {
    activeProvider,
    apiKey,
    isKeyModalOpen,
    closeKeyModal,
    setActiveProvider,
    saveKey,
    clearKey,
  } = useApiKeyStore();

  const [selectedProvider, setSelectedProvider] = useState<LLMProvider>(activeProvider);
  const [inputKey, setInputKey] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    setSelectedProvider(activeProvider);
    const existingKey = ApiKeyStorage.getKey(activeProvider) || '';
    setInputKey(existingKey);
    setErrorMsg('');
  }, [activeProvider, isKeyModalOpen]);

  if (!isKeyModalOpen) return null;

  const handleProviderChange = (provider: LLMProvider) => {
    setSelectedProvider(provider);
    const existingKey = ApiKeyStorage.getKey(provider) || '';
    setInputKey(existingKey);
    setErrorMsg('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputKey.trim();
    if (!trimmed) {
      setErrorMsg('Please enter a valid API key.');
      return;
    }

    const config = PROVIDER_CONFIGS[selectedProvider];
    if (config.keyPrefix && !trimmed.startsWith(config.keyPrefix)) {
      setErrorMsg(`Warning: ${config.name} keys usually start with '${config.keyPrefix}'. Please check your key.`);
    }

    saveKey(selectedProvider, trimmed);
    setErrorMsg('');
  };

  const handleClear = () => {
    clearKey(selectedProvider);
    setInputKey('');
    setErrorMsg('');
  };

  const currentConfig = PROVIDER_CONFIGS[selectedProvider];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-key-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-lg bg-bg-surface p-6 shadow-modal border border-border-default space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-default pb-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-subtle text-accent-primary">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h2 id="api-key-modal-title" className="text-h2 font-semibold text-text-primary">
                API Key Configuration
              </h2>
              <p className="text-tiny text-text-secondary">Bring Your Own Key (BYO-Key)</p>
            </div>
          </div>
          <button
            onClick={closeKeyModal}
            className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary transition-colors"
            aria-label="Close API Key Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Provider Selector Tabs */}
        <div className="space-y-2">
          <label className="text-small font-medium text-text-primary">Select LLM Provider</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(PROVIDER_CONFIGS) as LLMProvider[]).map((provKey) => {
              const prov = PROVIDER_CONFIGS[provKey];
              const isSelected = selectedProvider === provKey;
              const hasStoredKey = Boolean(ApiKeyStorage.getKey(provKey));

              return (
                <button
                  key={provKey}
                  type="button"
                  onClick={() => handleProviderChange(provKey)}
                  className={`relative flex flex-col items-center justify-center rounded-md border p-3 text-center transition-all ${
                    isSelected
                      ? 'border-accent-primary bg-accent-subtle text-accent-primary font-semibold'
                      : 'border-border-default bg-bg-surface hover:bg-bg-surface-hover text-text-primary'
                  }`}
                >
                  <span className="text-small">{prov.name}</span>
                  {hasStoredKey && (
                    <span className="mt-1 flex items-center text-[10px] text-status-success font-medium">
                      ✓ Saved
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="api-key-input" className="text-small font-medium text-text-primary">
                {currentConfig.name} API Key
              </label>
              <a
                href={currentConfig.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-tiny text-accent-primary hover:underline"
              >
                Get Key <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>

            <div className="relative">
              <input
                id="api-key-input"
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setErrorMsg('');
                }}
                placeholder={currentConfig.placeholder}
                className="w-full rounded-sm border border-border-default bg-bg-surface px-3 py-2.5 pr-10 text-small text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 top-2.5 text-text-secondary hover:text-text-primary"
                aria-label={showKey ? 'Hide API key' : 'Reveal API key'}
              >
                {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {errorMsg && (
              <div className="flex items-center text-tiny text-status-error space-x-1 mt-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Privacy & Security Notice */}
          <div className="flex items-start space-x-2.5 rounded-md bg-status-success-bg p-3 border border-status-success/20 text-status-success">
            <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="text-tiny leading-relaxed">
              <span className="font-semibold">Privacy Guaranteed: </span>
              Your API key is stored securely in your browser&apos;s <code className="font-mono bg-white/60 px-1 py-0.5 rounded">sessionStorage</code> only. It is never saved to a database or sent to backend servers.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-border-default">
            {inputKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-small text-status-error hover:underline"
              >
                Clear Key
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={closeKeyModal}
                className="rounded-sm border border-border-default px-4 py-2 text-small text-text-secondary hover:bg-bg-surface-hover"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-sm bg-accent-primary px-5 py-2 text-small font-medium text-text-on-primary hover:bg-accent-primary-hover shadow-sm"
              >
                Save Key & Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

