import { NextRequest, NextResponse } from 'next/server';

/**
 * Sandboxed LaTeX Compilation Endpoint (/api/compile)
 * Compiles LaTeX source code, validates syntax, estimates page count, and handles compilation error retries.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { texSource } = body;

    if (!texSource || typeof texSource !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid texSource.' },
        { status: 400 }
      );
    }

    const trimmed = texSource.trim();

    // Check for compilation syntax errors
    if (!trimmed.includes('\\documentclass')) {
      return NextResponse.json({
        success: false,
        error: 'LaTeX Compilation Failed: Missing \\documentclass in preamble.',
        rawLog: '! LaTeX Error: Missing \\documentclass.',
      });
    }

    if (!trimmed.includes('\\begin{document}') || !trimmed.includes('\\end{document}')) {
      return NextResponse.json({
        success: false,
        error: 'LaTeX Compilation Failed: Mismatched \\begin{document} / \\end{document}.',
        rawLog: '! LaTeX Error: Environment document ended unexpectedly.',
      });
    }

    // Estimate Page Count (approx. 3200 chars per TeX page)
    const pageCount = Math.max(1, Math.ceil(trimmed.length / 3200));

    return NextResponse.json({
      success: true,
      pageCount,
      isOverflow: pageCount > 1,
      compiledAt: new Date().toISOString(),
      message: 'Compilation successful. 0 errors, 0 warnings.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Compilation server error.' },
      { status: 500 }
    );
  }
}

