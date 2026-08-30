export interface CustomMacroDefinition {
  name: string;
  argCount: number;
  definition: string;
  exampleUsage: string;
}

export interface StyleContractData {
  fileName: string;
  customMacros: CustomMacroDefinition[];
  datePattern: string;
  bulletTense: 'past-tense' | 'present-tense' | 'mixed';
  sectionOrder: string[];
  preambleCode: string;
  isValidLatex: boolean;
  validationError?: string;
  pageCountEstimate: number;
}

