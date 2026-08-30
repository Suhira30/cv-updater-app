import { create } from 'zustand';
import { CvWizardData } from '@/lib/validations/cv-wizard-schema';
import { buildLatexFromWizardData } from '@/lib/templates/latex-builder';

export type WizardStep = 1 | 2 | 3 | 4 | 5;

interface WizardStoreState {
  currentStep: WizardStep;
  templateId: string;
  wizardData: CvWizardData;
  generatedLatex: string;

  // Actions
  setStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setTemplateId: (id: string) => void;
  updateWizardData: (data: Partial<CvWizardData>) => void;
  generateLatex: () => string;
}

const INITIAL_WIZARD_DATA: CvWizardData = {
  templateId: 'technical-swe',
  personalInfo: {
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/janedoe',
    github: 'github.com/janedoe',
    website: 'janedoe.dev',
  },
  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'Senior Software Engineer',
      company: 'Acme Corp',
      location: 'San Francisco, CA',
      startDate: 'Jan 2023',
      endDate: 'Present',
      isCurrent: true,
      bullets: [
        'Architected high-throughput distributed microservices using Go and React handling 10M+ daily requests.',
        'Optimized PostgreSQL query latency by 45% through composite index refactoring and caching.',
      ],
    },
  ],
  educations: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      graduationDate: 'May 2022',
      gpaOrHonors: '3.9/4.0',
    },
  ],
  skillCategories: [
    {
      id: 'skill-1',
      categoryName: 'Languages',
      skillsList: 'TypeScript, Go, Python, C++, SQL, HTML/CSS',
    },
    {
      id: 'skill-2',
      categoryName: 'Frameworks & Tools',
      skillsList: 'React, Next.js, Node.js, Docker, Kubernetes, AWS, PostgreSQL, Git',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      projectName: 'TeXForge CV',
      description: 'Open-source LaTeX CV creator and updater powered by AI.',
      technologies: 'Next.js, TypeScript, Tailwind, Tectonic',
      projectLink: 'github.com/janedoe/texforge',
      bullets: [
        'Built real-time side-by-side LaTeX diff viewer and PDF renderer using pdf.js.',
      ],
    },
  ],
};

export const useWizardStore = create<WizardStoreState>((set, get) => ({
  currentStep: 1,
  templateId: 'technical-swe',
  wizardData: INITIAL_WIZARD_DATA,
  generatedLatex: '',

  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const next = Math.min(get().currentStep + 1, 5) as WizardStep;
    set({ currentStep: next });
  },

  prevStep: () => {
    const prev = Math.max(get().currentStep - 1, 1) as WizardStep;
    set({ currentStep: prev });
  },

  setTemplateId: (id) => {
    set((state) => ({
      templateId: id,
      wizardData: { ...state.wizardData, templateId: id },
    }));
  },

  updateWizardData: (data) => {
    set((state) => {
      const updated = { ...state.wizardData, ...data };
      return { wizardData: updated };
    });
  },

  generateLatex: () => {
    const latex = buildLatexFromWizardData(get().wizardData);
    set({ generatedLatex: latex });
    return latex;
  },
}));

