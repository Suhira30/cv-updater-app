export interface CvTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  thumbnailUrl: string;
  rawPreamble: string;
}

export const CV_TEMPLATES: CvTemplate[] = [
  {
    id: 'technical-swe',
    name: 'Technical / SWE',
    category: 'Engineering & ML',
    description: 'Clean single-column layout optimized for Software Engineers, ML Developers, and Tech Leads. Features custom macro headers and skill tags.',
    badge: 'Popular',
    thumbnailUrl: '/templates/technical-swe.png',
    rawPreamble: `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}

\\definecolor{primary}{RGB}{47, 111, 237}
\\hypersetup{colorlinks=true, linkcolor=primary, urlcolor=primary}

\\titleformat{\\section}{\\large\\bfseries\\uppercase}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{12pt}{6pt}

\\newcommand{\\roleHeader}[4]{%
  \\noindent\\textbf{#1} \\hfill \\textbf{#4}\\\\
  \\textit{#2} \\hfill \\textit{#3}%
}

\\newcommand{\\cvitem}[2]{%
  \\noindent\\textbf{#1:} #2%
}
`,
  },
  {
    id: 'academic-research',
    name: 'Academic / Research',
    category: 'PhDs & Research',
    description: 'Publication and grant-focused template designed for PhD students, postdocs, and university researchers. Emphasizes papers and awards.',
    badge: 'Academic',
    thumbnailUrl: '/templates/academic-research.png',
    rawPreamble: `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}
\\usepackage{titlesec}

\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{14pt}{8pt}

\\newcommand{\\educationItem}[4]{%
  \\noindent\\textbf{#1}, #2 \\hfill \\textbf{#4}\\\\
  \\textit{#3}%
}

\\newcommand{\\publication}[4]{%
  \\noindent #1. \\textbf{"#2"}. \\textit{#3}, #4.%
}
`,
  },
  {
    id: 'clean-minimal',
    name: 'Clean Minimalist',
    category: 'General & Executive',
    description: 'Sleek, minimalist design with balanced font ratios and tight spacing. Ideal for 1-page resumes across all technical roles.',
    badge: 'Compact',
    thumbnailUrl: '/templates/clean-minimal.png',
    rawPreamble: `\\documentclass[10pt,a4paper]{article}
\\usepackage[margin=0.5in]{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}
\\usepackage{titlesec}

\\titleformat{\\section}{\\medium\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{8pt}{4pt}

\\newcommand{\\jobEntry}[4]{%
  \\noindent\\textbf{#1} -- \\textit{#2} \\hfill #3 | #4%
}
`,
  },
];

