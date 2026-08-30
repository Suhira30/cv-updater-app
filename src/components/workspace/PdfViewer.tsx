'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { RealCvPreview } from './RealCvPreview';
import { FileText, ZoomIn, ZoomOut, Download, AlertTriangle, CheckCircle2, Code } from 'lucide-react';

export const PdfViewer: React.FC = () => {
  const { currentTex, fileName, pageCount, isOverflow } = useWorkspaceStore();
  const [zoom, setZoom] = useState<number>(100);
  const [showRawTex, setShowRawTex] = useState<boolean>(false);

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
    <div className="flex flex-col h-full rounded-lg border border-border-default bg-bg-surface overflow-hidden shadow-card">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between border-b border-border-default bg-bg-base px-4 py-2.5">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-accent-primary" />
          <span className="text-small font-bold text-text-primary">Typeset CV Preview</span>

          {/* Page Overflow Alert Badge */}
          {isOverflow ? (
            <span className="flex items-center space-x-1 rounded-full bg-status-warning-bg px-2.5 py-0.5 text-tiny font-bold text-status-warning border border-status-warning/30">
              <AlertTriangle className="h-3 w-3" />
              <span>{pageCount} Pages (Overflow Warning)</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1 rounded-full bg-status-success-bg px-2.5 py-0.5 text-tiny font-semibold text-status-success border border-status-success/30">
              <CheckCircle2 className="h-3 w-3" />
              <span>{pageCount} Page (Target Met)</span>
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Raw Code Toggle */}
          <button
            onClick={() => setShowRawTex(!showRawTex)}
            className={`flex items-center space-x-1 rounded px-2.5 py-1 text-tiny font-semibold transition-colors ${
              showRawTex
                ? 'bg-accent-primary text-white'
                : 'border border-border-default bg-bg-surface text-text-secondary hover:text-text-primary'
            }`}
            title="Toggle Raw LaTeX Source View"
          >
            <Code className="h-3.5 w-3.5" />
            <span>{showRawTex ? 'Raw TeX' : 'Visual Preview'}</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 border-r border-border-default pr-2 mr-2">
            <button
              onClick={() => setZoom((z) => Math.max(z - 10, 50))}
              className="p-1 text-text-secondary hover:text-text-primary rounded"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-tiny font-mono text-text-secondary w-10 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 10, 150))}
              className="p-1 text-text-secondary hover:text-text-primary rounded"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>

          {/* Download Buttons */}
          <button
            onClick={handleDownloadTex}
            className="flex items-center space-x-1 rounded-sm border border-border-strong bg-bg-surface px-3 py-1 text-tiny font-semibold text-text-primary hover:bg-bg-surface-hover transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>.tex Source</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="flex items-center space-x-1 rounded-sm bg-accent-primary px-3.5 py-1 text-tiny font-bold text-text-on-primary hover:bg-accent-primary-hover shadow-sm transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download .pdf</span>
          </button>
        </div>
      </div>

      {/* PDF Document Render Area */}
      <div className="flex-1 overflow-auto p-6 bg-[#525659] flex justify-center items-start">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="w-[620px] transition-transform duration-200"
        >
          {showRawTex ? (
            <div className="w-full bg-white rounded shadow-2xl p-8 font-mono text-[11px] whitespace-pre-wrap leading-normal text-gray-800 border">
              {currentTex || '% No LaTeX content loaded.'}
            </div>
          ) : (
            <RealCvPreview texSource={currentTex} />
          )}
        </div>
      </div>
    </div>
  );
};
