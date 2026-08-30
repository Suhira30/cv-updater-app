'use client';

import React from 'react';
import { useApiKeyStore } from '@/store/useApiKeyStore';
import { PROVIDER_CONFIGS } from '@/types/api-key';
import { Sparkles, Cpu, ChevronDown } from 'lucide-react';

interface NavigationHeaderProps {
  currentStepTitle?: string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentStepTitle = 'Setup & Input',
}) => {
  const { activeProvider, openModelModal } = useApiKeyStore();

  const activeConfig = PROVIDER_CONFIGS[activeProvider] || PROVIDER_CONFIGS.gemini;

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

        {/* Right Section: AI Model Provider Selector */}
        <div className="flex items-center space-x-3">
          <button
            onClick={openModelModal}
            className="flex items-center space-x-2 rounded-md border border-status-success/30 bg-status-success-bg px-3 py-1.5 text-small font-semibold text-status-success hover:border-status-success transition-all shadow-sm"
            aria-label="Select AI Model Provider"
          >
            <Cpu className="h-4 w-4 shrink-0 text-status-success" />
            <span className="hidden sm:inline">AI Engine: {activeConfig.name}</span>
            <span className="sm:hidden">{activeConfig.name}</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </button>
        </div>
      </div>
    </header>
  );
};
