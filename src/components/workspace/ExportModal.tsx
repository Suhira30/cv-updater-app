'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { Download, FileText, FileCode, Copy, Check, X, Sparkles } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { currentTex, fileName } = useWorkspaceStore();
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentTex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    const element = document.createElement('a');
    const file = new Blob([`% Compiled PDF for ${fileName}\n\n${currentTex}`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = fileName.replace('.tex', '.pdf');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadTex = () => {
    const element = document.createElement('a');
    const file = new Blob([currentTex], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div className="relative w-full max-w-md rounded-lg bg-bg-surface p-6 shadow-modal border border-border-default space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-default pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-subtle text-accent-primary">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h2 id="export-modal-title" className="text-h2 font-bold text-text-primary">
                Export Your CV
              </h2>
              <p className="text-tiny text-text-secondary">{fileName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary transition-colors"
            aria-label="Close Export Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Export Options List */}
        <div className="space-y-3">
          {/* PDF Option */}
          <div
            onClick={handleDownloadPdf}
            className="group flex items-center justify-between rounded-lg border border-border-default bg-bg-surface p-4 cursor-pointer hover:border-accent-primary hover:bg-accent-subtle/30 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-primary text-text-on-primary font-bold">
                PDF
              </div>
              <div>
                <div className="text-small font-bold text-text-primary">Compiled PDF Document</div>
                <div className="text-tiny text-text-secondary">Ready for job applications</div>
              </div>
            </div>
            <button className="flex items-center space-x-1 rounded-sm bg-accent-primary px-3 py-1.5 text-tiny font-semibold text-text-on-primary group-hover:bg-accent-primary-hover shadow-sm">
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
          </div>

          {/* LaTeX Source Option */}
          <div
            onClick={handleDownloadTex}
            className="group flex items-center justify-between rounded-lg border border-border-default bg-bg-surface p-4 cursor-pointer hover:border-border-strong hover:bg-bg-surface-hover transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-bg-code text-text-on-code font-mono font-bold">
                TeX
              </div>
              <div>
                <div className="text-small font-bold text-text-primary">LaTeX Source File (.tex)</div>
                <div className="text-tiny text-text-secondary">Overleaf &amp; TeX Live compatible</div>
              </div>
            </div>
            <button className="flex items-center space-x-1 rounded-sm border border-border-default bg-bg-surface px-3 py-1.5 text-tiny font-semibold text-text-primary group-hover:bg-bg-surface-hover">
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
          </div>

          {/* Copy to Clipboard Option */}
          <button
            onClick={handleCopyCode}
            className="w-full flex items-center justify-between rounded-lg border border-border-default bg-bg-base p-3 text-tiny text-text-secondary hover:bg-bg-surface-hover transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Copy className="h-4 w-4 text-accent-primary" />
              <span>Copy Raw LaTeX Source Code to Clipboard</span>
            </div>
            {copied ? (
              <span className="flex items-center space-x-1 text-status-success font-bold">
                <Check className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </span>
            ) : (
              <span className="font-semibold text-accent-primary">Copy</span>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-border-default">
          <button
            onClick={onClose}
            className="rounded-sm border border-border-default px-4 py-2 text-small font-semibold text-text-secondary hover:bg-bg-surface-hover"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

