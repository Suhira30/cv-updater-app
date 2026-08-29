'use client';

import React from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { useApiKeyStore } from '@/store/useApiKeyStore';
import { FilePlus2, UploadCloud, ShieldCheck, Sparkles, Code2, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { isKeyConfigured, openKeyModal } = useApiKeyStore();

  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      {/* Navigation Header */}
      <NavigationHeader currentStepTitle="Entry Path Selection" />

      {/* Main Container */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        {/* Banner Alert if API Key is not yet configured */}
        {!isKeyConfigured && (
          <div className="flex items-center justify-between rounded-md bg-status-warning-bg p-4 border border-status-warning/30 text-status-warning shadow-sm">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <div className="text-small">
                <span className="font-semibold">Setup Required: </span>
                Please configure your LLM API Key (OpenAI, Anthropic, or Gemini) to enable AI LaTeX generation and smart updates.
              </div>
            </div>
            <button
              onClick={openKeyModal}
              className="rounded-sm bg-status-warning px-3.5 py-1.5 text-tiny font-semibold text-white hover:bg-status-warning/90 transition-colors shrink-0"
            >
              Configure Key 🔑
            </button>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center space-x-2 rounded-full border border-accent-primary/20 bg-accent-subtle px-3.5 py-1 text-tiny font-semibold text-accent-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Zero Manual LaTeX Editing</span>
          </div>
          <h1 className="text-display font-bold text-text-primary tracking-tight">
            Create &amp; Update Publication-Grade LaTeX Resumes
          </h1>
          <p className="text-body text-text-secondary leading-relaxed">
            Get 100% authentic, compilation-backed LaTeX CVs without dealing with broken packages, complex macros, or compiler errors. Choose your onboarding path below:
          </p>
        </div>

        {/* Dual Entry Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Path A Card */}
          <div className="group relative flex flex-col justify-between rounded-lg border border-border-default bg-bg-surface p-8 shadow-card transition-all hover:shadow-popover hover:border-accent-primary/50">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent-subtle text-accent-primary">
                <FilePlus2 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-tiny font-bold text-accent-primary uppercase tracking-wider">
                  Path A — New Users
                </span>
                <h2 className="text-h1 font-bold text-text-primary mt-1">Create from Scratch</h2>
              </div>
              <p className="text-small text-text-secondary leading-relaxed">
                Select a battle-tested LaTeX template (*Technical SWE*, *Academic/Research*, or *Clean Minimal*) and fill out a guided questionnaire wizard.
              </p>
              <ul className="space-y-2 text-tiny text-text-secondary pt-2">
                <li className="flex items-center space-x-2">
                  <span className="text-status-success font-bold">✓</span>
                  <span>No prior LaTeX knowledge required</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-status-success font-bold">✓</span>
                  <span>Structured questionnaire (Info, Experience, Skills)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-status-success font-bold">✓</span>
                  <span>Instant initial PDF preview &amp; compilation</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => {
                  if (!isKeyConfigured) openKeyModal();
                }}
                className="w-full flex items-center justify-center space-x-2 rounded-sm bg-accent-primary px-5 py-3 text-small font-semibold text-text-on-primary hover:bg-accent-primary-hover shadow-sm transition-all"
              >
                <span>Start with Template</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Path B Card */}
          <div className="group relative flex flex-col justify-between rounded-lg border border-border-default bg-bg-surface p-8 shadow-card transition-all hover:shadow-popover hover:border-accent-primary/50">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent-subtle text-accent-primary">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <span className="text-tiny font-bold text-accent-primary uppercase tracking-wider">
                  Path B — Existing LaTeX Users
                </span>
                <h2 className="text-h1 font-bold text-text-primary mt-1">Upload Existing .tex File</h2>
              </div>
              <p className="text-small text-text-secondary leading-relaxed">
                Upload or paste your existing <code className="font-mono bg-bg-base px-1.5 py-0.5 rounded text-text-primary">.tex</code> code. Use plain English prompts for all future incremental updates.
              </p>
              <ul className="space-y-2 text-tiny text-text-secondary pt-2">
                <li className="flex items-center space-x-2">
                  <span className="text-status-success font-bold">✓</span>
                  <span>Parses preamble, custom macros &amp; style rules</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-status-success font-bold">✓</span>
                  <span>Smart Placement AI merges updates into exact section</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-status-success font-bold">✓</span>
                  <span>Side-by-side code diff + live PDF preview</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => {
                  if (!isKeyConfigured) openKeyModal();
                }}
                className="w-full flex items-center justify-center space-x-2 rounded-sm border border-border-strong bg-bg-surface px-5 py-3 text-small font-semibold text-text-primary hover:bg-bg-surface-hover transition-all"
              >
                <Code2 className="h-4 w-4" />
                <span>Upload .tex File</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* API Key Modal Container */}
      <ApiKeyModal />
    </div>
  );
}

