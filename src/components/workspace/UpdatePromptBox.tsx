'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { Sparkles, Send, Lightbulb, Loader2 } from 'lucide-react';

const SUGGESTION_CHIPS = [
  'Add a new project named AlphaML under Projects with 2 bullets',
  'Add AWS Solutions Architect certification under Skills',
  'Update job title at Acme Corp to Senior Lead Engineer',
  'Add publication: "Distributed AI Architecture (2024)"',
];

export const UpdatePromptBox: React.FC = () => {
  const { applyUpdatePrompt, isGenerating, loadingStage } = useWorkspaceStore();
  const [promptText, setPromptText] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() || isGenerating) return;
    await applyUpdatePrompt(promptText.trim());
    setPromptText('');
  };

  const handleChipClick = (chip: string) => {
    setPromptText(chip);
  };

  return (
    <div className="rounded-lg border border-border-default bg-bg-surface p-5 shadow-card space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-subtle text-accent-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-h3 font-bold text-text-primary">Describe Your Update</h3>
            <p className="text-tiny text-text-secondary">Type in plain English — AI maps &amp; formats LaTeX macros automatically</p>
          </div>
        </div>
      </div>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            disabled={isGenerating}
            placeholder="e.g. Add a new bullet under Experience at Acme Corp: Built a RAG pipeline reducing query latency by 40%..."
            className="w-full rounded-sm border border-border-default bg-bg-surface p-3 text-small text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none min-h-[90px] resize-none disabled:opacity-60"
          />
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-tiny font-bold text-text-tertiary flex items-center space-x-1 mr-1">
            <Lightbulb className="h-3 w-3" />
            <span>Suggestions:</span>
          </span>
          {SUGGESTION_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(chip)}
              disabled={isGenerating}
              className="rounded-full border border-border-default bg-bg-base px-2.5 py-1 text-[11px] font-medium text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors disabled:opacity-50"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Action Button & Loading Status */}
        <div className="flex items-center justify-between pt-2 border-t border-border-default">
          {isGenerating ? (
            <div
              aria-live="polite"
              aria-atomic="true"
              className="flex items-center space-x-2 text-tiny font-semibold text-accent-primary animate-pulse"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{loadingStage}</span>
            </div>
          ) : (
            <span className="text-tiny text-text-tertiary">Press Generate to compile update</span>
          )}

          <button
            type="submit"
            disabled={!promptText.trim() || isGenerating}
            className={`flex items-center space-x-2 rounded-sm px-5 py-2 text-small font-semibold shadow-sm transition-all ${
              promptText.trim() && !isGenerating
                ? 'bg-accent-primary text-text-on-primary hover:bg-accent-primary-hover'
                : 'bg-border-default text-text-tertiary cursor-not-allowed'
            }`}
          >
            <Send className="h-4 w-4" />
            <span>Generate &amp; Compile Update</span>
          </button>
        </div>
      </form>
    </div>
  );
};

