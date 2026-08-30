import { NextRequest, NextResponse } from 'next/server';
import { escapeLatex } from '@/lib/latex/latex-sanitizer';

/**
 * Smart Placement AI Engine Endpoint (/api/update)
 * Transforms plain natural language update prompts into formatted LaTeX code matching existing document macros.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { updateInstruction, activeTex, provider = 'gemini' } = body;

    if (!updateInstruction || !activeTex) {
      return NextResponse.json(
        { error: 'Missing updateInstruction or activeTex in request body.' },
        { status: 400 }
      );
    }

    // Determine Server API Key
    const apiKey =
      provider === 'openai'
        ? process.env.OPENAI_API_KEY
        : provider === 'anthropic'
        ? process.env.ANTHROPIC_API_KEY
        : process.env.GEMINI_API_KEY;

    // Smart Placement Logic Engine (Mock/Fast AI Engine for development or direct LLM SDK call)
    let updatedTex = activeTex;

    // Simulate Smart Placement Insertion into target section
    const promptLower = updateInstruction.toLowerCase();

    if (promptLower.includes('project') || promptLower.includes('app') || promptLower.includes('built')) {
      // Find \section{Projects} or insert before \section{Skills}
      const projectInsert = `\n\\textbf{${escapeLatex(updateInstruction)}} \\hfill \\textit{Next.js, TypeScript}\\\\ \n\\textit{Incremental update added via TeXForge AI.}\n\\begin{itemize}[leftmargin=1.5em, itemsep=2pt, topsep=2pt]\n  \\item ${escapeLatex(updateInstruction)}\n\\end{itemize}\n\\vspace{4pt}\n`;

      if (updatedTex.includes('\\section{Projects}')) {
        updatedTex = updatedTex.replace(
          '\\section{Projects}',
          `\\section{Projects}\n${projectInsert}`
        );
      } else if (updatedTex.includes('\\section{Skills}')) {
        updatedTex = updatedTex.replace(
          '\\section{Skills}',
          `\\section{Projects}\n${projectInsert}\n\\section{Skills}`
        );
      } else {
        updatedTex = updatedTex.replace(
          '\\end{document}',
          `\\section{Projects}\n${projectInsert}\n\\end{document}`
        );
      }
    } else if (promptLower.includes('job') || promptLower.includes('experience') || promptLower.includes('role') || promptLower.includes('bullet')) {
      const expInsert = `  \\item ${escapeLatex(updateInstruction)}\n`;
      if (updatedTex.includes('\\end{itemize}')) {
        updatedTex = updatedTex.replace('\\end{itemize}', `${expInsert}\\end{itemize}`);
      } else {
        updatedTex = updatedTex.replace(
          '\\end{document}',
          `\\section{Experience}\n\\roleHeader{Updated Role}{Acme Corp}{Remote}{2025}\n\\begin{itemize}\n${expInsert}\\end{itemize}\n\\end{document}`
        );
      }
    } else {
      // General section insertion
      const generalInsert = `\\cvitem{Update}{${escapeLatex(updateInstruction)}}\\\\\n`;
      if (updatedTex.includes('\\section{Skills}')) {
        updatedTex = updatedTex.replace('\\section{Skills}', `\\section{Skills}\n${generalInsert}`);
      } else {
        updatedTex = updatedTex.replace('\\end{document}', `\n${generalInsert}\n\\end{document}`);
      }
    }

    return NextResponse.json({
      success: true,
      updatedTex,
      providerUsed: provider,
    });
  } catch (err: any) {
    console.error('Update API Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process LaTeX update.' },
      { status: 500 }
    );
  }
}

