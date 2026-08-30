import { create } from 'zustand';
import { StyleContractData } from '@/types/style-contract';
import { extractStyleContract } from '@/lib/latex/style-extractor';

interface UploadedCvStoreState {
  rawTexSource: string;
  fileName: string;
  styleContract: StyleContractData | null;
  step: 'upload' | 'confirm_style';

  // Actions
  setRawTex: (tex: string, fileName?: string) => void;
  updateStyleContract: (data: Partial<StyleContractData>) => void;
  setStep: (step: 'upload' | 'confirm_style') => void;
  reset: () => void;
}

export const useUploadedCvStore = create<UploadedCvStoreState>((set) => ({
  rawTexSource: '',
  fileName: 'my_cv.tex',
  styleContract: null,
  step: 'upload',

  setRawTex: (tex, fileName = 'my_cv.tex') => {
    const contract = extractStyleContract(tex, fileName);
    set({
      rawTexSource: tex,
      fileName,
      styleContract: contract,
      step: 'confirm_style',
    });
  },

  updateStyleContract: (data) => {
    set((state) => ({
      styleContract: state.styleContract ? { ...state.styleContract, ...data } : null,
    }));
  },

  setStep: (step) => set({ step }),

  reset: () =>
    set({
      rawTexSource: '',
      fileName: 'my_cv.tex',
      styleContract: null,
      step: 'upload',
    }),
}));

