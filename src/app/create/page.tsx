'use client';

import React from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { WizardStepper } from '@/components/wizard/WizardStepper';
import { QuestionnaireForm } from '@/components/wizard/QuestionnaireForm';
import { ApiKeyModal } from '@/components/ApiKeyModal';

export default function CreateCvPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      <NavigationHeader currentStepTitle="Path A — Questionnaire Wizard" />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8">
        <WizardStepper />
        <QuestionnaireForm />
      </main>

      <ApiKeyModal />
    </div>
  );
}

