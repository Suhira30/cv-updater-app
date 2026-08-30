'use client';

import React from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { CVWorkspace } from '@/components/workspace/CVWorkspace';
import { ApiKeyModal } from '@/components/ApiKeyModal';

export default function WorkspacePage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      <NavigationHeader currentStepTitle="Workspace — Incremental AI Updation" />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1700px] mx-auto w-full">
        <CVWorkspace />
      </main>

      <ApiKeyModal />
    </div>
  );
}
