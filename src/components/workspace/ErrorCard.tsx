'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { AlertOctagon, ChevronDown, ChevronUp, RotateCcw, Wrench } from 'lucide-react';

export const ErrorCard: React.FC = () => {
  const { compileError, rawCompileLog, rejectProposedTex } = useWorkspaceStore();
  const [showLog, setShowLog] = useState<boolean>(false);

  if (!compileError) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className="rounded-lg border border-status-error/40 bg-status-error-bg p-5 text-status-error shadow-card space-y-4 animate-in fade-in duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-status-error/10 text-status-error shrink-0">
            <AlertOctagon className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-h3 font-bold text-status-error">LaTeX Compilation Error</h3>
            <p className="text-small text-status-error/90 leading-relaxed font-medium">
              {compileError}
            </p>
          </div>
        </div>

        <button
          onClick={rejectProposedTex}
          className="flex items-center space-x-1 rounded-sm border border-status-error/40 bg-white/60 px-3 py-1.5 text-tiny font-semibold text-status-error hover:bg-white transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Restore Last Working Version</span>
        </button>
      </div>

      {/* Raw Compiler Log Collapsible Accordion */}
      {rawCompileLog && (
        <div className="border-t border-status-error/20 pt-3">
          <button
            onClick={() => setShowLog(!showLog)}
            className="flex items-center space-x-1.5 text-tiny font-bold text-status-error hover:underline"
          >
            {showLog ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span>{showLog ? 'Hide Raw TeX Compiler Log' : 'View Raw TeX Compiler Log'}</span>
          </button>

          {showLog && (
            <div className="mt-2 rounded-md bg-[#0D1117] p-3 font-mono text-[11px] text-[#F85149] overflow-x-auto border border-border-default">
              <pre>{rawCompileLog}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

