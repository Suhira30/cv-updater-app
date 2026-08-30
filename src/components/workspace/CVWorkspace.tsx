'use client';

import React, { useEffect, useState } from 'react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { UpdatePromptBox } from './UpdatePromptBox';
import { MonacoDiffEditor } from './MonacoDiffEditor';
import { PdfViewer } from './PdfViewer';
import { SideBySidePdfViewer } from './SideBySidePdfViewer';
import { ErrorCard } from './ErrorCard';
import { PageOverflowBanner } from './PageOverflowBanner';
import { ExportModal } from './ExportModal';
import { Download, Copy, Check, Code2, LayoutGrid, Sparkles, Columns } from 'lucide-react';

export const CVWorkspace: React.FC = () => {
  const {
    initializeWorkspace,
    viewMode,
    setViewMode,
    currentTex,
    proposedTex,
    fileName,
  } = useWorkspaceStore();

  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    initializeWorkspace();
  }, [initializeWorkspace]);

  const activeTexToCopy = proposedTex || currentTex;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeTexToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    const element = document.createElement('a');
    const file = new Blob([`% Compiled PDF for ${fileName}\n\n${activeTexToCopy}`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = fileName.replace('.tex', '.pdf');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col space-y-6 h-[calc(100vh-80px)]">
      {/* Top Header & Workspace Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="text-h2 font-bold text-text-primary">Interactive Workspace</span>

          {/* View Mode Switcher Toggle */}
          <div className="flex items-center rounded-md border border-border-default bg-bg-surface p-1 shadow-sm">
            <button
              onClick={() => setViewMode('split_code_pdf')}
              className={`flex items-center space-x-1.5 rounded px-3 py-1.5 text-tiny font-semibold transition-all ${
                viewMode === 'split_code_pdf'
                  ? 'bg-accent-primary text-text-on-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Code &amp; PDF View</span>
            </button>

            <button
              onClick={() => setViewMode('side_by_side_pdf')}
              className={`flex items-center space-x-1.5 rounded px-3 py-1.5 text-tiny font-semibold transition-all ${
                viewMode === 'side_by_side_pdf'
                  ? 'bg-accent-primary text-text-on-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Columns className="h-3.5 w-3.5" />
              <span>Side-by-Side PDF Comparison (Old vs. New)</span>
            </button>
          </div>
        </div>

        {/* Global Toolbar Buttons */}
        <div className="flex items-center space-x-2">
          {/* One-Click Copy Updated LaTeX Code */}
          <button
            onClick={handleCopyCode}
            className="flex items-center space-x-1.5 rounded-sm border border-border-strong bg-bg-surface px-3.5 py-2 text-small font-semibold text-text-primary hover:bg-bg-surface-hover transition-colors shadow-sm"
            title="Copy Updated LaTeX Code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-status-success" />
            ) : (
              <Copy className="h-4 w-4 text-accent-primary" />
            )}
            <span>{copied ? 'Code Copied!' : 'Copy LaTeX Code'}</span>
          </button>

          {/* One-Click Download Updated PDF */}
          <button
            onClick={handleDownloadPdf}
            className="flex items-center space-x-1.5 rounded-sm bg-status-success px-4 py-2 text-small font-bold text-white hover:bg-status-success/90 shadow-sm transition-all"
            title="Download Updated PDF CV"
          >
            <Download className="h-4 w-4" />
            <span>Download Updated PDF</span>
          </button>

          {/* Full Export Options Modal */}
          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center space-x-1.5 rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-small font-semibold text-text-secondary hover:bg-bg-surface-hover"
          >
            <Download className="h-4 w-4" />
            <span>Export Options</span>
          </button>
        </div>
      </div>

      {/* Page Overflow Warning Banner */}
      <PageOverflowBanner />

      {/* Compiler Error Diagnostics Card */}
      <ErrorCard />

      {/* Updation Prompt Box */}
      <UpdatePromptBox />

      {/* Workspace Viewport Rendering based on Selected View Mode */}
      {viewMode === 'split_code_pdf' ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 pb-4">
          {/* Left Pane: Code Diff Review */}
          <div className="h-full min-h-[400px]">
            <MonacoDiffEditor />
          </div>

          {/* Right Pane: Live PDF Preview */}
          <div className="h-full min-h-[400px]">
            <PdfViewer />
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0 pb-4">
          <SideBySidePdfViewer />
        </div>
      )}

      {/* Export Modal Container */}
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
};
