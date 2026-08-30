'use client';

import React from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { Check, X, Code2, AlertTriangle } from 'lucide-react';

export const MonacoDiffEditor: React.FC = () => {
  const {
    currentTex,
    proposedTex,
    acceptProposedTex,
    rejectProposedTex,
    compileError,
    rawCompileLog,
  } = useWorkspaceStore();

  return (
    <div className="flex flex-col h-full rounded-lg border border-border-default bg-bg-code overflow-hidden shadow-card">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between border-b border-border-default/40 bg-[#161B22] px-4 py-2.5">
        <div className="flex items-center space-x-2">
          <Code2 className="h-4 w-4 text-accent-primary" />
          <span className="text-small font-bold text-text-on-code">LaTeX Code Review</span>
          {proposedTex ? (
            <span className="rounded-full bg-status-warning-bg px-2.5 py-0.5 text-tiny font-bold text-status-warning border border-status-warning/30">
              Proposed Changes Pending Review
            </span>
          ) : (
            <span className="rounded-full bg-status-success-bg px-2.5 py-0.5 text-tiny font-semibold text-status-success border border-status-success/30">
              Active Source
            </span>
          )}
        </div>

        {/* Accept / Reject Hunk Buttons */}
        {proposedTex && (
          <div className="flex items-center space-x-2">
            <button
              onClick={rejectProposedTex}
              className="flex items-center space-x-1 rounded-sm border border-status-error/40 bg-status-error-bg px-3 py-1 text-tiny font-semibold text-status-error hover:bg-status-error/20 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reject Changes</span>
            </button>
            <button
              onClick={acceptProposedTex}
              className="flex items-center space-x-1 rounded-sm bg-status-success px-3.5 py-1 text-tiny font-bold text-white hover:bg-status-success/90 shadow-sm transition-colors"
            >
              <Check className="h-3.5 w-3.5 stroke-[3]" />
              <span>Accept &amp; Apply Changes</span>
            </button>
          </div>
        )}
      </div>

      {/* Compiler Error Diagnostics Box */}
      {compileError && (
        <div className="border-b border-status-error/40 bg-status-error-bg p-4 space-y-2 text-status-error">
          <div className="flex items-center space-x-2 font-bold text-small">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{compileError}</span>
          </div>
          {rawCompileLog && (
            <pre className="rounded bg-black/40 p-2 font-mono text-tiny text-text-on-code overflow-x-auto">
              {rawCompileLog}
            </pre>
          )}
        </div>
      )}

      {/* Editor Canvas */}
      <div className="flex-1 min-h-[350px]">
        {proposedTex ? (
          <DiffEditor
            height="100%"
            language="latex"
            theme="vs-dark"
            original={currentTex}
            modified={proposedTex}
            options={{
              readOnly: true,
              renderSideBySide: true,
              fontSize: 13,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        ) : (
          <DiffEditor
            height="100%"
            language="latex"
            theme="vs-dark"
            original={currentTex}
            modified={currentTex}
            options={{
              readOnly: true,
              renderSideBySide: false,
              fontSize: 13,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        )}
      </div>
    </div>
  );
};

