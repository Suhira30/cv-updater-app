'use client';

import React from 'react';
import { useWizardStore, WizardStep } from '@/store/useWizardStore';
import { Check } from 'lucide-react';

const STEPS = [
  { step: 1 as WizardStep, title: 'Template' },
  { step: 2 as WizardStep, title: 'Personal Info' },
  { step: 3 as WizardStep, title: 'Experience' },
  { step: 4 as WizardStep, title: 'Education & Skills' },
  { step: 5 as WizardStep, title: 'Projects & Finish' },
];

export const WizardStepper: React.FC = () => {
  const { currentStep, setStep } = useWizardStore();

  return (
    <nav aria-label="Progress Stepper" className="w-full py-4">
      <ol className="flex items-center justify-between w-full max-w-4xl mx-auto">
        {STEPS.map((s, idx) => {
          const isCompleted = currentStep > s.step;
          const isCurrent = currentStep === s.step;

          return (
            <li key={s.step} className="relative flex-1 flex flex-col items-center group">
              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <div
                  className={`absolute top-4 left-[50%] right-[-50%] h-0.5 z-0 transition-colors ${
                    isCompleted ? 'bg-status-success' : 'bg-border-default'
                  }`}
                />
              )}

              {/* Circle Badge */}
              <button
                onClick={() => setStep(s.step)}
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-tiny font-bold transition-all ${
                  isCompleted
                    ? 'bg-status-success text-white ring-2 ring-status-success/30'
                    : isCurrent
                    ? 'bg-accent-primary text-white ring-4 ring-accent-subtle shadow-sm'
                    : 'bg-bg-surface border border-border-strong text-text-secondary hover:border-accent-primary'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Step ${s.step}: ${s.title}`}
              >
                {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : s.step}
              </button>

              {/* Step Label */}
              <span
                className={`mt-2 text-tiny font-medium text-center transition-colors ${
                  isCurrent
                    ? 'text-accent-primary font-bold'
                    : isCompleted
                    ? 'text-status-success font-semibold'
                    : 'text-text-secondary'
                }`}
              >
                {s.title}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

