'use client';

import React from 'react';
import { CV_TEMPLATES, CvTemplate } from '@/lib/templates/template-registry';
import { useWizardStore } from '@/store/useWizardStore';
import { CheckCircle2, Sparkles, FileText } from 'lucide-react';

export const TemplateGallery: React.FC = () => {
  const { templateId, setTemplateId } = useWizardStore();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-h1 font-bold text-text-primary">Choose Your Starter LaTeX Template</h2>
        <p className="text-small text-text-secondary">
          Select a template style tailored for your industry. All templates use publication-grade LaTeX typesetting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {CV_TEMPLATES.map((template: CvTemplate) => {
          const isSelected = templateId === template.id;

          return (
            <div
              key={template.id}
              onClick={() => setTemplateId(template.id)}
              className={`group relative flex flex-col justify-between rounded-lg border p-6 cursor-pointer transition-all ${
                isSelected
                  ? 'border-accent-primary bg-accent-subtle/40 shadow-modal ring-2 ring-accent-primary/20'
                  : 'border-border-default bg-bg-surface hover:border-border-strong hover:shadow-card'
              }`}
            >
              <div className="space-y-4">
                {/* Header Badge & Name */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-bg-base px-2.5 py-0.5 text-tiny font-semibold text-text-secondary border border-border-default">
                    {template.category}
                  </span>
                  {isSelected ? (
                    <span className="flex items-center space-x-1 text-tiny font-bold text-status-success">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Selected</span>
                    </span>
                  ) : (
                    <span className="text-tiny font-medium text-accent-primary">
                      {template.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-h2 font-bold text-text-primary">{template.name}</h3>
                  <p className="text-small text-text-secondary mt-1 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Template Mock Preview Box */}
                <div className="flex h-36 items-center justify-center rounded-md border border-border-default bg-bg-code p-4 text-text-on-code font-mono text-[11px] leading-tight overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="space-y-1 w-full text-left">
                    <div className="text-accent-primary font-bold">{`\\documentclass[11pt]{article}`}</div>
                    <div className="text-text-tertiary">{`\\usepackage{geometry, hyperref}`}</div>
                    <div className="text-status-success font-semibold">{`\\newcommand{\\cvitem}[2]{...}`}</div>
                    <div className="text-text-secondary pt-1">{`\\begin{document}`}</div>
                    <div className="text-text-on-code font-bold pl-2">{`\\section{Experience}`}</div>
                  </div>
                </div>
              </div>

              {/* Action Indicator */}
              <div className="pt-6">
                <button
                  type="button"
                  className={`w-full rounded-sm px-4 py-2.5 text-small font-semibold transition-colors ${
                    isSelected
                      ? 'bg-accent-primary text-text-on-primary shadow-sm'
                      : 'border border-border-default bg-bg-surface text-text-primary group-hover:bg-bg-surface-hover'
                  }`}
                >
                  {isSelected ? 'Selected Template ✓' : 'Use This Template'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

