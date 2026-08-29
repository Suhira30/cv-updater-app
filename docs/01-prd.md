# Product Requirements Document (PRD) — LaTeX CV Creator & Updater

## 1. Problem Statement
Maintaining a professional LaTeX CV presents a severe dilemma:
- **High Initial Creation Barrier**: Creating a custom LaTeX CV from scratch requires downloading heavy TeX distributions, learning complex formatting syntax (`\begin{itemize}`, custom macros, preambles), or dealing with broken online templates.
- **High Recurring Maintenance Tax**: Updating an existing LaTeX CV requires locating custom macros, maintaining bullet styling/tenses, avoiding unescaped control characters (`%`, `&`, `_`), and fitting within page limits.

This friction leads to stale CVs and deters non-LaTeX experts from getting publication-grade typographic results.

---

## 2. Core Product Concept & Workflow Paths

Our application bridges the gap by offering two core paths that eliminate LaTeX friction entirely while preserving 100% LaTeX quality:

### Path A: Create from Scratch (Template + Guided Questionnaire)
- **Template Selection**: User selects a starter template (*Technical SWE*, *Academic/Research*, *Clean Minimal*).
- **Guided Questionnaire**: Fills out a structured wizard (Name, Contact, Experience, Education, Skills, Projects).
- **Automated Compilation**: The system generates clean initial `.tex` source code and compiles a live, downloadable PDF preview.

### Path B: Future Incremental Updates (Existing `.tex` Context)
- **Active Context**: The user's existing `.tex` source code serves as the foundation (either uploaded by the user or generated via Path A).
- **Updation Prompt**: The user provides a plain natural-language prompt describing what they want to add or change (e.g., *"Add a new job bullet under Experience at Acme Corp: Built a RAG pipeline reducing query latency by 40%"* or *"Update reference contact email"*).
- **Smart Placement & Merge**: The AI converts the updation details into matching LaTeX macros, finds the exact suitable section/location in their existing `.tex` source code, and merges the update cleanly.
- **Sandboxed Compilation & Diff**: The system compiles the updated `.tex` in a sandbox, displays a side-by-side code diff (old vs. new `.tex`) alongside a live compiled PDF preview, and provides single-click download for both `.pdf` and updated `.tex`.

---

## 3. Target User Personas
### Primary Persona: Developers, STEM Graduate Students, Researchers & Academics
- **Path A Users**: Developers, students, or researchers who want a polished, publication-grade LaTeX CV without writing or debugging LaTeX code.
- **Path B Users**: LaTeX authors who already maintain a custom `.tex` file but hate manually editing code, finding macros, or fixing syntax errors for routine updates.
- **Privacy Preference**: **Bring Your Own API Key (BYO-Key)** for OpenAI / Anthropic / Gemini, keeping personal CV data private with zero server-side document storage.

---

## 4. User Stories
- **US1: Template-Based Initial Creation (Path A)**  
  *As a job seeker without LaTeX expertise*, I want to pick a template and answer simple wizard questions, so that the app generates a compiled LaTeX CV and downloadable PDF.
- **US2: Natural Language Updation on Existing `.tex` (Path B)**  
  *As an existing `.tex` user*, I want to type simple update instructions against my existing `.tex` code, so that the AI automatically converts the update into matching LaTeX macros and places it in the exact right section.
- **US3: Smart Placement & Macro Consistency**  
  *As a LaTeX author*, I want the AI to reuse my existing preamble macros (`\cvitem`, `\publication`, etc.) and bullet verb tenses without altering unedited sections.
- **US4: Guaranteed Compilable Sandbox & Error Recovery**  
  *As a user*, I want the system to compile LaTeX in a sandboxed backend with automated retry loops, ensuring I am never handed uncompilable code.
- **US5: Side-by-Side Code Diff & Live PDF Preview**  
  *As a user*, I want to review a side-by-side code diff (old vs. new `.tex`) alongside a live compiled PDF preview before downloading.
- **US6: Page-Length Awareness & Overflow Warnings**  
  *As a user*, I want to be notified if an update pushes my CV onto a second page, with an option for AI bullet compression.

---

## 7. Is It Worth It? (Value Proposition & Product-Market Fit)

### Why This Product Is Extremely High Value:
1. **Solves a Real, High-Frequency Pain Point**: Millions of engineers, ML developers, researchers, and PhDs prefer LaTeX for its output quality, but hate editing it. They delay CV updates simply because touching `.tex` files feels like a chore.
2. **Clear Differentiator Over Overleaf & Generic Resume Builders**:
   - *Vs. Overleaf*: Overleaf requires hand-editing raw TeX and debugging compile logs manually.
   - *Vs. Reactive Resume / Canva*: Generic resume builders produce HTML/Canvas exports that lack LaTeX's typography control and academic credibility.
   - *Our App*: Best of both worlds — 100% authentic LaTeX compilation output + zero manual LaTeX editing.
3. **High Willingness to Pay & Retention**: STEM professionals and job seekers actively invest in career tools. A tool that turns a 20-minute LaTeX editing headache into a 30-second prompt has immediate utility.
4. **Feasibility**: Modern LLMs excel at structured code parsing and smart placement when given the preamble as a system constraint. Coupled with a sandboxed compiler (Tectonic) and retry loop, the tech stack is robust and buildable.

---

## 8. Out-of-Scope (for MVP)
- Multi-file `.zip` projects (`\input{}`, `\include{}`).
- Full visual drag-and-drop WYSIWYG LaTeX layout editor.
- Server-side user accounts and persistent cloud document hosting.
