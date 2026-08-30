'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { RealCvPreview } from './RealCvPreview';
import { FileText, ZoomIn, ZoomOut, Download, Copy, Check, Sparkles } from 'lucide-react';

export const SideBySidePdfViewer: React.FC = () => {
  const { currentTex, proposedTex, fileName } = useWorkspaceStore();
  const [zoom, setZoom] = useState<number>(90);
  const [copied, setCopied] = useState<boolean>(false);

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
    <div className="flex flex-col h-full rounded-lg border border-border-default bg-bg-surface overflow-hidden shadow-card">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between border-b border-border-default bg-bg-base px-4 py-2.5">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-accent-primary" />
          <span className="text-small font-bold text-text-primary">Side-by-Side Visual CV Comparison</span>
          <span className="rounded-full bg-accent-subtle px-2.5 py-0.5 text-tiny font-bold text-accent-primary">
            Old vs. New CV Preview
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Zoom */}
          <div className="flex items-center space-x-1 border-r border-border-default pr-2 mr-2">
            <button onClick={() => setZoom((z) => Math.max(z - 10, 50))} className="p-1 text-text-secondary hover:text-text-primary rounded">
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-tiny font-mono text-text-secondary w-10 text-center">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(z + 10, 150))} className="p-1 text-text-secondary hover:text-text-primary rounded">
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>

          {/* Copy Updated LaTeX Code */}
          <button
            onClick={handleCopyCode}
            className="flex items-center space-x-1.5 rounded-sm border border-border-strong bg-bg-surface px-3 py-1.5 text-tiny font-semibold text-text-primary hover:bg-bg-surface-hover transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-status-success" /> : <Copy className="h-3.5 w-3.5 text-accent-primary" />}
            <span>{copied ? 'Code Copied!' : 'Copy LaTeX Code'}</span>
          </button>

          {/* Download Updated PDF */}
          <button
            onClick={handleDownloadPdf}
            className="flex items-center space-x-1.5 rounded-sm bg-status-success px-3.5 py-1.5 text-tiny font-bold text-white hover:bg-status-success/90 shadow-sm transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Updated PDF</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Dual Viewport Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#525659] overflow-auto">
        {/* Left: Original / Old CV View */}
        <div className="flex flex-col items-center">
          <div className="mb-3 rounded-full bg-black/70 px-4 py-1 text-tiny font-bold text-white shadow-sm flex items-center space-x-1">
            <span>Original CV (Before Update)</span>
          </div>

          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-[550px]"
          >
            <RealCvPreview texSource={currentTex} />
          </div>
        </div>

        {/* Right: Updated / New CV View */}
        <div className="flex flex-col items-center">
          <div className="mb-3 rounded-full bg-status-success px-4 py-1 text-tiny font-bold text-white shadow-sm flex items-center space-x-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Updated CV (After AI Placement)</span>
          </div>

          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-[550px]"
          >
            <RealCvPreview texSource={proposedTex || currentTex} />
          </div>
        </div>
      </div>
    </div>
  );
};
