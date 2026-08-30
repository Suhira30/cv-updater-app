'use client';

import React from 'react';
import { useUploadedCvStore } from '@/store/useUploadedCvStore';
import { StyleTraitCard } from './StyleTraitCard';
import { Sparkles, ArrowRight, RotateCcw, FileCheck2, Code2, Calendar, ListOrdered } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const StyleContractSummary: React.FC = () => {
  const { styleContract, fileName, reset } = useUploadedCvStore();
  const router = useRouter();

  if (!styleContract) return null;

  const handleProceed = () => {
    // Save to session or store and proceed to workspace
    router.push('/workspace');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 rounded-full border border-status-success/30 bg-status-success-bg px-3.5 py-1 text-tiny font-bold text-status-success">
          <FileCheck2 className="h-4 w-4" />
          <span>Style Contract Analyzed Successfully</span>
        </div>
        <h2 className="text-h1 font-bold text-text-primary">
          Detected Style Conventions from <code className="font-mono text-accent-primary">{fileName}</code>
        </h2>
        <p className="text-small text-text-secondary max-w-2xl mx-auto">
          Our AI will enforce these exact macros, date syntaxes, and formatting rules whenever you request new updates.
        </p>
      </div>

      {/* Grid of Trait Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Custom Macros */}
        <StyleTraitCard
          title="Custom Macros & Commands"
          category="Preamble Syntax"
          description={
            styleContract.customMacros.length > 0
              ? `Found ${styleContract.customMacros.length} custom macro definitions. All new content will reuse these macros.`
              : 'Standard LaTeX command structure detected (\item, \section).'
          }
          valueBadge={
            styleContract.customMacros.length > 0
              ? `${styleContract.customMacros.length} Custom Macros Indexed`
              : 'Standard Macros'
          }
          codeSnippet={
            styleContract.customMacros.length > 0
              ? styleContract.customMacros.map((m) => m.exampleUsage).join('\n')
              : '\\newcommand{\\cvitem}[2]{...}'
          }
          icon={<Code2 className="h-5 w-5" />}
        />

        {/* Card 2: Date Formatting */}
        <StyleTraitCard
          title="Date Pattern"
          category="Temporal Syntax"
          description="Ensures all new job dates and project timelines match your existing date alignment."
          valueBadge={styleContract.datePattern}
          codeSnippet="Jan 2023 -- Present"
          icon={<Calendar className="h-5 w-5" />}
        />

        {/* Card 3: Bullet Verb Tense */}
        <StyleTraitCard
          title="Bullet Verb Tense"
          category="Grammar Alignment"
          description="New bullet points will be phrased matching your current action-verb tense style."
          valueBadge={
            styleContract.bulletTense === 'past-tense'
              ? 'Past Tense Verbs (Built, Led)'
              : 'Active Verbs'
          }
          codeSnippet="• Built microservices handling 10M+ daily requests..."
          icon={<Sparkles className="h-5 w-5" />}
        />

        {/* Card 4: Section Order */}
        <StyleTraitCard
          title="Section Order & Hierarchy"
          category="Document Structure"
          description="New additions will be placed inside existing sections or added following section hierarchy."
          valueBadge={`${styleContract.sectionOrder.length} Sections Indexed`}
          codeSnippet={styleContract.sectionOrder.join(' → ')}
          icon={<ListOrdered className="h-5 w-5" />}
        />
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-border-default">
        <button
          onClick={reset}
          className="flex items-center space-x-2 rounded-sm border border-border-default px-4 py-2.5 text-small font-semibold text-text-secondary hover:bg-bg-surface-hover transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Upload Different .tex File</span>
        </button>

        <button
          onClick={handleProceed}
          className="flex items-center space-x-2 rounded-sm bg-status-success px-6 py-3 text-small font-bold text-white hover:bg-status-success/90 shadow-sm transition-all"
        >
          <span>Confirm &amp; Proceed to Workspace</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

