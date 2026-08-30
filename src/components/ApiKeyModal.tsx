'use client';

import React from 'react';
import { useApiKeyStore } from '@/store/useApiKeyStore';
import { LLMProvider, PROVIDER_CONFIGS } from '@/types/api-key';
import { Cpu, CheckCircle2, Sparkles, X, ShieldCheck } from 'lucide-react';

export const ApiKeyModal: React.FC = () => {
  const { activeProvider, isModelModalOpen, closeModelModal, setActiveProvider } = useApiKeyStore();

  if (!isModelModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-model-modal-title"
    >
      <div className="relative w-full max-w-xl rounded-lg bg-bg-surface p-6 shadow-modal border border-border-default space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-default pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-subtle text-accent-primary">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <h2 id="ai-model-modal-title" className="text-h2 font-bold text-text-primary">
                Select AI Engine Provider
              </h2>
              <p className="text-tiny text-text-secondary">Zero setup required — powered by our server keys</p>
            </div>
          </div>
          <button
            onClick={closeModelModal}
            className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary transition-colors"
            aria-label="Close Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Server Key Info Banner */}
        <div className="rounded-md bg-status-success-bg p-3.5 border border-status-success/30 flex items-start space-x-3 text-status-success">
          <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="text-small leading-relaxed">
            <span className="font-bold">Zero User Setup: </span>
            You don&apos;t need to provide any API keys! Select your preferred AI model provider below, and our server handles compilation &amp; formatting automatically.
          </div>
        </div>

        {/* Provider Cards List */}
        <div className="space-y-3">
          {(Object.keys(PROVIDER_CONFIGS) as LLMProvider[]).map((provKey) => {
            const prov = PROVIDER_CONFIGS[provKey];
            const isSelected = activeProvider === provKey;

            return (
              <div
                key={provKey}
                onClick={() => setActiveProvider(provKey)}
                className={`group flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-accent-primary bg-accent-subtle/50 shadow-sm ring-1 ring-accent-primary/30'
                    : 'border-border-default bg-bg-surface hover:border-border-strong hover:bg-bg-surface-hover'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-h3 font-bold text-text-primary">{prov.name}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        provKey === 'gemini'
                          ? 'bg-status-success-bg text-status-success border border-status-success/30'
                          : 'bg-bg-base text-text-secondary border border-border-default'
                      }`}
                    >
                      {prov.badge}
                    </span>
                  </div>
                  <p className="text-tiny text-text-secondary">{prov.description}</p>
                </div>

                <div className="shrink-0 ml-4">
                  {isSelected ? (
                    <span className="flex items-center space-x-1 text-tiny font-bold text-status-success bg-status-success-bg px-3 py-1 rounded-full border border-status-success/20">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="rounded-sm border border-border-default bg-bg-surface px-3 py-1.5 text-tiny font-semibold text-text-primary group-hover:bg-accent-primary group-hover:text-white transition-colors"
                    >
                      Select
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-border-default">
          <button
            onClick={closeModelModal}
            className="rounded-sm bg-accent-primary px-5 py-2 text-small font-semibold text-text-on-primary hover:bg-accent-primary-hover shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
