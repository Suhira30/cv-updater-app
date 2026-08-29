'use client';

import React, { useEffect } from 'react';
import { useApiKeyStore } from '@/store/useApiKeyStore';
import { ApiKeyStorage } from '@/lib/storage/api-key-storage';
import { PROVIDER_CONFIGS } from '@/types/api-key';
import { Key, FileText, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

interface NavigationHeaderProps {
  currentStepTitle?: string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentStepTitle = 'Setup & Input',
}) => {
  const { activeProvider, isKeyConfigured, initializeStore, openKeyModal } = useApiKeyStore();

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  const activeConfig = PROVIDER_CONFIGS[activeProvider];
  const maskedKey = isKeyConfigured
    ? ApiKeyStorage.maskKey(ApiKeyStorage.getKey(activeProvider) || '')
    : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-default bg-bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-primary text-text-on-primary shadow-sm font-bold text-lg">
            TeX
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-h2 font-bold text-text-primary tracking-tight">TeXForge CV</span>
              <span className="rounded-xs bg-accent-subtle px-1.5 py-0.5 text-tiny font-semibold text-accent-primary">
                v1.0 MVP
              </span>
            </div>
            <p className="text-tiny text-text-secondary hidden sm:block">
              LaTeX CV Creator &amp; Updater
            </p>
          </div>
        </div>

        {/* Current Step / Context Indicator */}
        <div className="hidden md:flex items-center space-x-2 rounded-full border border-border-default bg-bg-base px-4 py-1.5 text-small font-medium text-text-secondary">
          <Sparkles className="h-4 w-4 text-accent-primary" />
          <span>Current Step:</span>
          <span className="text-text-primary font-semibold">{currentStepTitle}</span>
        </div>

        {/* Right Section: API Key Status Pill & Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={openKeyModal}
            className={`flex items-center space-x-2 rounded-md border px-3 py-1.5 text-small font-medium transition-all ${
              isKeyConfigured
                ? 'border-status-success/30 bg-status-success-bg text-status-success hover:border-status-success'
                : 'border-status-warning/40 bg-status-warning-bg text-status-warning hover:border-status-warning animate-pulse'
            }`}
            aria-label="Configure API Key"
          >
            {isKeyConfigured ? (
              <>
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">
                  {activeConfig.name} ({maskedKey})
                </span>
                <span className="sm:hidden font-semibold">API Key ✓</span>
              </>
            ) : (
              <>
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span className="font-semibold">Configure API Key 🔑</span>
              </>
            )}
          </button>

          {/* Quick Info Button */}
          <button
            onClick={openKeyModal}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border-default text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary transition-colors"
            title="Settings & Key Config"
          >
            <Key className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

