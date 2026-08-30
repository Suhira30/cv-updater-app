'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { AlertTriangle, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

export const PageOverflowBanner: React.FC = () => {
  const { pageCount, isOverflow, applyUpdatePrompt } = useWorkspaceStore();
  const [isTrimming, setIsTrimming] = useState<boolean>(false);
  const [trimSuccess, setTrimSuccess] = useState<boolean>(false);

  if (!isOverflow && !trimSuccess) return null;

  const handleAiTrim = async () => {
    setIsTrimming(true);
    setTrimSuccess(false);

    try {
      await applyUpdatePrompt('Rephrase and compress bullet points slightly to fit the document cleanly onto 1 page.');
      setTrimSuccess(true);
    } catch (err) {
      console.error('Trim error:', err);
    } finally {
      setIsTrimming(false);
    }
  };

  return (
    <div className="rounded-md bg-status-warning-bg p-4 border border-status-warning/40 text-status-warning shadow-sm flex items-center justify-between animate-in fade-in duration-200">
      <div className="flex items-center space-x-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-status-warning/20 text-status-warning shrink-0">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <div className="text-small font-bold">Page Overflow Alert ({pageCount} Pages)</div>
          <p className="text-tiny text-status-warning/90">
            Your document currently spans {pageCount} pages. 1-page resumes are recommended for most technical roles.
          </p>
        </div>
      </div>

      <button
        onClick={handleAiTrim}
        disabled={isTrimming}
        className="flex items-center space-x-2 rounded-sm bg-status-warning px-4 py-2 text-small font-bold text-white hover:bg-status-warning/90 shadow-sm transition-all shrink-0 disabled:opacity-60"
      >
        {isTrimming ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Trimming Bullets...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            <span>1-Click AI Bullet Trimmer</span>
          </>
        )}
      </button>
    </div>
  );
};

