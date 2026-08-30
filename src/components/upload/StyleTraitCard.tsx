'use client';

import React from 'react';
import { Sparkles, Code2, Calendar, FileText, CheckCircle2 } from 'lucide-react';

interface StyleTraitCardProps {
  title: string;
  category: string;
  description: string;
  valueBadge: string;
  codeSnippet?: string;
  icon?: React.ReactNode;
}

export const StyleTraitCard: React.FC<StyleTraitCardProps> = ({
  title,
  category,
  description,
  valueBadge,
  codeSnippet,
  icon,
}) => {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-border-default bg-bg-surface p-5 shadow-card hover:border-accent-primary/40 transition-all space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-tiny font-bold text-accent-primary uppercase tracking-wider">
            {category}
          </span>
          <span className="flex items-center space-x-1 text-tiny font-semibold text-status-success bg-status-success-bg px-2.5 py-0.5 rounded-full border border-status-success/20">
            <CheckCircle2 className="h-3 w-3" />
            <span>{valueBadge}</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {icon && <div className="text-accent-primary">{icon}</div>}
          <h3 className="text-h3 font-bold text-text-primary">{title}</h3>
        </div>

        <p className="text-small text-text-secondary leading-relaxed">{description}</p>
      </div>

      {codeSnippet && (
        <div className="rounded-md border border-border-default bg-bg-code p-3 font-mono text-[12px] text-text-on-code overflow-x-auto">
          <code>{codeSnippet}</code>
        </div>
      )}
    </div>
  );
};

