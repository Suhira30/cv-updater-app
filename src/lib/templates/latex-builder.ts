import { CvWizardData } from '@/lib/validations/cv-wizard-schema';
import { CV_TEMPLATES } from '@/lib/templates/template-registry';
import { escapeLatex } from '@/lib/latex/latex-sanitizer';

/**
 * Builds compilable LaTeX source code from structured Questionnaire JSON data
 */
export function buildLatexFromWizardData(data: CvWizardData): string {
  const template = CV_TEMPLATES.find((t) => t.id === data.templateId) || CV_TEMPLATES[0];

  let latex = `${template.rawPreamble}\n\\begin{document}\n\n`;

  // 1. Personal Header Section
  const info = data.personalInfo;
  latex += `% Header Section\n`;
  latex += `\\begin{center}\n`;
  latex += `  {\\Huge \\bfseries ${escapeLatex(info.fullName)}}\\\\[4pt]\n`;

  const contactParts: string[] = [];
  if (info.email) contactParts.push(`\\href{mailto:${info.email}}{${escapeLatex(info.email)}}`);
  if (info.phone) contactParts.push(escapeLatex(info.phone));
  if (info.location) contactParts.push(escapeLatex(info.location));
  if (info.linkedin) contactParts.push(`\\href{https://${info.linkedin}}{LinkedIn}`);
  if (info.github) contactParts.push(`\\href{https://${info.github}}{GitHub}`);
  if (info.website) contactParts.push(`\\href{https://${info.website}}{Portfolio}`);

  latex += `  ${contactParts.join(' \\ \\vert\\ ')}\n`;
  latex += `\\end{center}\n\n`;

  // 2. Education Section
  if (data.educations && data.educations.length > 0) {
    latex += `\\section{Education}\n`;
    data.educations.forEach((edu) => {
      latex += `\\noindent\\textbf{${escapeLatex(edu.institution)}} \\hfill \\textbf{${escapeLatex(edu.graduationDate)}}\\\\ \n`;
      latex += `\\textit{${escapeLatex(edu.degree)}} \\hfill \\textit{${escapeLatex(edu.location)}}`;
      if (edu.gpaOrHonors) {
        latex += ` \\ (GPA/Honors: ${escapeLatex(edu.gpaOrHonors)})`;
      }
      latex += `\\\\[4pt]\n\n`;
    });
  }

  // 3. Experience Section
  if (data.experiences && data.experiences.length > 0) {
    latex += `\\section{Experience}\n`;
    data.experiences.forEach((exp) => {
      const dates = exp.isCurrent
        ? `${escapeLatex(exp.startDate)} -- Present`
        : `${escapeLatex(exp.startDate)} -- ${escapeLatex(exp.endDate || '')}`;

      latex += `\\roleHeader{${escapeLatex(exp.jobTitle)}}{${escapeLatex(exp.company)}}{${escapeLatex(exp.location)}}{${dates}}\n`;

      if (exp.bullets && exp.bullets.length > 0) {
        latex += `\\begin{itemize}[leftmargin=1.5em, itemsep=2pt, topsep=2pt]\n`;
        exp.bullets.forEach((bullet) => {
          if (bullet.trim()) {
            latex += `  \\item ${escapeLatex(bullet.trim())}\n`;
          }
        });
        latex += `\\end{itemize}\n`;
      }
      latex += `\\vspace{6pt}\n\n`;
    });
  }

  // 4. Projects Section
  if (data.projects && data.projects.length > 0) {
    latex += `\\section{Projects}\n`;
    data.projects.forEach((proj) => {
      const titleLine = proj.projectLink
        ? `\\textbf{${escapeLatex(proj.projectName)}} (\\href{https://${proj.projectLink}}{Link})`
        : `\\textbf{${escapeLatex(proj.projectName)}}`;

      latex += `\\noindent ${titleLine} \\hfill \\textit{${escapeLatex(proj.technologies)}}\\\\ \n`;
      latex += `\\textit{${escapeLatex(proj.description)}}\n`;

      if (proj.bullets && proj.bullets.length > 0) {
        latex += `\\begin{itemize}[leftmargin=1.5em, itemsep=2pt, topsep=2pt]\n`;
        proj.bullets.forEach((b) => {
          if (b.trim()) latex += `  \\item ${escapeLatex(b.trim())}\n`;
        });
        latex += `\\end{itemize}\n`;
      }
      latex += `\\vspace{4pt}\n\n`;
    });
  }

  // 5. Skills Section
  if (data.skillCategories && data.skillCategories.length > 0) {
    latex += `\\section{Skills}\n`;
    data.skillCategories.forEach((cat) => {
      latex += `\\cvitem{${escapeLatex(cat.categoryName)}}{${escapeLatex(cat.skillsList)}}\\\\[2pt]\n`;
    });
  }

  latex += `\n\\end{document}\n`;

  return latex;
}

