'use client';

import React, { useState, useCallback } from 'react';
import { useUploadedCvStore } from '@/store/useUploadedCvStore';
import { UploadCloud, FileCode2, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

export const FileDropzone: React.FC = () => {
  const { setRawTex } = useUploadedCvStore();

  const [pastedTex, setPastedTex] = useState<string>('');
  const [fileName, setFileName] = useState<string>('my_cv.tex');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleFileUpload = useCallback(
    (file: File) => {
      if (!file.name.endsWith('.tex') && !file.name.endsWith('.txt')) {
        setErrorMsg('Please select a valid .tex LaTeX file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          setFileName(file.name);
          setPastedTex(text);
          setErrorMsg('');
        }
      };
      reader.readAsText(file);
    },
    []
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = pastedTex.trim();
    if (!trimmed) {
      setErrorMsg('Please upload a file or paste your .tex code.');
      return;
    }

    if (!trimmed.includes('\\documentclass')) {
      setErrorMsg('Warning: Code missing \\documentclass declaration. Please check your LaTeX source.');
      return;
    }

    setRawTex(trimmed, fileName);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-h1 font-bold text-text-primary">Path B — Import Existing .tex Source</h2>
        <p className="text-small text-text-secondary max-w-2xl mx-auto">
          Upload your existing LaTeX file or paste its code below. We will automatically analyze your preamble, custom macros, bullet tenses, and section structure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Drag & Drop Container */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-all ${
              isDragging
                ? 'border-accent-primary bg-accent-subtle/50 scale-[1.01]'
                : 'border-border-strong bg-bg-surface hover:border-accent-primary/50'
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-subtle text-accent-primary mb-4">
              <UploadCloud className="h-6 w-6" />
            </div>

            <h3 className="text-h3 font-bold text-text-primary">Drag &amp; Drop your .tex File</h3>
            <p className="text-tiny text-text-secondary mt-1">Supports standalone .tex files (up to 5MB)</p>

            <div className="my-4 flex items-center space-x-2 text-tiny text-text-tertiary">
              <span className="h-px w-12 bg-border-default"></span>
              <span>OR</span>
              <span className="h-px w-12 bg-border-default"></span>
            </div>

            <label className="cursor-pointer rounded-sm bg-accent-primary px-4 py-2 text-small font-semibold text-text-on-primary hover:bg-accent-primary-hover shadow-sm transition-colors">
              Browse File
              <input
                type="file"
                accept=".tex,.txt"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </label>

            {fileName && pastedTex && (
              <div className="mt-4 flex items-center space-x-2 rounded-full bg-status-success-bg px-3 py-1 text-tiny font-semibold text-status-success border border-status-success/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Loaded: {fileName} ({Math.round(pastedTex.length / 1024)} KB)</span>
              </div>
            )}
          </div>

          {/* Paste Raw .tex Code Textarea */}
          <div className="flex flex-col rounded-lg border border-border-default bg-bg-surface p-6 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="tex-paste-input" className="text-small font-bold text-text-primary flex items-center space-x-1.5">
                <FileCode2 className="h-4 w-4 text-accent-primary" />
                <span>Paste Raw .tex Source</span>
              </label>
              {pastedTex && (
                <span className="text-tiny text-text-secondary">
                  {pastedTex.split('\n').length} lines
                </span>
              )}
            </div>

            <textarea
              id="tex-paste-input"
              value={pastedTex}
              onChange={(e) => {
                setPastedTex(e.target.value);
                setErrorMsg('');
              }}
              placeholder="\documentclass[11pt]{article}&#10;\usepackage{hyperref}&#10;..."
              className="flex-1 min-h-[220px] w-full rounded-sm border border-border-default bg-bg-code p-3 font-mono text-code text-text-on-code focus:border-border-focus focus:outline-none resize-none"
              spellCheck={false}
            />
          </div>
        </div>

        {errorMsg && (
          <div className="flex items-center space-x-2 rounded-md bg-status-error-bg p-3 border border-status-error/30 text-status-error text-small">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={!pastedTex.trim()}
            className={`flex items-center space-x-2 rounded-sm px-6 py-3 text-small font-bold transition-all shadow-sm ${
              pastedTex.trim()
                ? 'bg-accent-primary text-text-on-primary hover:bg-accent-primary-hover'
                : 'bg-border-default text-text-tertiary cursor-not-allowed'
            }`}
          >
            <span>Analyze Style &amp; Extract Macros</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

