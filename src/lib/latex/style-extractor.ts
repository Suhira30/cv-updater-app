import { StyleContractData, CustomMacroDefinition } from '@/types/style-contract';

/**
 * Advanced LaTeX Style Contract Extractor Engine
 * Analyzes uploaded .tex source to detect preamble macros, date formats, section hierarchy, and bullet conventions.
 */
export function extractStyleContract(texSource: string, fileName: string = 'my_cv.tex'): StyleContractData {
  const trimmed = texSource.trim();

  // Basic LaTeX Validation
  const hasDocumentClass = /\\documentclass/.test(trimmed);
  const hasBeginDocument = /\\begin\{document\}/.test(trimmed);
  const hasEndDocument = /\\end\{document\}/.test(trimmed);

  const isValidLatex = hasDocumentClass && hasBeginDocument && hasEndDocument;
  let validationError: string | undefined;

  if (!hasDocumentClass) validationError = 'Missing \\documentclass preamble declaration.';
  else if (!hasBeginDocument) validationError = 'Missing \\begin{document} marker.';
  else if (!hasEndDocument) validationError = 'Missing \\end{document} marker.';

  // Extract Preamble Code (everything before \begin{document})
  const beginDocMatch = trimmed.match(/([\s\S]*?)\\begin\{document\}/);
  const preambleCode = beginDocMatch ? beginDocMatch[1].trim() : '';

  // Extract Custom Macros (\newcommand{\name}[args]{def})
  const customMacros: CustomMacroDefinition[] = [];
  const newCommandRegex = /\\newcommand\{\\([a-zA-Z0-9]+)\}(?:\[(\d+)\])?\{([\s\S]*?)\}/g;
  let match;

  while ((match = newCommandRegex.exec(preambleCode)) !== null) {
    const name = match[1];
    const argCount = match[2] ? parseInt(match[2], 10) : 0;
    const definition = match[3].trim();

    // Create example usage syntax
    let exampleUsage = `\\${name}`;
    for (let i = 1; i <= argCount; i++) {
      exampleUsage += `{arg${i}}`;
    }

    customMacros.push({
      name,
      argCount,
      definition,
      exampleUsage,
    });
  }

  // Extract Section Order (\section{Name})
  const sectionRegex = /\\section\*?\{([^}]+)\}/g;
  const sectionOrder: string[] = [];
  let secMatch;
  while ((secMatch = sectionRegex.exec(trimmed)) !== null) {
    sectionOrder.push(secMatch[1].trim());
  }

  // Detect Date Pattern
  let datePattern = 'MMM YYYY (e.g. Jan 2023)';
  if (/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}/i.test(trimmed)) {
    datePattern = 'MMM YYYY (e.g. Jan 2023 -- Present)';
  } else if (/\d{2}\/\d{4}/.test(trimmed)) {
    datePattern = 'MM/YYYY (e.g. 01/2023)';
  } else if (/\d{4}\s*--\s*\d{4}/.test(trimmed)) {
    datePattern = 'YYYY -- YYYY';
  }

  // Detect Bullet Verb Tense
  let bulletTense: 'past-tense' | 'present-tense' | 'mixed' = 'past-tense';
  const pastTenseCount = (trimmed.match(/\b(Built|Developed|Architected|Engineered|Created|Implemented|Optimized|Led|Managed|Designed)\b/gi) || []).length;
  const presentTenseCount = (trimmed.match(/\b(Building|Developing|Architecting|Engineering|Creating|Implementing|Optimizing|Leading|Managing)\b/gi) || []).length;

  if (presentTenseCount > pastTenseCount) bulletTense = 'present-tense';
  else if (pastTenseCount > 0 && presentTenseCount > 0) bulletTense = 'mixed';

  // Estimate Page Count (roughly 3500 chars per TeX page)
  const pageCountEstimate = Math.max(1, Math.ceil(trimmed.length / 3500));

  return {
    fileName,
    customMacros,
    datePattern,
    bulletTense,
    sectionOrder: sectionOrder.length > 0 ? sectionOrder : ['Education', 'Experience', 'Projects', 'Skills'],
    preambleCode,
    isValidLatex,
    validationError,
    pageCountEstimate,
  };
}

