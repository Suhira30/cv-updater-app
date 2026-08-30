import { create } from 'zustand';
import { useWizardStore } from '@/store/useWizardStore';
import { useUploadedCvStore } from '@/store/useUploadedCvStore';
import { useApiKeyStore } from '@/store/useApiKeyStore';

export type WorkspaceViewMode = 'split_code_pdf' | 'side_by_side_pdf';

interface WorkspaceStoreState {
  currentTex: string;
  proposedTex: string | null;
  fileName: string;
  isGenerating: boolean;
  loadingStage: string;
  pageCount: number;
  isOverflow: boolean;
  compileError: string | null;
  rawCompileLog: string | null;
  viewMode: WorkspaceViewMode;

  // Actions
  initializeWorkspace: () => void;
  setViewMode: (mode: WorkspaceViewMode) => void;
  applyUpdatePrompt: (promptText: string) => Promise<void>;
  acceptProposedTex: () => void;
  rejectProposedTex: () => void;
  updateTexManually: (tex: string) => void;
}

export const useWorkspaceStore = create<WorkspaceStoreState>((set, get) => ({
  currentTex: '',
  proposedTex: null,
  fileName: 'my_cv.tex',
  isGenerating: false,
  loadingStage: '',
  pageCount: 1,
  isOverflow: false,
  compileError: null,
  rawCompileLog: null,
  viewMode: 'split_code_pdf',

  initializeWorkspace: () => {
    const uploadedTex = useUploadedCvStore.getState().rawTexSource;
    const uploadedFileName = useUploadedCvStore.getState().fileName;
    const wizardTex = useWizardStore.getState().generatedLatex || useWizardStore.getState().generateLatex();

    const initialTex = uploadedTex || wizardTex;
    const initialName = uploadedTex ? uploadedFileName : 'my_cv.tex';

    set({
      currentTex: initialTex,
      proposedTex: null,
      fileName: initialName,
      pageCount: Math.max(1, Math.ceil(initialTex.length / 3200)),
      compileError: null,
      viewMode: 'split_code_pdf',
    });
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  applyUpdatePrompt: async (promptText: string) => {
    const activeProvider = useApiKeyStore.getState().activeProvider;
    const currentTex = get().currentTex;

    set({
      isGenerating: true,
      loadingStage: 'Analyzing LaTeX structure & preamble macros...',
      compileError: null,
    });

    try {
      set({ loadingStage: 'Smart Placement AI: Merging update into target section...' });

      const res = await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          updateInstruction: promptText,
          activeTex: currentTex,
          provider: activeProvider,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate update.');
      }

      const newTex = data.updatedTex;

      set({ loadingStage: 'Compiling PDF in Tectonic sandbox (Attempt 1/3)...' });

      const compileRes = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texSource: newTex }),
      });

      const compileData = await compileRes.json();

      if (!compileData.success) {
        set({
          isGenerating: false,
          compileError: compileData.error,
          rawCompileLog: compileData.rawLog,
        });
        return;
      }

      set({
        isGenerating: false,
        proposedTex: newTex,
        pageCount: compileData.pageCount,
        isOverflow: compileData.isOverflow,
        loadingStage: '',
      });
    } catch (err: any) {
      set({
        isGenerating: false,
        compileError: err.message || 'Error processing LaTeX update.',
        loadingStage: '',
      });
    }
  },

  acceptProposedTex: () => {
    const proposed = get().proposedTex;
    if (proposed) {
      set({
        currentTex: proposed,
        proposedTex: null,
      });
    }
  },

  rejectProposedTex: () => {
    set({ proposedTex: null });
  },

  updateTexManually: (tex: string) => {
    set({
      currentTex: tex,
      proposedTex: null,
      pageCount: Math.max(1, Math.ceil(tex.length / 3200)),
    });
  },
}));
