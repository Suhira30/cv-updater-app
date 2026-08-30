'use client';

import React from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { FileDropzone } from '@/components/upload/FileDropzone';
import { StyleContractSummary } from '@/components/upload/StyleContractSummary';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { useUploadedCvStore } from '@/store/useUploadedCvStore';

export default function UploadPage() {
  const { step } = useUploadedCvStore();

  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      <NavigationHeader currentStepTitle="Path B — Upload &amp; Style Extraction" />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8">
        {step === 'upload' ? <FileDropzone /> : <StyleContractSummary />}
      </main>

      <ApiKeyModal />
    </div>
  );
}

