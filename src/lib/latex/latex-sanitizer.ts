/**
 * Utility for sanitizing and escaping special LaTeX control characters
 * Prevents broken builds or LaTeX injection from user text inputs.
 */
export function escapeLatex(text: string | null | undefined): string {
  if (!text) return '';

  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/&/g, '\\&')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

/**
 * Formats multi-line bullet points into LaTeX \item list
 */
export function formatLatexBullets(bullets: string[]): string {
  if (!bullets || bullets.length === 0) return '';
  return bullets
    .filter((b) => b.trim().length > 0)
    .map((b) => `  \\item ${escapeLatex(b.trim())}`)
    .join('\n');
}

